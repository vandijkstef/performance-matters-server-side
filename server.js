var express = require('express');
// var request = require('request');
var gitAPI = require('./scripts/gitAPI.js');
var app = express();
const settings = require('./scripts/settings.js');
// var host = 'http://dennistel.nl/movies/'

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', function (req, res) {
//   request(host, function (error, response, body) {
//     var data = JSON.parse(body)
//     res.render('index.ejs',)
//   });
	res.render('index.ejs');
});

app.get('/repos', function (req, res) {
	const gitapi = new gitAPI('https://api.github.com');
	// gitapi.callCallback('/orgs/' + 'cmda-minor-web' + '/repos', (data) => {
	// 	console.log(data);
	// 	res.render('repos.ejs');
	// });
	gitapi.GetReposFromOrg(settings.organisation, (data) => {
		console.log(data);
		res.render('repos.ejs');
	});
	// request(host + req.params.id, function (error, response, body) {
	// 	var data = JSON.parse(body);
	// });
});

app.get('/repos/:id', function (req, res) {
	// request(host + req.params.id, function (error, response, body) {
	// 	var data = JSON.parse(body);
	// });
	res.render('repo.ejs');
});

app.listen(1337, function () {
	console.log('server is running on port 1337');
});
