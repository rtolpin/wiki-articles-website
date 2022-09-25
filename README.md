### Live Website Link: https://wikipages.us and https://react-wikipedia-articles.uk.r.appspot.com
# How to Run React App
### `git clone` this project
### `cd wiki-articles-website`
### `npm install`
### `npm start`
## visit [http://localhost:3000](http://localhost:3000)

# Documentation for API Endpoints

**GET** Request to Fetch Articles with the Most Page Views for a Specific Day 
**Response format:** **application/json** **returns json object containing array of articles**
[https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/YYYY/MM/DD]

**GET** Request for Page Views per day for a specific month
[https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${article_name}/daily/YYYYMMDD/YYYYMMDD]
**Response format:** **application/json** **returns json object containing views per day for each timestamp**

**GET** Request for [https://en.wikipedia.org/w/api.php?]
**Query Params**: {action: 'parse', page: ${article_name}, format: 'json'}
**Response format:** **application/json** **returns html content as json string of wikipedia article page, includes title and textContent**

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
