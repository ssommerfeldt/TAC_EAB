<div data-dojo-type="Sage.TaskPane.QuoteTasksTasklet" id="quoteTasks"></div>

<script type="text/javascript">
    var quoteTasksActions;
    require(['Sage/TaskPane/QuoteTasksTasklet', 'dojo/ready'],
        function(QuoteTasksTasklet, ready) {
            ready(function() {
                if (!quoteTasksActions) {
                    quoteTasksActions = new QuoteTasksTasklet({
                        id: "quoteTasksActions",
                        clientId: "<%= ClientID %>"
                    });
                }
            });
        }
    );
</script>