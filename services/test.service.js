const { Promise } = require("mongoose");
const test = require("../models/test.model");

const test1= {


  getAlltest: async function () {
    return await test.find();
  },

  save: async function (testObject) {
    return await test.create(testObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await test.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await test.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update test.....
  updatetest: function (id, topic) {
    test.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete test.......
  deletetest: function (id)
 {
    return new Promise((resolve, reject) => {
      test.findByIdAndDelete(id, function (err, doc) {
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


module.exports = test1;