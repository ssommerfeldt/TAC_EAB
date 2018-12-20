<div data-dojo-type="Sage.TaskPane.ERPPayFromTasksTasklet" id="ERPPayFromTasks"></div>

<script type="text/javascript">
    var ERPPayFromTasksActions;
    require(['Sage/TaskPane/ERPPayFromTasksTasklet'],
        function (ERPPayFromTasksTasklet) {
            dojo.ready(function () {
                if (!ERPPayFromTasksActions) {
                    ERPPayFromTasksActions = new ERPPayFromTasksTasklet({
                        id: "ERPPayFromTasksActions",
                        clientId: "<%= ClientID %>"
                    });
                }
            });
        }
    );
</script>