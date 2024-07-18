
const { Promise } = require("mongoose");
const groupApp = require("../models/app.model");

const groupApp1= {


  getAllgroupApp: async function () {
    return await groupApp.find();
  },

  save: async function (groupAppObject) {
    return await groupApp.create(groupAppObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await groupApp.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await groupApp.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update groupApp.....
  updategroupApp: function (id, topic) {
    groupApp.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete groupApp.......
  deletegroupApp: function (id)
 {
    return new Promise((resolve, reject) => {
      groupApp.findByIdAndDelete(id, function (err, doc) {
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


module.exports = groupApp1;