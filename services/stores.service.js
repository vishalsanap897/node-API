const { Promise } = require("mongoose");
const stores = require("../models/stores.model");

const stores1= {


  getAllstores: async function () {
    return await stores.find();
  },

  save: async function (storesObject) {
    return await stores.create(storesObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await stores.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },


  findByid: async function(id) {
    try {
      const doc = await stores.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update stores.....
  updatestores: function (id, topic) {
      stores.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete stores.......
  deletestores: function (id)
 {
    return new Promise((resolve, reject) => {
      stores.findByIdAndDelete(id, function (err, doc) {
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


module.exports = stores1;