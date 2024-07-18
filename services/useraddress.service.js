const { Promise } = require("mongoose");
const useraddress = require("../models/useraddress.model");

const useraddress1= {


  getAlluseraddress: async function () {
    return await useraddress.find();
  },

  save: async function (useraddressObject) {
    return await useraddress.create(useraddressObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await useraddress.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await useraddress.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update useraddress.....
  updateuseraddress: function (id, topic) {
    useraddress.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete useraddress.......
  deleteuseraddress: function (id)
 {
    return new Promise((resolve, reject) => {
      useraddress.findByIdAndDelete(id, function (err, doc) {
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


module.exports = useraddress1;