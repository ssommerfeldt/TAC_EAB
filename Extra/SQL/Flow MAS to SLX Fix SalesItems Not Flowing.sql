SELECT DISTINCT  AS ID
FROM            MAS_to_SLX_SalesOrderLINE_TAC_temp INNER JOIN
                         VOrderItemsToResync ON MAS_to_SLX_SalesOrderLINE_TAC_temp.ItemKey = VOrderItemsToResync.ItemKey AND MAS_to_SLX_SalesOrderLINE_TAC_temp.UserFld3 = VOrderItemsToResync.UserFld3
Where MAS_to_SLX_SalesOrderLINE_TAC_temp.ShipDate >= (GetDate() - 90)
--=======================================================================================
-- Identify and clear out Items that were somehow missed in regular sync
-- after this is run you need to run the SalesOrder Syc
--========================================================================================
Delete  
from MAS_to_SLX_SalesOrderLINE_TAC_temp 
Where cast(MAS_to_SLX_SalesOrderLINE_TAC_temp.ItemKey as varchar(32)) + '_' + MAS_to_SLX_SalesOrderLINE_TAC_temp.UserFld3 IN
 (
 Select cast(ItemKey as varchar(32)) + '_' + UserFld3
 from VOrderItemsToResync
 where UserFld3 is not null
)