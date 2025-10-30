### Live Website Link: https://wikipages.us and https://react-wikipedia-articles.uk.r.appspot.com

# **NOTE: ONLY WIKIPEDIA SEARCH BY CATEGORY IN ANY LANGUAGE FEATURE IS AVAILABLE AND FUNCTIONING. SELECT THE LANGUAGE FROM LANGUAGE DROPDOWN. MUST TYPE IN THE SEARCH BOX IN THAT PARTICULAR LANGUAGE. THEN, CAN HIT ENTER KEY OR THE SUBMIT BUTTON TO SUBMIT THE SEARCH. **

SAMPLE SCREENSHOTS FROM WEBSITE:


<img width="1885" height="909" alt="Screenshot 2025-10-30 4 02 14 PM" src="https://github.com/user-attachments/assets/5c4bdd6a-25c9-43b1-8e07-d13c793d7cb6" />


<img width="1885" height="909" alt="Screenshot 2025-10-30 4 02 05 PM" src="https://github.com/user-attachments/assets/a7bbf348-af34-45a9-a4fd-e9b453399968" />




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

To run app locally:
### `npm run build`
cd into the **build** folder
### `serve -s`


