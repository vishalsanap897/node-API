const { Promise } = require("mongoose");
const SuperAdmin = require("../models/SuperAdmin.model");

const SuperAdmin1= {


  getAllSuperAdmin: async function () {
    return await SuperAdmin.find();
  },

  save: async function (SuperAdminObject) {
    return await SuperAdmin.create(SuperAdminObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await SuperAdmin.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },


  findByid: async function(id)
 {
  try {
    const doc = await SuperAdmin.findById(id)
;
    console.log("dataa ", doc);
    return doc;
  } catch (err) {
    console.log("error ", err);
    return false;
  }
},

  //update SuperAdmin.....
  updateSuperAdmin: function (id, topic) {
    SuperAdmin.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete SuperAdmin.......
  deleteSuperAdmin: function (id)
 {
    return new Promise((resolve, reject) => {
      SuperAdmin.findByIdAndDelete(id, function (err, doc) {
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


module.exports = SuperAdmin1;