/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="1bcea2dc-e2a6-4691-a150-0295d58bdd07">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>lueAssociateCompetitor_OnChangeStep</name>
 <references>
  <reference>
   <assemblyName>Sage.Entity.Interfaces.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\interfaces\bin\Sage.Entity.Interfaces.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.Form.Interfaces.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\formInterfaces\bin\Sage.Form.Interfaces.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.Platform.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\assemblies\Sage.Platform.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.SalesLogix.API.dll</assemblyName>
  </reference>
  <reference>
   <assemblyName>Sage.Platform.WebPortal.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\assemblies\Sage.Platform.WebPortal.dll</hintPath>
  </reference>
 </references>
</snippetHeader>
*/

#region Usings
using System;
using System.Linq;
using Sage.Entity.Interfaces;
using Sage.Form.Interfaces;
using Sage.Platform;
using Sage.Platform.ChangeManagement;
using Sage.Platform.WebPortal;
using Sage.Platform.WebPortal.Services;
using Sage.SalesLogix.API;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
    /// <summary>
    /// Event handlers for the OpportunityCompetitor dialog
    /// </summary>
    public static partial class OpportunityCompetitorsEventHandlers
    {
        /// <summary>
        /// Invokes the association lookup for competitors.
        /// </summary>
        /// <param name="form">the instance of the OpportunityCompetitor dialog</param>
        /// <param name="args">empty</param>
        public static void lueAssociateCompetitor_OnChangeStep(IOpportunityCompetitors form, EventArgs args)
        {
            if (form.lueAssociateCompetitor.LookupResultValue != null)
            {
                IOpportunity parentEntity = form.CurrentEntity as IOpportunity;
                ICompetitor relatedEntity = form.lueAssociateCompetitor.LookupResultValue as ICompetitor;
                var dialogService = form.Services.Get<IWebDialogService>();

                if ((parentEntity != null) && (relatedEntity != null))
                {
                    if (parentEntity.Competitors.Any(oc => oc.Competitor == relatedEntity))
                    {
                        if (dialogService != null)
                        {
                            string msg = string.Format(form.GetResource("DuplicateCompetitorMsg").ToString(), relatedEntity.CompetitorName);
                            dialogService.ShowMessage(msg, form.GetResource("DuplicateCompetitorMsgTitle").ToString());
                        }
                    }
                    else
                    {
                        IOpportunityCompetitor relationshipEntity = EntityFactory.Create<IOpportunityCompetitor>();
                        relationshipEntity.Opportunity = parentEntity;
                        relationshipEntity.Competitor = relatedEntity;
                        parentEntity.Competitors.Add(relationshipEntity);
						
                       if (!MySlx.MainView.IsInsertMode())
                        {
                            parentEntity.Save();
                        }

                        if (dialogService != null)
                        {
                            dialogService.SetSpecs(0, 0, 400, 600, "EditOpportunityCompetitor", string.Empty, true);
                            dialogService.EntityType = typeof (IOpportunityCompetitor);
                            string id;

                            dialogService.CompositeKeyNames = "OpportunityId,CompetitorId";
                            if (PortalUtil.ObjectIsNewEntity(relationshipEntity))
                            {
                                id = relationshipEntity.InstanceId.ToString();
                                ChangeManagementEntityFactory.RegisterInstance(relationshipEntity, relationshipEntity.InstanceId);
                                relationshipEntity.SetOppCompetitorDefaults(relatedEntity);
                            }
                            else
                            {
                                id = string.Format("{0},{1}", relationshipEntity.OpportunityId, relationshipEntity.CompetitorId);
                            }
                            dialogService.EntityID = id;
                            dialogService.ShowDialog();
                        }
                    }
                }
                form.lueAssociateCompetitor.LookupResultValue = null; //34026
            }
        }
    }
}
