const { Promise } = require("mongoose");
const control = require("../models/control.model");

const control1= {


  getAllcontrol: async function () {
    return await control.find();
  },

  save: async function (controlObject) {
    return await control.create(controlObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await control.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await control.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update control.....
  updatecontrol: function (id, topic) {
    control.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete control.......
  deletecontrol: function (id)
 {
    return new Promise((resolve, reject) => {
      control.findByIdAndDelete(id, function (err, doc) {
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


module.exports = control1;