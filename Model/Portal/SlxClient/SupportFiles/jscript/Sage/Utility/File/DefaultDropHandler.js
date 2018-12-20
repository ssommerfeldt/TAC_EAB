/*globals Sage, dojo, define, slx */
define("Sage/Utility/File/DefaultDropHandler", [
    'Sage/Utility/File/DragDropWatcher',
    'Sage/Utility/File/Attachment',
    'Sage/Utility/File/LibraryDocument',
    'Sage/UI/Dialogs',
    'dojo/string',
    'Sage/Utility',
    'Sage/Utility/EntityRelationships',
    'dojo/_base/lang',
    'Sage/Data/SingleEntrySDataStore',
    'Sage/Data/SDataServiceRegistry',
    'dijit/_Widget',
    'Sage/Services/ActivityService',
    'dojo/i18n',
    'dojo/i18n!./nls/DefaultDropHandler',
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/_base/array',
    'dojo/_base/Deferred',
    'dojo/DeferredList'

],
function (dragDropWatcher, attachmentUtil, libraryDocsUtil, Dialogs, dString, utility, utilEntityRelationships, dLang, SingleEntrySDataStore, sDataServiceRegistry,
    _Widget, activityService, i18n, nlsResource, declare, connect, array, Deferred, DeferredList) {

    var emailHandler = declare('Sage.Utility.File.EmailFileHandler', null, {
        file: null,
        histRelIdProperty: '',
        histRelNameProperty: '',
        histRelId: '',
        histRelName: '',
        extendRelationships: null,
        entityContext: null,
        fileMetaData: null,
        newHistory: null,
        saveAsMsg: false,
        doNotPromptHistory: false,
        saveAttachments: false,
        emailDroppedText: 'Dropped Email',
        attachmentTitleText: 'Save Attachments',
        attachmentQuestionText: 'Would you like to keep a copy of these attachment(s) in Infor CRM? <br />The attachments will be stored under the Attachments tab for relevant entities.',
        deferred: null,  //dojo/Deferred - is signalled when new history id is created
        handler: null,   //DefaultDropHandler declared below
        maxDescriptionLength : 64,
        constructor: function (opts) {
            //console.log('file handler constructed. file: ' + opts.file.name);
            dLang.mixin(this, opts);

            //query the schema to figure out max length
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(sDataServiceRegistry.getSDataService('metadata'));
            request.setResourceKind("entities('History')/properties");
            request.setQueryArg('format', 'json');
            request.setQueryArg('Count', '500');
            var self = this;
            request.read({
                success: function (data) {
                    var properties = data.$resources;
                    for (var i = 0; i <= properties.length - 1; i++) {
                        var prop = properties[i];
                        if (prop.columnName === 'DESCRIPTION') {
                            self.maxDescriptionLength = prop.length;
                            break;
                        }
                    }
                },
                failure: function (error) {
                    if (error) {
                        console.error(error);
                    }
                }
            });
        },
        handleFile: function () {
            if (!this.file) {
                console.log('no file - aborting...');
                return;
            }

            utilEntityRelationships.getRelationships(this.entityContext, function (relationships) {

                var store = new SingleEntrySDataStore({
                    resourceKind: 'history',
                    service: sDataServiceRegistry.getSDataService('dynamic')
                });
                store.newItem({
                    onComplete: function (histTemplate) {
                        var hist = {};
                        hist[this.histRelIdProperty] = this.histRelId;
                        hist[this.histRelNameProperty] = this.histRelName;
                        hist['Type'] = 'atEmail';
                        hist['Duration'] = 1;
                        hist['Timeless'] = false;
                        hist['Category'] = this.emailDroppedText;
                        var d = (this.fileMetaData.sentOn) ? this.fileMetaData.sentOn : this.fileMetaData.receivedTime;
                        d = new Date(d); //d at this point is a COM VT_DATE variant (IE specific) or a string from the *.MSG.JSON file
                        var strDate = utility.Convert.toIsoStringFromDate(d);
                        hist['StartDate'] = strDate;
                        hist['CompletedDate'] = strDate;
                        hist['OriginalDate'] = strDate;
                        if (this.fileMetaData['subject']) {
                            hist['Description'] = this.fileMetaData.subject.substring(0, this.maxDescriptionLength);
                        }
                        if (this.fileMetaData['historyNotes']) {
                            hist['LongNotes'] = this.fileMetaData.historyNotes;
                        } else if (this.fileMetaData['body']) {
                            hist['LongNotes'] = this.fileMetaData.body;
                        }
						if(histTemplate.Result === 'Complete')
						{
							hist['Result'] = nlsResource.mailComplete;
						}
                        if (this.fileMetaData['senderName']) {
                            hist['UserDef2'] = this.fileMetaData.senderName;
                        }
                        histTemplate = dLang.mixin(histTemplate, hist);
                        if (relationships) {
                            histTemplate = dLang.mixin(histTemplate, relationships);
                        }
                        store.saveNewEntity(histTemplate,
                        this._historySaved,
                        this._historyFailed,
                        this,
                        false);
                    },
                    scope: this
                });
            },
            this
            );

        },
        _getAttachmentMixin: function (attachment, historyMixin) {
            var mixin = {};
            for (var p in historyMixin) {
                mixin[p] = historyMixin[p];
            }
            mixin['description'] = attachment.filename;
            return mixin;
        },
        _historySaved: function (hist) {
            this.newHistory = hist;
            var mixin = {};
            mixin['HistoryId'] = hist['$key'];
            mixin['historyId'] = hist['$key'];
            //get all relationships - in case Attachment has the same ones...
            for (var p in hist) {
                var lastTwoChar = p.substring(p.length - 2);
                if (lastTwoChar.toUpperCase() === 'ID' && hist[p]) {
                    mixin[p] = hist[p];
                }
            }

            if (this.saveAsMsg) {
                //Creates the msg as an attachment.
                //this.file.name = hist['$key'] + '.msg';
                //this.file.filename = hist['$key'] + '.msg';
                var msgMixin = this._getAttachmentMixin(this.file, mixin);
                msgMixin.description = hist['Description'];
                attachmentUtil.createAttachmentSilent(this.file, msgMixin);
            }
            if (this.fileMetaData.attachments.length > 0) {
                if (this.saveAttachments) {
                    for (var i = 0; i < this.fileMetaData.attachments.length; i++) {
                        var attachment = this.fileMetaData.attachments[i];
                        var attachMixin = this._getAttachmentMixin(attachment, mixin);
                        if ((!attachment.name) && (attachment.filename)) {
                            attachment['name'] = attachment.filename;
                        }
                        attachmentUtil.createAttachmentSilent(attachment, attachMixin);
                    }
                }
            }

            this._handleTicketActivityCreation(hist);

            try {
                this.onHistorySaved(hist['$key']);
            } catch (e) {
                console.error(e);
            }
        },
        _handleTicketActivityCreation: function (hist) {
            var ticketId = hist['TicketId'];
            var type = hist['Type'];
            // Logic is based on the CreateTicketActivity() method in HistoryRules.cs.
            if (dojo.isString(ticketId) && ticketId.length === 12 && (type === 'atEMail' || type === 'atAppointment' || type === 'atPhoneCall' || type === 'atToDo')) {
                connect.publish('/entity/ticketActivity/create', null);
            }
        },
        _historyFailed: function (req) {

        },
        onHistoryFailed: function () { },
        onHistorySaved: function (histId) {

        }

    });

    Sage.namespace('Utility.File.DefaultDropHandler');
    Sage.Utility.File.DefaultDropHandler = {
        // i18n strings
        attachmentTitleText: 'Save Attachments',
        attachmentQuestionText: 'Would you like to keep a copy of these attachment(s) in Infor CRM? <br />The attachments will be stored under the Attachments tab for relevant entities.',
        emailDroppedText: 'Dropped Email',
        // end i18n strings
        promptForAttachments: true,
        saveAttachments: false,
        hasAttachments: false,
        options: {},
        historyQueue: [],
        historyHandlers: [],
        fileType: Sage.Utility.File.fileType.ftAttachment,
        init: function (options) {
            dojo.connect(dragDropWatcher, 'onFilesDropped', this, 'onFilesDropped');
            Sage.Utility.File.DefaultDropHandler.options['SAVEMSGFILES'] = options.saveMSGFiles;
            var uOptSvc = Sage.Services.getService('UserOptions');
            if (uOptSvc) {
                uOptSvc.get("DoNotPromptHistory", "Email",
                    function (opt) {
                        Sage.Utility.File.DefaultDropHandler.options['DoNotPromptHistory'] = (opt['value'] === 'T');
                    }
                );
            }
        },
        onFilesDropped: function (files, target) {
            var file;
            if (this.shouldForceAttachments(files, target)) {
                //filter out the .msg,json attachments - they are not real
                var newFiles = [];
                var msgExtension = '.msg.json';
                for (var j = 0; j < files.length; j++) {
                    file = files[j];
                    var fileName = file.name;
                    if (fileName.toLowerCase().indexOf(msgExtension, fileName.length - msgExtension.length) == -1) {
                        newFiles.push(file);
                    }
                }
                if (this.fileType !== Sage.Utility.File.fileType.ftLibraryDocs) {
                    attachmentUtil.createAttachments(newFiles);
                }
                else {
                    libraryDocsUtil.createDocuments(newFiles, target);
                }
                return;
            }
            var emails = [];
            var attachments = [];
            for (var i = 0; i < files.length; i++) {
                file = files[i];
                if (this.isOutlookEmailFile(file)) {
                    //*.msg.json
                    emails.push(file);
                } else {
                    attachments.push(file);
                }
            }
            if (emails.length > 0) {
                this.handleEmailFiles(emails, target);
            }
            //we cannot have both emails and attachments in the same drop
            //we can have both *.msg.json and *.msg coming from slxotl32.dll, but we ignore
            //*.msg files if we process *.msg.json for history 
            if ((emails.length === 0) && (attachments.length > 0)) { 
                if (this.fileType !== Sage.Utility.File.fileType.ftLibraryDocs) {
                    attachmentUtil.createAttachments(attachments);
                }
                else {
                    libraryDocsUtil.createDocuments(files, target);
                }
            }
        },
        shouldForceAttachments: function (files, target) {
            /*
            if ((typeof slx !== 'undefined' && slx && slx.desktop) || (Sage.gears)) {
                var isAttachmentDrop = false;
                if (target) {
                    isAttachmentDrop = Sage.Utility.File.DefaultDropHandler.isTargetAttachmentTab(target.parentElement);
                }
                if (isAttachmentDrop) {
                    return true;
                } else {
                    return false;
                }
            } else
            */
            {
                //do we have *.msg.json files coming from our browser hook?
                var isAttachmentDrop = (target) && Sage.Utility.File.DefaultDropHandler.isTargetAttachmentTab(target.parentElement);
                if (isAttachmentDrop) {
                    return true;
                } else {
                    var msgExtension1 = '.msg.json';
                    var msgExtension2 = '.msg';
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var fileName = file.name;
                        if ((fileName.toLowerCase().indexOf(msgExtension1, fileName.length - msgExtension1.length) !== -1) ||
                            (fileName.toLowerCase().indexOf(msgExtension2, fileName.length - msgExtension2.length) !== -1))
                        {
                            return false;
                        }
                    }
                }
                return true;
            }
        },

        isOutlookEmailFile: function (file) {
            var msgExtension1 = '.msg.json';
            var msgExtension2 = '.msg';
            var fileName = file.name; 
            if ((fileName.toLowerCase().indexOf(msgExtension1, fileName.length - msgExtension1.length) !== -1) ||
                (fileName.toLowerCase().indexOf(msgExtension2, fileName.length - msgExtension2.length) !== -1))
            {
                return true;
            }
            /* - we now treat MSG files are any other files - we only care about .msg.json files
            msgExtension = '.msg';
            if (fileName.toLowerCase().indexOf(msgExtension, fileName.length - msgExtension.length) !== -1) {
                return true;
            }
            */
            return false;
        },
        isMsgFile: function (file) {
            var msgExtension = '.msg';
            var fileName = file.name;
            if (fileName.toLowerCase().indexOf(msgExtension, fileName.length - msgExtension.length) !== -1) {
                return true;
            }
            return false;
        },
        isTargetAttachmentTab: function (target) {

            if (!target) {
                return false;
            }
            if (target.id.indexOf('tabContent.dijitContentPane') != -1) {
                return false;
            }
            if (target.id.indexOf('AttachmentList') != -1) {
                return true;
            }
            //recursive call
            return Sage.Utility.File.DefaultDropHandler.isTargetAttachmentTab(target.parentElement);

        },
        handleEmailFiles: function (files, target) {
            //are files being forcefully saved as library attachments?
            var filesAsAttachments = (this.fileType === Sage.Utility.File.fileType.ftLibraryDocs);
            if (!filesAsAttachments) {
                //do we have BHO installed that can handle MSG file?
                filesAsAttachments = (!(typeof slx !== 'undefined' && slx && slx.desktop)) && //8.2 - BHO
                                     (!Sage.gears); //8.1 and older
                if (filesAsAttachments) {
                    //is this an *.msg.json file that we can parse? We only get that file from our browser hook
                    var msgExtension = '.msg.json';
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var fileName = file.name;
                        if (fileName.toLowerCase().indexOf(msgExtension, fileName.length - msgExtension.length) !== -1) {
                            filesAsAttachments = false;
                            break;
                        }
                    }
                }
            }

            if (filesAsAttachments) {
                if (this.fileType !== Sage.Utility.File.fileType.ftLibraryDocs) {
                    attachmentUtil.createAttachments(files);
                }
                else {
                    libraryDocsUtil.createDocuments(files, target);
                }
                return;
            }
            if (files.length < 1) {
                return;
            }
            this.hasAttachments = false;
            var promises = this._buildEmailQueue(files);
            //wait for all async calls above to complete
            var self = this;
            var all = new DeferredList(promises);
            all.then(function (values) {
                if (!Sage.Utility.File.DefaultDropHandler.options.DoNotPromptHistory) {
                    self._showCompleteDlg();
                }
            });
        },
        _buildEmailQueue: function (files) {
            var self = this;

            var entinfo = this.getEntityInfo();
            var table = entinfo.EntityTableName.toUpperCase().substring(0, 1) + entinfo.EntityTableName.toLowerCase().substring(1);

            this.historyHandlers = [];
            this.historyQueue = [];

            var promptedAttachments = false;
            var promises = [];
            var i = 0;
            //if we have a Chrome/Firefox browser hook installed, we might get *.msg.json file that contains parsed data
            //for the message being dragged from Outlook
            var processedMsgJsonFiles = false; //will be set to true if we processed *.msg.json files below. Otherwise we will need to do that the old way
            var msgExtension = '.msg.json';
            for (i = 0; i < files.length; i++) {
                var file = files[i];
                var fileName = file.name;
                if (fileName.toLowerCase().indexOf(msgExtension, fileName.length - msgExtension.length) !== -1) {
                    processedMsgJsonFiles = true;
                    var reader = new FileReader();
                    //we are processing an .msg.json file, but it shoud not obe attached to the history entry
                    //find the matching .msg file and pass it to te hfunction below instead
                    var msgFile = file;//default to the old file
                    var msgFileName = fileName.substring(0, fileName.length - 5).toLowerCase();
                    var j = 0;
                    for (j = 0; j < files.length; j++) {
                        if (files[j].name.toLowerCase() == msgFileName) {
                            msgFile = files[j];
                            break;
                        }
                    }
                    (function (self, file, table, entinfo) { //create a clouse so that we get copies of the local variables that can change in the loop
                        var def = new Deferred();
                        reader.onload = function (e) {
                            try {
                                var reader = e.target; //e.target is FileReader
                                var md = JSON.parse(reader.result);
                                md.sentOn = new Date(md.sentOn);
                                md.receivedTime = new Date(md.receivedTime);
                                if (md.attachments.length > 0) {
                                    self.hasAttachments = true;
                                    if (!promptedAttachments) {
                                        promptedAttachments = true;
                                        self.saveAttachments = confirm(new emailHandler().attachmentQuestionText.replace("<br />", "\r\n"));
                                    }
                                }
                                var handler = new emailHandler({
                                    file: file,
                                    histRelIdProperty: table + 'Id',
                                    histRelNameProperty: table + 'Name',
                                    histRelId: entinfo.EntityId,
                                    histRelName: entinfo.Description,
                                    entityContext: entinfo,
                                    emailDroppedText: Sage.Utility.File.DefaultDropHandler.emailDroppedText,
                                    fileMetaData: md,
                                    saveAttachments: self.saveAttachments, //false,
                                    saveAsMsg: Sage.Utility.File.DefaultDropHandler.options.SAVEMSGFILES,
                                    doNotPromptHistory: Sage.Utility.File.DefaultDropHandler.options.DoNotPromptHistory,
                                    deferred: def,
                                    handler: self
                                });
                                handler.onHistorySaved = dojo.hitch(handler, function (historyId) {
                                    //the context is handler (emailHandler)
                                    this.handler.historyQueue.push(historyId);
                                    this.deferred.resolve(this.handler); //we are now ready to process this history entry
                                });
                                handler.onHistoryFailed = dojo.hitch(handler, function () {
                                    //the context is handler (emailHandler)
                                    this.deferred.reject(this.handler);
                                });

                                handler.handleFile(); //will create new history entity
                            } catch (ex) {
                                def.reject(handler);
                            }
                        };

                        promises.push(def.promise);
                    })(this, msgFile/*file*/, table, entinfo);

                    reader.readAsText(file);
                }
            }
            if (!processedMsgJsonFiles)
            {
                //there were no *.msg.json files above. Do it the old way
                if ((typeof slx !== 'undefined' && slx && slx.desktop) || (Sage.gears)) {
                    var desktop;
                    if (Sage.gears) {
                        desktop = Sage.gears.factory.create('beta.desktop');
                        var data = desktop.getDragData(event, 'application/x-gears-files');
                        files = data && data.files;
                    } else {
                        desktop = slx.desktop;
                        //use slx version of the files, otherwise extractMetaData() below would not work
                        files = slx.desktop.getDragData().files;
                    }

                    for (i = 0; i < files.length; i++) {
                        var blob = null;
                        if (files[i].blob) {
                            blob = files[i].blob; // from gears;
                        } else {
                            blob = files[i]; //from html5 will not work.
                        }
                        var md = desktop.extractMetaData(blob);
                        if (md.attachments.length > 0) {
                            self.hasAttachments = true;
                            if (!promptedAttachments) {
                                promptedAttachments = true;
                                self.saveAttachments = confirm(new emailHandler().attachmentQuestionText.replace("<br />", "\r\n"));
                            }
                        }

                        var def = new Deferred();
                        promises.push(def.promise);
                        try {
                            var handler = new emailHandler({
                                file: files[i],
                                histRelIdProperty: table + 'Id',
                                histRelNameProperty: table + 'Name',
                                histRelId: entinfo.EntityId,
                                histRelName: entinfo.Description,
                                entityContext: entinfo,
                                emailDroppedText: Sage.Utility.File.DefaultDropHandler.emailDroppedText,
                                fileMetaData: md,
                                saveAttachments: self.saveAttachments,
                                saveAsMsg: Sage.Utility.File.DefaultDropHandler.options.SAVEMSGFILES,
                                doNotPromptHistory: Sage.Utility.File.DefaultDropHandler.options.DoNotPromptHistory,
                                deferred: def,
                                handler: self
                            });

                            handler.onHistorySaved = dojo.hitch(handler, function (historyId) {
                                //the context is emailHandler
                                this.handler.historyQueue.push(historyId);
                                this.deferred.resolve(this.handler); //we are now ready to process this history entry
                            });
                            handler.onHistoryFailed = dojo.hitch(handler, function () {
                                //the context is emailHandler
                                this.deferred.reject(this.handler);
                            });
                            handler.handleFile(); //will create new history entity
                        } catch (e) {
                            def.reject(handler);
                        }
                    }
                }
            }
           
            return promises;
        },
        _processNextHistoryHandler: function () {
            if (this.historyHandlers.length > 0) {
                var handler = this.historyHandlers.pop();
                if (handler) {
                    handler.saveAttachments = this.saveAttachments;
                    handler.handleFile();
                }
            } else {
                this.saveAttachments = false; //rest the prompt.
                this._hasAttachmnets = false;
                this._checkContinueToComplete();
            }
        },
        _onHistoryHandlerSuccsess: function (historyId) {
            this.historyQueue.push(historyId);
            this._processNextHistoryHandler();
        },
        _onHistoryHandlerFailed: function () {
            //this.historyQueue.push('');
            this._processNextHistoryHandler();
        },
        _checkContinueToComplete: function () {
            //all the history records have been created - now show complete dialog...
            if (!this.options.DoNotPromptHistory) {
                this._showCompleteDlg();
            } else {
                dojo.publish('/entity/history/change', null);
                this.historyQueue = [];
            }
        },
        _showCompleteDlg: function () {
            var actService = Sage.Services.getService('ActivityService');
            actService.completeHistoriesInList(this.historyQueue);
        },
        getEntityInfo: function () {
            if (Sage.Services.hasService('ClientEntityContext')) {
                var entitycontext = Sage.Services.getService('ClientEntityContext');
                var context = entitycontext.getContext();
                if (context.EntityId !== "") {
                    return context;
                } else {
                    return null;
                }
            }
            return null;
        }
    };

    Sage.Utility.File.DefaultDropHandler = dojo.mixin(Sage.Utility.File.DefaultDropHandler, i18n.getLocalization("Sage.Utility.File", "DefaultDropHandler"));
    return Sage.Utility.File.DefaultDropHandler;
});
