const { Promise } = require("mongoose");
const canteen = require("../models/canteen.model");

const canteen1= {


  getAllcanteen: async function () {
    return await canteen.find();
  },

  save: async function (canteenObject) {
    return await canteen.create(canteenObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await canteen.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await canteen.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update canteen.....
  updatecanteen: function (id, topic) {
    canteen.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete canteen.......
  deletecanteen: function (id)
 {
    return new Promise((resolve, reject) => {
      canteen.findByIdAndDelete(id, function (err, doc) {
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


module.exports = canteen1;