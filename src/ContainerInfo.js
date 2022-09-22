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

    const openDetailView = ((e) => {
        setDetails({...details, [String(e.target.value)]: !details[String(e.target.value)]});
    });

    const mapRows = (() => {
        const articles_shallow = props.articles.slice(0, props.numRows);
        const detailsMap = articles_shallow.reduce((articlesMap, article) => Object.assign(articlesMap, {[String(article.article)] : false}), {});
        setDetails(detailsMap);
        const articles_display = props.articles.slice(0, props.numRows);
        createGrid(articles_display);
    });

    const createGrid = ((articles_limited) => {
        const displayRows = articles_limited.map((article,i) => { 
            return (
                <>
                    <Row id={'info-'+i} key={'info-'+i} className='row-size'>
                        <Col id={'col-rank-'+i} key={'col-rank-'+i}><div id={'rank-'+i} key={'rank-'+i}><p className='article-rank'>Rank: {article.rank}</p></div></Col>
                        <Col id={'col-title-'+i} key={'col-title-'+i}><div id={'title-'+i} key={'title-'+i}><h4 className='article-title'>{article.article.replace(/_/g, ' ') || 'No Article Name Found'}</h4></div></Col>
                        <Col id={'col-detail-'+i} key={'col-detail-'+i}><Button className='article-detail-button' variant='primary' onClick={openDetailView} value={article.article}>View Details</Button></Col>
                        <Col id={'col-views-'+i} key={'col-views-'+i}><div id={'views-'+i} key={'views-'+i}><p className='article-views'>Views: {article.views}</p></div></Col>
                    </Row>
                    {details[String(article.article)] ? <Row className='row-inner' id={'article-detail-view-'+i} key={'article-detail-view-'+i}><ArticleDetailView article={article.article}/></Row> : null}
                </>
            );
        });
        setDisplay(displayRows);
    });

    useEffect(() => {
        mapRows(); //eslint-disable-next-line
    }, [props.numRows, props.articles]);

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