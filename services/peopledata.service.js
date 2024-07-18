const { Promise } = require("mongoose");
const peopledata = require("../models/peopledata.model");

const peopledata1= {


  getAllpeopledata: async function () {
    return await peopledata.find();
  },

  save: async function (peopledataObject) {
    return await peopledata.create(peopledataObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await peopledata.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await peopledata.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update peopledata.....
  updatepeopledata: function (id, topic) {
    peopledata.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete peopledata.......
  deletepeopledata: function (id)
 {
    return new Promise((resolve, reject) => {
      peopledata.findByIdAndDelete(id, function (err, doc) {
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


module.exports = peopledata1;