import React from 'react';
import NavBar from './NavBar';
import DateSelector from './DateSelector';
import NumResultSelect from './NumSelect';
import LanguageSelect from './LanguageSelect';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    this.state = {articles: [], dateString: '', yesterday: yesterday, current_date: '', country_code: 'en', error: undefined};
    this.getDateFormat = this.getDateFormat.bind(this);
    this.getDataFetch = this.getDataFetch.bind(this);
    this.changeLanguageSelection = this.changeLanguageSelection.bind(this);
    this.setCurrentDate = this.setCurrentDate.bind(this);
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
    } else if (date instanceof String || typeof date === 'string'){
      const elements = date.split(orig_delimiter);
      if(elements[2].length === 4){
        const dateString = elements[2] + replace_delimiter + elements[0] + replace_delimiter + elements[1];
        return dateString;
      }else if(elements[0].length === 4){
        const dateString = elements[0] + replace_delimiter + elements[1] + replace_delimiter + elements[2];
        return dateString;
      }
    }
    return '';
  }

  async getDataFetch(dateString, countryCode='en'){
    const response =
      await fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/${countryCode}.wikipedia/all-access/${dateString}`,
        { headers: {'Content-Type': 'application/json'}}
      );
    const response_json = await response.json();
    if(response_json?.items?.length > 0){
      this.setState({articles: response_json.items[0].articles, error: undefined});
    } else {
      this.setState({error: response_json.detail, articles: []});
    }
  } 

  changeLanguageSelection(country_code){
    if(this.state.current_date){
      this.getDataFetch(this.getDateFormat(String(this.state.current_date), '-'), country_code);
    }else{
      this.getDataFetch(this.getDateFormat(this.state.yesterday, '/'), country_code);
    }
    this.setState({country_code: country_code});
  }

  setCurrentDate(date){
    this.setState({current_date: date});
  }

  render(){
    return (
      <div className='App'>
        <header className='App-header'>
          <NavBar/>
          <div className='align-selection'>
            <LanguageSelect changeLanguageSelection={this.changeLanguageSelection}/>
            <DateSelector title={'Start Date:'} yesterday={this.state.yesterday} fetchData={this.getDataFetch} formatDate={this.getDateFormat} language={this.state.country_code} setCurrentDate={this.setCurrentDate}/>
            <NumResultSelect articles={this.state.articles} language={this.state.country_code}/>
            {this.state.error ? <div className='error-message'><h4>{'Error fetching Wikipedia articles: ' + this.state.error}</h4></div> : null}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
