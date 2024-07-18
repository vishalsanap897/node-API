const { Promise } = require("mongoose");
const market = require("../models/market.model");

const market1= {


  getAllmarket: async function () {
    return await market.find();
  },

  save: async function (marketObject) {
    return await market.create(marketObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await market.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await market.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update market.....
  updatemarket: function (id, topic) {
    market.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete market.......
  deletemarket: function (id)
 {
    return new Promise((resolve, reject) => {
      market.findByIdAndDelete(id, function (err, doc) {
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


module.exports = market1;