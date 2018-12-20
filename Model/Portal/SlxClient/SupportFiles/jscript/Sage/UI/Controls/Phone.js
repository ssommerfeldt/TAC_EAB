/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/Phone", [
       'dijit/_Widget',
       'Sage/_Templated',
       'Sage/UI/Controls/TextBox',
       'dojo/_base/declare'
],
function (_Widget, _Templated, textBox, declare) {
    var widget = declare('Sage.UI.Controls.Phone', textBox, {
        slxchangehook: 'true',
        _setslxchangehookAttr: { node: 'focusNode', type: 'attribute', attribute: 'slxchangehook' },
        shouldPublishMarkDirty: true,
        //.Net control behavior
        autoPostBack: false,
        postCreate: function () {
            this.inherited(arguments);
            this.unformattedValue = this.unformatNumber(this.get('value'));
        },
        unformattedValue: '',
        formatPhoneChange: function (number) {
            this.unformattedValue = this.unformatNumber(this.get('value'));
            // Pass the unformatted string to be formatted (this matches server functionality)
            var formattedVal = this.formatNumberForDisplay(number, this.unformattedValue);
            this.set('value', formattedVal);
        },
        /*
        {0}: original value
        {1}: cleaned value
        {2}: entire match (against clean value)
        {3..n}: match groups (against clean value)
        */
        formatters: [{
            test: /^\+.*/,
            format: '{0}'
        }, {
            test: /^(\d{3})(\d{3,4})$/,
            format: '{3}-{4}'
        }, {
            test: /^(\d{3})(\d{3})(\d{2,4})$/, // 555 555 5555
            format: '({3}) {4}-{5}'
        }, {
            test: /^(\d{3})(\d{3})(\d{2,4})([^0-9]{1,}.*)$/, // 555 555 5555x
            format: '({3}) {4}-{5}{6}'
        }, {
            test: /^(\d{11,})(.*)$/,
            format: '{1}'
        }],
        unformatNumber: function (number) {
            var n = number;
            // Temporarily ignore strings that are international until a better system is in place
            if (n && n.length && (n[0] === '+' || n[0] === '0')) {
                return n;
            }
            // Matching mobile's format stripper
            n = n.replace(/[^0-9x]/ig, '');
            return n;
        },
        formatNumberForDisplay: function (number, clean) {
            var n = number;
            // Do not format if the string begins with a '+'
            if (/^\+/.test(n)) {
                return n;
            }
            if (typeof clean === 'undefined') clean = n;
            for (var i = 0; i < this.formatters.length; i++) {
                var formatter = this.formatters[i],
                        match;
                if ((match = formatter.test.exec(clean))) {
                    return String.format.apply(String, [formatter.format, n, clean].concat(match));
                }
            }
            return n;
        },
        onChange: function (e) {
            if (this.shouldPublishMarkDirty) {
                dojo.publish("Sage/events/markDirty");
            }
            this.formatPhoneChange(e);
        }
    });

    return widget;
});
