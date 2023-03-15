var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
    res.send({
        code:200,
        data:'成功'
    })
});

module.exports = router;