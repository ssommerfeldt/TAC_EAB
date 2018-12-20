/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/SelectionModule", [
    'dojo/dnd/AutoSource',
    'dijit/_Widget',
    'dojo/_base/declare',
    'Sage/ProximitySearch/Events',
    'Sage/ProximitySearch/Utilities'
],
function (AutoSource, _Widget, declare, Events, Utilities) {
    var selectionViewRow = declare([_Widget], {
        parentView: null,  // parent container (selectionViewWidget)
        dataItem: null, // item
        dndHint: null, // node creator hint
        selected: false, // whether they are representing a selected node
        buildRendering: function () {
            this.inherited(arguments);
            var r = this.parentView;
            var item = this.dataItem;
            var tr = this.domNode;
            var hint = this.dndHint;
            var selected = this.selected;

            this.parentView.setRowWidget(item.id, this);
            var td = document.createElement("td");
            if (hint == "avatar")
                td.className = "avatar";
            else if (selected)
                td.className = "selected";
            else
                td.className = "deselected";

            if (hint == "avatar") {
                var table = document.createElement("table");
                var tbody = document.createElement("tbody");
                tbody.appendChild(tr);
                table.appendChild(tbody);
                var node = table;
            } else {
                var chk = document.createElement("input");
                chk.type = "checkbox";
                if (selected)
                    chk.checked = "checked";
                chk.onclick = function () {
                    // animate the node and mark as selected
                    var parent = tr.parentNode;
                    if (selected) {
                        dojo.fadeOut({ node: tr, onEnd: function () {
                            // check that we are still under the same parent... otherwise it means something changed in the meantime (e.g. they double clicked)
                            if (tr.parentNode === parent) {
                                tr.parentNode.removeChild(tr);
                                r.divSelected.sync();
                                r.divDeselected.insertNodes(false, [item]);
                                r.onDeselectItem(item);
                            }
                        }
                        }).play();
                    } else {
                        dojo.fadeOut({ node: tr, onEnd: function () {
                            if (tr.parentNode === parent) {
                                tr.parentNode.removeChild(tr);
                                r.divDeselected.sync();
                                r.divSelected.insertNodes(false, [item]);
                                r.onSelectItem(item);
                            }
                        }
                        }).play();
                    }
                };
                td.appendChild(chk);
                if (selected) {
                    dojo.connect(td, "onmouseover", function () {
                        r.onItemHighlight(item);
                    });
                    dojo.connect(td, "onmouseout", function () {
                        r.onItemUnhighlight(item);
                    });
                }

                if (selected) {
                    // add "order" indicator
                    var lbl = document.createElement("span");
                    lbl.className = "lblOrder";
                    lbl.innerHTML = item.order + " - ";
                    td.appendChild(lbl);
                }

                dojo.connect(this.domNode, "ondblclick", function () {
                    r.onItemCenter(item);
                });
            }

            var label = document.createTextNode(item.name);
            td.appendChild(label);

            if (selected && hint != "avatar") {
                // add details panel
                var divDetails = document.createElement("div");
                divDetails.className = "details";
                divDetails.innerHTML = (item.address + "<br/>" + item.description).replace(/\n/g, "<br/>");
                if (item.type == "data") {
                    var divLinks = document.createElement("div");
                    divLinks.className = "links";
                    var link = document.createElement("a");
                    link.innerHTML = "View Record";
                    link.onclick = dojo.hitch(this, function () {
                        r.onItemNavigate(item);
                    });
                    divLinks.appendChild(link);
                    divDetails.appendChild(divLinks);
                }
                td.appendChild(divDetails);
            }

            tr.appendChild(td);
        }
    });
    var selectionViewWidget = declare([_Widget], {
        //    Used to display the selected and unselected items, and handle drag & drop to reorder as well as select/deselect
        //--- Widget Lifecycle ---------------------
        postCreate: function () {
            var r = this;
            this._rowWidgets = {};
            var nodeCreatorFun = function (selected) {
                return function (item, hint) {
                    var tr = document.createElement("tr");
                    var widget = new selectionViewRow({ dndHint: hint, dataItem: item, parentView: r, selected: selected }, tr);
                    return { node: widget.domNode, data: item };
                };
            };
            // http://blog.dezynworks.com/2011/05/drag-n-drop-with-dojo/
            // Prepare the selection box
            var table = document.createElement("table");
            table.style.width = "100%";
            this.domNode.appendChild(table);
            this.divSelected = new AutoSource(table, { creator: nodeCreatorFun(true) });
            dojo.connect(this.divSelected, "onDndDrop", dojo.hitch(this, "onSelectDrop"));

            // Prepare the deselection box
            table = document.createElement("table");
            this.domNode.appendChild(table);
            this.divDeselected = new AutoSource(table, { creator: nodeCreatorFun(false) });
            this.divDeselected.checkAcceptance = function (source, nodes) {
                // used to ensure that: they are not re-ordering nodes within the "divDeselected" box, and
                if (this === source)
                    return false;
                return true;
            };
            dojo.connect(this.divDeselected, "onDndDrop", dojo.hitch(this, "onDeselectDrop"));
        },
        //--- Public API ---------------------------
        setItems: function (mapData) {
            while (this.divDeselected.node.firstChild)
                dojo.destroy(this.divDeselected.node.firstChild);
            this.divDeselected.clearItems();
            this.divDeselected.insertNodes(false, mapData.getDeselected());
            this.setSelectionOrder(mapData.getSelected());
        },
        setSelectionOrder: function (selected) {
            while (this.divSelected.node.firstChild)
                dojo.destroy(this.divSelected.node.firstChild);
            this.divDeselected.clearItems();
            this.divSelected.insertNodes(false, selected);
            this._renumberSelected();
        },
        selectPoints: function (points) {
            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                var row = this.getRowWidget(point.id);
                if (row)
                    row.destroy();
            }
            this.divDeselected.sync();
            this.divSelected.insertNodes(false, points);
            this._renumberSelected();
        },
        deselectPoints: function (points) {
            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                var row = this.getRowWidget(point.id);
                if (row)
                    row.destroy();
            }
            this.divSelected.sync();
            this.divDeselected.insertNodes(false, points);
            this._renumberSelected();
        },
        setRowWidget: function (id, widget) {
            // register rowwidget for an id
            this._rowWidgets[id] = widget;
        },
        getRowWidget: function (id) {
            // return the rowwidget corresponding to the id
            return this._rowWidgets[id];
        },
        //--- Event Handlers -----------------------
        onDeselectDrop: function (source, nodes, copy, target) {
            // handler for drop onto the Deselected list
            if (target !== this.divDeselected) {
                return;
            }
            for (var i = 0; i < nodes.length; i++) {
                var nodeId = nodes[i].id.split("_")[1];
                this.onDeselectItem(target.getItem("desel_" + nodeId).data);
            }
        },
        onSelectDrop: function (source, nodes, copy, target) {
            if (source === this.divDeselected) {
                for (var i = 0; i < nodes.length; i++) {
                    // mark the items as selected...
                    var nodeId = nodes[i].id;
                    this.onSelectItem(dijit.byId(nodeId).dataItem);
                }
            }
            // short timeout to give DnD a chance to place the node first
            setTimeout(dojo.hitch(this, function () {
                var childNodes = target.node.children;
                var newOrder = [];
                for (var i = childNodes.length - 1; i >= 0; i--) {
                    var nodeId = childNodes[i].id;
                    newOrder.unshift(dijit.byId(nodeId).dataItem);
                }
                this.onMoveItems(newOrder);
                this._renumberSelected();
            }), 300);
        },
        //--- Public Events ------------------------
        onDeselectItem: function (item) {
            // when an item is deselected
            this._renumberSelected();
        },
        onSelectItem: function (item) {
            // when an item is selected
            this._renumberSelected();
        },
        onMoveItems: function (newOrder) {
            // when an item's position changes
        },
        onItemNavigate: function (item) {
            // when they attempt to navigate to an item
        },
        onItemHighlight: function (item) {
            // when they "highlight" (mouse over) an item
        },
        onItemUnhighlight: function (item) {
            // when they "unhighlight" (mouseout) an item
        },
        onItemCenter: function (item) {
            // when they double click an item
        },
        //--- Private ------------------------------
        _renumberSelected: function () {
            // redo the number labels, and the odd/even CSS classes
            var divSelected = this.divSelected;
            dojo.query(".lblOrder", divSelected.domNode).forEach(function (node, index, arr) {
                node.innerHTML = (index + 1) + " - ";
            });
            dojo.query("td.selected", divSelected.domNode).forEach(function (node, index, arr) {
                if (index % 2 === 0) {
                    dojo.addClass(node, "rowEven");
                } else {
                    dojo.removeClass(node, "rowEven");
                }
            });
        }
    });
    var selectionViewModule = declare("Sage.ProximitySearch.SelectionViewModule", null, {
        constructor: function (div) {
            this._div = div;
        },
        initModule: function (sb) {
            this._sandbox = sb;
            sb.subscribe(Events.MapRefresh, dojo.hitch(this, "onMapRefresh"));
            sb.subscribe(Events.SelectionReorder, dojo.hitch(this, "onSelectionReorder"));
            sb.subscribe(Events.SelectionAdd, dojo.hitch(this, "onSelectionAdd"), 9);
            sb.subscribe(Events.SelectionRemove, dojo.hitch(this, "onSelectionRemove"), 9);
            this._widget = new selectionViewWidget({}, this._div);
            this._widget.startup();
            dojo.connect(this._widget, "onDeselectItem", function (item) {
                sb.publish(Events.SelectionRemove, [item]);
            });
            dojo.connect(this._widget, "onSelectItem", function (item) {
                sb.publish(Events.SelectionAdd, [item]);
            });
            dojo.connect(this._widget, "onMoveItems", function (newOrder) {
                sb.publish(Events.SelectionReorder, newOrder);
            });
            dojo.connect(this._widget, "onItemNavigate", function (item) {
                sb.publish(Events.DataNavigate, item.url);
            });
            dojo.connect(this._widget, "onItemHighlight", function (item) {
                sb.publish(Events.ItemHighlight, item);
            });
            dojo.connect(this._widget, "onItemUnhighlight", function (item) {
                sb.publish(Events.ItemUnhighlight, item);
            });
            dojo.connect(this._widget, "onItemCenter", function (item) {
                sb.publish(Events.ItemCenter, item);
            });
        },
        //--- Event Handlers ------------------------
        onMapRefresh: function (mapData) {
            this._widget.setItems(mapData);
        },
        onSelectionAdd: function (items) {
            this._widget.selectPoints(items);
        },
        onSelectionRemove: function (items) {
            this._widget.deselectPoints(items);
        },
        onSelectionReorder: function (selected) {
            this._widget.setSelectionOrder(selected);
        }
    });
    var selectionModule = declare("Sage.ProximitySearch.SelectionModule", null, {
        // module used for managing the data selection: it handles the SelectionAdd / SelectionRemove events and
        // select / deselect items in the model.
        constructor: function (div) {
            // if div is provided it will be used to create a selection view
            this._div = div;
        },
        initModule: function (sb) {
            this._sandbox = sb;
            if (this._div) {
                sb.addSubModule(new selectionViewModule(this._div));
            }
            sb.subscribe(Events.SelectionAdd, dojo.hitch(this, "onSelectionAdd"));
            sb.subscribe(Events.SelectionRemove, dojo.hitch(this, "onSelectionRemove"));
            sb.subscribe(Events.SelectionReorder, dojo.hitch(this, "onSelectionReorder"));
            sb.subscribe(Events.MapRefresh, dojo.hitch(this, "onMapRefresh"));
        },
        //--- Event Handlers ------------------------
        onMapRefresh: function (mapData) {
            this._mapData = mapData;
        },
        onSelectionAdd: function (items) {
            if (this._mapData) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    this._mapData.selectPoint(item);
                }
            }
        },
        onSelectionRemove: function (items) {
            if (this._mapData) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    this._mapData.deselectPoint(item);
                }
            }
        },
        onSelectionReorder: function (newOrder) {
            if (this._mapData) {
                // move the points 1 by 1 so that we keep the same array reference
                for (var i = 0; i < newOrder.length; i++) {
                    this._mapData.movePoint(newOrder[i], i, false);
                }
                this._mapData.renumberSelected();
            }
        }
    });
    return selectionModule;
});
