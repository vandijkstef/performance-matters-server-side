const API = require('./API.js');
const settings = require('./settings.js');

class GitAPI extends API {
	constructor() {
		super('https://api.github.com');
		this.auth = '?access_token=' + settings.tokens.git;
	}
	
	GetReposFromOrg(organisation, callback) {
		this.callCallback('/orgs/' + organisation + '/repos' + this.auth, (data) => {
			callback(data);
		});
	}

	GetAllForks(forks_url, callback) {
		this.callCallback(forks_url, (data) => {
			const forks = [];
			data.forEach((fork) => {
				const newFork = {
					owner: {
						name: fork.owner.login,
						avatar: fork.owner.avatar_url,
						profile: fork.owner.html_url
					},
					github: fork.html_url
				};
				forks.push(newFork);
			});
			callback(forks);
		});
	}

	CountAllCommits(contributors_url, callback) {
		this.callCallback(contributors_url, (data) => {
			// TODO:

			callback(data);
		});
	}
}

module.exports = GitAPI;

// countAllCommits(refresh, callback) {
// 	if (!this.totalCommitsInForks || refresh) {
// 		const gitAPI = new GitAPI();
// 		// const gitAPI = new GitAPI();
// 		let fetched = 0;
// 		this.getAllForks(refresh, () => {
// 			// Get contributors per fork
// 			this.forks.forEach((fork, i, forks) => {
// 				gitAPI.callPromise(this.appData, fork.urls.contributors)
// 					.then((data) => {
// 						fetched++;
// 						fork.contribData = data;
// 						const ownerContributions = fork.contribData.filter((data) => {
// 							return data.login === fork.owner;
// 						});
// 						fork.ownerContributions = ownerContributions[0];
// 						if (fetched === forks.length) {
// 							let count = this.forks.reduce((total, fork) => {
// 								if (fork.ownerContributions === undefined) {
// 									// Some people did fork, but didn't commit. Jerks
// 									fork.ownerContributions = {
// 										contributions: 0
// 									};
// 								}
// 								return total + fork.ownerContributions.contributions;
// 							}, 0);
// 							this.totalCommitsInForks = count;
// 							callback();
// 						}
// 					})
// 					.catch((err) => {
// 						debug.warn(err);
// 						debug.warn('Repo: countAllCommits: callPromise: catch()');
// 						return callback(false);
// 					});
// 			});
// 		});
// 	} else {
// 		return callback();
// 	}
// }