/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/SimpleTextarea", [
       'dijit/form/SimpleTextarea',
       'dojo/_base/declare',
       'dojo/_base/lang',
       'dojo/string',
       'dojo/json',
       'dojo/date/locale',
       'dojo/has'
],
function (simpleTextarea, declare, lang, dString, json, dLocale, has) {
    var widget = declare("Sage.UI.Controls.SimpleTextarea", [simpleTextarea], {
        baseClass: "dijitTextBox dijitTextArea sageTextArea",
        templateString: "<div><textarea ${!nameAttrSetting} class='none' dojoAttachPoint='focusNode,containerNode,textbox' autocomplete='off'></textarea></div>",
        hotKey: '',
        defaultValue: '',
        multiLineMaxLength: '',
        shouldPublishMarkDirty: true,
        _setHotKeyAttr: { node: 'textbox', type: 'attribute', attribute: 'accessKey' },
        constructor: function (args) {
            this.maxLength = args.multiLineMaxLength;
            this.userDateStamp = !!(args.userdatestamp && args.userdatestamp === 'true');
            var newClassName = "";
            if (args.textareaclass) {
                // If there is a class existing, keep it and append the textareaclass property to it
                if (args["class"]) {
                    newClassName = args["class"] + ' ' + args.textareaclass;
                } else {
                    newClassName = args.textareaclass;
                }
            } else if (args["class"]) {
                newClassName = args["class"];
                args["class"] = "";
            }
            this.templateString = this.templateString.replace("class='none'", (newClassName.length > 0 ? "class='" + newClassName + "'" : ""));
            this.connect(this, 'onFocus', this.onFocus);
        },

        postMixInProperties: function () {
            this.inherited(arguments);

            if (!this.defaultValue && this.srcNodeRef) {
                this.defaultValue = this.srcNodeRef.value;
            }
        },

        buildRendering: function () {
            this.inherited(arguments);

            if (has("ie") || has("trident")) {
                if (this.domNode && this.domNode.childElementCount > 0) {
                    for (var index = 0; index < this.domNode.childElementCount; index++) {
                        var child = this.domNode.childNodes[index];
                        if (child && child instanceof HTMLTextAreaElement) {
                            if (!child.defaultValue) {
                                child.defaultValue = this.defaultValue;
                            }
                        }
                    }
                }
            }
        },
        onFocus: function (e) {
            //there are two different options which need to be enabled in order to add a default user date time stamp. The first the control has 
            //quickform control has to have the userdatestamp attribute enabled and the second the user has to have enabled the 
            //'Default username/Time Stamp in Memo Fields' user option enabled, which can be set in Tools/Options General tab
            if (this.getValue('value') === '' && this.userDateStamp) {
                var optionsService = Sage.Services.getService("UserOptions");
                if (optionsService) {
                    var cacheKey =  'EGL_USER_OPTION_UserDateTimeStamp';
                    var value = this._getFromSessionStorage(cacheKey);
                    var userDateStamp = false;
                    if (value !== null && typeof value !== 'undefined') {
                        this._assignUserDateTimeStamp(value);
                    }
                    else {
                        optionsService.get('UserDateTime', 'CustomerService', lang.hitch(this, function (option) {
                            if (option && option.value) {
                                userDateStamp = option.value === 'T';
                                this._assignUserDateTimeStamp(userDateStamp);
                                this._addToSessionStorage(cacheKey, userDateStamp);
                            }
                        }), null, null, true);
                    }
                }
            }
        },
        onChange: function (e) {
            if (this.shouldPublishMarkDirty) {
                dojo.publish("Sage/events/markDirty");
            }
            this.inherited(arguments);
        },
        _getFromSessionStorage: function (cacheKey) {
            var cacheData = sessionStorage.getItem(cacheKey);
            var data;
            if (cacheData !== null && typeof cacheData !== 'undefined') {
                data = json.parse(cacheData);
            }
            return data;
        },
        _addToSessionStorage: function (cacheKey, data) {
            sessionStorage.setItem(cacheKey, json.stringify(data));
        },
        _assignUserDateTimeStamp: function(userDateStamp) {
            if (userDateStamp) {
                var contextService = Sage.Services.getService("ClientContextService");
                var user = contextService.containsKey("userPrettyName") ? contextService.getValue("userPrettyName") : contextService.getValue("userID");
                var timeZone = contextService.containsKey("userTimeZoneKey") ? contextService.getValue("userTimeZoneKey") : "";
                var dateFormat = contextService.containsKey("userDateFmtStr") ? contextService.getValue("userDateFmtStr") : Sys.CultureInfo.CurrentCulture.dateTimeFormat.FullDateTimePattern;
                var dateStamp = dLocale.format(new Date(), { datePattern: dString.substitute("${0}", [dateFormat]) });
                this.setValue(dString.substitute("${0} ${1} (${2})", [user, dateStamp, timeZone]));
            }
        }
    });
    return widget;
});