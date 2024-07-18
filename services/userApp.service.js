const { Promise } = require("mongoose");
const userApp = require("../models/userApp.model");

const userApp1= {


  getAlluserApp: async function () {
    return await userApp.find();
  },

  save: async function (userAppObject) {
    return await userApp.create(userAppObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await userApp.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await userApp.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update userApp.....
  updateuserApp: function (id, topic) {
    userApp.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete userApp.......
  deleteuserApp: function (id)
 {
    return new Promise((resolve, reject) => {
      userApp.findByIdAndDelete(id, function (err, doc) {
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


module.exports = userApp1;