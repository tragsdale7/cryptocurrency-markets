const request = require('request');
const express = require('express');
const app = express();
const api = require('./api.js');

app.use(express.static('./'));

app.get('/data', (req, res) => {
	request(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=USD&CMC_PRO_API_KEY=${api.apiKey}`, function(error, response, body){
			// console.log('error', error);
			// console.log('statusCode:', response && response.statusCode);
			// console.log('body', body);
			let data = JSON.parse(body);
			res.json(data)
	});
		
});	

app.get('/', (req, res) => {
	res.render('index.html');
});


app.listen(3001, () => console.log('Listening on port 3001...'))