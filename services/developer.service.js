const { Promise } = require("mongoose");
const developer = require("../models/developer.model");

const developer1= {


  getAlldeveloper: async function () {
    return await developer.find();
  },

  save: async function (developerObject) {
    return await developer.create(developerObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await developer.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await developer.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update developer.....
  updatedeveloper: function (id, topic) {
    developer.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete developer.......
  deletedeveloper: function (id)
 {
    return new Promise((resolve, reject) => {
      developer.findByIdAndDelete(id, function (err, doc) {
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


module.exports = developer1;