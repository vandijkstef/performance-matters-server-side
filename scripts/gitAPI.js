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
			callback(data);
		});
	}
}

module.exports = GitAPI;