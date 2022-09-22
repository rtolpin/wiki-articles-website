import React from 'react';
import NavBar from './NavBar';
import DateSelector from './DateSelector';
import NumResultSelect from './NumSelect';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    this.state = {articles: [], dateString: '', yesterday: yesterday, error: undefined};
    this.getDateFormat = this.getDateFormat.bind(this);
    this.getDataFetch = this.getDataFetch.bind(this);
  }

  componentDidMount(){
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    const dateString = this.getDateFormat(yesterday, '/');
    if (dateString){
      this.getDataFetch(dateString); 
    }
  }

  getDateFormat(date, orig_delimiter, replace_delimiter='/'){
    if(date instanceof Date){
      const dateString = date.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, `$3${replace_delimiter}$1${replace_delimiter}$2`);
      return dateString;
    } else if (date instanceof String){
      const elements = date.split(orig_delimiter);
      const dateString = elements[2] + replace_delimiter + elements[0] + replace_delimiter + elements[1];
      return dateString;
    }
    return '';
  }

  async getDataFetch(dateString){
    const response =
      await fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${dateString}`,
        { headers: {'Content-Type': 'application/json'}}
      );
    const response_json = await response.json();
    if(response_json?.items?.length > 0){
      this.setState({articles: response_json.items[0].articles, error: undefined});
    } else {
      this.setState({error: response_json.detail, articles: []});
    }
  } 

  render(){
    return (
      <div className='App'>
        <header className='App-header'>
          <NavBar/>
          <div className='align-selection'>
            <DateSelector title={'Start Date:'} yesterday={this.state.yesterday} fetchData={this.getDataFetch} formatDate={this.getDateFormat}/>
            <NumResultSelect articles={this.state.articles}/>
            {this.state.error ? <div className='error-message'><h4>{'Error fetching Wikipedia articles: ' + this.state.error}</h4></div> : null}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
