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
						profile: fork.owner.html_url,
						urls: {
							contributors: fork.contributors_url
						}
					},
					github: fork.html_url
				};
				forks.push(newFork);
			});
			callback(forks);
		});
	}

	CountAllCommits(obj, callback) {
		let fetched = 0;
		obj.data.forks.forEach((fork, i, forks) => {
			console.log(obj.data.urls.contributors);
			this.callCallback(obj.data.urls.contributors, (gitData) => {
				fetched++;
				let count;
				// console.log(gitData);
				if (gitData.length > 0) {
					const ownerContributions = gitData.filter((data) => {
						// console.log('----', data, '|||||', fork);
						return data.login === fork.owner.name;
					});
					// fork.ownerContributions = ownerContributions[0];
					if (fetched === forks.length) {
						count = this.forks.reduce((total, fork) => {
							if (fork.ownerContributions === undefined) {
								// Some people did fork, but didn't commit. Jerks
								fork.ownerContributions = {
									contributions: 0
								};
							}
							return total + fork.ownerContributions.contributions;
						}, 0);
						callback(count);
					}
				} else {
					callback(-1);
				}
			});
		});
	}
}

module.exports = GitAPI;

