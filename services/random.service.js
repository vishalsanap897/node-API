const { Promise } = require("mongoose");
const random = require("../models/random.model");

const random1= {


  getAllrandom: async function () {
    return await random.find();
  },

  save: async function (randomObject) {
    return await random.create(randomObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await random.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await random.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update random.....
  updaterandom: function (id, topic) {
    random.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete random.......
  deleterandom: function (id)
 {
    return new Promise((resolve, reject) => {
      random.findByIdAndDelete(id, function (err, doc) {
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


module.exports = random1;