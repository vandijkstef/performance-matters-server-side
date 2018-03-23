const API = require('../../scripts/API.js');
// console.log(API);

const api = new API('http://localhost:1337');

window.addEventListener('DOMContentLoaded', () => {
	const repo = document.querySelector('#repo');
	if (repo !== undefined) {
		const repoName = repo.querySelector('h1').innerText;
		getCount(repoName, (data) => {
			console.log(data);
		});
	}
});

const getCount = function(repo, callback) {
	api.callCallback('/api/count/' + repo, (data) => {
		return callback(data);
	});
};