/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
        'dijit/_Widget',
        'dijit/form/FilteringSelect',
        'dojox/grid/cells/dijit',
        'dojox/grid/cells/_base',
        'dojo/_base/declare',
        'dojo/ready',
        'dojo/data/ItemFileReadStore',
        'Sage/Utility'
], function (_Widget, FilteringSelect, dijitCell, _baseCell, declare, ready, ItemFileReadStore, slxUtility) {
    var widget;

    function getActiveUsers() {
        if (!slxUtility._userCache)
            slxUtility.buildUserCache();
        var users = [];
        for (var userId in slxUtility._userCache) {
            var u = slxUtility._userCache[userId];
            if (u.enabled) {
                users.push({ name: u.name, id: userId });
            }
        }
        return users.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    }
    widget = declare("Sage.UI.Columns.SlxUser", dojox.grid.cells.Cell, {
        // summary: 
        //  User name display based on user id.
        //  Read-only at the moment.
        format: function (inRowIndex, inItem) {
            if (inItem) {
                var userId = inItem[this.field];
                // XXX this is using a synchronous retrieve
                // we should be able to return a deferred object from this function (see http://dojotoolkit.org/reference-guide/dojox/grid/DataGrid.html)

                //nraddatz 2013-09-26: Defect 13093163
                //Added null validation below.
                var name = userId ? slxUtility.getUserName(userId) : "";
                return slxUtility.htmlEncode(name);
            }
        }
    });

    // TODO: Is this even used?
    declare("Sage.UI.Columns.SlxUserFilter", _Widget, {
        // summary:
        //  Widget used for user filtering
        _select: null,  // select widget
        field: "",  // field being filtered

        postCreate: function () {
            // we do a "lazy" load for the widget, to avoid loading it whenever the page loads... since there is a good chance they may not actually 
            // use the filter
            // note, at the moment the filter creates all the widgets eagerly anyway, so it does not really make a difference...  but hopefully in the future it might.
            var self = this;

            var div = document.createElement("div");
            this.domNode.appendChild(div);
            ready(function () {
                var userStore = new ItemFileReadStore({
                    data: { items: getActiveUsers(), label: "name", identifier: "id" }
                });
                self._select = new FilteringSelect({
                    store: userStore, required: false
                }, div);
            });
        },

        // Filter API
        getQuery: function () {
            if (this._select) {
                var v = this._select.get('value');
                console.log(v);
                if (v)
                    return this.field + " eq '" + v + "'";
            }
            return "";
        },

        reset: function () {
            if (this._select) {
                this._select.set('value', null);
            }
        }
    });

    return widget;
});
