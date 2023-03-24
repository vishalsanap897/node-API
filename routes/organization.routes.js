const express = require("express");
const router = express.Router();
const organizationService = require("../services/organization.service");

//get all
router.get('/', async (req, res, next) => {
  try {
      const result = await organizationService.getAll(req);
      if(!result){
        result= {status: 500}
      }
      res.status(result.status).send(result);
  }
  catch (error) {
    res.status(error.status).send(error);
  }
});

router.get('/:organization_id', async (req, res, next) => {
  const { organization_id } = req.params;
  try {
      const result = await organizationService.getById(organization_id);
      if(!result){
        result= {status: 500}
      }
      res.status(result.status).send(result);
  }
  catch (error) {
    res.status(error.status).send(error);
  }
});

//create group
router.post('/', async (req, res, next) => {
  try {
      const result = await organizationService.save(req.body);
      if(!result){
        result= {status: 500}
      }
      res.status(result.status).send(result);
  }
  catch (error) {
    res.status(error.status).send(error);
  }
});

router.put('/:organization_id', async (req, res, next) => {
  try {
      const update = req.body;
      const { organization_id } = req.params;
      const result = await organizationService.updateById(organization_id, update);
      if(!result){
        result= {status: 500}
      }
      res.status(result.status).send(result);

  } catch (error) {
    res.status(error.status).send(error);
  }
});

router.delete('/:organization_id', async (req, res, next) => {
  try {
      const { organization_id } = req.params;
      const result = await organizationService.deleteById(organization_id);
      if(!result){
        result= {status: 500}
      }
      res.status(result.status).send(result);

  } catch (error) {
    res.status(error.status).send(error);
  }
});




module.exports = router;



