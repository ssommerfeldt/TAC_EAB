/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
       'dijit/form/Select',
       'dojo/_base/declare',
       'dojo/has',
       'dojo/_base/sniff',
       'dojo/_base/connect',
       'dojo/dom-style',
       'dojo/query'
],
function (select, declare, has, _sniff, connect, domStyle, query) {
    var widget = declare('Sage.UI.Controls.Select', [select], {
        _hClickBody: false,
        shouldPublishMarkDirty: true,
        autoPostBack: false,
        maxHeight: has('ie') ? 146 : 155,
        postCreate: function () {
            this.connect(this, 'onChange', this.onChanged);
            this.inherited(arguments);
        },
        destroy: function () {
            this.inherited(arguments);
        },
        onClickBody: function (e) {
            if (has('ie') >= 9 && this._opened) {
                this.closeDropDown();
            }
        },
        _setDisplay: function(newDisplay) {
            this.inherited(arguments);
            this.trimDisplayValue();
        },
        onChanged: function (newValue) {
            if (this.shouldPublishMarkDirty) {
                connect.publish('Sage/events/markDirty');
            }
            if (this.autoPostBack) {
                __doPostBack(this.id, '');
            }
        },
        // Cut the excess characters and add '...' to the end of the display value
        //  if the length causes the control to extend beyond its container
        trimDisplayValue: function() {
            var nodes, i, len, node, controlWidth;
            controlWidth = this.focusNode.style.width; 

            if (!controlWidth) {
                return;
            }
            nodes = query('span', this.containerNode);
            len = nodes && nodes.length;
            for(i = 0; i < len; i++) {
                node = nodes[i];
                domStyle.set(node, {
                    'width': controlWidth,
                    'text-overflow': 'ellipsis',
                    'overflow': 'hidden'
                });
            }
        },
        closeDropDown: function (/*Boolean*/focus) {
            if (has('ie') >= 9 && this._hClickBody) {
                connect.disconnect(this._hClickBody);
            }
            this.inherited(arguments);
        },
        openDropDown: function () {
            if (has('ie') >= 9) {
                // WORKAROUND: Please see http://bugs.dojotoolkit.org/ticket/14408. This issue is still [not] fixed.
                this._hClickBody = connect.connect(document.body, 'onclick', this, this.onClickBody);
            }
            this.inherited(arguments);
        }
    });

    return widget;
});
