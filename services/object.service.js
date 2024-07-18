const { Promise } = require("mongoose");
const object = require("../models/object.model");

const object1= {


  getAllobject: async function () {
    return await object.find();
  },

  save: async function (objectObject) {
    return await object.create(objectObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await object.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await object.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update object.....
  updateobject: function (id, topic) {
    object.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete object.......
  deleteobject: function (id)
 {
    return new Promise((resolve, reject) => {
      object.findByIdAndDelete(id, function (err, doc) {
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


module.exports = object1;