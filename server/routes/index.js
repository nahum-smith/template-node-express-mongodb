var express = require('express');
var router = express.Router();
var DB = require('../db/dbinit');

router.get('/stuff', async function (req, res, next) {
  console.log('got a request')
  let db = await DB.Get()
  var r = await db.collection('people').find().project({
    _id: 0,
    last_name: 1,
    first_name: 1,
    email: 1
  }).limit(50).toArray()
  res.set({
    'Access-Control-Allow-Origin': '*'
  })

  res.json({
    ok: true,
    message: 'SUCCESS',
    person: r
  })
});

router.get('/test1', async function (req, res, next) {
  console.log('got a request')
  let db = await DB.Get()
  var r = await db.collection('people').aggregate([{
      '$match': {
        "$or": [{
            "last_name": "Smith"
          },
          {
            "last_name": "Perez"
          }
        ]
      }
    },
    {
      '$project': {
        '_id': 0,
        'email': 1,
        'first_name': 1,
        'last_name': 1,
        "street_address": "$address.street"
      }
    }
  ]).toArray()
  res.set({
    'Access-Control-Allow-Origin': '*'
  })

  res.json({
    ok: true,
    message: 'SUCCESS',
    person: r
  })
});
router.get('/by-birthday', async function (req, res, next) {
  console.log('got a request')
  let db = await DB.Get()
  let coll = db.collection("people")
  let r = await coll.aggregate([{
      $group: {
        _id: {
          $year: "$birthday"
        },
        people: {
          $push: "$$ROOT"
        }
      }
    }])
    .toArray()
  res.set({
    'Access-Control-Allow-Origin': '*'
  })

  res.json({
    ok: true,
    message: 'SUCCESS',
    response: r
  })
});
module.exports = router;