Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.AccountAssociations = {
    makeGrid: function (runtimeConfig) {
        require([
            'Sage/UI/Controls/GridParts/Columns/SlxUser',
            'Sage/UI/Controls/GridParts/Columns/SlxEdit',
            'Sage/UI/Controls/GridParts/Columns/DateTime',
            'Sage/Utility',
            'dojo/aspect',
            'Sage/Utility/Workspace',
            'Sage/Data/SDataServiceRegistry',
            'Sage/UI/GridView'
            ],
            function (slxUser, slxEdit, slxDateTime, utility, aspect, workspaceUtil, sDataServiceRegistry, GridView) {
                var parentId = utility.getCurrentEntityId();
                if (typeof AccountAssociationsResource === 'undefined') {
                    AccountAssociationsResource = {};
                }

                var accountCell =
                    // summary:
                    //  custom column used for display of history type (also acts as a link for edit)
                    function (inRowIndex, inItem) {
                        var fromid = utility.getValue(inItem, "FromId");
                        var toid = utility.getValue(inItem, "ToId");
                        if (fromid && toid) {
                            var fromname = utility.getValue(inItem, "FromAccount.AccountName");
                            var toname = utility.getValue(inItem, "ToAccount.AccountName");
                            var accountId = fromid == parentId ? toid : fromid;
                            var accountName = fromid == parentId ? toname : fromname;
                            return dojo.string.substitute("<a href='Account.aspx?entityid=${0}'>${1}</a>", [accountId, utility.htmlEncode(accountName)]);
                        }
                    };

                var relationshipCell =
                    // summary:
                    //  custom column used for display of history type (also acts as a link for edit)
                    function (inRowIndex, inItem) {
                        var fromId = utility.getValue(inItem, "FromId");
                        var relation;
                        if (fromId == parentId) {
                            relation = utility.getValue(inItem, "BackRelation");
                        }
                        else {
                            relation = utility.getValue(inItem, "ForwardRelation");
                        }
                        return relation;
                    };

                var descriptionCell =
                    // summary:
                    //  custom column used for display of history type (also acts as a link for edit)
                    function (inRowIndex, inItem) {
                        var fromId = utility.getValue(inItem, "FromId");
                        var notes;
                        if (fromId == parentId) {
                            notes = utility.getValue(inItem, "BackNotes");
                        }
                        else {
                            notes = utility.getValue(inItem, "ForwardNotes");
                        }
                        return notes;
                    };

                var options = {
                    context: runtimeConfig,
                    readOnly: false,
                    columns: [
                        {
                            label: ' ',
                            field: 'Id',
                            width: 5,
                            type: slxEdit,
                            editCellValue: AccountAssociationsResource.AccountAssociationsGrid_Edit_Text,
                            entityType: 'Sage.Entity.Interfaces.IAssociation, Sage.Entity.Interfaces',
                            smartPart: 'AddEditAccountAssociation',
                            isCentered: true,
                            dialogHeight: 320,
                            dialogWidth: 600,
                            formObjectName: 'Sage.UI.Forms.AccountAssociations'
                        },
                        {
                            field: "FromAccount.AccountName",
                            label: AccountAssociationsResource.AccountAssociationsGrid_Name_HeaderText,
                            width: 10,
                            formatter: function (value, data) {
                                return accountCell(value, data);
                            }
                        },
                        {
                            field: "ForwardRelation",
                            label: AccountAssociationsResource.AccountAssociationsGrid_Relation_HeaderText,
                            width: 8,
                            formatter: function (value, data) {
                                return relationshipCell(value, data);
                            }
                        },
                        {
                            field: "ForwardNotes",
                            label: AccountAssociationsResource.AccountAssociationsGrid_Notes_HeaderText,
                            width: 20,
                            formatter: function (value, data) {
                                return descriptionCell(value, data);
                            }
                        },
                        {
                            field: "CreateUser",
                            label: AccountAssociationsResource.AccountAssociationsGrid_CreatedBy_HeaderText,
                            width: 10,
                            type: slxUser
                        },
                        {
                            field: "CreateDate",
                            label: AccountAssociationsResource.AccountAssociationsGrid_Date_HeaderText,
                            width: 10,
                            type: slxDateTime,
                            dateOnly: true
                        }
                    ],
                    storeOptions: {
                        service: sDataServiceRegistry.getSDataService('dynamic'),
                        resourceKind: 'associations',
                        include: [],
                        select: ["FromId", "ToId", "ToAccount.AccountName", "BackNotes", "BackRelation", "IsAccountAssociation"],
                        dataCarrierId: 'AccountAssociationsgrdAssociations_DataCarrier',
                        sort: [],
                        where: function () { return dojo.string.substitute("FromId eq '${0}' or ToId eq '${0}'", [parentId]); },
                        queryArgs: {
                            count: 20
                        }
                    },
                    tools: [
                        {
                            id: 'Delete',
                            imageClass: 'icon_Delete_16x16',
                            'alternateText': AccountAssociationsResource.AccountAssociationsGrid_Delete_Text,
                            mergeControlId: 'btnAddAssociation', mergePosition: 'After',
                            appliedSecurity: 'Entities/Account/Edit',
                            'handler': function () { this.deleteSelected(); }
                        }
                    ],
                    tabId: 'AccountAssociations',
                    placeHolder: 'AccountAssociations_Grid',
                    id: 'AccountAssociationsgrdAssociations',
                    minRowsPerPage: 20,
                    columnHiding: true,
                    columnResizing: true,
                    columnReordering: true,
                    selectionMode: 'extended',
                    rowSelection: true
                };

                var grid = new GridView(options);
                grid.createGridView();
            });
    },
    init: function (runtimeConfig) {
        var self = this;
        setTimeout(function () { self.makeGrid(runtimeConfig); }, 1);
    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();