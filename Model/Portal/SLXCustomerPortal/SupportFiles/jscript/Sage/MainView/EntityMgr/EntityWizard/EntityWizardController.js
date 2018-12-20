/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityWizard/EntityWizardController", [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/array',
    'Sage/MainView/EntityMgr/EntityWizard/_EntityWizardDialogBase',
    'Sage/MainView/EntityMgr/EntityWizard/EntityWizardUtility',
    'Sage/MainView/EntityMgr/EntityWizard/SelectEntityType',
    'Sage/MainView/EntityMgr/EntityWizard/EntityDetails',
    'Sage/MainView/EntityMgr/EntityWizard/Relationship',
    'Sage/MainView/EntityMgr/EntityWizard/EntityProperties',
    'Sage/MainView/EntityMgr/EntityWizard/AddEditEntity',
    'Sage/MainView/EntityMgr/EntityWizard/Status',
    'dojo/topic'
],
function (
    declare,
    dojoString,
    dojoArray,
    wizardDialogBase,
    entityWizardUtility,
    selectEntityType,
    entityDetails,
    Relationship,
    entityProperties,
    addEditEntity,
    status,
    topic
) {
    var entityWizard = declare('Sage.MainView.EntityMgr.EntityWizard.EntityWizardController', [wizardDialogBase], {
        wizardOptions: null,
        constructor: function (entity, entityType) {
            this.wizardOptions = this.wizardOptions ? this.wizardOptions : this._getDefaultWizardOptions();
            this.subscriptions.push(topic.subscribe("/entityController/entityWizard/nextStep", dojo.hitch(this, function (currentStep) { this._nextStep(currentStep); })));
            this.subscriptions.push(topic.subscribe("/entityController/entityWizard/previousStep", dojo.hitch(this, function (currentStep) { this._previousStep(currentStep); })));
            this.subscriptions.push(topic.subscribe("/entityController/entityWizard/cancel", dojo.hitch(this, function () { this._cancel(); })));
        },
        startWizard: function () {
            this._goToStep(entityWizardUtility.entityWizardStep.EntityDetails, null);
            if (!this.entityDetails.ownerId) {
                entityWizardUtility.getOwnerEntityInfo(this);
            }
        },
        //----------------------------------------
        //Subscription listeners
        //----------------------------------------
        _nextStep: function (currentStep) {
            var nextStep = this._getNextStep(currentStep);
            this._goToStep(nextStep);
        },
        _previousStep: function (currentStep) {
            var previousStep = this._getPreviousStep(currentStep);
            this._goToStep(previousStep);
        },
        _cancel: function () {
            //Give some time for dialogs to finish hide animation before initiating destroy process.
            //See http://mail.dojotoolkit.org/pipermail/dojo-interest/2010-February/043090.html
            setTimeout(dojo.hitch(this, function () { this._destroyObjects(); }), dijit.defaultDuration + 100);
        },
        _getDefaultWizardOptions: function () {
            return {
                hiddenSteps: [entityWizardUtility.entityWizardStep.AddActions]
            };
        },
        //----------------------------------------
        //Wizard workflow
        //----------------------------------------
        _isStepVisible: function (step) {
            var visible = true;
            //If we have a custom list of hidden steps, check whether this step is hidden
            if (this.wizardOptions && this.wizardOptions.hiddenSteps) {
                dojoArray.some(this.wizardOptions.hiddenSteps, function (hiddenStep, i) {
                    if (step === hiddenStep) {
                        visible = false;
                        return true; //this is to break dojo.some
                    }
                });
            }
            if (!visible) {
                //We don't need to keep on processing
                return false;
            }
            return true;
        },
        _getNextStep: function (currentStep) {
            for (var step in entityWizardUtility.entityWizardStep) {
                var stepValue = entityWizardUtility.entityWizardStep[step];
                if (stepValue > currentStep && this._isStepVisible(stepValue)) {
                    return stepValue;
                }
            }
            return null;
        },
        _getPreviousStep: function (currentStep) {
            var stepsInReverseOrder = [];
            for (var step in entityWizardUtility.entityWizardStep) {
                stepsInReverseOrder.unshift(entityWizardUtility.entityWizardStep[step]);
            }
            var previousStep = null;
            dojoArray.some(stepsInReverseOrder, dojo.hitch(this, function (stepValue) {
                if (stepValue < currentStep && this._isStepVisible(stepValue)) {
                    previousStep = stepValue;
                    return true;
                }
            }));
            return previousStep;
        },
        _goToStep: function (step) {
            var nextStep = this._getNextStep(step);
            var isLastStep = (nextStep === null || nextStep === entityWizardUtility.entityWizardStep.EntityProperties);
            var previousStep = this._getPreviousStep(step);
            var isFirstStep = (previousStep === null || previousStep === entityWizardUtility.entityWizardStep.SelectEntityType);
            var options = { isLastStep: isLastStep, isFirstStep: isFirstStep, currentStep: null };
            var dialog;
            switch (step) {
                case entityWizardUtility.entityWizardStep.SelectEntityType:
                    dialog = dijit.byId("dlgSelectEntityType");
                    if (!dialog) {
                        options.currentStep = entityWizardUtility.entityWizardStep.SelectEntityType;
                        dialog = new selectEntityType(options);//new selectFile(options);
                        dialog.startup();
                    }
                    dialog.show();
                    break;
                case entityWizardUtility.entityWizardStep.EntityDetails:
                    dialog = dijit.byId("dlgEntityDetails");
                    if (!dialog) {
                        options.currentStep = entityWizardUtility.entityWizardStep.EntityDetails;
                        dialog = new entityDetails(options);
                    }
                    dialog.show();
                    break;
                case entityWizardUtility.entityWizardStep.Relationship:
                    dialog = dijit.byId("dlgRelationship");
                    if (!dialog) {
                        options.currentStep = entityWizardUtility.entityWizardStep.Relationship;
                        dialog = new Relationship(options);//new selectFile(options);
                        dialog.startup();
                    }
                    dialog.show();
                    break;
                case entityWizardUtility.entityWizardStep.EntityProperties:
                    dialog = dijit.byId("dlgEntityProperties");
                    if (!dialog) {
                        options.currentStep = entityWizardUtility.entityWizardStep.EntityProperties;
                        dialog = new entityProperties(options);
                        dialog.startup();
                    }
                    dialog.show();
                    break;
                case entityWizardUtility.entityWizardStep.AddEditEntity:
                    dialog = dijit.byId("dlgAddEditEntity");
                    if (!dialog) {
                        options.currentStep = entityWizardUtility.entityWizardStep.AddEditEntity;
                        dialog = new addEditEntity(options);
                        dialog.startup();
                    }
                    dialog.show();
                    break;
                case entityWizardUtility.entityWizardStep.Status:
                    dialog = dijit.byId("dlgStatus");
                    if (!dialog) {
                        options.currentStep = entityWizardUtility.entityWizardStep.Status;
                        dialog = new status(options);
                        dialog.startup();
                    }
                    dialog.show();
                    break;
            }
        }
    });
    return entityWizard;
});