const { Promise } = require("mongoose");
const Coupons = require("../models/Coupons.model");

const Coupons1= {


  getAllCoupons: async function () {
    return await Coupons.find();
  },

  save: async function (CouponsObject) {
    return await Coupons.create(CouponsObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await Coupons.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await Coupons.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },


  //update Coupons.....
  updateCoupons: function (id, topic) {
    Coupons.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete Coupons.......
  deleteCoupons: function (id)
 {
    return new Promise((resolve, reject) => {
      Coupons.findByIdAndDelete(id, function (err, doc) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  },



};


module.exports = Coupons1;