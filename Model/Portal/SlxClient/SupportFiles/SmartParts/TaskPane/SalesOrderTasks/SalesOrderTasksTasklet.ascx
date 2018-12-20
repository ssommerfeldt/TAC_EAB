<div data-dojo-type="Sage.TaskPane.SalesOrderTasksTasklet" id="salesorderTasks"></div>

<script type="text/javascript">
    var salesOrderTasksActions;
    require(['Sage/TaskPane/SalesOrderTasksTasklet', 'dojo/ready'],
        function(SalesOrderTasksTasklet, ready) {
            ready(function() {
                if (!salesOrderTasksActions) {
                    salesOrderTasksActions = new SalesOrderTasksTasklet({
                        id: "salesOrderTasksActions",
                        clientId: "<%= ClientID %>"
                    });
                }
            });
        }
    );
</script>