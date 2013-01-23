using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.OleDb;
using System.Collections;
using System.Configuration;

namespace SalesLogix_GetNextID
{
    class Program
    {
        static void Main(string[] args)
        {
            string connectionstring = ConfigurationManager.ConnectionStrings["SLXConnection"].ConnectionString;

            string Accountid;
            string Addressid;
            using (OleDbConnection conn = new OleDbConnection(connectionstring))
            {
                conn.Open();
                using (OleDbCommand cmd = new OleDbCommand(string.Format("slx_dbids('{0}', 1)", "ACCOUNT"), conn))
                {
                    Accountid= cmd.ExecuteScalar().ToString();
                }
                using (OleDbCommand cmd = new OleDbCommand(string.Format("slx_dbids('{0}', 1)", "ADDRESS"), conn))
                {
                    Addressid = cmd.ExecuteScalar().ToString();
                }
            }

        }

       
    }
}