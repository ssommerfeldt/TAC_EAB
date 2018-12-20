<div data-dojo-type="Sage.TaskPane.AccountingTasksTasklet" id="accountingTasks"></div>

<script type="text/javascript">
    var accountingTasksActions;
    require(['Sage/TaskPane/AccountingTasksTasklet', 'dojo/ready'],
           function (AccountingTasksTasklet, ready) {
               ready(function () {
                   if (!accountingTasksActions) {
                       accountingTasksActions = new AccountingTasksTasklet({
                           id: "accountingTasksActions",
                           clientId: "<%= ClientID %>"
                       });
                   }
               });
           }
       );
</script>