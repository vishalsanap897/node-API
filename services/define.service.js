const { Promise } = require("mongoose");
const define = require("../models/define.model");

const define1= {


  getAlldefine: async function () {
    return await define.find();
  },

  save: async function (defineObject) {
    return await define.create(defineObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await define.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await define.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update define.....
  updatedefine: function (id, topic) {
    define.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete define.......
  deletedefine: function (id)
 {
    return new Promise((resolve, reject) => {
      define.findByIdAndDelete(id, function (err, doc) {
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


module.exports = define1;