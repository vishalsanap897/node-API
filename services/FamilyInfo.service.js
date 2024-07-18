const { Promise } = require("mongoose");
const familyInfo = require("../models/familyInfo.model");

const familyInfo1= {


  getAllfamilyInfo: async function () {
    return await familyInfo.find();
  },

  save: async function (familyInfoObject) {
    return await familyInfo.create(familyInfoObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await familyInfo.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await familyInfo.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update familyInfo.....
  updatefamilyInfo: function (id, topic) {
    familyInfo.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete familyInfo.......
  deletefamilyInfo: function (id)
 {
    return new Promise((resolve, reject) => {
      familyInfo.findByIdAndDelete(id, function (err, doc) {
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


module.exports = familyInfo1;