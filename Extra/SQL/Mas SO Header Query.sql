

SELECT TranStatus
	,ShipKey AS Key1
	,UserFld1
	,UserFld2
	,UserFld3
	,UserFld4
	,TranStatusAsText
	,TranID
FROM vdvCustomerReturn
WHERE (UserFld1 = '230-02-058578')

UNION

SELECT STATUS
	,SOKey
	,UserFld1
	,UserFld2
	,UserFld3
	,UserFld4
	,CASE STATUS
		WHEN '0'
			THEN 'Unacknoledged'
		WHEN '1'
			THEN 'Open'
		WHEN '2'
			THEN 'Inactive'
		WHEN '3'
			THEN 'Canceled'
		WHEN '4'
			THEN 'Closed'
		WHEN '5'
			THEN 'Incomplete'
		WHEN '6'
			THEN 'Pending Approval'
		END AS StatusTXT
	,TranID
FROM tsoSalesOrder
Where UserFld1 = '230-02-057040'
--WHERE (UserFld1 IS NOT NULL)
--	AND (UserFld1 <> '')

