<%@ Control Language="C#" AutoEventWireup="true" CodeFile="EntityManagerTasks.cs" Inherits="SmartParts_TaskPane_EntityManager_Tasks" %>

<div data-dojo-type="Sage.TaskPane.EntityManagerTasklet" id="primaryTasks" configurationProviderType="Sage.TaskPane.EntityTaskConfigurationProvider"></div>

<script type="text/javascript">
   require([
       'Sage/TaskPane/EntityManagerTasklet',
       'Sage/TaskPane/EntityTaskConfigurationProvider',
       'dojo/on' 
       ], 
       function(
            EntityManagerTasklet,
            EntityTaskConfigurationProvider,
            on
        ){
            
       }
   );
      
</script>