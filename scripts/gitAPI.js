const API = require('./API.js');
const settings = require('./settings.js');

class GitAPI extends API {
	constructor() {
		super('https://api.github.com');
		this.auth = '?access_token=' + settings.tokens.git;
	}

	
	GetReposFromOrg(organisation, callback) {
		this.callCallback('/orgs/' + organisation + '/repos' + this.auth, (data) => {
			console.log('one');
			callback(data);
		});
	}
}

module.exports = GitAPI;