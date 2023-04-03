const express = require("express");
const router = express.Router();
const CollectionService = require("../services/app.service");


// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req, res) => {
  res.send("Collection API 1.0");
});

router.get("/Get-all-data", async (req, res) => {
  let result = await CollectionService.getAllCollection();
  res.status(200).send({
    status: 200,
    success: true,
    data: result,
    message: "Collection fetched successfully",
  });
});

//post collecton
router.post("/update-data", (req, res) => {
  CollectionService.save(req.body)
    .then(function (data) {
      console.log("savvev", data)
      res.status(201).send({
        status: 201,
        success: true,
        data: data,
        message: "fetched collection successfully",

      });
      console.log("savvev", data)
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        success: false,
        data: null,
        message: "Internal server error",
      });
      console.log("err", err)
    });
});



//Update collection......
router.put("/update/:id", (req, res) => {
  console.log("Routes", req.params.id);
  try {
    const result = CollectionService.updateCollection(req.params.id,req.body);
    res.send({
      status: 204,
      data: result,
      success: true,
      message: "Updated succefully",
    });
  }
  catch (err) {
    res.send({
      status: 500,
      data: undefined,
      success: true,
      message: err,
    });
  };
});
//Delete collection.....
router.delete("/delete/:id", async (req, res) => {
  const result = await CollectionService.deleteCollection(req.params.id);
  console.log(result);
  res.send({
    messsage: 'data deleted',
    data: result,
    success: true
  });
});




module.exports = router;