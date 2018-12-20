<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SDataDetailViewer.ascx.cs" Inherits="SmartParts_General_SDataDetailViewer" %>

<style>
    .listPanelToolbar {
        height: 21px;
    }

    .rightTools {
        text-align: right;
    }

    .leftTools {
        text-align: left;
        z-index: 4;
    }
</style>

<script type="text/javascript">

    require(['dojo/ready'], function(ready) {
        ready(function() {
            require([
                'Sage/UI/SDataMainViewConfigurationProvider',
                'Sage/Data/SingleEntrySDataStore',
                'Sage/UI/DetailPanel',
                '<%= MainViewDefinitionForwardSlash %>',
                'dojo/domReady!',
                'dijit/registry'
            ],
                function (
                    SDataMainViewConfigProvider,
                    SDataStore,
                    DetailPanel,
                    MainViewDefinitionModule,
                    domReady,
                    registry
                ) {
                    var configProvider = new MainViewDefinitionModule();
                
                    var titlePane = registry.byId('titlePane');
                        if (titlePane) {
                            titlePane.set('configurationProvider', configProvider);
                        }

                        var panel = new DetailPanel({
                            helpTopicName: '<%= HelpTopicName %>',
                        configurationProvider: configProvider,
                        id: 'detailPanel',
                        region: 'center'
                    });

                    var container = registry.byId('centerContent'),
                        child = registry.byId('mainContentDetails');
                    if (container && child) {
                        container.removeChild(child);
                        container.addChild(panel);
                        container.layout();
                    }
            });
        });
    });

</script>
