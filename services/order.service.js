const { Promise } = require("mongoose");
const order = require("../models/order.model");

const order1= {


  getAllorder: async function () {
    return await order.find();
  },

  save: async function (orderObject) {
    return await order.create(orderObject);
  },

 //find by name
 findByName: async function (name) {
  const data = await order.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},


  findByid: async function(id) {
    try {
      const doc = await order.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update order.....
  updateorder: function (id, topic) {
    order.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete order.......
  deleteorder: function (id)
 {
    return new Promise((resolve, reject) => {
      order.findByIdAndDelete(id, function (err, doc) {
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


module.exports = order1;