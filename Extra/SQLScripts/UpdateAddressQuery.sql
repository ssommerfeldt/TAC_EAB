SELECT      LiveEAB_app.dbo.tarCustAddr.CustAddrID, sysdba.ADDRESSREFERENCE.ADDRESSREFDISPLAYNAME, LiveEAB_app.dbo.tarCustAddr.AddrKey
FROM         sysdba.ADDRESSREFERENCE INNER JOIN
                      LiveEAB_app.dbo.tarCustAddr ON sysdba.ADDRESSREFERENCE.ADDRESSREFDISPLAYNAME = LiveEAB_app.dbo.tarCustAddr.CustAddrID

Select * from LiveEAB_app.dbo.tarCustaddr, LiveEAB_app.dbo.tarCustAddr

Update sysdba.ADDRESS
SET    MASADDRKEY= LiveEAB_app.dbo.tarCustAddr.AddrKey
FROM         sysdba.ADDRESS INNER JOIN
                      sysdba.ADDRESSREFERENCE ON sysdba.ADDRESS.ADDRESSID = sysdba.ADDRESSREFERENCE.ADDRESSID INNER JOIN
                      LiveEAB_app.dbo.tarCustAddr ON sysdba.ADDRESSREFERENCE.ADDRESSREFDISPLAYNAME = LiveEAB_app.dbo.tarCustAddr.CustAddrID

