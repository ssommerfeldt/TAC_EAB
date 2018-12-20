<div data-dojo-type="Sage.TaskPane.ERPShipToTasksTasklet" id="ERPShipToTasks"></div>

<script type="text/javascript">
    var ERPShipToTasksActions;
    require(['Sage/TaskPane/ERPShipToTasksTasklet'],
        function (ERPShipToTasksTasklet) {
            dojo.ready(function () {
                if (!ERPShipToTasksActions) {
                    ERPShipToTasksActions = new ERPShipToTasksTasklet({
                        id: "ERPShipToTasksActions",
                        clientId: "<%= ClientID %>"
                    });
                }
            });
        }
    );
</script>