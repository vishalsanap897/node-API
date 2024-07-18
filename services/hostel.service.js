const { Promise } = require("mongoose");
const hostel = require("../models/hostel.model");

const hostel1= {


  getAllhostel: async function () {
    return await hostel.find();
  },

  save: async function (hostelObject) {
    return await hostel.create(hostelObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await hostel.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await hostel.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update hostel.....
  updatehostel: function (id, topic) {
    hostel.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete hostel.......
  deletehostel: function (id)
 {
    return new Promise((resolve, reject) => {
      hostel.findByIdAndDelete(id, function (err, doc) {
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


module.exports = hostel1;