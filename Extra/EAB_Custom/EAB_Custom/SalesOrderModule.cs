using System;
using System.Collections.Generic;
using System.Text;

using Sage.Platform.WebPortal;
using Sage.SalesLogix.Client.GroupBuilder.Controls;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.WebPortal.SmartParts;
using Sage.Platform.WebPortal.Workspaces;
using Sage.Platform.WebPortal.Workspaces.Tab;
using System.Web;
using Sage.SalesLogix.Security;
using Sage.SalesLogix.Web;
using Sage.Platform.Security;
using Sage.Entity.Interfaces;
using Sage.Platform;
using Sage.Platform.Application;
using Sage.Platform.Application.UI;
using Sage.Platform.Application.UI.Web;
using Sage.Platform.Repository;
using System.Linq;


namespace EAB_Custom {
    public class SalesOrderModule : IModule {

        private IPageWorkItemLocator _pageWorkItemLocator;
        [Sage.Platform.Application.ServiceDependency]
        public IPageWorkItemLocator PageWorkItemLocator {
            get { return _pageWorkItemLocator; }
            set { _pageWorkItemLocator = value; }
        }

        private IEntityContextService _EntityService;
        [ServiceDependency(Type = typeof(IEntityContextService), Required = true)]
        public IEntityContextService EntityService {
            get { return _EntityService; }
            set { _EntityService = value; }
        }


        #region IModule Members

        public void Load() {
            SetTabVisibility();

            //SetFieldSecurity();
        }
        
        //public WorkItem ModuleWorkItem { get { return null; } }

        #endregion

        /// <summary>
        /// Disables all tabs in the Dynamic Tabs list, then reenables tabs according to the users role
        /// </summary>
        private void SetTabVisibility() {
            try {
                // Get the current record using the entity context service.
                ISalesOrder salesOrder = EntityFactory.GetById<ISalesOrder>(EntityService.EntityID.ToString());
                if (salesOrder != null) {
                    // These 2 lines get the tab collection for the page.
                    PageWorkItem workItem = PageWorkItemLocator.GetPageWorkItem();
                    TabWorkspace tabWorkspace = workItem.Workspaces["TabControl"] as TabWorkspace;

                    if (salesOrder.Account.Type == "Distributor") {
                        //Show the Reciept of goods tab
                        tabWorkspace.Hide("ReceiptOfGoodsGrid", false);

                    } else {
                        //Hide the Reciept of goods tab
                        tabWorkspace.Hide("ReceiptOfGoodsGrid", true);
                    }
                }                 
                   

            } catch (Exception e) {
                Sage.Platform.Application.Exceptions.EventLogExceptionHandler eh = new Sage.Platform.Application.Exceptions.EventLogExceptionHandler();
                eh.HandleException(e, false);                
            }
        }
    }
}
