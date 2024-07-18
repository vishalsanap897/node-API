const { Promise } = require("mongoose");
const result = require("../models/result.model");

const result1= {


  getAllresult: async function () {
    return await result.find();
  },

  save: async function (resultObject) {
    return await result.create(resultObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await result.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await result.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update result.....
  updateresult: function (id, topic) {
    result.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete result.......
  deleteresult: function (id)
 {
    return new Promise((resolve, reject) => {
      result.findByIdAndDelete(id, function (err, doc) {
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


module.exports = result1;