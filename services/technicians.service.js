const { Promise } = require("mongoose");
const technicians = require("../models/technicians.model");

const technicians1= {


  getAlltechnicians: async function () {
    return await technicians.find();
  },

  save: async function (techniciansObject) {
    return await technicians.create(techniciansObject);
  },

 //find by name
 findByName: async function (name) {
  const data = await technicians.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},

  findByid: async function(id) {
    try {
      const doc = await technicians.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update technicians.....
  updatetechnicians: function (id, topic) {
    technicians.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete technicians.......
  deletetechnicians: function (id)
 {
    return new Promise((resolve, reject) => {
      technicians.findByIdAndDelete(id, function (err, doc) {
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


module.exports = technicians1;