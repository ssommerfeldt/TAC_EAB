/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/Sandbox", [
    'dojo/_base/declare',
    'Sage/ProximitySearch/Ajax',
    'Sage/ProximitySearch/AjaxIndicatorModule',
    'Sage/ProximitySearch/Events'
],
function (declare, Ajax, AjaxIndicatorModule, Events) {
    var sandbox = declare(null, {
        // the sandbox is how modules will get to interact with the rest of the app
        constructor: function (core, module) {
            this._core = core;
            this._module = module;
        },
        subscribe: function (topic, handler) {
            Array.prototype.unshift.call(arguments, this._module);
            this._core.subscribe.apply(this._core, arguments);
        },
        publish: function (topic) {
            Array.prototype.unshift.call(arguments, this._module);
            this._core.publish.apply(this._core, arguments);
        },
        getParameter: function (param) {
            return this._core.getParameter(param);
        },
        addSubModule: function (module) {
            this._core.addModule(module);
        },
        error: function (err) {
            this.publish('Error', err);
        },
        warn: function (msg) {
            this.publish('Warning', msg);
        }
    });
    var core = declare('Sage.ProximitySearch.Sandbox', null, {
        _evtHandlers: null,
        constructor: function () {
            this._evtHandlers = [];
            this._parameters = {};
        },
        subscribe: function (module, topic, handler, priority) {
            // summary:
            //  Add an event handler to a topic
            // parameters:
            //  module: scope to which to invoke the handler in
            //  handler: function
            //  topic: what to subscribe
            //  priority: number from 0 to 10 indicating priority - 0 is highest (defaults to 0)
            if (!this._evtHandlers[topic])
                this._evtHandlers[topic] = [];
            handler = { scope: module, handler: handler, priority: priority || 0 };
            var target = this._evtHandlers[topic];
            for (var i = 0; i < target.length; i++) {
                if (target[i].priority > handler.priority) {
                    target.splice(i, 0, handler);
                    return;
                }
            }
            target.push(handler);
        },
        publish: function (module, topic) {
            // if(typeof console != "undefined")
            //     console.log('Sandbox event: ' + topic);
            if (this._evtHandlers[topic]) {
                var args = Array.prototype.slice.call(arguments, 2);
                var hh = this._evtHandlers[topic];
                for (var i = 0; i < hh.length; i++) {
                    if (!module || hh[i].scope !== module)
                        hh[i].handler.apply(hh[i].scope || window, args);
                }
            }
        },
        // register a module, dur
        addModule: function (module) {
            var sb = new sandbox(this, module);
            module.initModule(sb);
        },
        // mmm start all the modules
        startAll: function () {
        },
        getParameter: function (name) {
            return this._parameters[name];
        },
        setParameter: function (name, value) {
            this._parameters[name] = value;
        },
        // add a module (an object instance) and make it available on the sandbox
        addExtension: function (name, module) {
            module.initModule(new sandbox(this));
            sandbox.prototype[name] = module;
        }
    });
    return core;
});
