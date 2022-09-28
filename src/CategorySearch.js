import {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CategorySearch(props){
    const [state, setState] = useState({text: '', results: [], error: undefined, subCats: []});

    const categoryMap = {'ar': 'فئة', 'af': '', 'en': 'Category', 'de': 'Kategorie', 'he': 'קטגוריה', 'fr': 'Catégorie', 'es': 'Categoría', 'it': 'Categoria', 'uk': 'Категорія', 'uz': 'Turkum', 'sv': 'Kategori', 'ja': 'カテゴリー', 'pt': 'Categoria', 'pl': 'Kategoria', 'ko': '범주', 'nl': 'Categorie', 'ka': 'კატეგორია', 'hi': 'श्रेणी', 'sr': 'Категорија', 'pa': 'ਸ਼੍ਰੇਣੀ', 'tr': 'Kategori', 'vi': 'Loại'};

    const languageKey = {'ar': 'Arabic', 'af': 'Afrikaans', 'en': 'English', 'de': 'German', 'he': 'Hebrew', 'fr': 'French', 'es': 'Spanish', 'it': 'Italian', 'uk': 'Ukrainian', 'uz': 'Uzbek', 'sv': 'Swedish', 'ja': 'Japanese', 'pt': 'Portuguese', 'pl': 'Polish', 'ko': 'Korean', 'nl': 'Dutch', 'ka': 'Georgian', 'hi': 'Hindi', 'sr': 'Serbian', 'pa': 'Punjabi', 'tr': 'Turkish', 'vi': 'Vietnamese'};

    useEffect(() => {
        setState({error: undefined, text: ''});
    }, [props.language]);

    const makeRequestCategories = async (searchTerm) => {
        const url = `https://${props.language}.wikipedia.org/w/api.php?` +
        new URLSearchParams({
            origin: '*',
            list: 'categorymembers',
            action: 'query',
            cmtitle: `Category:${searchTerm}`,
            cmlimit: 500,
            cmsort: 'timestamp',
            cmdir: 'desc',
            format: 'json',
        });

        try {
            const req = await fetch(url);
            const json = await req.json();
            if(json?.query?.categorymembers && json?.query?.categorymembers.length > 0){
                const articles = json.query.categorymembers;
                const subcats = articles.filter(a => a.title.includes(`${categoryMap[props.language]}:`));
                articles.sort((a,b) => a.title.includes(`${categoryMap[props.language]}:`) - b.title.includes(`${categoryMap[props.language]}:`));
                props.results(articles, searchTerm);
                setState({results: articles, error: undefined, subCats: subcats});
            }else{
                setState({error: (<><span>Could not find Category in Wikipedia.</span><br/><span>Please update your search query and make sure that search is in {languageKey[props.language]}.</span></>)});
            }
        } catch (e) {
            console.error(e);
            setState({error: 'Could not fetch Articles.'});
        }
    }

    const setSearchTerm = (e) => {
        setState({text: e.currentTarget.value});
    }

    const submitSearch = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        console.log(state.text);
        if(state.text !== '' && state.text !== undefined){
            makeRequestCategories(state.text);
        }
        if(state.text === undefined){
            setState({error: undefined});
        }
    }

    const setNewCat = (e) => {
        setState({text: e.currentTarget.value});
        makeRequestCategories(e.currentTarget.value);
    }

    return(
        <div className='align-elements'>
            <span className='search-title'>Search By Category</span>
            <div onKeyDown={(e) => {if(e.key === 'Backspace'){setState({error: undefined})}}}>
                {(props.language in languageKey) ? (<Form onSubmit={submitSearch} className='form'><Form.Group as={Row} className='expand-row'><Col className='search-term' style={{width: '80vmin', 'border-radius': '75%'}}><Form.Control type='text' size='md' placeholder={'Search in ' + languageKey[props.language]} value={state.text} onChange={setSearchTerm}/></Col><Col className='submit-button-col' style={{'border-radius': '75%'}}><Button variant='primary' style={{'margin-left': '-4vmin'}} type='submit'>Submit</Button></Col></Form.Group></Form>) : (<Form.Control type='text' size='md' placeholder={'Search By Category'} disabled={true} style={{'background-color': '#CCC'}}/>)}
            </div>
            {state.error ? (<div style={{'background-color': '#add8e6', 'margin-left': '5px', 'opacity': 0.5, 'width': '55vmin'}}><span style={{color: 'blue'}}>{state.error}</span></div>) : undefined}
            {state.subCats && state.subCats.length > 0 ? (<div style={{'margin-top': '2px'}}>{state.subCats.map((cat, i) => {
                if(i % 3 === 0){
                    const subCatButtons = state.subCats.slice(i-3,i).map((cat, j) =>(<Button variant='primary' size='sm' value={cat.title.replace(categoryMap[props.language] + ':', '')} onClick={setNewCat} style={{'margin-top': '2px', 'margin-left': '2px', 'border-radius': 7}}>{cat.title}</Button>));
                    return (
                        <ButtonGroup>
                            {subCatButtons}
                        </ButtonGroup>
                    );
                }
                return '';
            })}</div>) : undefined}
        </div>
    );
}

export default CategorySearch;