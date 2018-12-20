using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.ComponentModel;
using NHibernate;
using Sage.Platform.Security;
using Sage.SalesLogix.Security;
using Sage.Platform.Application;
using Sage.Platform.Orm;
using Sage.SalesLogix.Activity;
using Sage.Platform;
using System.Text;
using Sage.Platform.Repository;
using Sage.Platform.Application.UI;
using Sage.Platform.WebPortal.SmartParts;
using Sage.Entity.Interfaces;

public partial class SmartParts_OpportunitySummary : EntityBoundSmartPartInfoProvider
{
    private IEntityContextService _EntityService;
    [ServiceDependency]
    public IEntityContextService EntityService
    {
        get
        {
            return _EntityService;
        }
        set
        {
            _EntityService = value;
        }
    }

    public override Type EntityType
    {
        get
        {
            return typeof(Sage.Entity.Interfaces.IOpportunity);
        }
    }

    protected override void OnAddEntityBindings()
    {
    }

    protected override void  OnFormBound()
    {
 	     base.OnFormBound();

         bool bFoundActivityPhoneCall = false;
         bool bFoundActivityAppointment = false;
         bool bFoundActivityToDo = false;

         bool bFoundHistoryPhoneCall = false;
         bool bFoundHistoryAppointment = false;
         bool bFoundHistoryToDo = false;
         bool bFoundHistoryLetter = false;
         bool bFoundHistoryEmail = false;
         bool bFoundHistoryFax = false;

         NextCallDate.Text = string.Empty;
         NextCallUser.Text = string.Empty;
         NextCallRegarding.Text = string.Empty;

         NextMeetDate.Text = string.Empty;
         NextMeetUser.Text = string.Empty;
         NextMeetRegarding.Text = string.Empty;

         NextToDoDate.Text = string.Empty;
         NextToDoUser.Text = string.Empty;
         NextToDoRegarding.Text = string.Empty;

         LastCallDate.Text = string.Empty;
         LastCallUser.Text = string.Empty;
         LastCallRegarding.Text = string.Empty;

         LastMeetDate.Text = string.Empty;
         LastMeetUser.Text = string.Empty;
         LastMeetRegarding.Text = string.Empty;

         LastToDoDate.Text = string.Empty;
         LastToDoUser.Text = string.Empty;
         LastToDoRegarding.Text = string.Empty;

         LastLetterDate.Text = string.Empty;
         LastLetterUser.Text = string.Empty;
         LastLetterRegarding.Text = string.Empty;

         LastEmailDate.Text = string.Empty;
         LastEmailUser.Text = string.Empty;
         LastEmailRegarding.Text = string.Empty;

         LastFaxDate.Text = string.Empty;
         LastFaxUser.Text = string.Empty;
         LastFaxRegarding.Text = string.Empty;

         LastUpdateDate.Text = string.Empty;
         LastUpdateUser.Text = string.Empty;

         var opportunity = (IOpportunity) BindingSource.Current;
         var entityId = opportunity.Id.ToString();

         IRepository<Activity> actRep = EntityFactory.GetRepository<Activity>();
         IQueryable qryableAct = (IQueryable)actRep;
         IExpressionFactory expAct = qryableAct.GetExpressionFactory();
         Sage.Platform.Repository.ICriteria critAct = qryableAct.CreateCriteria();

         var activityList = critAct.Add(
             expAct.Eq("OpportunityId", entityId))
             .AddOrder(expAct.Asc("StartDate"))
             .List<Activity>();

         if (activityList != null)
         {
             foreach (Activity oppActivity in activityList)
             {
                 switch (oppActivity.Type)
                 {
                     case ActivityType.atPhoneCall:
                         if (!bFoundActivityPhoneCall)
                         {
                             NextCallDate.Text = oppActivity.StartDate.ToShortDateString();
                             NextCallUser.Text = Sage.SalesLogix.Security.User.GetById(oppActivity.UserId).UserInfo.UserName;
                             NextCallRegarding.Text = oppActivity.Description;
                             bFoundActivityPhoneCall = true;
                         }
                         break;
                     case ActivityType.atAppointment:
                         if (!bFoundActivityAppointment)
                         {
                             NextMeetDate.Text = oppActivity.StartDate.ToShortDateString();
                             NextMeetUser.Text = Sage.SalesLogix.Security.User.GetById(oppActivity.UserId).UserInfo.UserName;
                             NextMeetRegarding.Text = oppActivity.Description;
                             bFoundActivityAppointment = true;
                         }
                         break;
                     case ActivityType.atToDo:
                         if (!bFoundActivityToDo)
                         {
                             NextToDoDate.Text = oppActivity.StartDate.ToShortDateString();
                             NextToDoUser.Text = Sage.SalesLogix.Security.User.GetById(oppActivity.UserId).UserInfo.UserName;
                             NextToDoRegarding.Text = oppActivity.Description;
                             bFoundActivityToDo = true;
                         }
                         break;
                 }
             }
         }

         IRepository<History> hisRep = EntityFactory.GetRepository<History>();
         IQueryable qryableHis = (IQueryable)hisRep;
         IExpressionFactory expHis = qryableHis.GetExpressionFactory();
         Sage.Platform.Repository.ICriteria critHis = qryableHis.CreateCriteria();

         var historyList = critHis.Add(
             expHis.Eq("OpportunityId", entityId))
             .AddOrder(expHis.Desc("CompletedDate"))
             .List<History>();

         if (historyList != null)
         {
             foreach (History oppHistory in historyList)
             {
                 switch (oppHistory.Type)
                 {
                     case HistoryType.atPhoneCall:
                         if (!bFoundHistoryPhoneCall)
                         {
                             LastCallDate.Text = oppHistory.CompletedDate.ToShortDateString();
                             LastCallUser.Text = Sage.SalesLogix.Security.User.GetById(oppHistory.UserId).UserInfo.UserName;
                             LastCallRegarding.Text = oppHistory.Description;
                             bFoundHistoryPhoneCall = true;
                         }
                         break;
                     case HistoryType.atAppointment:
                         if (!bFoundHistoryAppointment)
                         {
                             LastMeetDate.Text = oppHistory.CompletedDate.ToShortDateString();
                             LastMeetUser.Text = Sage.SalesLogix.Security.User.GetById(oppHistory.UserId).UserInfo.UserName;
                             LastMeetRegarding.Text = oppHistory.Description;
                             bFoundHistoryAppointment = true;
                         }
                         break;
                     case HistoryType.atToDo:
                         if (!bFoundHistoryToDo)
                         {
                             LastToDoDate.Text = oppHistory.CompletedDate.ToShortDateString();
                             LastToDoUser.Text = Sage.SalesLogix.Security.User.GetById(oppHistory.UserId).UserInfo.UserName;
                             LastToDoRegarding.Text = oppHistory.Description;
                             bFoundHistoryToDo = true;
                         }
                         break;
                     case HistoryType.atLiterature:
                         if (!bFoundHistoryLetter)
                         {
                             LastLetterDate.Text = oppHistory.CompletedDate.ToShortDateString();
                             LastLetterUser.Text = Sage.SalesLogix.Security.User.GetById(oppHistory.UserId).UserInfo.UserName;
                             LastLetterRegarding.Text = oppHistory.Description;
                             bFoundHistoryLetter = true;
                         }
                         break;
                     case HistoryType.atEMail:
                         if (!bFoundHistoryEmail)
                         {
                             LastEmailDate.Text = oppHistory.CompletedDate.ToShortDateString();
                             LastEmailUser.Text = Sage.SalesLogix.Security.User.GetById(oppHistory.UserId).UserInfo.UserName;
                             LastEmailRegarding.Text = oppHistory.Description;
                             bFoundHistoryEmail = true;
                         }
                         break;
                     case HistoryType.atFax:
                         if (!bFoundHistoryFax)
                         {
                             LastFaxDate.Text = oppHistory.CompletedDate.ToShortDateString();
                             LastFaxUser.Text = Sage.SalesLogix.Security.User.GetById(oppHistory.UserId).UserInfo.UserName;
                             LastFaxRegarding.Text = oppHistory.Description;
                             bFoundHistoryFax = true;
                         }
                         break;
                 }
             }
         }

         DateTime md = new DateTime();
         if (opportunity.ModifyDate.HasValue)
         {
             md = Convert.ToDateTime(opportunity.ModifyDate);
             LastUpdateDate.Text = md.ToShortDateString();
         }

         IUser user = EntityFactory.GetById<IUser>(opportunity.ModifyUser);
         if (user != null)
         {
             LastUpdateUser.Text = user.UserInfo.UserName;
         }
    }

    #region ISmartPartInfoProvider Members

    public override ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        Sage.Platform.WebPortal.SmartParts.ToolsSmartPartInfo tinfo = new Sage.Platform.WebPortal.SmartParts.ToolsSmartPartInfo();

        foreach (Control c in this.OppSummary_RTools.Controls)
        {
            tinfo.RightTools.Add(c);
        }
        return tinfo;
    }

    #endregion
}