/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/TaskPaneContent", [
    'dijit/_Widget',
    'Sage/_Templated',
    'Sage/TaskPane/TaskPaneItem',
    'dojo/_base/declare'
],
function (_Widget, _Templated, TaskPaneItem, declare) {
    var taskPaneContent = declare('Sage.TaskPane.TaskPaneContent', [_Widget, _Templated], {
        widgetsInTemplate: true,
        widgetTemplate: new Simplate([
             '<div dojoAttachPoint="taskletContainerNode" class="task-pane-item-common-tasklist">',
                '{% for (var i = 0; i < $.taskItems.length; i++) { ',
                    'var task = $.taskItems[i]; %}',
                    '<div data-dojo-type="Sage.TaskPane.TaskPaneItem" linkText="{%= task.displayName %}" securedAction="{%= task.securedAction %}" action="javascript: {%= task.clientAction %}"></div>',
                    '<br />',
                '{% } %}',
            '</div>'
        ])
    });
    return taskPaneContent;
});