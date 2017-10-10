using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MicroRecordApi.Models
{
    public class Shop
    {
        public string Name { get; set; }
        public string Owner { get; set; }
        public DateTime CreatedTime { get; set; }
    }
}