/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/Ajax", [
    'dojo/_base/declare',
    'Sage/ProximitySearch/Events'
],
function (declare, Events) {
    var ajaxpCount = 0;
    var ajax = declare("Sage.ProximitySearch.Ajax", null, {
        initModule: function(sb) {
            this._sandbox = sb;
        },
        ajax: function(p) {
            // TODO
        },
        ajaxp: function(url, data, callbackParamName, success) {
            var q = "";
            var hasQ = (url.indexOf("?") >= 0);
            ajaxpCount++;
            var sb = this._sandbox;
            sb.publish(Events.AjaxStart);
            Sage.ProximitySearch.Ajax["callback" + ajaxpCount] = function() {
                sb.publish(Events.AjaxEnd);
                success.apply(this, arguments);
            };
            data[callbackParamName] = "Sage.ProximitySearch.Ajax.callback" + ajaxpCount;
            for(var k in data){
                if(hasQ){
                    q += "&";
                } else {
                    q += "?";
                    hasQ = true;
                }
                q += k;
                q += "=" + encodeURIComponent(data[k]);
            }
            url = url + q;
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", url);
            document.body.appendChild(script);
        }
    });
    return ajax;
});
