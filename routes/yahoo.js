var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const location = req.query['location'] ? req.query['location'] : '';
	const OAuth = require('oauth');
	let header = {
	    "X-Yahoo-App-Id": "NIsmUI4o"
	};
	let request = new OAuth.OAuth(
	    null,
	    null,
	    'dj0yJmk9bVZmc0llSWdicFZJJmQ9WVdrOVRrbHpiVlZKTkc4bWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PThi',
	    '9e5a0d88612e77350d8e91d94402ac66046dade5',
	    '1.0',
	    null,
	    'HMAC-SHA1',
	    null,
	    header
	);
	console.log('https://weather-ydn-yql.media.yahoo.com/forecastrss?location=' + location + '&format=json');
	request.get(
	    'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=' + location + '&format=json',
	    null,
	    null,
	    function (err, data, result) {
	        if (err) {
	            res.status(400)
	        	.send(JSON.stringify({"success":false, data: JSON.parse(data)}));
	        } else {
	        	res.status(200)
	        	.send(JSON.stringify({"success":true, data: JSON.parse(data)}));
	        }
	    }
	);
});

module.exports = router;
