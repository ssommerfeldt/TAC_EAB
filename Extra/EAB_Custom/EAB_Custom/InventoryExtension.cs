


namespace EAB_Custom {
    public class InventoryExtension {

        //protected void AdjustInventory(Sage.Form.Interfaces.IAdjustInventoryLevel form, EventArgs args) {
        //    //Adjust Inventory on hand
        //    string transactionID = "";
        //    try {
        //        //Bind to the current Entity
        //        Sage.Entity.Interfaces.IProductstatus productstatus = form.CurrentEntity as Sage.Entity.Interfaces.IProductstatus;

        //        if (String.IsNullOrEmpty(form.txtAdjustment.Text)) {
        //            DialogService.ShowMessage("Adjustment value must be entered.");
        //            return;
        //        }
        //        if (String.IsNullOrEmpty(form.txtComment.Text)) {
        //            DialogService.ShowMessage("Comments are required.");
        //            return;
        //        }

        //        //Get the batchID - not used due to remotes. set batch on integration
        //        //Sage.Platform.RepositoryHelper<Sage.Entity.Interfaces.IStgInvtTranBatch_TAC> rep =
        //        //    Sage.Platform.EntityFactory.GetRepositoryHelper<Sage.Entity.Interfaces.IStgInvtTranBatch_TAC>();
        //        //Sage.Platform.Repository.ICriteria criteria = rep.CreateCriteria();
        //        //criteria.SetProjection(rep.PF.Max("BatchID"));
        //        //criteria.SetMaxResults(1);

        //        //Int32 lastBatchID = (Int32)criteria.UniqueResult();
        //        //if (lastBatchID == null) {
        //        //    lastBatchID = 0;
        //        //}


        //        //Determine Transaction Type
        //        int transactionType = 0;
        //        double quantity = 0;
        //        if (Double.Parse(form.txtAdjustment.Text) > 0) {
        //            transactionType = 703;
        //            quantity = Double.Parse(form.txtAdjustment.Text);
        //        } else //if (Double.Parse(txtAdjustment.Text) > 0) 
        //{
        //            transactionType = 701;
        //            quantity = Math.Abs(Double.Parse(form.txtAdjustment.Text));
        //        }


        //        Sage.Entity.Interfaces.IStgInvtTranBatch_TAC tranHeader =
        //                Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgInvtTranBatch_TAC),
        //                Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgInvtTranBatch_TAC;

        //        //transactionID = tranHeader.Id.ToString();
        //        //tranHeader.BatchID = lastBatchID + 1;
        //        tranHeader.BatchID = 0;

        //        tranHeader.BComment = form.txtComment.Text;
        //        tranHeader.BDate = DateTime.Now;
        //        tranHeader.WhseID = productstatus.Product.Vproductpricesheet.Whsekey.ToString();
        //        tranHeader.CompanyID = productstatus.ProductReference.Productrefkey.Substring(0, 3);

        //        tranHeader.Save();


        //        Sage.Entity.Interfaces.IStgInvtTran_TAC transaction =
        //                Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgInvtTran_TAC),
        //                Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgInvtTran_TAC;

        //        transaction.Stginvttranbatch_tacId = tranHeader.Id.ToString();

        //        transaction.TranID = tranHeader.BatchID;
        //        transaction.BatchID = tranHeader.BatchID;
        //        transaction.TranType = transactionType;
        //        transaction.TranDate = DateTime.Now;
        //        transaction.ItemID = productstatus.Product.MASITEMKEY.ToString();
        //        transaction.Qty = quantity;
        //        transaction.UoM = "";
        //        transaction.UnitCost = (Double)productstatus.Product.Vlueproductmsrp.Listprice;
        //        transaction.TranAmt = transaction.UnitCost * transaction.Qty;
        //        transaction.GLAcctNo = "";
        //        transaction.TranCmnt = "";
        //        transaction.CompanyID = tranHeader.CompanyID;
        //        transaction.ProcessStatus = 0;

        //        //_entity.Projects.Add(project);
        //        transaction.Save();

        //    } catch (Exception ex) {
        //        DialogService.ShowMessage("Error Creating Transaction: " + transactionID + " " + ex.Message);
        //        Sage.Platform.Application.Exceptions.EventLogExceptionHandler eh = new Sage.Platform.Application.Exceptions.EventLogExceptionHandler();
        //        eh.HandleException(ex, false);
        //    }

        //}

        
    }
}
