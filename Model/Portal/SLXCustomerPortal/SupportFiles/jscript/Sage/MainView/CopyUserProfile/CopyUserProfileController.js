/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/CopyUserProfile/CopyUserProfileController", [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/array',
    'Sage/MainView/CopyUserProfile/_CopyUserProfileBase',
    'Sage/MainView/CopyUserProfile/CopyUserProfile',
    'dojo/topic'
],
function (
    declare,
    dojoString,
    dojoArray,
    copyUserProfileBase,
    copyUserProfile,
    topic
) {
    var controller = declare('Sage.MainView.CopyUserProfile.CopyUserProfileController',null, {
        _dialog: null,
        _selectionInfo: null,
        _entityPrettyName: null,
        _entityTableName:null,
        constructor: function (currentEntityPrettyName, currentEntityTableName, selectionInfo) {
            this._entityPrettyName = currentEntityPrettyName;
            this._entityTableName = currentEntityTableName;
            this._selectionInfo = selectionInfo;
        },
        startDialog: function () {
            this._dialog = dijit.byId("dlgCopyUserProfile");
            if (!this._dialog) {
                var groupId = this._getCurrentGroupId();
                if (groupId === "LOOKUPRESULTS") {
                    groupId = this._getDefaultGroupId();
                }

                this._dialog = new copyUserProfile(
                {
                    _entityPrettyName: this._entityPrettyName,
                    _entityTableName: this._entityTableName,
                    selectionInfo: this._selectionInfo,
                    _groupToProcess: groupId,
                    id: "dlgCopyUserProfile"
                });
                this._dialog.startup();
            }
            this._dialog.show();
        },
        _getCurrentGroupId: function () {
            var grpContextSvc = Sage.Services.getService('ClientGroupContext');
            if (grpContextSvc) {
                var contextService = grpContextSvc.getContext();
                return contextService.CurrentGroupID;
            }
            return '';
        },
        _getDefaultGroupId: function () {
            var grpContextSvc = Sage.Services.getService('ClientGroupContext');
            if (grpContextSvc) {
                var contextService = grpContextSvc.getContext();
                return contextService.DefaultGroupID;
            }
            return '';
        }
    });
    return controller;
});