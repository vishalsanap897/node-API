const { Promise } = require("mongoose");
const permission = require("../models/permission.model");

const permission1= {


  getAllpermission: async function () {
    return await permission.find();
  },

  save: async function (permissionObject) {
    return await permission.create(permissionObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await permission.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await permission.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update permission.....
  updatepermission: function (id, topic) {
    permission.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete permission.......
  deletepermission: function (id)
 {
    return new Promise((resolve, reject) => {
      permission.findByIdAndDelete(id, function (err, doc) {
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


module.exports = permission1;