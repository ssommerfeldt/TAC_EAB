<div data-dojo-type="Sage.TaskPane.ERPBillToTasksTasklet" id="ERPBillToTasks"></div>

<script type="text/javascript">
    var ERPBillToTasksActions;
    require(['Sage/TaskPane/ERPBillToTasksTasklet'],
        function (ERPBillToTasksTasklet) {
            dojo.ready(function () {
                if (!ERPBillToTasksActions) {
                    ERPBillToTasksActions = new ERPBillToTasksTasklet({
                        id: "ERPBillToTasksActions",
                        clientId: "<%= ClientID %>"
                    });
                }
            });
        }
    );
</script>