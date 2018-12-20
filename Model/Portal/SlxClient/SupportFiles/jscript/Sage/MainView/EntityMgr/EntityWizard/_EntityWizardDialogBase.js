/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityWizard/_EntityWizardDialogBase", [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/topic',
    'dojo/_base/lang',
    'dojo/store/Memory',
    'dijit/_Widget',
    'Sage/_Templated',
    "dojo/store/Observable",
    "dojo/store/Memory",
    'Sage/MainView/EntityMgr/EntityWizard/EntityWizardUtility',
    'Sage/MainView/EntityMgr/EntityDetailUtility',
    'dojo/i18n!./nls/_EntityWizardDialog',
    'Sage/UI/_DialogLoadingMixin',
    'dojo/_base/lang',
    'Sage/UI/Controls/_DialogHelpIconMixin'
],
function (
    declare,
    dojoArray,
    topic,
    dojoLang,
    memory,
    widget,
    templated,
    Observable,
    Memory,
    entityWizardUtility,
    entityDetailUtility,
    nlsResources,
    _DialogLoadingMixin,
    lang,
    dialogHelpIconMixin
) {
    var wizardDialogBase = declare('Sage.MainView.EntityMgr.EntityWizard._EntityWizardDialogBase', [widget, templated], {
        _dialog: null,
        _currentStep: null,
        _isFirstStep: false,
        _isLastStep: false,
        _helpIconTopic: "EntityWizard",
        widgetsInTemplate: true,
        subscriptions: [],
        _dialogIds: ["dlgSelectEntityType", "dlgEntityDetails", "dlgRelationship", "dlgEntityProperties", "dlgAddEditEntity", "dlgStatus"],
        entityDetails: {},
        _nlsResources: nlsResources,

        constructor: function () {
            this.subscriptions = [];

        },
        show: function () {
            this._dialog.show();
            if (this._helpIconTopic) {
                if (!this._dialog.helpIcon) {
                    dojoLang.mixin(this._dialog, new dialogHelpIconMixin());
                    this._dialog.createHelpIconByTopic(this._helpIconTopic);
                    this._dialog.helpIcon.tabIndex = "-1";
                }
            }
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            this.inherited(arguments);
            lang.mixin(this._dialog, new _DialogLoadingMixin());

        },
        /**
        * Default implementation of isValid function. Do not remove, required by classes that inherit from _WizardDialogBase.
        */
        isValid: function () {
            return true;
        },
        //------------------------------------------------
        //Events.
        //------------------------------------------------
        /**
        * Triggered when the user clicks on the "x" button to close the dialog.
        */
        _dialog_OnCancel: function () {
            this._btnCancel_OnClick();
        },
        _btnBack_OnClick: function () {
            this._checkCurrentStep();
            this._dialog.hide();
            topic.publish("/entityController/entityWizard/previousStep", this._currentStep);
        },
        _btnNext_OnClick: function () {
            //Do not remove validation below. Required for triggering validation of the current wizard dialog page.
            if (this.isValid()) {
                this._checkCurrentStep();
                this._dialog.hide();
                topic.publish("/entityController/entityWizard/nextStep", this._currentStep);
            }
        },
        _btnCancel_OnClick: function () {
            this._checkCurrentStep();
            this._dialog.hide();
            topic.publish("/entityController/entityWizard/cancel", null);
        },
        _checkCurrentStep: function () {
            if (this._currentStep === null) {
                console.error("_currentStep has not been defined");
            }
        },
        finishWizard: function () {
            this._destroyObjects();
        },
        _destroyObjects: function () {
            //Destroy hidden dialogs
            dojoArray.forEach(this._dialogIds, function (dialogId) {
                var dialog = dijit.byId(dialogId);
                if (dialog) {
                    dialog.destroyRecursive();
                }
            });
            //Remove suscriptions
            dojoArray.forEach(this.subscriptions, function (handle) {
                handle.remove();
            });
        }
    });
    return wizardDialogBase;
});