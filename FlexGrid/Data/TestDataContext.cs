namespace FlexGrid.Data
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class TestDataContext : DbContext
    {
        public TestDataContext(): base("name=TestData")
        {
        }

        public virtual DbSet<Contact> Contacts { get; set; }

        
    }
}
