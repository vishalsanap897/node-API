const { Promise } = require("mongoose");
const booking = require("../models/booking.model");

const booking1= {


  getAllbooking: async function () {
    return await booking.find();
  },

  save: async function (bookingObject) {
    return await booking.create(bookingObject);
  },

 //find by name
 findByName: async function (name) {
  const data = await booking.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
  
  findByid: async function(id) {
    try {
      const doc = await booking.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update booking.....
  updatebooking: function (id, topic) {
    booking.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete booking.......
  deletebooking: function (id)
 {
    return new Promise((resolve, reject) => {
      booking.findByIdAndDelete(id, function (err, doc) {
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


module.exports = booking1;