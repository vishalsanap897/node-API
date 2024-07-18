const express = require("express");
const router = express.Router();
const shortcutService = require("../services/shortcut.service");


// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req, res) => {
  res.send("shortcut API 1.0");
});

//find by name
router.get("/find", (req, res) => {
  shortcutService.findByName(req.query.name)
    .then((data) => {
      res.status(200).send({
        status: 200,
        success: true,
        data: data,
        message: "shortcut fetched successfully",
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
    const result = await shortcutService.findByid(req.params.id);
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
  let result = await shortcutService.getAllshortcut();
  res.status(200).send({
    status: 200,
    success: true,
    data: result,
    message: "shortcut fetched successfully",
  });
});

//post collecton
router.post("/add-data", (req, res) => {
  shortcutService.save(req.body)
    .then(function (data) {
      console.log("savvev", data)
      res.status(201).send({
        status: 201,
        success: true,
        data: data,
        message: "fetched shortcut successfully",

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



//Update shortcut......
router.put("/update/:id", (req, res) => {
  console.log("Routes", req.params.id);
  try {
    const result = shortcutService.updateshortcut(req.params.id,req.body);
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
//Delete shortcut.....
router.delete("/delete/:id", async (req, res) => {
  const result = await shortcutService.deleteshortcut(req.params.id);
  console.log(result);
  res.send({
    messsage: 'data deleted',
    data: result,
    success: true
  });
});




module.exports = router;