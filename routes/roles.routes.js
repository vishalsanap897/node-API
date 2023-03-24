const express = require("express");
const router = express.Router();
const rolesService = require("../services/roles.service");

// router.get('/', (req, res, next) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send('Hello World!');
//   // ⛔️ Setting headers after response has been sent
//   res.setHeader('Content-Type', 'text/html');
// });


router.get('/', async (req, res, next) => {
  try {
    const result = await rolesService.getAll(req);
    if (!result) {
      result = { status: 500 }
    }
    res.status(result.status).send(result);
  }
  catch (error) {
    res.status(error.status).send(error);
  }
});


router.get('/:roles_id', async (req, res, next) => {
  const { roles_id } = req.params;
  try {
    console.log('roles_id', roles_id)
    const result = await rolesService.getById(roles_id);
    if (!result) {
      result = { status: 500 }
    }
    res.status(result.status).send(result);
  }
  catch (error) {
    res.status(error.status).send(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await rolesService.save(req.body);
    if (!result) {
      result = { status: 500 }
    }
    res.status(result.status).send(result);
  }
  catch (error) {
    res.status(error.status).send(error);
  }
});
router.put('/:roles_id', async (req, res, next) => {
  try {
    const update = req.body;
    const { roles_id } = req.params;
    const result = await rolesService.updateById(roles_id, update);
    if (!result) {
      result = { status: 500 }
    }
    res.status(result.status).send(result);

  } catch (error) {
    res.status(error.status).send(error);
  }
});

router.delete('/:roles_id', async (req, res, next) => {
  try {
    const { roles_id } = req.params;
    const result = await rolesService.deleteById(roles_id);
    if (!result) {
      result = { status: 500 }
    }
    res.status(result.status).send(result);

  } catch (error) {
    res.status(error.status).send(error);
  }
});
module.exports = router;











