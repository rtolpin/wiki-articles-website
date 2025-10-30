### Live Website Link: https://wikipages.us and https://react-wikipedia-articles.uk.r.appspot.com

# Documentation for API Endpoints

##NOTE: ONLY WIKIPEDIA SEARCH BY CATEGORY IN ANY LANGUAGE FEATURE IS AVAILABLE AND FUNCTIONING. MUST TYPE IN THE SEARCH BOX IN THAT PARTICULAR LANGUAGE.

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

To run app locally:
### `npm run build`
cd into the **build** folder
### `serve -s`


