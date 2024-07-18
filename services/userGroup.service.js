const { Promise } = require("mongoose");
const userGroup = require("../models/userGroup.model");

const userGroup1= {


  getAlluserGroup: async function () {
    return await userGroup.find();
  },

  save: async function (userGroupObject) {
    return await userGroup.create(userGroupObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await userGroup.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await userGroup.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update userGroup.....
  updateuserGroup: function (id, topic) {
    userGroup.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete userGroup.......
  deleteuserGroup: function (id)
 {
    return new Promise((resolve, reject) => {
      userGroup.findByIdAndDelete(id, function (err, doc) {
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


module.exports = userGroup1;