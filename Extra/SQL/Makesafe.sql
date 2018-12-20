-- script:  makeSafeDevTestDB.sql
-- Author:  Todd Hardin, Customer Systems Inc.
-- Release: For public release, *USE AT OWN RISK*
-- 
-- IMPORTANT NOTE: Assumes you are logged in as SA user
--
-- use <YourDatabaseNameHere>
-- go

-- Assuming this database has just been Restored/Attached
-- Can't hurt to run this.

--***Remember to start and stop the slx services after to prevent caching.


print 'Perform fixup on sysdba login to user mapping for this DB'
exec sp_change_users_login 'Update_One', 'sysdba', 'sysdba'
GO

Update sysdba.SystemInfo SET PINGSERVER = 'Athena'
--above name of server
GO

update sysdba.usersecurity set userpw = '62C3A78AE34A2B0F62' WHERE USERID = 'ADMIN'
GO

print ' '

-- declare variables
declare @dbname varchar(32)
declare @newHostSiteCode char(4)
declare @oldHostSiteCode char(4)

declare @LibraryUNC varchar(128)
declare @AttachmentsUNC varchar(128)

-- initialize implementation specific variables
-- NOTE: edit these values as desired for your implementation
-- #####################################################################
select @newHostSiteCode = 'AAAR'
select @LibraryUNC = '\\YourServer\DevShares\Library'
select @AttachmentsUNC = '\\YourServer\DevShares\Documents'

-- Retrieve the current site code for the Main host system
select @oldHostSiteCode = sitecode from sysdba.systeminfo where systeminfoid = 'PRIMARY'



-- #####################################################################
-- Section 1: Remove all SyncServer and RemoteOffice Definitions
print 'Section 1: Remove all SyncServer and RemoteOffice Definitions'
print '#############################################################'
print ' '

-- delete siteoptions records that are tied to syncservers

print 'deleting siteoptions records that are tied to syncservers' 
delete from sysdba.siteoptions where sitecode in (select sitecode from sysdba.syncserver)

-- delete license records that represent any syncserver
print 'deleting license record(s) that represent any syncserver(s)'
delete from sysdba.licenses where userid in (select sitecode from sysdba.SyncServer)

-- update siteoptions table for records which represent users	
print 'updating hostserver reference in siteoptions table for all records which represent system users'
update sysdba.siteoptions set hostserver = 'NOSYNCSERVER' where sitecode in (select primarysite from sysdba.usersecurity)
-- Ideally we would have cleand up the SiteOptions blob to remove mapping of User to SyncTransfer profile.
-- Had considered setting blob = NULL
-- Decided to leave blob alone as blob appears to also be used for LAN users.

-- cleanup branchoptions table
-- delete any remote offices defined
print 'deleting all remote office definitions'
delete from sysdba.branchoptions where sitecode not in (select primaryserver from sysdba.systeminfo where systeminfoid = 'PRIMARY')
-- update the record representing the main host office
print 'updating branchoptions table for record representing main host office'
update sysdba.branchoptions set sitecode = 'NOSYNCSERVER', attachmentpath = @AttachmentsUNC, saleslibrarypath = @LibraryUNC


-- delete all syncserver definitions
print 'deleting all syncserver definitions from syncserver table'
delete from sysdba.syncserver

-- delete the UNC to the sync service job definition file
print 'deleting syncservicefile (sync job file) record'
delete from sysdba.syncservicefile
		
-- delete any SyncTransfer profile definitions
print 'deleting all sync transfer profile definitions from synctransfer table'
delete from sysdba.synctransfer

-- change all Remote (Mobile) users to Network users
print 'changing all remote users to be network users in usersecurity table'
update sysdba.usersecurity set type = 'N' where type = 'M'

-- delete all prior usersubscription information
print 'deleting all usersubscription information since users are no longer remotes'
delete from sysdba.usersubscription
		
-- cleanup syncserver work tables
print 'deleting sync work table - synsequencing'
delete from sysdba.syncsequencing
print 'deleting sync work table - syncjobhistory'
delete from sysdba.syncjobhistory
print 'deleting sync work table - syncfiletracking'
delete from sysdba.syncfiletracking


-- special clean-up for discontinue IQ Reporting tool
print 'deleting legacy IQ Objects schema record from systeminfo table'
delete from sysdba.systeminfo where systeminfoid = 'IQKBASE'

