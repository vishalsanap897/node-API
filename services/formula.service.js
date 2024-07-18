const { Promise } = require("mongoose");
const formula = require("../models/formula.model");

const formula1= {


  getAllformula: async function () {
    return await formula.find();
  },

  save: async function (formulaObject) {
    return await formula.create(formulaObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await formula.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await formula.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update formula.....
  updateformula: function (id, topic) {
    formula.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete formula.......
  deleteformula: function (id)
 {
    return new Promise((resolve, reject) => {
      formula.findByIdAndDelete(id, function (err, doc) {
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


module.exports = formula1;