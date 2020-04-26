var express = require('express');
var router = express.Router();

var db = require("../db");

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.get().query('SELECT * from items', function(err, response, fields){
		if(err) {
			console.log(err);
			return;
		}
		res.json(response);
	});

});


router.post('/', function(req, res){
	const type = req.body.type;
	if(type === "new"){
		const text = req.body.text;
		db.get().query('SELECT MAX(ID) from items', function(err, result, fields){
			if(err){
				console.log(err);
				return;
			}
			console.log(result);
			let resRaw = result[0]['MAX(ID)'];
			let max_id = resRaw!==null? Number(resRaw):-1;
			const new_item = {
				ID: max_id+1,
				content: text,
				completed: 0
			}

			db.get().query("INSERT INTO items SET ?", new_item , function(err, result, fields){
				if(err){
					console.log(err);
					return;
				}
				console.log(`Added new todo item with id ${max_id+1} and value ${text}`);
				res.send("done");
			})
		});
	}
	else if(type==="update"){
		const {ID, completed} = req.body;
		db.get().query(`UPDATE items SET completed=${completed} WHERE ID=${ID}`, function(err, result, fields){
			if(err){
				console.log(err);
				return;
			}
			console.log(`Set completion of item with id ${ID} to ${completed}`);
			res.send("done");
		})
	}
})
module.exports = router;