-- clean up the systeminfo table
print 'updates to system info table to cleanup record for main host office'
update sysdba.systeminfo set primaryserver = 'NOSYNCSERVER', pingport = NULL, pingserver = NULL, RWPass = NULL

-- ##################################################################
-- Section 2: Remove all SLX Web configuration information
print 'Section 2: Remove all SLX Web configuration information'
print '#############################################################'
print ' '

-- delete siteoptions records the correspond to WebServer DLL Instances
print 'deleting siteoptions records the correspond to WebServer DLL Instances'
--delete from sysdba.siteoptions where sitecode in (select sitecode from sysdba.slxwebserver)

-- delete web server defintion(s)
print 'deleting web server defintion(s) from slxwebdata table'
--delete from sysdba.slxwebdata

-- delete web server DLL instance definition(s)
print 'deleting web server DLL instance definition(s) from slxwebserver table'
--delete from sysdba.slxwebserver


-- ##################################################################
-- Section 3: Change the SiteCode of the main/host system
print 'Section 3: Change the SiteCode of the main/host system'
print '#############################################################'
print ' '
print 'Updating main host site code from: ' + @oldHostSiteCode + ' to: ' + @newHostSiteCode

-- update siteoptions table to reflect the newHostSiteCode
print 'Updating sitecode in siteoptions table for record representing main host office'
update sysdba.siteoptions set sitecode = @newHostSiteCode where sitecode = @oldHostSiteCode

-- update systeminfo table to reflect the newHostSiteCode
print 'updating systeminfo table to reflect the newHostSiteCode'
update sysdba.systeminfo set sitecode = @newHostSiteCode where sitecode = @oldHostSiteCode

-- update sitekeys to newHostSiteCode as well as resetting key generator base values
-- easy way - SLX will rebuild this table when needed.
print 'deleting all records from sitekeys table. SLX will rebuild on demand using new sitecode'
delete from sysdba.sitekeys

-- alternative technique
-- delete from sysdba.sitekeys where sitecode <> @oldHostSiteCode
-- update sysdba.sitekeys set sitecode = @newHostSiteCode, keyvalue = 'A000000'

-- ###################################################################
-- Section 4: Change the sitecode for each USER
-- This proceedure uses a sequentially assigned decimal number
-- for each USER sitecode.
-- U001 - U999
-- Ideally we should check for collisions on the rare change
-- that a SITECODE of the form U### already exists in the database.
--
-- An alternative would be to use randomly assigned base36 values
-- just as SLX does. 
--
print 'Section 4: Change the sitecode for each USER'
print '#############################################################'
print ' '

declare userlist cursor for select primarysite from sysdba.usersecurity

declare @oldUserSiteCode char(4)
declare @newUserSiteCode char(4)
declare @UserCounter int

-- init counter
select @UserCounter = 0

open userlist
fetch next from userlist into @oldUserSiteCode
while @@fetch_status = 0
begin
	select @UserCounter = @UserCounter + 1
	select @newUserSiteCode = 'U' + right ('000' + CAST(@UserCounter as varchar), 3)
	print 'Updating user sitecode from: ' + @oldUserSiteCode + ' to: ' + @newUserSiteCode
	update sysdba.siteoptions set sitecode = @newUserSiteCode where sitecode = @oldUserSiteCode
	update sysdba.usersecurity set primarysite = @newUserSiteCode where primarysite = @oldUserSiteCode
        fetch next from userlist into @oldUserSiteCode
end
close userlist
deallocate userlist

-- ###################################################################
-- Section 5: Manual Tasks
print 'Section 5: Manual Tasks'
print '#############################################################'
print ' '
print 'Must do:'
print 'Edit/Recreate the Data Connection definition for this database'
print 'This is necessary to populate the systeminfo table columns'
print 'pingport, pingserver, and RWPass'
print ' '
print ' '
print 'End of script'

-- Optional: SyncServer, RemoteOffices, etc.
-- If you need a sync server or remote offices for your Dev/Test environment, then
-- install licenses and configure to use your Dev/Test SyncServer, Test FTp server, etc.

-- Optional: SLX WebServer
-- If you need to use the SLX Web features, use WebManager to defined new WebProfile(s) and WebServer(s)
-- configured to use your Dev/Test servers.