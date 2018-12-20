<div data-dojo-type="Sage.TaskPane.SyncHistoryTasksTasklet" id="syncHistoryTasks"></div>

<script type="text/javascript">
    var syncHistoryTasksActions;
    require(['Sage/TaskPane/SyncHistoryTasksTasklet'],
        function (SyncHistoryTasksTasklet) {
            dojo.ready(function () {
                if (!syncHistoryTasksActions) {
                    syncHistoryTasksActions = new SyncHistoryTasksTasklet({
                        id: "syncHistoryTasksActions",
                        clientId: "<%= ClientID %>"
                    });
                }
            });
        }
    );
</script>