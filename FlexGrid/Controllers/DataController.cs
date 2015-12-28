using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using FlexGrid.Data;
using Newtonsoft.Json.Linq;

namespace FlexGrid.Controllers
{
    [BreezeController]
    public class DataController : ApiController
    {

        readonly EFContextProvider<TestDataContext> _contextProvider =
        new EFContextProvider<TestDataContext>();

        /// <summary>
        /// Model Metadata
        /// </summary>
        /// <returns>string containing the metadata</returns>       
        [HttpGet]
        [AllowAnonymous]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        /// <summary>
        /// Get all order custs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IQueryable<Contact> Contacts()
        {
            return _contextProvider.Context.Contacts;
        }

        /// <summary>
        /// Save changes to data store
        /// </summary>
        /// <param name="saveBundle">The changes</param>
        /// <returns>Save result</returns>
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }


    }
}
