const { Promise } = require("mongoose");
const feesdata = require("../models/feesdata.model");

const feesdata1= {


  getAllfeesdata: async function () {
    return await feesdata.find();
  },

  save: async function (feesdataObject) {
    return await feesdata.create(feesdataObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await feesdata.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await feesdata.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update feesdata.....
  updatefeesdata: function (id, topic) {
    feesdata.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete feesdata.......
  deletefeesdata: function (id)
 {
    return new Promise((resolve, reject) => {
      feesdata.findByIdAndDelete(id, function (err, doc) {
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


module.exports = feesdata1;