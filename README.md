![Logo of the project](public/icons/github-icon.png?raw=true)

# Github Organisation Explorer
> This is a server-side version of the [client-side Github organisation explorer](https://github.com/vandijkstef/wafs).

This app can be linked to a GitHub organisation to explore information about it. View the repositories and forks within that organisation. This was created as part of the Webdevelopment Minor at CMD Amsterdam.

## Installing / Getting started
Clone the repo. Run the following command to initialize all modules

```shell
npm install
```

Additionally, to build, make sure you have the following packages:
* Browserify (npm install -g browserify)
* Uglify (npm install -g uglify-es)

Build the app by using
```shell
npm run build
```
This will run all pre-build commands:
* build:js
* // TODO: build:css

To start the server use
```
node server.js
```
Additionally, there are build & run commands available:
* npm run build:run (npm run build && node server.js)
* npm run build:watch (npm run build && nodemon server.js)

**Note that you will quickly need a GitHub API key set in /scripts/settings.js**

## Features
### Data store/cache
The application uses [**json-fs-store**](https://github.com/alexkwolfe/json-fs-store) to cache the data.
There is one general list of repo's, used by the overview page.
Additionally, every repo has it's own file, which will have its data expanded upon first load. All data will refresh upon request after 6 hours.

### Client side enhancement
If JS is available, a client side API call will fetch the total amount of commits. This JS is compiled using Browserify.

## Service worker
The Service Worker will enable the app to immediatly cache the static assets and a simple offline page. This way the user will have a quick experience with the app. Should the user disconnect from the internet, they will still be able to navigate to previous used pages. Otherwise, the offline message is shown.

## Configuration
All settings reside in /scripts/settings.js such as the organisation and GitHub API key.

## Performance
### Initial
![stage-0](docimg/state-0.png?raw=true)
### Gzipping
![stage-1](docimg/state-1.png?raw=true)
Saved compared to last set:
* 13.010 - 4.200 = 8.810 ms
### CSS minify
![stage-2](docimg/state-2.png?raw=true)
Saved compared to last set:
* 4.200 - 4.210 = -0.010 ms
### Service worker
![stage-3](docimg/state-3.png?raw=true)
Saved compared to last set:
* 4.210 - 1.200 = 3.010 ms
### Minify JS
![stage-4](docimg/state-4.png?raw=true)
Saved compared to last set:
* 1.200 - 1.180 = 0.020 ms

## Final Audit
This is the same as the above minify JS state.
![performance audit](docimg/cmda_gh-pa.png?raw=true)
* Performance: 95
	* Due to render blocking CSS
* PWA: 91
	* Due to non-HTTPS
* Accessibility: 100
* Best practises: 94
	* Due to HTTP/1
* SEO: 100

## Links
* Project homepage: https://vandijkstef.github.com/awesome-project/
* Live Demo: http://wafs.minor.vandijkstef.nl (Currently outdated - Old client-side app)

## Licensing
"The code in this project is licensed under MIT license."