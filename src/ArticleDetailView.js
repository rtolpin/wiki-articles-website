import React from 'react';
import './ArticleDetailView.css';

class ArticleDetailView extends React.Component{

    constructor(props){
        super(props);
        this.state = {title: undefined, details: undefined, detailsPartTwo: undefined, showTwo: false, showThree: false, showViewsPerDay: false, page_views: undefined, error: undefined};
        this.showPartTwo = this.showPartTwo.bind(this);
        this.showPartThree = this.showPartThree.bind(this);
        this.showViews = this.showViews.bind(this);
    }

    componentDidMount(){
        this.getWikiPage();
        this.getPageViewsPerDay();
    }

    componentDidUpdate(prevProps) {
        if(this.props.language_code !== prevProps.language_code)
        {
          this.getWikiPage();
        }
      } 

    showPartTwo(e){
        this.setState({showTwo: true});
    }

    showPartThree(e){
        this.setState({showThree: true});
    }

    showViews(e){
        this.setState({showViewsPerDay: true})
    }

    async getWikiPage(){
        const special_cases = {'CEO': 'Chief_executive_officer', 'Princess_Charlotte_of_Cornwall_and_Cambridge': 'Princess_Charlotte_of_Wales_(born_2015)', 'Meghan_Markle': 'Meghan,_Duchess_of_Sussex', 'Camilla,_Duchess_of_Cornwall': 'Camilla,_Queen_Consort', 'Camilla,_Queen_consort_of_the_United_Kingdom': 'Camilla,_Queen_Consort', 'Video_hosting_service': 'Online_video_platform', 'Viscus': 'Organ_(biology)'};
        const article_name = !(this.props.article in special_cases) ? this.props.article : special_cases[this.props.article];
        const url = `https://${this.props.language_code}.wikipedia.org/w/api.php?` +
            new URLSearchParams({
                origin: '*',
                action: 'parse',
                page: article_name,
                format: 'json',
            });

        try {
            const req = await fetch(url);
            const json = await req.json();
            if(json?.parse?.text){
                const parser = new DOMParser();
                const doc = parser.parseFromString(json.parse.text['*'], 'text/html');
                const elements = Array.from(doc.querySelectorAll('p')).filter(ele => !(ele.innerText.includes('.mw-parser-output')) && !(ele.innerText.includes('[±]')) && !(ele.innerText.includes('km²')) && ele.innerText.length > 40 && ele.className !== 'mw-empty-elt' && ele.textContent !== '' && ele.textContent !== 'Redirect to:');
                const textContent = elements[0].textContent + '\n' + elements[1].textContent;
                const textContentPartTwo = elements[2].textContent + '\n' + elements[3].textContent;
                const textContentPartThree = elements[4].textContent + '\n' + elements[5].textContent;
                this.setState({title: json.parse.title, details: textContent, detailsPartTwo: textContentPartTwo, detailsPartThree: textContentPartThree, error: undefined});
            }else{
                this.setState({error: 'Details Not Found.'});
            }
        } catch (e) {
            console.error(e);
            this.setState({error: 'Details Not Found.'});
        }
    }

    async getPageViewsPerDay(){
        const article_name = this.props.article;
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const day = today.getDate();
        const month_two_digit = month.toString().length === 1 ? '0' + month : month;
        const day_two_digit = day.toString().length === 1 ? '0' + day : day;
        const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/${this.props.language_code}.wikipedia/all-access/all-agents/${article_name}/daily/${year}${month_two_digit}01/${year}${month_two_digit}${day_two_digit}`;
        const header = { headers: {'Content-Type': 'application/json'}};
        try {
            const req = await fetch(url, header);
            const json = await req.json();
            if(json.items){
                const page_views = json.items.sort((a,b) => b.views - a.views);
                this.setState({page_views: page_views.slice(0,3)});
            }
        } catch (e) {
            console.error(e);
        }
    }

    render(){
        return (
            <>
               {this.state.error && <div>{this.state.error}</div>}
               {!this.state.title && !this.state.details && !this.state.error && <div><strong><span>Fetching Details...</span></strong></div>}
               {this.state.title && <div><strong>{this.state.title}</strong></div>}
               {this.state.details && <div className='wiki-text'>{this.state.details}<br/>{!(this.state.showTwo) && <strong><span value={this.state.showTwo} onClick={this.showPartTwo} className='blue-text'>View more...</span></strong>}</div>}
               {this.state.detailsPartTwo && this.state.showTwo && <div className='wiki-text'>{this.state.detailsPartTwo}<br/>{!(this.state.showThree) && <strong><span value={this.state.showThree} onClick={this.showPartThree} className='blue-text'>View more...</span></strong>}</div>}
               {this.state.detailsPartThree && this.state.showThree && <div className='wiki-text'>{this.state.detailsPartThree}<br/>{!(this.state.showViewsPerDay) && <strong><span value={this.state.showViewsPerDay} onClick={this.showViews} className='blue-text'>View more...</span></strong>}</div>}
               {this.state.page_views && this.state.showViewsPerDay && 
                (<div>
                {
                    this.state.page_views.map((ele, index) => 
                        <strong><span id={'date-' + ele.timestamp} key={'date-' + ele.timestamp} className='views-day wiki-text'>{(index+1) + '. ' + ele.timestamp.substring(0,4) + '/' + ele.timestamp.substring(4,6) + '/' + ele.timestamp.substring(6,8) + ' Views: ' + ele.views}</span><br/></strong>
                    )
                }
                </div>)}
            </>
        );
    }
}

export default ArticleDetailView;