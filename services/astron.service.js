const { Promise } = require("mongoose");
const astron = require("../models/astron.model");

const astron1= {


  getAllastron: async function () {
    return await astron.find();
  },

  save: async function (astronObject) {
    return await astron.create(astronObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await astron.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await astron.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update astron.....
  updateastron: function (id, topic) {
    astron.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete astron.......
  deleteastron: function (id)
 {
    return new Promise((resolve, reject) => {
      astron.findByIdAndDelete(id, function (err, doc) {
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


module.exports = astron1;