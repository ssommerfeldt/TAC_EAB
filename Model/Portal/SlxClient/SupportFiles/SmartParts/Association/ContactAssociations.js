Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.ContactAssociations = {
    makeGrid: function (runtimeConfig) {
        require([
            'Sage/UI/Controls/GridParts/Columns/DateTime',
            'Sage/UI/Controls/GridParts/Columns/SlxEdit',
            'Sage/Utility',
            'dojo/aspect',
            'Sage/Utility/Workspace',
            'Sage/Data/SDataServiceRegistry',
            'Sage/UI/GridView'],
            function (dateTime, slxEdit, utility, aspect, workspaceUtil, sDataServiceRegistry, GridView) {
                var parentId = utility.getCurrentEntityId();
                if (typeof ContactAssociationsResource === 'undefined') {
                    ContactAssociationsResource = {};
                }
                var contactCell =
                    // summary:
                    //  custom column used for display of history type (also acts as a link for edit)
                    function (inRowIndex, inItem) {
                        var fromid = utility.getValue(inItem, "FromId");
                        var toid = utility.getValue(inItem, "ToId");
                        if (fromid && toid) {
                            var fromname = utility.getValue(inItem, "FromContact.NameLF");
                            var toname = utility.getValue(inItem, "ToContact.NameLF");
                            var contactId = fromid == parentId ? toid : fromid;
                            var contactName = fromid == parentId ? toname : fromname;

                            return dojo.string.substitute("<a href='Contact.aspx?entityid=${0}&modeid=Detail'>${1}</a>", [contactId, utility.htmlEncode(contactName)]);
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
                            label: '',
                            field: 'Id',
                            width: 5,
                            type: slxEdit,
                            editCellValue: ContactAssociationsResource.ContactAssociationsGrid_Edit_Text,
                            entityType: 'Sage.Entity.Interfaces.IAssociation, Sage.Entity.Interfaces',
                            smartPart: 'AddEditContactAssociation',
                            isCentered: true,
                            dialogHeight: 290,
                            dialogWidth: 600,
                            formObjectName: 'Sage.UI.Forms.ContactAssociations'
                        }, {
                            field: "FromContact.NameLF",
                            label: ContactAssociationsResource.ContactAssociationsGrid_Name_HeaderText,
                            width: 10,
                            formatter: function (inRowIndex, inItem) {
                                return contactCell(inRowIndex, inItem);
                            }
                        }, {
                            field: "ForwardRelation",
                            label: ContactAssociationsResource.ContactAssociationsGrid_Relation_HeaderText,
                            width: 8,
                            formatter: function (inRowIndex, inItem) {
                                return relationshipCell(inRowIndex, inItem);
                            }
                        }, {
                            field: "ForwardNotes",
                            label: ContactAssociationsResource.ContactAssociationsGrid_Notes_HeaderText,
                            width: 20,
                            formatter: function (inRowIndex, inItem) {
                                return descriptionCell(inRowIndex, inItem);
                            }
                        }, {
                            field: "CreateDate",
                            label: ContactAssociationsResource.ContactAssociationsGrid_Date_HeaderText,
                            width: 10,
                            type: dateTime,
                            dateOnly: true
                        }
                    ],
                    storeOptions: {
                        service: sDataServiceRegistry.getSDataService('dynamic'),
                        resourceKind: 'associations',
                        include: [],
                        select: ["FromId", "ToId", "ToContact.NameLF", "BackNotes", "BackRelation"],
                        dataCarrierId: 'ContactAssociationsgrdAssociations_DataCarrier',
                        sort: [],
                        where: function () { return dojo.string.substitute("FromId eq '${0}' or ToId eq '${0}'", [parentId]); },
                        queryArgs: {
                            count: 20
                        }
                    },
                    tools: [
                        {
                            id: 'Delete',
                            icon: '~/ImageResource.axd?scope=global&type=Global_Images&key=Delete_16x16',
                            'alternateText': ContactAssociationsResource.ContactAssociationsGrid_Delete_Text,
                            mergePosition: 'After',
                            mergeControlId: 'btnAddAssociation',
                            appliedSecurity: 'Entities/Contact/Edit',
                            'handler': function () { this.deleteSelected(); }
                        }
                    ],

                    tabId: 'ContactAssociations',
                    placeHolder: 'ContactAssociations_Grid',
                    id: 'ContactAssociationsgrdAssociations',
                    rowsPerPage: 20,
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