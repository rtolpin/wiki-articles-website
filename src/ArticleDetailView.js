import React from 'react';
import './ArticleDetailView.css';

class ArticleDetailView extends React.Component{

    constructor(props){
        super(props);
        this.state = {title: undefined, details: undefined, page_views: undefined, error: undefined};
    }

    componentDidMount(){
        this.getWikiPage();
        this.getPageViewsPerDay();
    }

    async getWikiPage(){
        const article_name = this.props.article;
        const url = 'https://en.wikipedia.org/w/api.php?' +
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
                const elements = Array.from(doc.querySelectorAll('p')).filter(ele => ele.className !== 'mw-empty-elt' && ele.textContent !== '' && ele.textContent !== 'Redirect to:');
                const textContent = elements[0].textContent;
                this.setState({title: json.parse.title, details: textContent, error: undefined});
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
        const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${article_name}/daily/${year}${month_two_digit}01/${year}${month_two_digit}${day_two_digit}`;
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
               {this.state.title && <div><strong>Title: {this.state.title}</strong></div>}
               {this.state.details && <div>Details: {this.state.details}</div>}
               {this.state.page_views && 
                (<div>
                {
                    this.state.page_views.map((ele, index) => 
                        <strong><span id={'date-' + ele.timestamp} key={'date-' + ele.timestamp} className='views-day'>{(index+1) + '. ' + ele.timestamp.substring(0,4) + '/' + ele.timestamp.substring(4,6) + '/' + ele.timestamp.substring(6,8) + ' Views: ' + ele.views}</span><br/></strong>
                    )
                }
                </div>)}
            </>
        );
    }
}

export default ArticleDetailView;