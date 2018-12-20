/*globals Sage, dojo, define, window  */
define("Sage/UI/AttachmentList", [
    'dijit/_Widget',
    'Sage/UI/EditableGrid',
    'Sage/Data/SDataServiceRegistry',
    'dojo/string',
    'Sage/UI/Controls/GridParts/Columns/DateTime',
    'Sage/Utility',
    'Sage/Utility/File',
    'Sage/Utility/File/Attachment',
    'Sage/UI/Dialogs',
    'Sage/Utility/File/AttachmentPropertiesEditForm',
    'Sage/Utility/File/FallbackFilePicker',
    'Sage/Utility/File/AddURLAttachment',
    'Sage/Utility/File/GoogleDocPicker',
    'Sage/UI/SLXPreviewGrid/Filter/DateRange',
    'Sage/UI/SLXPreviewGrid/Filter/Text',
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/_base/lang',
    'dojo/_base/connect',
    'dojo/i18n!./nls/AttachmentList',
    'Sage/Utility',
    'Sage/Utility/Workspace',
    'Sage/UI/GridView',
    'dojo/string',
    'dojo/store/Memory',
    'Sage/Store/SData'
],
function (_Widget,
    EditableGrid,
    SDataServiceRegistry,
    dString,
    colDateTime,
    utility,
    fileUtility,
    attachmentUtility,
    Dialogs,
    attachmentForm,
    FallbackFilePicker,
    AddURLAttachment,
    GoogleDocPicker,
    dateRangeFilter,
    textFilter,
    declare,
    domConstruct,
    lang,
    connect,
    attachmentListStrings,
    Utility,
    workspaceUtil,
    GridView,
    string,
    Memory,
    SDataObjectStore
    ) {
    var attachmentList = declare('Sage.UI.AttachmentList', [_Widget], {
        placeHolder: '',
        conditionFmt: '',
        parentRelationshipName: '',
        workspace: '',
        tabId: '',
        fileInputBtn: false,
        _fileInputOnChange: null,
        _attachmentEditor: false,
        _newAttachmentsCache: [],
        subscriptions: [],
        _grid: null,
        _store: {},
        constructor: function () {
            lang.mixin(this, attachmentListStrings);
            this.subscriptions = [];
        },
        startup: function (callBack) {
            this._newAttachmentsCache = [];
            this._checkDbType(callBack);
        },
        _checkDbType: function (callBack) {
            var svc = Sage.Services.getService('SystemOptions');
            svc.get('DbType',
                function (val) {
                    this._buildGrid(val === "2" || val === "3");
                    if (typeof callBack == 'function') {
                        callBack(this);
                    }
                },
                function () {
                    this._buildGrid(false);
                    if (typeof callBack == 'function') {
                        callBack(this);
                    }
                },
                this
            );
        },
        _buildGrid: function (isRemote) {
            var columns = [
                {
                    // key field, added for automation
                    field: '$key',
                    editable: false,
                    hidden: true,
                    unhidable: true,
                    id: 'id',
                    formatter: function (value, rowIdx) {
                        return ['<div id=', value, ' >', value, '</ div>'].join('');
                    }
                },
                {
                    field: 'description',
                    label: attachmentListStrings.attachmentText,
                    formatter: function (rowIdx, rowItem) {
                        if (!rowItem) {
                            return this.defaultValue;
                        }

                        // Call the utility function to encode the object's strings (recursively)
                        Utility.encodeObjectStrings(rowItem);

                        //console.warn('ToDo: include role security to Attachment description column rendering (or whatever other security) that was applied before.   <---<<<   <---<<<');
                        if (rowItem['url']) {
                            var href = rowItem['url'] || '';
                            href = (href.indexOf('http') < 0) ? 'http://' + href : href;
                            return dString.substitute('<a href="${0}" target="_blank" title="${1}">${2}</a>', [href, rowItem['url'], rowItem['$descriptor']]);
                        } else {
                            if (rowItem['fileExists']) {
                                return dString.substitute('<a href="javascript: Sage.Utility.File.Attachment.getAttachment(\'${0}\');" title="${1}">${1}</a>',
                                    [rowItem['$key'], rowItem['$descriptor']]);
                            } else {
                                return rowItem['$descriptor'];
                            }
                        }
                    },
                    filterConfig: { widgetType: textFilter },
                    width: '300px'
                },
                {
                    field: 'user',
                    label: attachmentListStrings.userText,
                    formatter: function (rowIdx, rowItem) {
                        if (!rowItem) { return ''; }
                        var user = (rowItem.hasOwnProperty('user') && typeof rowItem['user'] === 'object') ? rowItem.user : null;
                        if (!user) {
                            return '';
                        }
                        return (user['$descriptor']) ? user['$descriptor'] : '';
                    },
                    width: '120px'
                },
                {
                    field: 'attachDate',
                    label: attachmentListStrings.modDateText,
                    type: colDateTime,
                    filterConfig: {
                        widgetType: dateRangeFilter,
                        label: attachmentListStrings.dateRangeText
                    },
                    width: '175px'
                }, {
                    field: 'fileSize',
                    label: attachmentListStrings.sizeText,
                    formatter: function (v) {
                        return fileUtility.formatFileSize(v);
                    },
                    width: '120px'
                }, {
                    field: 'fileName',
                    label: attachmentListStrings.extensionText,
                    formatter: function (rowIdx, rowItem) {
                        if (!rowIdx) {
                            return '.';
                        }
                        return rowIdx.substr(rowIdx.lastIndexOf('.'));
                    },
                    sortable: false
                }
            ];
            var tools = [
                    {
                        id: this.id + '_btnBrowse',
                        imageClass: 'icon_Add_File_16x16',
                        handler: this.browseForFiles,
                        title: attachmentListStrings.addFileText,
                        alternateText: attachmentListStrings.addFileText,
                        appliedSecurity: '',
                        scope: this
                    }, {
                        //       id: this.id + '_btnAddGoogle',
                        //      imageClass: 'icon_google_16x16',
                        //      handler: this.addGoogle,
                        //      title: attachmentListStrings.addGoogleText,
                        //      appliedSecurity: '',
                        //      scope: this
                        //  }, {
                        id: this.id + '_btnAddUrl',
                        imageClass: 'icon_Internet_Service_Add_16x16',
                        handler: this.addUrlAttachment,
                        title: attachmentListStrings.addUrlText,
                        appliedSecurity: '',
                        alternateText: attachmentListStrings.addUrlText,
                        scope: this
                    }, {
                        id: this.id + '_btnEditAttachProps',
                        imageClass: 'icon_Edit_Item_16x16',
                        handler: this.editSelectedAttachment,
                        title: attachmentListStrings.editText,
                        appliedSecurity: '',
                        alternateText: attachmentListStrings.editText,
                        scope: this
                    }, {
                        id: this.id + '_btnDeleteAttachment',
                        imageClass: 'icon_Delete_16x16',
                        title: attachmentListStrings.deleteText,
                        handler: this.deleteSelectedAttachment,
                        appliedSecurity: '',
                        alternateText: attachmentListStrings.deleteText,
                        scope: this
                    }, {
                        id: this.id + '_btnHelp',
                        imageClass: 'icon_Help_16x16',
                        handler: function () {
                            utility.openHelp('attachmentstab');
                        },
                        title: attachmentListStrings.helpText,
                        alternateText: attachmentListStrings.helpText,
                        appliedSecurity: ''
                    }
            ];

            if (isRemote) {
                var remoteColumn = {
                    field: 'remoteStatus',
                    name: '&nbsp;',
                    width: '300px',
                    format: function (rowIdx, rowItem) {
                        if (!rowItem) {
                            return this.defaultValue;
                        }

                        var status = (rowItem['remoteStatus']) ? rowItem['remoteStatus'] : (rowItem['fileExists']) ? 'Delivered' : 'Available';
                        if (!rowItem['dataType']) {
                            status = 'X'; // URL attachments - do not put a link to download these, they fail anyway.
                        }

                        // Available | Requested | Delivered
                        var link = dString.substitute('<a href="javascript:Sage.Utility.File.Attachment.remoteRequestAttachment(\'${0}\')">${1}</a>',
                            [rowItem['$key'], attachmentListStrings.request]);
                        switch (status) {
                            case 'Available':
                                return attachmentListStrings.available + ' - ' + link;
                            case 'Requested':
                                return attachmentListStrings.requested; // +' - ' + link;
                            case 'Delivered':
                                return attachmentListStrings.delivered + ' - ' + link;
                            default:
                                return ' ';
                        }
                    }
                };
                columns.splice(2, 0, remoteColumn);
            }

            //var store = this._configureGridStore();
            var contextservice = Sage.Services.getService('ClientEntityContext');
            var ctx = contextservice.getContext();
            this.contextEntityType = ctx.EntityType;

            var curId = utility.getCurrentEntityId();
            var store = this._createLiveStore();
            this.mode = (!curId) ? 'insert' : '';

            var options = {
                columns: columns,
                gridLabel: 'Attachments',
                tools: tools,
                store: new Memory({ data: [] }),
                sort: [{ attribute: 'attachDate', descending: true }],
                id: this.id + '_attachments',
                minRowsPerPage: 25,
                placeHolder: this.placeHolder,
                mode: this.mode,
                columnHiding: true,
                columnResizing: true,
                columnReordering: true,
                selectionMode: 'extended',
                rowSelection: true,
                slxContext: { 'workspace': this.workspace, tabId: this.tabId }
            };

            //fire this so that customizations can change these options without overriding the whole thing
            this.onBeforeCreateGrid(options);

            var grid = this._grid = new GridView(options);
            grid.createGridView();

            dojo.connect(grid, 'destroy', this, this.destroy);

            this.fileInputBtn = dojo.doc.createElement('INPUT');
            dojo.attr(this.fileInputBtn, {
                'type': 'file',
                'multiple': 'true',
                'accept': '*/*',
                'class': 'display-none'
            });
            dojo.place(this.fileInputBtn, this.domNode, 'last');
            this._fileInputOnChange = connect.connect(this.fileInputBtn, 'onchange', this, this.handleFiles);

            this.subscriptions.push(dojo.subscribe('/entity/attachment/create', this, this.onNewAttachmentEntity));
            this.subscriptions.push(dojo.subscribe('/entity/attachment/update', this, this.onAttachmentUpdated));
            if (isRemote) {
                this.subscriptions.push(dojo.subscribe('/entity/attachment/requested', this, this.onAttachmentUpdated));
            }
            this.resetEntityContext(); //end of _buildGrid
        },
        _createLiveStore: function () {
            var parentRelationshipName = this.parentRelationshipName;
            var entityId = utility.getCurrentEntityId();
            if (parentRelationshipName === 'activityId') {
                entityId = entityId.substr(0, 12); // for reoccurring activity Ids;
            }

            this._store = new SDataObjectStore({
                service: SDataServiceRegistry.getSDataService('system'),
                contractName: 'system',
                resourceKind: 'attachments',
                resourcePredicate: null,
                include: ['$descriptors'],
                select: ['description', 'user', 'attachDate', 'fileSize', 'fileName', 'url', 'fileExists', 'remoteStatus', 'dataType'],
                where: string.substitute((parentRelationshipName || '\'A\'') + ' eq "${0}"', [entityId]),
                scope: this
            });
        },
        resetEntityContext: function () {
            var parentRelationshipName = this.parentRelationshipName;
            var entityId = utility.getCurrentEntityId();
            if (parentRelationshipName === 'activityId') {
                entityId = entityId.substr(0, 12); // for reoccurring activity Ids;
            }
            var contextualCondition = (parentRelationshipName || '\'A\'') + ' eq \'' + entityId + '\'';

            if ((!entityId && this.mode !== 'insert') ||
                       (entityId && this.mode === 'insert')) {
                this.mode = (!entityId) ? 'insert' : '';
            }

            if (this._grid) {
                if (this.mode === 'insert') {
                    this._grid.grid.setStore(new Memory({ data: [] }));
                } else {
                    this._store.where = contextualCondition;
                    this._grid.grid.setStore(this._store);
                }
            }
        },
        destroy: function () {
            var len = this.subscriptions.length;
            for (var i = 0; i < len; i++) {
                dojo.unsubscribe(this.subscriptions.pop());
            }
        },
        handleFiles: function (e) {
            var files = this.fileInputBtn.files;
            this._createAttachments(files);
        },
        handleGearsDesktopFileSelect: function (files) {
            if (files.length > 0) {
                attachmentUtility.createAttachments(files);
            }
        },
        _createAttachments: function (files) {
            if (files.length > 0) {
                attachmentUtility.createAttachments(files);
            }
        },
        onNewAttachmentEntity: function (attachment) {
            var contextservice = Sage.Services.getService('ClientEntityContext');
            var ctx = contextservice.getContext();
            if (this.contextEntityType !== ctx.EntityType) {
                return;
            }
            if (!attachment) {
                this._getFallBackPickerAttachment();
                return;
            } else {
                this._newAttachmentsCache.push(attachment);

                if (this.mode === 'insert') {
                    this._grid.grid.addItem(attachment);
                    this._grid.refresh();
                } else {
                    this._grid.grid.store.put(attachment).then(lang.hitch(this, function (response) {
                        this._grid.refresh();
                    }));
                }
            }
        },
        _getFallBackPickerAttachment: function () {
            var editor = dijit.byId('activityEditor');
            var idField = 'activityId';
            if (!editor || !editor._tempIdForAttachments) {
                editor = dijit.byId('historyEditor') || {};
                idField = 'historyId';
            }
            var tempid = editor._tempIdForAttachments;
            if (tempid) {
                var req = new Sage.SData.Client.SDataResourceCollectionRequest(SDataServiceRegistry.getSDataService('system'))
                    .setResourceKind('attachments')
                    .setQueryArg('select', ['description', 'userId', 'attachDate', 'fileSize', 'fileName', 'url', 'fileExists'].join(','))
                    .setQueryArg('where', idField + ' eq \'' + tempid + '\'')
                    .setStartIndex(1)
                    .setCount(50);
                req.read({
                    success: this._receivedFallBackPickerAttachments,
                    failure: function () {
                    },
                    scope: this
                });
            }
        },
        _receivedFallBackPickerAttachments: function (data) {
            var attachments = data.$resources;
            this.clearNewAttachments();
            for (var i = 0; i < attachments.length; i++) {
                var attachment = attachments[i];
                this._newAttachmentsCache.push(attachment);
                this._grid.store.put(attachment).then(lang.hitch(this, function (response) {
                    this._grid.grid.addItem(attachment);
                }));
            }
            this._grid.refresh();
        },
        onAttachmentUpdated: function (attachment) {
            var contextservice = Sage.Services.getService('ClientEntityContext');
            var ctx = contextservice.getContext();
            if (this.contextEntityType !== ctx.EntityType) {
                return;
            }
            if (this.mode === 'insert') {
                var newAtts = this._newAttachmentsCache;
                for (var i = 0; i < newAtts.length; i++) {
                    if (newAtts[i].$key === attachment.$key) {
                        lang.mixin(newAtts[i], attachment);
                    }
                }
            }
            this._grid.refresh();
        },
        getNewAttachments: function () {
            return this._newAttachmentsCache;
        },
        clearNewAttachments: function () {
            this._newAttachmentsCache = [];
            if (this._grid) {
                this._grid.grid.setStore(new Memory({ data: [] }));
            }
        },
        _editAttachmentInfo: function (attachId) {
            // use query parameter of _includeFile=false to get only the attachment entity for editing

            if (!this._attachmentEditor) {
                this._attachmentEditor = new attachmentForm();
            }
            this._attachmentEditor.set('attachmentId', attachId);
            this._attachmentEditor.show();

        },
        browseForFiles: function (e) {
            if (fileUtility.supportsHTML5File) {
                // Re-create the file input, otherwise onchange will not fire if you select the same file to upload again.
                var node = this.fileInputBtn.cloneNode();
                domConstruct.destroy(this.fileInputBtn);
                domConstruct.place(node, this.domNode, 'last');
                this.fileInputBtn = node;
                connect.disconnect(this._fileInputOnChange);
                this._fileInputOnChange = connect.connect(this.fileInputBtn, 'onchange', this, this.handleFiles);
                this.fileInputBtn.click();
            } else {
                var fbfp = dijit.byId('fallbackFilePicker');
                if (!fbfp) {
                    fbfp = new FallbackFilePicker({ id: 'fallbackFilePicker' });
                }
                fbfp.show();
            }
        },
        addUrlAttachment: function (e) {
            var ed = dijit.byId('urlAttachmentEditor');
            if (!ed) {
                ed = new AddURLAttachment({ id: 'urlAttachmentEditor' });
            }
            ed.set('attachmentId', '');
            ed.show();
        },
        editSelectedAttachment: function () {
            var selectedItems = this._grid.getSelectedRowData();
            if (selectedItems.length < 1) {
                return;
            }
            var item = selectedItems[0];  // what do we do if more than one is selected - edit only the first?
            this._editAttachmentInfo(item['$key']);
        },
        deleteSelectedAttachment: function () {
            this._grid.deleteSelected();
            dojo.publish('/entity/attachment/delete');
        },
        addGoogle: function () {
            var gPicker = dijit.byId('googleDocumentPicker');
            if (!gPicker) {
                gPicker = new GoogleDocPicker({ id: 'googleDocumentPicker' });
                dojo.connect(gPicker, 'onDocumentSelected', this, '_handleGoogleDocPicked');
            }
            gPicker.pick();
        },
        _handleGoogleDocPicked: function (title, url) {
            var request = new Sage.SData.Client.SDataTemplateResourceRequest(SDataServiceRegistry.getSDataService('system'));
            request.setResourceKind('attachments');
            request.read({
                success: function (attachment) {
                    attachment.description = dojo.isArray(title) ? title[0] : title;
                    attachment.url = dojo.isArray(url) ? url[0] : url;
                    this._addRelationshipsToGoogleDocAttachment(attachment);
                },
                failure: function (err) {
                    console.warn('an exception occurred getting attachment template ' + err);
                },
                scope: this
            });
        },
        _addRelationshipsToGoogleDocAttachment: function (attachment) {
            attachmentUtility.getKnownRelationships(function (rels) {
                var newAttach = lang.mixin(attachment, rels);
                newAttach.user = { '$key': utility.getClientContextByKey('userID') || '' };
                newAttach.attachDate = utility.Convert.toIsoStringFromDate(new Date());
                var request = new Sage.SData.Client.SDataSingleResourceRequest(SDataServiceRegistry.getSDataService('system'))
                    .setResourceKind('attachments');
                request.create(newAttach, {
                    success: function (att) {
                        dojo.publish('/entity/attachment/create', att);
                    },
                    failure: function (err) {
                        console.warn('an exception occurred saving Google document attachment ' + err);
                    },
                    scope: this
                });
            }, this);
        },
        onBeforeCreateGrid: function (options) { },
        setToReadOnly: function (readOnly) {
            var disableList = [this.id + '_btnBrowse',
                             this.id + '_btnAddUrl',
                             this.id + '_btnEditAttachProps',
                             this.id + '_btnDeleteAttachment'
            ];
            this._bulkSetProperty(this, disableList, 'disabled', readOnly);

        },
        _bulkSetProperty: function (ui, propsList, prop, val) {
            for (var i = 0; i < propsList.length; i++) {
                var ctrl = dijit.byId(propsList[i]);
                if (ctrl) {
                    ctrl.set(prop, val);
                }
            }
        }
    });
    return attachmentList;
});
