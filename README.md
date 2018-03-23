# Github Organisation Explorer
This is a server-side version of the [client-side Github organisation explorer](https://github.com/vandijkstef/wafs).

## Usage
Clone the repo. Run the following command to initialize all modules
```
npm install
```
Additionally, to build, make sure you have the following packages:
* Browserify (npm install -g browserify)

Build the app by using
```
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

## Data store/cache
The application uses [**json-fs-store**](https://github.com/alexkwolfe/json-fs-store) to cache the data.
There is one general list of repo's, used by the overview page.
Additionally, every repo has it's own file, which will have its data expanded upon first load. All data will refresh upon request after 6 hours.

## Client side enhancement
If JS is available, a client side API call will fetch the total amount of commits. This JS is compiled using Browserify.

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