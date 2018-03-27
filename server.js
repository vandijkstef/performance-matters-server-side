var express = require('express');
// var request = require('request');
var gitAPI = require('./scripts/gitAPI.js');
var app = express();
const settings = require('./scripts/settings.js');
const storage = require('json-fs-store')('./cache');
const compression = require('compression');
// var host = 'http://dennistel.nl/movies/'

app.use(compression());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', function (req, res) {
	res.render('index.ejs');
});

app.get('/repos', function (req, res) {
	storage.load('repos-list', (err, data) => {
		if (err || Date.now() - data.stored > 21600000) { // 6 hours
			const gitapi = new gitAPI();
			gitapi.GetReposFromOrg(settings.organisation, (data) => {
				const repos = [];
				data.forEach((repo) => {
					const newRepo = {
						name: repo.name,
						urls:  {
							forks: repo.forks_url,
							github: repo.html_url,
						}
					};
					repos.push(newRepo);
				});
				storage.add({
					id: 'repos-list',
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
			res.render('repos.ejs', {repos: data.repos});
		}
	});
});

app.get('/repos/:id', function (req, res) {
	storage.load('repo-' + req.params.id, (err, obj) => {
		let data = {};
		if (err) {
			data.name = req.params.id;
			data.noData = true;
			res.render('repo.ejs', {data: data});
		} else {
			Object.assign(data, obj.data);
			if (!data.expanded || Date.now() - data.stored > 21600000) { // 6 hours
				const gitapi = new gitAPI();
				gitapi.GetAllForks(data.urls.forks, (forkData) => {
					data.forks = forkData;
					data.expanded = true;
					storage.add({
						id: 'repo-' + data.name,
						stored: Date.now(),
						data: data
					}, ()=> {
						if (err) throw err;
						res.render('repo.ejs', {data: data});
					});
				});
			} else {
				console.log('no data update');
				return res.render('repo.ejs', {data: data});
			}
		}
	});
});

app.get('/api/count/:id', function(req, res) {
	storage.load('repo-' + req.params.id, (err, obj) => {
		const json = {};
		if (err) {
			json.message = 'Error fetching data';
		} else if (!obj.data.commitCount || Date.now() - obj.data.stored > 21600000) {
			const gitapi = new gitAPI();
			gitapi.CountAllCommits(obj, (data) => {
				const count = data || -1; 
				json.count = count;
				obj.data.commitCount = count;
				storage.add({
					id: obj.id,
					stored: Date.now(),
					data: obj.data
				}, ()=> {
					if (err) throw err;
					res.send(json);
				});
			});
		} else {
			json.count = obj.data.commitCount;
			res.send(json);
		}
	});
});

app.listen(1337, function () {
	console.log('server is running on port 1337');
});