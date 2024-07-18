const { Promise } = require("mongoose");
const supplier = require("../models/supplier.model");

const supplier1= {


  getAllsupplier: async function () {
    return await supplier.find();
  },

  save: async function (supplierObject) {
    return await supplier.create(supplierObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await supplier.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },


  findByid: async function(id) {
    try {
      const doc = await supplier.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update supplier.....
  updatesupplier: function (id, topic) {
    supplier.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete supplier.......
  deletesupplier: function (id)
 {
    return new Promise((resolve, reject) => {
      supplier.findByIdAndDelete(id, function (err, doc) {
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


module.exports = supplier1;