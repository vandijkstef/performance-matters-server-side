var express = require('express');
// var request = require('request');
var gitAPI = require('./scripts/gitAPI.js');
var app = express();
const settings = require('./scripts/settings.js');
const storage = require('json-fs-store')('./cache');
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
	// TODO: Test if data is old enough to refresh]
	storage.load('repo-list', (err, data) => {
		if (err || Date.now() - data.stored > 21600000) { // 6 hours
			console.log('new data');
			const gitapi = new gitAPI('https://api.github.com');
			gitapi.GetReposFromOrg(settings.organisation, (data) => {
				// console.log(data);
				const repos = [];
				data.forEach((repo) => {
					const newRepo = {
						name: repo.name,
						urls:  {
							forks: repo.forks_url,
							github: repo.html_url
						}
					};
					repos.push(newRepo);
				});
				storage.add({
					id: 'repo-list',
					stored: Date.now(),
					repos: repos
				}, function(err) {
					if (err) throw err;
					repos.forEach((repo) => {
						storage.add({
							id: 'repo-' + repo.name,
							stored: Date.now(),
							data: repo
						}, ()=> {
							if (err) throw err;
						});
					});
					res.render('repos.ejs', {repos: repos});
				});
			});
		} else {
			console.log('got data');
			res.render('repos.ejs', {repos: data.repos});

		}
	});
	
});

app.get('/repos/:id', function (req, res) {
	storage.load('repo-' + req.params.id, (err, obj) => {
		let data = {};
		Object.assign(data, obj.data);
		if (err || Date.now() - data.stored > 21600000) { // 6 hours
			data.name = req.params.id;
			data.noData = true;
			res.render('repo.ejs', {data: data});
		} else {
			if (!data.expanded || Date.now() - data.stored > 21600000) { // 6 hours
				// TODO: Expand data
				res.render('repo.ejs', {data: data});
			} else {
				res.render('repo.ejs', {data: data});
			}
		}
	});
});

app.listen(1337, function () {
	console.log('server is running on port 1337');
});
