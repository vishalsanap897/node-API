const express = require("express");
const router = express.Router();
const userAppService = require("../services/userApp.service");


// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req, res) => {
  res.send("userApp API 1.0");
});


//find by name
router.get("/find", (req, res) => {
  userAppService.findByName(req.query.name)
    .then((data) => {
      res.status(200).send({
        status: 200,
        success: true,
        data: data,
        message: "userApp fetched successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        success: false,
        data: null,
        message: "Internal server error",
      });
    });
});



router.get("/find/:id", async (req, res) => {
  console.log("Routes", req.params.id);
  try {
    const result = await userAppService.findByid(req.params.id);
    if (!result) {
      // If no document was found with the specified ID, send a 404 status code
      res.status(404).send({
        success: false,
        message: "Document not found",
      });
    } else {
      res.send({
        status: 200,
        data: result,
        success: true,
        message: "Document retrieved successfully",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/Get-all-data", async (req, res) => {
  let result = await userAppService.getAlluserApp();
  res.status(200).send({
    status: 200,
    success: true,
    data: result,
    message: "userApp fetched successfully",
  });
});

//post collecton
router.post("/add-data", (req, res) => {
  userAppService.save(req.body)
    .then(function (data) {
      console.log("savvev", data)
      res.status(201).send({
        status: 201,
        success: true,
        data: data,
        message: "fetched userApp successfully",

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



//Update userApp......
router.put("/update/:id", (req, res) => {
  console.log("Routes", req.params.id);
  try {
    const result = userAppService.updateuserApp(req.params.id,req.body);
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
//Delete userApp.....
router.delete("/delete/:id", async (req, res) => {
  const result = await userAppService.deleteuserApp(req.params.id);
  console.log(result);
  res.send({
    messsage: 'data deleted',
    data: result,
    success: true
  });
});




module.exports = router;