﻿define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            dialogCaption: "Sales Order Details",
            loadingText: "loading...",
            lblSalesOrderCaption: "Sales Order:",
            lblStatusCaption: "Status:",
            lblGrossTotalCaption: "Order Amount:",
            lblOrderDateCaption: "Order Date:",
            lblTaxTotalCaption: "Tax Total:",
            lblHoldStatusCaption: "Hold Status:",
            lblCurrencyCaption: "Currency:",
            lblTypeCaption: "Type:",
            lblCostTotalCaption: "Total Cost:",
            lblPONumberCaption: "PO Number:",
            lblProfitTotalCaption: "Total Profit:",
            lblQuotationCaption: "Quotation:",
            lblInvoiceStatusCaption: "Invoice Status:",
            lblContactCaption: "Contact:",
            lblDeliveryDateCaption: "Delivery Date:",
            lblDueDateCaption: "Due Date:",
            lblPriceListCaption: "Price List:",
            lblCarrierCaption: "Carrier:",
            lblNetTotalCaption: "Net Total:",
            lblAllocationStatusCaption: "Allocation Status:",
            lblDiscountTotalCaption: "Discount Total:",
            lblDeliveryStatusCaption: "Delivery Status:",
            lblChargesTotalCaption: "Charges Total:",
            detailsTabTitle: "Details",
            salesPersonsTabTitle: "Sales Persons",
            addressTabTitle: "Addresses",
            salesOrderLinesTabTitle: "Sales Order Lines",
            paymentsTabTitle: "Payments",
            deliveriesTabTitle: "Deliveries",
            grdSalesOrder_Edit: "Edit",
            grdSalesOrder_OrderNumber: "Order Number",
            grdSalesOrder_OrderDate: "Order Date",
            grdSalesOrder_Status: "Status",
            grdSalesOrder_HoldStatus: "Hold Status",
            grdSalesOrder_Type: "Type",
            grdSalesOrder_PO: "PO Number",
            grdSalesOrder_NetTotal: "Net Total",
            grdSalesOrder_DiscountTotal: "Discount Total",
            grdSalesOrder_ChargesTotal: "Charges Total",
            grdSalesOrder_TaxTotal: "Tax Total",
            grdSalesOrder_GrossTotal: "Gross Total",
            grdSalesOrder_Currency: "Currency",
            grdSalesPersons_Name: "Name",
            grdSalesPersons_Type: "Type",
            grdSalesPersons_Extension: "Extension",
            grdSalesPersons_Relationship: "Relationship",
            grdAddress_Name: "Name",
            grdAddress_Address1: "Address 1",
            grdAddress_Address2: "Address 2",
            grdAddress_City: "City",
            grdAddress_State: "State",
            grdAddress_Zip: "Zip",
            grdItems_Line: "Line Number",
            grdItems_Type: "Type",
            grdItems_Commodity: "Commodity",
            grdItems_CommodityVariant: "Variant",
            grdItems_CommodityDimension: "Dimension",
            grdItems_UnitOfMeasure: "Unit",
            grdItems_Location: "Location",
            grdItems_PriceList: "Price List",
            grdItems_Quantity: "Quantity",
            grdItems_InitialPrice: "Initial Price",
            grdItems_ActualPrice: "Actual Price",
            grdItems_NetTotal: "Net Total",
            grdItems_ChargesTotal: "Charges Total",
            grdItems_DiscountTotal: "Discount Total",
            grdItems_TaxTotal: "Tax Total",
            grdItems_GrossTotal: "Gross Total",
            grdPayments_Date: "Payment Date",
            grdPayments_Name: "Name",
            grdPayments_Type: "Type",
            grdPayments_Status: "Status",
            grdPayments_NetTotal: "Net Total",
            grdPayments_Discounts: "Discounts",
            grdPayments_Charges: "Charges",
            grdPayments_Tax: "Tax",
            grdPayments_GrossTotal: "Gross Total",
            grdPayments_Currency: "Currency",
            grdPayments_TenderType: "Tender Type",
            grdPayments_TenderReference: "Tender Reference",
            grdPayments_ProcessDate: "Process Date",
            grdDeliveries_Number: "Number",
            grdDeliveries_Type: "Type",
            grdDeliveries_Status: "Status",
            grdDeliveries_RequestedDate: "Requested Date",
            grdDeliveries_ActualDate: "Actual Date",
            grdDeliveries_ActualTime: "Actual Time",
            grdDeliveries_RequestedQuantity: "Requested Quantity",
            grdDeliveries_DeliveredQuantity: "Delivered Quantity",
            grdDeliveries_Method: "Method",
            grdDeliveries_Carrier: "Carrier",
            grdDeliveries_CarrierReference: "Carrier Reference",
            grdDeliveries_ExceptionReason: "Exception Reason",
            errorERPRequest: "An occured occured opening accounting systems sales order detail view. ",
            errorERPRequestDetails: "${0}, ${1} Request: ${2}",
            btnCloseCaption: "Close"
        }
    };
    return lang.mixin(LanguageList, nls);
});