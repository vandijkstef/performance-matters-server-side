// import debug from './debug.js';
// import settings from './settings.js';
// const settings = require('./settings.js');
const request = require('request');

class API {
	constructor(server) {
		// debug.log('API: Created for: ' + server);
		this.server = server;
	}

	callCallback(url, callback) {
		// debug.log('API: Calling: "' + url + '" on ' + this.server);
		// const API = new XMLHttpRequest();
		// url = url.replace(this.server, ''); // Git gives full urls, so strip the server from the url
		// API.open('GET', this.server + url + '?access_token=' + settings.tokens.git);
		// API.setRequestHeader('Content-Type', 'application/json');
		// API.onload = function() {
		// 	appData.apiCalls++;
		// 	if (API.status === 200) {
		// 		return callback(JSON.parse(API.responseText));
		// 	} else {
		// 		console.warn('We didn\'t receive 200 status');
		// 	}
		// };
		// API.send();
		url = url.replace(this.server, ''); // Git gives full urls, so strip the server from the url
		request({
			url: this.server + url + this.auth,
			headers: {
				'User-Agent': 'NODEJS'
			}
		}, function (error, response, body) {
			try {
				const data = JSON.parse(body);
				callback(data);
			} catch(err) {
				callback({message: 'Could not parse received data'});
			}
		});
	}

	// callPromise(url) {
	// 	const promise = new Promise((resolve, reject) => {
	// 		const API = new XMLHttpRequest();
	// 		url = url.replace(this.server, ''); // Git gives full urls, so strip the server from the url
	// 		API.open('GET', this.server + url + '?access_token=' + settings.tokens.git + '&per_page=100');
	// 		API.setRequestHeader('Content-Type', 'application/json');
	// 		API.onload = function() {
	// 			// appData.apiCalls++;
	// 			if (API.status === 200) {
	// 				resolve(JSON.parse(API.responseText));
	// 			} else {
	// 				reject('We didn\'t receive 200 status');
	// 			}
	// 		};
	// 		API.onerror = reject();
	// 		API.send();
	// 	});
	// 	return promise;
	// }
}

module.exports = API;