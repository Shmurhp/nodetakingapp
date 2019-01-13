var express = require('express');
var app = express();

var AWS = require("aws-sdk");
  
AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Nodes";

var params = {
    TableName: table,
    ProjectExpression: "id, quote"
};

app.get('/', function (req, res) {
	docClient.scan(params, onScan);
	var result = '';
	var arr = [];
	function onScan(err, data) {
	    if (err) {
        	console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
	    } else {
		console.log("Scan succeeded.");	
		console.log(data);
	        data.Items.forEach(function(note) {
			arr.push(note.quote);
		});
		var count = arr.length;
		function getRandomInt(max) {
 			 return Math.floor(Math.random() * max);
		}	
		var max = parseInt(count);
		var arrIndex = getRandomInt(max);
		res.send(arr[arrIndex]);;
		console.log(max + ' gives us: ' + arrIndex + ' which will return ' + arr[arrIndex]);
	    }
	}
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
