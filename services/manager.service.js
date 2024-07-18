const { Promise } = require("mongoose");
const manager = require("../models/manager.model");

const manager1= {


  getAllmanager: async function () {
    return await manager.find();
  },

  save: async function (managerObject) {
    return await manager.create(managerObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await manager.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },


  findByid: async function(id) {
    try {
      const doc = await manager.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update manager.....
  updatemanager: function (id, topic) {
    manager.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete manager.......
  deletemanager: function (id)
 {
    return new Promise((resolve, reject) => {
      manager.findByIdAndDelete(id, function (err, doc) {
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


module.exports = manager1;