const API = require('../../scripts/API.js');
// console.log(API);

const api = new API('http://localhost:1337');

window.addEventListener('DOMContentLoaded', () => {
	const repo = document.querySelector('#repo');
	if (repo) {
		const repoName = repo.querySelector('h1').innerText;
		getCount(repoName, (data) => {
			console.log('dcl', data);
			localStorage.setItem('commitCount_' + repoName, data.count)
		});
	}

	const repos = document.querySelectorAll('#repos > div');
	if (repos) {
		console.log(repos);
		repos.forEach((repo) => {
			setCount(repo);
		});
	}
});

const getCount = (repo, callback) => {
	api.callCallback('/api/count/' + repo, (data) => {
		return callback(data);
	});
};

const setCount = (repo) => {
	const ls = localStorage.getItem('commitCount_' + repo.id);
	// console.log(repo.id, ls);
	if (ls) {
		const countEl = document.createElement('span');
		countEl.classList.add('count');
		countEl.innerText = 'Commits: ' + ls;
		repo.appendChild(countEl);
	}

};

