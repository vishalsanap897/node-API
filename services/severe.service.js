const { Promise } = require("mongoose");
const severe = require("../models/severe.model");

const severe1= {


  getAllsevere: async function () {
    return await severe.find();
  },

  save: async function (severeObject) {
    return await severe.create(severeObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await severe.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await severe.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update severe.....
  updatesevere: function (id, topic) {
    severe.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete severe.......
  deletesevere: function (id)
 {
    return new Promise((resolve, reject) => {
      severe.findByIdAndDelete(id, function (err, doc) {
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


module.exports = severe1;