const { Promise } = require("mongoose");
const code = require("../models/code.model");

const code1= {


  getAllcode: async function () {
    return await code.find();
  },

  save: async function (codeObject) {
    return await code.create(codeObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await code.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await code.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update code.....
  updatecode: function (id, topic) {
    code.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete code.......
  deletecode: function (id)
 {
    return new Promise((resolve, reject) => {
      code.findByIdAndDelete(id, function (err, doc) {
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


module.exports = code1;