![Logo of the project](https://raw.githubusercontent.com/vandijkstef/performance-matters-server-side/master/public/icon/github-icon.png)

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
Performance tests assume data is cached on the server, using chromes Fast 3G option.
### Initial
* First request: 12.9s | 2.1MB
* Cached request: 1.42s | 643B
### GZIP
* First request: 4.04s | 497KB (saved 8.86 | 1603KB)
* Cached request: 1.42s | 643B
### CSS Minification
* First request: 4.04s | 497KB (saved 0 | 0)
* Cached request: 1.42s | 643B

## Lighthouse Audit
* Performance: 82 (FMP: 3.060ms, FI: 4.110ms, CI: 4.110ms, PSI: 79 (3.091), EIL: 100 (16ms))
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