const { Promise } = require("mongoose");
const request = require("../models/request.model");

const request1= {


  getAllrequest: async function () {
    return await request.find();
  },

  save: async function (requestObject) {
    return await request.create(requestObject);
  },

 //find by name
 findByName: async function (name) {
  const data = await request.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},

  findByid: async function(id) {
    try {
      const doc = await request.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update request.....
  updaterequest: function (id, topic) {
    request.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete request.......
  deleterequest: function (id)
 {
    return new Promise((resolve, reject) => {
      request.findByIdAndDelete(id, function (err, doc) {
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


module.exports = request1;