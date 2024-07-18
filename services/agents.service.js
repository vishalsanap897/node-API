const { Promise } = require("mongoose");
const agents = require("../models/agents.model");

const agents1= {


  getAllagents: async function () {
    return await agents.find();
  },

  save: async function (agentsObject) {
    return await agents.create(agentsObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await agents.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await agents.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update agents.....
  updateagents: function (id, topic) {
    agents.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete agents.......
  deleteagents: function (id)
 {
    return new Promise((resolve, reject) => {
      agents.findByIdAndDelete(id, function (err, doc) {
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


module.exports = agents1;