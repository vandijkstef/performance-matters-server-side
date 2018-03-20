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
			callback(data);
		});
	}

	CountAllCommits(contributors_url, callback) {
		this.callCallback(contributors_url, (data) => {
			callback(data);
		});
	}
}

module.exports = GitAPI;