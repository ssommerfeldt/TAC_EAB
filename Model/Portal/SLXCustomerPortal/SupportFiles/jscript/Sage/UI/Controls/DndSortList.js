/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/DndSortList", [
    'dijit/_Widget',
    'Sage/_Templated',
    'dojo/_base/declare',
    'dojo/dnd/Source',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/dom-construct',
    "dojo/store/Observable",
    'dojo/store/Memory',
    'dojo/string'

],
function (
    _Widget,
    _Templated,
    declare,
    source,
    lang,
    domClass,
    domConstruct,
    observable,
    memory,
    dojoString
) {

    var widget = declare('Sage.UI.Controls.DndSortList', [_Widget, _Templated], {

        widgetsInTemplate: true,
        ListNamesIds: [],
        ListOfItems: null,
        horizontal: false,
        widgetTemplate:new Simplate(eval(["<div><div dojoattachpoint='DndSortList' /></div>"])),
        headerTemplate: new Simplate(["<div dojoattachpoint='{%= $.id %}_ListContainer'><div>{%= $.name %}</div><ul dojoattachpoint='{%= $.id %}_List' style='min-height:50px'></div>"]),
        listBulletTemplate: new Simplate(["<li class='dojoDndItem'>{%= $.Item.name %}</li>"]),

        sortList:[],

        /*
            obj:
                -ListNamesIds: List: List containing list label Names and their ids;
                    - NameID:
                        -id: corresponds to what would be in the ListOfItems: List
                        -name: display name.

                -ListOfItems: A single list of Items as explained below
                    - There is expected to be a wrapper class for the items in the list.
                        ListWrapperClass:
                            -Item: the object in the list
                                -name: display name or toString for the Item
                            -list: An id that determines what list this item is to appear.

                -horizontal: bool: if the lists need to be oriented horizontal or vertical
        */
        constructor: function (obj) {
            if (obj.ListNamesIds) {
                this.ListNamesIds = obj.ListNamesIds;
            }
            if (obj.ListOfItems) {
                this.ListOfItems = new observable(new memory({ data: obj.ListOfItems }));
            }
            else {
                this.ListOfItems = new observable(new memory());
            }
            if (obj.horizontal) {
                this.horizontal = obj.horizontal;
            }
        },
        postCreate: function () {
            this.sortList = [];
            for (var i = 0; i < this.ListNamesIds.length; i++) {
                var item = this.ListNamesIds[i];

                var listContainer = this.headerTemplate.apply(item);
                var listContainerDom = domConstruct.toDom(listContainer);

                var dndlistDom = listContainerDom.children[1];
                var listSource = new source(dndlistDom, { horizontal: this.horizontal, simpleSelection: true });
                
                var items = this.ListOfItems.filter(
                    function (value) {
                        return value.list === item.id;
                    });

                var sourceList=[];
                for (var b = 0; b < items.length; b++) {
                    var sourceItem=items[b];
                    sourceList.push({ data: sourceItem.Item.name.trim() });
                }
                
                listSource.insertNodes(false, sourceList);
                this.sortList.push({ list: item.id, data: listSource });

                this.DndSortList.appendChild(listContainerDom);
            }

        },
        /*
             - There is expected to be a wrapper class for the items in the list.
                        ListWrapperClass:
                            -Item: the object in the list
                                -name: display name or toString for the Item
                            -list: An id that determines what list this item is to appear.


        */
        updateListOfItems: function (list, update) {
            for (var i = 0; i < this.sortList.length; i++) {
                var slist = this.sortList[i];

                var newItems = list.filter(
                   function (value) {
                       return value.assigned === false;
                   });

                // get items in order
                var currentItems = slist.data.getAllNodes().map(function (node) {
                    return slist.data.getItem(node.id).data;
                });

                var itemsToBeSaved= [];
                for (var v = 0; v < newItems.length; v++) {
                    var vItem=newItems[v];
                    var boolUsedExisting = false;
                    var exist=this._exists(vItem);
                    //preserve the existing 
                    for (var w = 0; w < currentItems.length;w++){
                        var wItem=currentItems[w];
                        if (wItem === vItem.Item.name && (!exist && update)) {
                            list[vItem.id].assigned = true;
                            itemsToBeSaved.push({ data: wItem.trim() });
                            boolUsedExisting = true;
                        }
                    }
                    if (!boolUsedExisting && slist.list === vItem.list){
                        if (!exist || update) {
                            list[vItem.id].assigned = true;
                            vItem.Item.name = vItem.Item.name.trim();
                            itemsToBeSaved.push({ data: vItem.Item.name });
                            if (!exist) {
                                this.ListOfItems.push(vItem);
                            }
                        }
                    }
                }
                if(update){
                    slist.data.selectAll().deleteSelectedNodes();
                }
                slist.data.insertNodes(false, itemsToBeSaved);
            }
        },

        _exists: function (val) {
            for (var i = 0; i < this.ListOfItems.length; i++) {
                var iLOI = this.ListOfItems[i];
                if (iLOI.Item.name.trim() === val.Item.name.trim()) {
                    return true;
                }
            }
            return false;
        },

        getASourcesContentsInList: function (source) {
            return source.getAllNodes().map(function (node) {
                return source.getItem(node.id).data;
            });
        },

        getASourcesContentsInString: function (source) {
            var strRet = "", comma = "";

            var list = this.getASourcesContentsInList(source);
           
            for (var x = 0; x < list.length; x++) {
                strRet = dojoString.substitute("${0}${1}${2}", [strRet, comma, list[x]]);
                comma = ", ";
            }
            return strRet;
        },

        getSource: function (id) {
            for (var i = 0; i < this.sortList.length; i++) {
                var slist = this.sortList[i];
                if (id === slist.list) {
                    return slist.data;
                }
            }
        }
    });
    return widget;
});
