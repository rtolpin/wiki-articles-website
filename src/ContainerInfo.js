import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ArticleDetailView from './ArticleDetailView';
import './ContainerInfo.css';

function ContainerGrid(props){
    const [details, setDetails] = useState({});
    const [display, setDisplay] = useState([]);
    const [button, setButton] = useState('');

    const openDetailView = ((e) => {
        setDetails({...details, [String(e.target.value)]: !details[String(e.target.value)]});
    });

    const buttonLanguageMap = {'en': 'View Details', 'ar': 'عرض التفاصيل', 'fr': 'Voir les détails', 'ka': 'დეტალების ნახვა', 'de': 'Details anzeigen', 'he': 'הצג פרטים', 'hi': 'विवरण देखें', 
    'it': 'Visualizza dettagli', 'ja': '詳細を見る', 'ko': '세부 정보보기', 'fa': 'دیدن جزئیات', 'pl': 'Pokaż szczegóły', 'pa': 'ਵੇਰਵੇ ਵੇਖੋ', 'pt': 'Ver detalhes', 'sr': 'Приказ детаља', 'sv': 'Visa detaljer',
    'es': 'Ver detalles', 'tr': 'Detayları göster', 'uk': 'Докладніше', 'uz': "Tafsilotlarni ko'rish", 'vi': 'Xem chi tiết', 'yi': 'View דעטאַילס'};

    const mapRows = (() => {
        const title_field = props.categorySearch ? 'title' : 'article';
        const articles_shallow = props.articles.slice(0, props.numRows);
        const detailsMap = articles_shallow.reduce((articlesMap, article) => Object.assign(articlesMap, {[String(article[title_field])] : false}), {});
        setDetails(detailsMap);
        setButton(buttonLanguageMap[props.language]);
        const articles_display = props.articles.slice(0, props.numRows);
        createGrid(articles_display);
    });

    const createGrid = ((articles_limited) => {
        if(!(props.categorySearch)){
            const displayRows = articles_limited.map((article,i) => { 
                return (
                    <>
                        <Row id={'info-'+i} key={'info-'+i} className='row-size'>
                            <Col id={'col-rank-'+i} key={'col-rank-'+i}><div id={'rank-'+i} key={'rank-'+i}><p className='article-rank'>Rank: {article.rank}</p></div></Col>
                            <Col id={'col-title-'+i} key={'col-title-'+i}><div id={'title-'+i} key={'title-'+i}><h4 className='article-title'>{article.article.replace(/_/g, ' ') || 'No Article Name Found'}</h4></div></Col>
                            <Col id={'col-detail-'+i} key={'col-detail-'+i}><Button className='article-detail-button' variant='primary' onClick={openDetailView} value={article.article}>{button}</Button></Col>
                            <Col id={'col-views-'+i} key={'col-views-'+i}><div id={'views-'+i} key={'views-'+i}><p className='article-views'>Views: {article.views}</p></div></Col>
                        </Row>
                        {details[String(article.article)] ? <Row className='row-inner' id={'article-detail-view-'+i} key={'article-detail-view-'+i}><ArticleDetailView article={article.article} language_code={props.language}/></Row> : null}
                    </>
                );
            });
            setDisplay(displayRows);
        } else{
            const displayRows = articles_limited.map((article, i) => {
                return(
                    <>
                        <Row id={'info-'+i} key={'info-'+i} className='row-size'>
                                <Col id={'col-category-'+i} key={'col-category-'+i}><div id={'category-'+i} key={'category-'+i}><p className='article-category'>{i+1}. Category: {props.category}</p></div></Col>
                                <Col id={'col-title-'+i} key={'col-title-'+i}><div id={'title-'+i} key={'title-'+i}><h4 className='article-title'>{article.title.replace(/_/g, ' ') || 'No Article Name Found'}</h4></div></Col>
                                <Col id={'col-detail-'+i} key={'col-detail-'+i}><Button className='article-detail-button' variant='primary' onClick={openDetailView} value={article.title}>{button}</Button></Col>
                                <Col id={'col-views-'+i} key={'col-views-'+i}><div id={'views-'+i} key={'views-'+i}><p className='article-views'>Title: {article.title.replace(/_/g, ' ')}</p></div></Col>
                        </Row>
                        {details[String(article.title)] ? <Row className='row-inner' id={'article-detail-view-'+i} key={'article-detail-view-'+i}><ArticleDetailView article={article.title} language_code={props.language}/></Row> : null}
                    </>
                );
            });
            setDisplay(displayRows);
        }
    });

    useEffect(() => {
        mapRows(); //eslint-disable-next-line
    }, [props.numRows, props.articles, props.language]);

    useEffect(() => {
        createGrid(props.articles.slice(0, props.numRows)); //eslint-disable-next-line
    }, [details]);

    return(
        <Container title='Articles' fluid>
            {display}
        </Container>
    );
};

export default ContainerGrid;