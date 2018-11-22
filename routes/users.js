var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// use post
router.post('/', function(req, res){
  res.send('Got a POST request')
})

// use put
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

// use delete
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

module.exports = router;
