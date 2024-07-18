const { Promise } = require("mongoose");
const admin = require("../models/admin.model");
const adminModel = require("../models/admin.model");

const admin1= {


  getAlladmin: async function () {
    return await admin.find();
  },

  save: async function (adminObject) {
    return await admin.create(adminObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await admin.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
  

  findByid: async function(id)
 {
  try {
    const doc = await admin.findById(id)
;
    console.log("dataa ", doc);
    return doc;
  } catch (err) {
    console.log("error ", err);
    return false;
  }
},

  //update admin.....
  updateadmin: function (id, topic) {
    admin.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete admin.......
  deleteadmin: function (id)
 {
    return new Promise((resolve, reject) => {
      admin.findByIdAndDelete(id, function (err, doc) {
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


module.exports = admin1;