import React from 'react';
import './ArticleDetailView.css';

class ArticleDetailView extends React.Component{

    constructor(props){
        super(props);
        this.state = {title: undefined, details: undefined, detailsPartTwo: undefined, detailsPartThree: undefined, detailsPartFour: undefined, detailsPartFive: undefined, showFive: false, detailsPartSix: undefined, showSix: false, detailsPartSeven: undefined, showSeven: false, detailsPartEight: undefined, showEight: false, detailsPartNine: undefined, showNine: undefined, showTwo: false, showThree: false, showFour: false, showViewsPerDay: false, page_views: undefined, error: undefined};
        this.showPartTwo = this.showPartTwo.bind(this);
        this.showPartThree = this.showPartThree.bind(this);
        this.showPartFour = this.showPartFour.bind(this);
        this.showPartFive = this.showPartFive.bind(this);
        this.showPartSix = this.showPartSix.bind(this);
        this.showPartSeven = this.showPartSeven.bind(this);
        this.showPartEight = this.showPartEight.bind(this);
        this.showPartNine = this.showPartNine.bind(this);
        this.showViews = this.showViews.bind(this);
        this.formatText = this.formatText.bind(this);
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

    showPartFour(e){
        this.setState({showFour: true});
    }

    showPartFive(e){
        this.setState({showFive: true});
    }

    showPartSix(e){
        this.setState({showSix: true});
    }

    showPartSeven(e){
        this.setState({showSeven: true});
    }

    showPartEight(e){
        this.setState({showEight: true});
    }

    showPartNine(e){
        this.setState({showNine: true});
    }

    showViews(e){
        this.setState({showViewsPerDay: true})
    }

    formatText(text = []){
        const seen = {};
        const textContent = [...new Set(text)].map(ele => ele.replace(/\n/g, '')).filter((ele) => { if(!(ele in seen) && !(Object.keys(seen).toString().includes(ele))){seen[ele] = true; return true;}else{return false;}}).map(ele => (' ' + ele + ' ').replace(/([A-Z]*)([a-z]+)([)]*)([A-Z]{1})/g, '$1$2$3 $4'));
        return textContent;
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
                const elements = Array.from(doc.querySelectorAll('p, li, div, a')).filter(ele => !(ele.innerText.includes('.mw-parser-output')) && !(ele.innerText.includes('[±]')) && !(ele.innerText.includes('JSTOR')) && !(ele.innerText.includes('km²')) && ele.className !== 'mw-empty-elt' && ele.textContent !== '' && ele.textContent !== 'Redirect to:');
                const text = elements.map(ele => ele.textContent);
                const offset = Math.floor(text.length/9);
                const content = this.formatText(text);
                const textContent = content.slice(0, offset);
                const textContentPartTwo = content.slice(offset, offset*2);
                const textContentPartThree = content.slice(offset*2, offset*3);
                const textContentPartFour = content.slice(offset*3, offset*4);
                const textContentPartFive = content.slice(offset*4, offset*5);
                const textContentPartSix = content.slice(offset*5, offset*6);
                const textContentPartSeven = content.slice(offset*6, offset*7);
                const textContentPartEight = content.slice(offset*7, offset*8);
                const textContentPartNine = content.slice(offset*8, offset*9);
                this.setState({title: json.parse.title, detailsPartNine: textContentPartNine, detailsPartEight: textContentPartEight, detailsPartSeven: textContentPartSeven, detailsPartSix: textContentPartSix, details: textContent, detailsPartTwo: textContentPartTwo, detailsPartThree: textContentPartThree, detailsPartFour: textContentPartFour, detailsPartFive: textContentPartFive, error: undefined});
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
                this.setState({page_views: page_views.slice(0,4)});
            }
        } catch (e) {
            console.error(e);
        }
    }

    render(){
        return (
            <div className='text-container'>
               {this.state.error && <div className='error-text'>{this.state.error}</div>}
               {!this.state.title && !this.state.details && !this.state.error && <div className='loading-text'><strong><span>Fetching Details...</span></strong></div>}
               {this.state.title && <div className='wiki-title'><strong>{this.state.title}</strong></div>}
               {this.state.details && <div className='wiki-text'><p>{this.state.details}</p>{!(this.state.showTwo) && <strong><span value={this.state.showTwo} onClick={this.showPartTwo} className='blue-text'>View more...</span></strong>}</div>}
               {this.state.detailsPartTwo && this.state.showTwo && <><div className='wiki-text'><p>{this.state.detailsPartTwo}</p>{!(this.state.showThree) && <strong><span value={this.state.showThree} onClick={this.showPartThree} className='blue-text'>View more...</span></strong>}</div></>}
               {this.state.detailsPartThree && this.state.showThree && <><div className='wiki-text'><p>{this.state.detailsPartThree}</p>{!(this.state.showFour) && <strong><span value={this.state.showFour} onClick={this.showPartFour} className='blue-text'>View more...</span></strong>}</div></>}
               {this.state.detailsPartFour && this.state.showFour && <><div className='wiki-text'><p>{this.state.detailsPartFour}</p>{!(this.state.showFive) && <strong><span value={this.state.showFive} onClick={this.showPartFive} className='blue-text'>View more...</span></strong>}</div></>}
               {this.state.detailsPartFive && this.state.showFive && <><div className='wiki-text'><p>{this.state.detailsPartFive}</p>{!(this.state.showSix) && <strong><span value={this.state.showSix} onClick={this.showPartSix} className='blue-text'>View more...</span></strong>}</div></>}
               {this.state.detailsPartSix && this.state.showSix && <><div className='wiki-text'><p>{this.state.detailsPartSix}</p>{!(this.state.showSeven) && <strong><span value={this.state.showSeven} onClick={this.showPartSeven} className='blue-text'>View more...</span></strong>}</div></>}
               {this.state.detailsPartSeven && this.state.showSeven && <><div className='wiki-text'><p>{this.state.detailsPartSeven}</p>{!(this.state.showEight) && <strong><span value={this.state.showEight} onClick={this.showPartEight} className='blue-text'>View more...</span></strong>}</div></>}
               {this.state.detailsPartEight && this.state.showEight && <><div className='wiki-text'><p>{this.state.detailsPartEight}</p>{!(this.state.showNine) && <strong><span value={this.state.showNine} onClick={this.showPartNine} className='blue-text'>View more...</span></strong>}</div></>}
               {this.state.detailsPartNine && this.state.showNine && <><div className='wiki-text'><p>{this.state.detailsPartNine}</p></div></>}
               {this.state.page_views && <div className='page-views'><p className='wiki-text'>Dates Most Viewed this Month:</p> {this.state.page_views.map((ele, index) => <><span id={'date-' + ele.timestamp} key={'date-' + ele.timestamp} className='views-day wiki-text'>{ele.timestamp.substring(0,4) + '/' + ele.timestamp.substring(4,6) + '/' + ele.timestamp.substring(6,8) + ' Views: ' + ele.views}</span><br/></>)}</div>}
            </div>
        );
    }
}

export default ArticleDetailView;