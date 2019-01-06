var express = require('express');
var router = express.Router();
var DB = require('../db/dbinit');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/:email', async (req, res, next) => {
  var {
    email
  } = req.params

  var db = await DB.Get()
  var coll = db.collection('people')
  var r = await coll.findOne({
    email: email
  })
  console.log(r)
  res.json({
    ok: true,
    user: r
  })
})


module.exports = router;