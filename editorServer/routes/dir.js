var express = require('express');
var dirTree = require('directory-tree');
var router = express.Router();
var fs = require('fs');
var tree = dirTree("../resourece");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dirList', { title: 'resourece', resourece: tree, content:""});
});
router.get('/*', function(req, res, next) {
  fs.readFile('../'+req.params['0'], (err, data)=>{
    if (!err){
    	//console.log(data.toString());
      res.render('dirList', { title: req.params['0'], resourece: tree, fileContent:data.toString()});
    }else{
      res.render('dirList', { title: req.params['0'], resourece: tree, fileContent:""});
    }
  })
});
router.post('/*', function (req, res, next) {

	fs.writeFileSync(`../${req.body.name}`, req.body.text)
	res.end("{status: ok}")
});
module.exports = router;
