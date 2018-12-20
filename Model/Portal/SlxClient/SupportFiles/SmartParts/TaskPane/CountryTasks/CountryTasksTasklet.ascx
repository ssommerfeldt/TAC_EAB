<div data-dojo-type="Sage.TaskPane.CountryTasksTasklet" id="countryTasks"></div>

<script type="text/javascript">
    var countryTasksActions;
    require(['Sage/TaskPane/CountryTasksTasklet', 'dojo/ready'],
        function (CountryTasksTasklet, ready) {
            ready(function () {
                if (!countryTasksActions) {
                    countryTasksActions = new CountryTasksTasklet({
                        id: "countryTasksActions",
                        clientId: "<%= ClientID %>"
                    });
                }
            });
        }
    );
</script>