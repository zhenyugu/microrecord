using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using MicroRecordApi.Models;

namespace MicroRecordApi.Controllers
{
    public class ShopsController
    {
        [HttpGet]
        [Route("api/shops")]
        public List<Shop> GetAllShops()
        {
            return new List<Shop>();
        }

        [HttpGet]
        [Route("api/shops/{shopId}")]
        public Shop GetShopById(string shopId)
        {
            return new Shop();
        }

        [HttpPost]
        [Route("api/shops")]
        public Shop CreateShop(Shop shop)
        {
            return new Shop();
        }
    }
}