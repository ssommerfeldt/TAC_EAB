/*globals dojo, dojox, dijit, window */
require([
        'dojo/ready',
        'dojo/_base/connect'
    ],
    function (ready, connect) {
        ready(function () {
            connect.subscribe('/ui/gridView/created', function (grid) {
                if (typeof grid === 'undefined' || grid === null) return;
                if (grid.id === 'TicketActivitiesgrdTicketActivities') {
                    connect.subscribe('/entity/ticketActivity/create', function() {
                        grid.refresh();
                    });
                }
            });
        });
    }
);