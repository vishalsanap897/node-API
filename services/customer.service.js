const { Promise } = require("mongoose");
const customer = require("../models/customer.model");

const customer1= {


  getAllcustomer: async function () {
    return await customer.find();
  },

  save: async function (customerObject) {
    return await customer.create(customerObject);
  },

 //find by name
 findByName: async function (name) {
  const data = await customer.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},


  findByid: async function(id)
 {
  try {
    const doc = await customer.findById(id)
;
    console.log("dataa ", doc);
    return doc;
  } catch (err) {
    console.log("error ", err);
    return false;
  }
},



  //update customer.....
  updatecustomer: function (id, topic) {
    customer.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete customer.......
  deletecustomer: function (id)
 {
    return new Promise((resolve, reject) => {
      customer.findByIdAndDelete(id, function (err, doc) {
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


module.exports = customer1;