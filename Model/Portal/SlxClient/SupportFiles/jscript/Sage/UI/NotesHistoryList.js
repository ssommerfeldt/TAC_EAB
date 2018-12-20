/*globals Sage, dojo define, slxmm, Sys */
define("Sage/UI/NotesHistoryList", [
        'dijit/_Widget',
        'dijit/_TemplatedMixin',
        'dijit/_WidgetsInTemplateMixin',
        'Sage/Utility/Activity',
        'Sage/Utility/Email',
        'Sage/Utility',
        'Sage/UI/Controls/GridParts/Columns/DateTime',
        'Sage/UI/Controls/GridParts/Columns/SlxLink',
        'Sage/UI/SLXPreviewGrid/Filter/Text',
        'Sage/UI/SLXPreviewGrid/Filter/DateRange',
        'Sage/UI/SLXPreviewGrid/Filter/_previewGridFilterMixin',
        'dojo/data/ItemFileReadStore',
        'dijit/form/FilteringSelect',
        'dijit/form/CheckBox',
        'Sage/UI/Dialogs',
        'dojo/string',
        'dojo/date/locale',
        'dojo/promise/all',
        'dojo/i18n!./nls/NotesHistoryList',
        'dojo/_base/array',
        'dojo/_base/declare',
        'dojo/_base/lang',
        'Sage/Utility/Workspace',
        'Sage/UI/GridView',
        'dojo/on',
        'Sage/Data/SDataServiceRegistry',
        'put-selector/put',
        'Sage/Mingle/MingleSupport',
        'Sage/Mingle/UserService',
        'Sage/Mingle/Feeds',
        'Sage/UI/Controls/Phone'
    ],
    function(_Widget,
        _Templated,
        _WidgetsInTemplateMixin,
        activityUtility,
        email,
        utility,
        DateTimeColumn,
        LinkColumn,
        textFilter,
        dateRangeFilter,
        filterMixin,
        ItemFileReadStore,
        FilteringSelect,
        CheckBox,
        sageDialogs,
        dojoString,
        locale,
        all,
        notesHistoryListStrings,
        array,
        declare,
        lang,
        workspaceUtil,
        GridView,
        on,
        sDataServiceRegistry,
        put,
        mingleSupport,
        mingleUserService,
        mingleFeeds,
        phone) {
        var filterTypeWidget = declare('Sage.UI.HistoryTypeFilterWidget',
        [_Widget, _Templated, _WidgetsInTemplateMixin, filterMixin],
        {
            _progressPercentage: null,
            // summary:
            //  Filter widget for the history type.   Combination of a dropdown (note the available types are hard-coded)
            //  and a checkbox to enable showing the DB changes
            templateString: [
                '<div>',
                '<div dojoAttachPoint="selectContainer"></div>',
                '<div class="chkShowDBChanges checkboxRight">',
                '<label for="chkShowDbChanges">',
                notesHistoryListStrings.showDbChangesText,
                '</label>',
                '<input id="chkShowDbChanges" type="checkbox" dojoType="dijit.form.CheckBox" dojoAttachPoint="chkShowDbChanges" />',
                '</div>',
                '</div>'
            ].join(''),

            buildRendering: function() {
                this.inherited(arguments);
                var options = [];
                dojo.forEach([
                        "atAppointment", "atPhoneCall", "atToDo", "atNote", "atPersonal", "atInternal", "atSchedule",
                        "atEMail",
                        "atDoc", "atFax", "atLiterature", "atDatabaseChange"
                    ],
                    function(item) {
                        options.push({
                            name: activityUtility.getActivityTypeName(item),
                            id: activityUtility.getActivityTypeEnumValue(item)
                        });
                    });
                var store = new ItemFileReadStore({
                    data: {
                        items: options,
                        label: 'name',
                        identifier: 'id'
                    }
                });
                this._select = new FilteringSelect({
                        store: store,
                        required: false
                    },
                    this.selectContainer);
            },
            getQuery: function() {
                var showDb = this.chkShowDbChanges.get('checked');
                var type = this._select.get('value');
                if (type) {
                    var c = '(Type eq "' + type + '"';
                    if (showDb) {
                        c += ' or Type eq "' + activityUtility.getActivityTypeEnumValue("atDatabaseChange") + '"';
                    }
                    c += ')';
                    return c;
                } else if (!showDb) {
                    return 'Type ne "' + activityUtility.getActivityTypeEnumValue("atDatabaseChange") + '"';
                }
                return '';
            },
            reset: function() {
                this._select.set('value', '');
                this.chkShowDbChanges.set('checked', false);
            },
            getState: function() {
                return {
                    'value': this._select.get('value'),
                    'showDBChanges': this.chkShowDbChanges.get('checked')
                };
            },
            applyState: function(state) {
                if (state) {
                    this._select.set('value', state['value'] || '');
                    this.chkShowDbChanges.set('checked', state['showDBChanges']);
                }
            }
        });
        var completedDateRangeFilter = declare(dateRangeFilter,
        {
            //to override getQuery on base DateRange filter...
            getQuery: function() {
                var toIsoStringFromDate = function(value, isUpperBound) {
                    // format to ISO
                    // if isUpperBound is true it will add 1 day (used for upper bound in date range)
                    if (!value)
                        return '';
                    if (value.constructor !== Date)
                        value = Date.parse(value);
                    if (isUpperBound) {
                        value.setUTCDate(value.getUTCDate() + 1);
                    }
                    return utility.Convert.toIsoStringFromDate(value);
                };
                var toTimelessIsoString = function(value, isUpperBound) {
                    if (!value)
                        return '';
                    if (value.constructor !== Date)
                        value = Date.parse(value);
                    var pad = function(n) { return n < 10 ? '0' + n : n; };
                    return [
                        value.getFullYear(),
                        '-',
                        pad(value.getMonth() + 1),
                        '-',
                        pad(value.getDate()),
                        (isUpperBound) ? 'T23:59:59Z' : 'T00:00:00Z'
                    ].join('');
                };

                /*
    
                Logic for CompletedDate:
                Since the timeless flag only kindof indicates CompletedDate is a timeless value, we have to have additional logic.
    
                To see if it really is timeless you need:
                Timeless = true and CompletedDate = OriginalDate
    
                (((Timeless = false) or (Timeless = true and CompletedDate != OriginalDate)) and CompletedDate between <localgmtvalue fromdate> and <localgmtvalue todate>)
                or
                ((Timeless = true and CompletedDate = OriginalDate) and CompletedDate between <from00:00:00Z> and <to23:59:59Z>)
    
                */

                var dFrom = this.dteFrom.get('value');
                var dTo = this.dteTo.get('value');
                var fmt;
                var qry = '';
                if (!dFrom && !dTo) {
                    return '';
                }
                if (dTo && dFrom) {
                    fmt = [
                        '((((Timeless eq true and CompletedDate eq OriginalDate) and (CompletedDate ge \'${0}\' and CompletedDate lt \'${1}\'))) or',
                        '(((Timeless eq false) or (Timeless eq true and CompletedDate ne OriginalDate)) and (CompletedDate ge \'${2}\' and CompletedDate lt \'${3}\')))'
                    ].join('');
                    qry = dojoString.substitute(fmt,
                    [
                        toTimelessIsoString(dFrom), toTimelessIsoString(dTo, true), toIsoStringFromDate(dFrom),
                        toIsoStringFromDate(dTo, true)
                    ]);
                } else if (dFrom && !dTo) {
                    fmt = [
                        '((((Timeless eq true and CompletedDate eq OriginalDate) and CompletedDate ge \'${0}\')) or',
                        '(((Timeless eq false) or (Timeless eq true and CompletedDate ne OriginalDate)) and CompletedDate ge \'${1}\'))'
                    ].join('');
                    qry = dojoString.substitute(fmt, [toTimelessIsoString(dFrom), toIsoStringFromDate(dFrom)]);
                } else if (dTo && !dFrom) {
                    fmt = [
                        '((((Timeless eq true and CompletedDate eq OriginalDate) and CompletedDate lt \'${0}\')) or',
                        '(((Timeless eq false) or (Timeless eq true and CompletedDate ne OriginalDate)) and CompletedDate lt \'${1}\'))'
                    ].join('');
                    qry = dojoString.substitute(fmt, [toTimelessIsoString(dTo, true), toIsoStringFromDate(dTo, true)]);
                }
                return qry;
            }
        });
        var notesHistoryList = declare('Sage.UI.NotesHistoryList',
        [_Widget],
        {
            placeholder: '',
            parentRelationshipName: '',
            workspace: '',
            tabId: '',
            connections: [],
            options: { 'includeAttendees': true },
            constructor: function(args) {
                lang.mixin(this, args);
                this.connections = [];
            },
            startup: function() {
                var columnConfig = [
                    {
                        field: '$key',
                        editable: false,
                        hidden: true,
                        unhidable: true,
                        id: 'id',
                        formatter: function(value, rowIdx) {
                            return ['<div id=', value, ' >', value, '</ div>'].join('');
                        }
                    }, {
                        field: 'Type',
                        label: notesHistoryListStrings.typeText,
                        type: activityUtility.historyTypeCell,
                        width: '90px',
                        filterConfig: {
                            widgetType: filterTypeWidget
                        }
                    }, {
                        field: 'CompletedDate',
                        label: notesHistoryListStrings.dateTimeText,
                        type: DateTimeColumn,
                        useFiveSecondRuleToDetermineTimeless: true,
                        width: '100px',
                        filterConfig: {
                            widgetType: completedDateRangeFilter,
                            label: notesHistoryListStrings.dateRangeText
                        }
                    }, {
                        field: 'UserName',
                        label: notesHistoryListStrings.userText,
                        width: '90px',
                        filterConfig: { widgetType: textFilter }
                    }
                ];

                this._addEntitySpecificColumns(columnConfig);

                columnConfig.push({
                    field: 'Description',
                    label: notesHistoryListStrings.regardingText,
                    width: '200px',
                    filterConfig: { widgetType: textFilter }
                });
                columnConfig.push({
                    field: 'Result',
                    label: notesHistoryListStrings.resultText,
                    width: '90px'
                });
                columnConfig.push({
                    field: 'Category',
                    label: notesHistoryListStrings.categoryText,
                    width: '90px'
                });
                var helpToolTip = (this.options.includeAttendees)
                    ? notesHistoryListStrings.helpText
                    : notesHistoryListStrings.helpText + ' *';
                var toolConfig = [
                    {
                        id: 'SendEmail',
                        imageClass: 'icon_Send_Write_email_16x16',
                        tooltip: notesHistoryListStrings.sendEmailText,
                        handler: this.onSendEmailClick,
                        scope: this
                    }, {
                        id: 'SendWord',
                        imageClass: 'icon_Document_Type_16x16',
                        tooltip: notesHistoryListStrings.sendToWordText,
                        handler: this.onSendToWordClick,
                        scope: this
                    }, {
                        id: 'NewNote',
                        imageClass: 'icon_New_Note_16x16',
                        tooltip: notesHistoryListStrings.addNoteText,
                        handler: Sage.Link.newNote,
                        scope: Sage.Link
                    }, {
                        id: 'CompleteActivity',
                        imageClass: 'icon_complete_activity_16x16',
                        tooltip: notesHistoryListStrings.completeAnActivityText,
                        handler: Sage.Link.scheduleCompleteActivity,
                        scope: Sage.Link
                    }, {
                        id: 'Help',
                        imageClass: 'icon_Help_16x16',
                        handler: function() {
                            utility.openHelp('noteshistory');
                        },
                        tooltip: notesHistoryListStrings.helpText
                    }
                ];

                if (typeof mingleConfig !== 'undefined' && mingleConfig.isMingleEnabled) {
                    toolConfig.splice(0,
                        0,
                        {
                            id: 'ShareOnMingle',
                            imageClass: 'icon_Mingle_16x16',
                            tooltip: 'Share on Ming.le',
                            handler: this.onShareOnMingle,
                            scope: this
                        }
                    );
                }

                var parentRelationshipName = this.parentRelationshipName;
                var self = this;
                var options = {
                    id: 'NotesHistoryList',
                    tools: toolConfig,
                    columns: columnConfig,
                    storeOptions: {
                        service: sDataServiceRegistry.getSDataService('dynamic'),
                        select: [
                            'Type', 'CompletedDate', 'UserName', 'AccountName', 'ContactName', 'ContactId',
                            'OpportunityName', 'OpportunityId', 'Description', 'Notes', 'Timeless', 'Result'
                        ],
                        resourceKind: 'history',
                        //specifying sort here ^ means that this is always applied.  For example,
                        //  when the user sorts by Result, the items are grouped by sorted results, but
                        //  they are also sorted by CompletedDate within each Result value.
                        where: function() {
                            var fmt = '${0} eq \'${1}\'';
                            if (self.options.includeAttendees) {
                                if (parentRelationshipName === "ContactId" || parentRelationshipName === "LeadId") {
                                    fmt =
                                        '((HistoryAttendees.EntityId eq  \'${1}\') or (${0} eq  \'${1}\' and  HistoryAttendees.IsPrimary eq true) or (${0} eq  \'${1}\' and  HistoryAttendees.EntityId eq null))';
                                }
                            }
                            return dojoString
                                .substitute(fmt, [parentRelationshipName, utility.getCurrentEntityId()]);
                        }
                    },
                    sort: [
                        {
                            attribute: 'CompletedDate',
                            descending: true
                        }
                    ],
                    slxContext: { workspace: this.workspace, tabId: this.tabId },
                    previewField: 'Notes',
                    fullNoteField: 'LongNotes',
                    placeHolder: this.placeHolder,
                    columnHiding: true,
                    columnResizing: true,
                    columnReordering: true,
                    rowSelection: true,
                    selectionMode: 'extended'
                };

                //fire this so that customizations can change these options without overriding the whole thing
                this.onBeforeCreateGrid(options);

                var grid = this._grid = new GridView(options);
                grid.createGridView();

                grid.grid.onRowDblClick = function(row) {
                    Sage.Link.editHistory(row.id, row.data);
                };

                this.connections.push(dojo.subscribe('/entity/history/create', this, this.onHistoryChanges));
                this.connections.push(dojo.subscribe('/entity/history/change', this, this.onHistoryChanges));
                this.connections.push(dojo.subscribe('/entity/history/delete', this, this.onHistoryChanges));
                dojo.connect(grid, 'destroy', this, this.destroy);
            },
            onHistoryChanges: function(history) {
                this._grid.refresh();
            },
            destroy: function() {
                for (var i = 0; i < this.connections.length; i++) {
                    dojo.unsubscribe(this.connections.pop());
                }
                this.inherited(arguments);
            },
            _addEntitySpecificColumns: function(list) {
                var entityType = Sage.Services.getService('ClientEntityContext').getContext().EntityType;
                switch (entityType) {
                case "Sage.Entity.Interfaces.IAccount":
                case "Sage.Entity.Interfaces.IOpportunity":
                    list.push({
                        field: 'ContactName',
                        label: notesHistoryListStrings.contactText,
                        width: '100px',
                        type: LinkColumn,
                        idField: 'ContactId',
                        pageName: 'Contact'
                    });
                    break;
                case "Sage.Entity.Interfaces.IContact":
                    list.push({
                        field: 'OpportunityName',
                        label: notesHistoryListStrings.opportunityText,
                        width: '100px',
                        type: LinkColumn,
                        idField: 'OpportunityId',
                        pageName: 'Opportunity'
                    });
                    break;
                }
            },

            getQueryConditions: function () {
                var qry = '';

                var ids = [];

                // Get the selected IDs, if any.
                for (var id in this._grid.grid.selection) {
                    ids.push("id eq '" + id + "'");
                }

                // Combine the selected IDs into an OR statement.
                if (ids.length > 0) {
                    qry = ids.join(' or ');
                }

                // Get the current query from the grid. If a filter has been applied we need to get the query from the filter.
                var gridQuery = this._grid._filter ? this._grid._filter.getQuery() : this._grid.query;

                if (gridQuery !== '' && gridQuery !== null) {
                    if (qry !== '') {
                        qry = dojoString.substitute('${0} and (${1})', [gridQuery, qry]);
                    } else {
                        qry = gridQuery;
                    }
                }

                return qry;
            },

            _handleOnMingleFeedPostSuccess: function (scope, description) {
                var options = {
                    indeterminate: false,
                    pct: 0,
                    message: dojoString.substitute('${0}: ${1}', [notesHistoryListStrings.shared, description]),
                    showmessage: true,
                    title: notesHistoryListStrings.sharingToMingle,
                    canclose: false
                };
                if (lang.isObject(scope)) {
                    scope._progressPercentage = scope._progressPercentage + 1;
                    options.pct = scope._progressPercentage;
                } else {
                    options.indeterminate = true;
                }
                sageDialogs.showProgressBar(options);
            },

            _handledOnMingleFeedPostFailure: function(scope, description, error) {
                var options = {
                    indeterminate: false,
                    pct: 0,
                    message: dojoString.substitute(notesHistoryListStrings.failedToPost, [description, error]),
                    showmessage: true,
                    title: notesHistoryListStrings.sharingToMingle,
                    canclose: false
                };
                if (lang.isObject(scope)) {
                    scope._progressPercentage = scope._progressPercentage + 1;
                    options.pct = scope._progressPercentage;
                } else {
                    options.indeterminate = true;
                }
                sageDialogs.showProgressBar(options);
            },

            _doShareOnMingle: function() {
                this._grid.store.select.push('LongNotes');

                var promises = [];

                var qry = this.getQueryConditions();
                console.debug('qry: %o', qry);

                var self = this;

                this._progressPercentage = 0;
                sageDialogs.showProgressBar(
                {
                    maximum: this._grid.rowCount,
                    pct: 0,
                    message: notesHistoryListStrings.pleaseWait,
                    showmessage: true,
                    title: notesHistoryListStrings.sharingToMingle,
                    canclose: false
                });

                this._grid.store.query(qry, null)
                    .forEach(function(item) {
                            var drillBack = {
                                'DisplayName': dojoString.substitute('History: ${0}', [item.Description]),
                                'Script': dojoString.substitute("Sage.Link.editHistory('${0}');", [item.$key])
                            };
                            var drillBacks = mingleSupport.getDrillBacks([drillBack]);

                            var body = "#" + notesHistoryListStrings.accountText.replace(/\s/g, '_') + ":" + item.AccountName.replace(/\s/g, '_') + "\n";
                            if (item.ContactName) {
                                body += "#" + notesHistoryListStrings.contactText.replace(/\s/g, '_') + ":" + item.ContactName.replace(/\s/g, '_') + "\n";
                            }
                            body += notesHistoryListStrings.dateText + ": ";
                            var dateObject = utility.Convert.toDateFromString(item.CompletedDate);
                            body += locale.format(dateObject, { locale: Sys.CultureInfo.CurrentCulture.name }) + "\n";
                            body += notesHistoryListStrings.userText + ": " + item.UserName + "\n";
                            body += notesHistoryListStrings.regardingText + ": " + item.Description + "\n\n";
                            body += notesHistoryListStrings.notesText + ":\n" + item.LongNotes;

                            var feeds = new mingleFeeds();
                            var feedOptions = {
                                scope: self,
                                description: item.Description,
                                failure: self._handledOnMingleFeedPostFailure,
                                feed: {
                                    DrillBackList: drillBacks,
                                    MessageText: body
                                },
                                success: self._handleOnMingleFeedPostSuccess
                            };

                            var promise = feeds.postUserFeed(feedOptions);
                            promises.push(promise);
                        }
                    )
                    .then(function() {
                            all(promises)
                                .then(function(results) {
                                        if (lang.isArray(results) && results.length > 0) {
                                            if (mingleConfig.isDebug) {
                                                array.forEach(results,
                                                    function(result) {
                                                        console.debug('Feed post result: %o', result);
                                                    }
                                                );
                                            }                                            
                                            window.setTimeout(function () {
                                                sageDialogs.closeProgressBar();
                                            }, 1000);
                                            sageDialogs.showInfo(notesHistoryListStrings.sharedToMingle);
                                        } else {
                                            window.setTimeout(function () {
                                                sageDialogs.closeProgressBar();
                                            }, 1000);
                                            sageDialogs
                                                .showInfo(notesHistoryListStrings.errorNoData);
                                        }
                                    },
                                    function(errors) {
                                        array.forEach(errors,
                                            function(error) {
                                                console.error('Feed post error result: %o', error);
                                            }
                                        );
                                        window.setTimeout(function () {
                                            sageDialogs.closeProgressBar();
                                        }, 1000);
                                        sageDialogs
                                            .showError(notesHistoryListStrings.errorShareMingle);
                                    }
                                );
                        }
                    );
            },

            onShareOnMingle: function() {
                if (!this._grid.grid.selection && this._grid.rowCount > 0) {

                    var self = this;

                    var dialogBody = dojoString
                        .substitute(notesHistoryListStrings.noRecordsSelectedProcessAll,
                        [this._grid.rowCount]);

                    sageDialogs.raiseQueryDialog(
                        notesHistoryListStrings.salesLogixPageTitle,
                        dialogBody,
                        function(confirmation) {
                            if (confirmation === true) {
                                self._doShareOnMingle();
                            }
                        },
                        notesHistoryListStrings.yesButtonText,
                        notesHistoryListStrings.noButtonText
                    );

                } else {
                    if (this._grid.rowCount > 0) {
                        this._doShareOnMingle();
                    } else {
                        sageDialogs.showInfo(notesHistoryListStrings.errorNoData);
                    }
                }
            },

            onSendEmailClick: function() {
                // handler for send email button
                this._grid.store.select.push('LongNotes');
                var qry = this.getQueryConditions();
                var record = this._grid.store.query(qry, null);
                record.then(lang.hitch(this,
                    function(notes) {
                        if (notes.length === 0) {
                            sageDialogs.showWarning(notesHistoryListStrings.pleaseSelectRecordsText);
                            return;
                        }
                        var body = dojo.map(notes,
                                function(n) {
                                    var txt = notesHistoryListStrings.accountText + ": " + n.AccountName + "\n";
                                    if (n.ContactName)
                                        txt += notesHistoryListStrings.contactText + ": " + n.ContactName + "\n";
                                    var dateObject = utility.Convert.toDateFromString(n.CompletedDate);
                                    txt += notesHistoryListStrings.dateText + ": ";
                                    txt += locale.format(dateObject, { locale: Sys.CultureInfo.CurrentCulture.name }) + "\n";
                                    txt += notesHistoryListStrings.userText + ": " + n.UserName + "\n";
                                    txt += notesHistoryListStrings.regardingText + ": " + n.Description + "\n\n";
                                    txt += notesHistoryListStrings.notesText + ":\n" + n.LongNotes;
                                    return txt;
                                })
                            .join("\n\n---------------------------------------------\n\n");

                        var subject = dojo.map(notes, function(n) { return n.Description; }).join("; ");
                        email.writeEmail("", subject, body);
                    }));

            },
            onSendToWordClick: function() {
                // handler for send to word button
                var getWordApplication = function() {
                    if (typeof slxmm !== 'undefined' && slxmm && slxmm.com) {
                        // slxmm.com - this is prefered, if available, because it will bypass the security dialog
                        try {
                            return slxmm.com.create("Word.Application");

                        } catch (e) {
                        }
                    }
                    // IE
                    if (Sage.Utility.isIE) {
                        {
                            try {
                                return new ActiveXObject("Word.Application");
                            } catch (e) {
                                return null;
                            }
                        }
                    }
                    return null;
                };

                this._grid.store.select.push('LongNotes');
                this._grid.store.select.push('Contact.WorkPhone');
                this._grid.store.select.push('Contact.Address.Address1');
                this._grid.store.select.push('Contact.Address.Address2');
                this._grid.store.select.push('Contact.Address.CityStatePostal');
                this._grid.store.select.push('Account.MainPhone');
                this._grid.store.select.push('Account.TollFree');
                // Keep track of the count of new items we added to the array
                var addedIndexCount = 7;
                var qry = this.getQueryConditions();              
                var record = this._grid.store.query(qry, null);

                record.then(lang.hitch(this,
                    function(notes) {
                        if (notes.length === 0) {
                            sageDialogs.showWarning(notesHistoryListStrings.pleaseSelectRecordsText);
                            return;
                        }

                        var wordApp = getWordApplication();
                        if (!wordApp) {
                            sageDialogs.showWarning(notesHistoryListStrings.UnableToFindWordMsg);
                            return;
                        }

                        // header
                        var wdSeekCurrentPageHeader = 9;
                        var wdSeekMainDocument = 0;
                        var doc = wordApp.Documents.Add();
                        wordApp.PrintPreview = true;
                        wordApp.Visible = true;
                        wordApp.ActiveWindow.ActivePane.View.SeekView = wdSeekCurrentPageHeader;
                        wordApp.Selection.TypeText(notesHistoryListStrings.accountText +
                            ": " +
                            notes[0].AccountName +
                            "\t" +
                            notesHistoryListStrings.printedOnText +
                            ": " +
                            locale.format(new Date(), { selector: 'date', fullYear: true, locale: Sys.CultureInfo.CurrentCulture.name }));
                        
                        wordApp.ActiveWindow.ActivePane.View.SeekView = wdSeekMainDocument;
                        //Account Information
                        if (notes[0].Contact.Address.Address1) {
                            if (notes[0].Account.MainPhone || notes[0].Account.TollFree) {
                                wordApp.Selection.TypeText(notesHistoryListStrings.addressText + ":" + "\t\t\t\t" + notesHistoryListStrings.mainPhoneText + ": " + phone.prototype.formatNumberForDisplay(notes[0].Account.MainPhone) + "\n");
                                wordApp.Selection.TypeText(notes[0].Contact.Address.Address1 + "\t\t\t" + notesHistoryListStrings.tollFreeText + ": " + phone.prototype.formatNumberForDisplay(notes[0].Account.TollFree) + "\n");
                            } else {
                                wordApp.Selection.TypeText(notesHistoryListStrings.addressText + "\n");
                                wordApp.Selection.TypeText(notes[0].Contact.Address.Address1 + "\n");
                            }
                            if (notes[0].Contact.Address.Address2) {
                                wordApp.Selection.TypeText(notes[0].Contact.Address.Address2 + "\n");
                            }
                            if (notes[0].Contact.Address.CityStatePostal) {
                                wordApp.Selection.TypeText(notes[0].Contact.Address.CityStatePostal + "\n");
                            }
                        } else if (notes[0].Account.MainPhone || notes[0].Account.TollFree) {
                            wordApp.Selection.TypeText(notesHistoryListStrings.mainPhoneText + ": " + phone.prototype.formatNumberForDisplay(notes[0].Account.MainPhone) + "\n");
                            wordApp.Selection.TypeText(notesHistoryListStrings.tollFreeText + ": " + phone.prototype.formatNumberForDisplay(notes[0].Account.TollFree) + "\n");
                        }                                             

                        dojo.forEach(notes,
                            function(note) {                                
                                wordApp.Selection.TypeText("___________________________________________________________");
                                wordApp.Selection.TypeParagraph();
                                wordApp.Selection.TypeParagraph();

                                if (note.ContactName) {
                                    wordApp.Selection.TypeText(notesHistoryListStrings.contactText + ":        ");
                                    wordApp.Selection.TypeText(note.ContactName);
                                    wordApp.Selection.TypeParagraph();
                                    wordApp.Selection.TypeText(notesHistoryListStrings.contactPhoneText + ":        ");
                                    wordApp.Selection.TypeText(phone.prototype.formatNumberForDisplay(note.Contact.WorkPhone));
                                    wordApp.Selection.TypeParagraph();
                                }

                                if (note.OpportunityName) {
                                    wordApp.Selection.TypeText(notesHistoryListStrings.opportunityText + ":        ");
                                    wordApp.Selection.TypeText(note.OpportunityName);
                                    wordApp.Selection.TypeParagraph();
                                }

                                if (note.CompletedDate) {
                                    var dateObject = utility.Convert.toDateFromString(note.CompletedDate);
                                    wordApp.Selection.TypeText(notesHistoryListStrings.dateText + ":        ");
                                    wordApp.Selection.TypeText(locale.format(dateObject, { locale: Sys.CultureInfo.CurrentCulture.name }));
                                    wordApp.Selection.TypeParagraph();
                                }

                                if (note.UserName) {
                                    wordApp.Selection.TypeText(notesHistoryListStrings.userText + ":        ");
                                    wordApp.Selection.TypeText(note.UserName);
                                    wordApp.Selection.TypeParagraph();
                                }

                                wordApp.Selection.TypeText(notesHistoryListStrings.typeText + ":        ");
                                wordApp.Selection.TypeText(activityUtility.getActivityTypeName(note.Type));
                                wordApp.Selection.TypeParagraph();

                                if (note.Description) {
                                    wordApp.Selection.TypeText(notesHistoryListStrings.regardingText + ":        ");
                                    wordApp.Selection.TypeText(note.Description);
                                    wordApp.Selection.TypeParagraph();
                                }

                                if (note.LongNotes) {
                                    wordApp.Selection.TypeText(notesHistoryListStrings.notesText + ":        ");
                                    wordApp.Selection.TypeText(note.LongNotes);
                                    wordApp.Selection.TypeParagraph();
                                }
                            });

                        wordApp.Selection.TypeText("___________________________________________________________");
                        wordApp.Selection.TypeParagraph();
                        wordApp.Visible = true;
                    }));
                // Pop all the lookup values we just pushed so that it does not accumulate every time user presses send to word
                for (var selectIndex = addedIndexCount; selectIndex > 0; selectIndex--) {
                    this._grid.store.select.pop();
                }
            },
            onBeforeCreateGrid: function(options) {}
        });
        return notesHistoryList;
    });