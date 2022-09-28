import {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function CategorySearch(props){
    const [state, setState] = useState({width: '40vmin', text: '', results: [], error: undefined, subCats: []});

    const categoryMap = {'ar': 'فئة', 'en': 'Category', 'de': 'Kategorie', 'he': 'קטגוריה', 'fr': 'Catégorie', 'es': 'Categoría', 'it': 'Categoria', 'uk': 'Категорія', 'uz': 'Turkum', 'sv': 'Kategori', 'ja': 'カテゴリー', 'pt': 'Categoria', 'pl': 'Kategoria', 'ko': '범주', 'nl': 'Categorie'};

    const languageKey = {'ar': 'Arabic', 'en': 'English', 'de': 'German', 'he': 'Hebrew', 'fr': 'French', 'es': 'Spanish', 'it': 'Italian', 'uk': 'Ukrainian', 'uz': 'Uzbek', 'sv': 'Swedish', 'ja': 'Japanese', 'pt': 'Portuguese', 'pl': 'Polish', 'ko': 'Korean', 'nl': 'Dutch'};

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
                setState({error: 'Could not fetch Category Articles.'});
            }
        } catch (e) {
            console.error(e);
            setState({error: 'Could not fetch Category Articles.'});
        }
    }

    const setSearchTerm = (e) => {
        setState({text: e.currentTarget.value});
        makeRequestCategories(e.currentTarget.value);
    }

    return(
        <div className='align-elements'>
            <span className='search-title'>Search By Category</span>
            <div style={{width: state.width}} onKeyDown={(e) => {if(e.key === 'Backspace'){setState({width: '40vmin'})} else{setState({width: '100vmin'})}}}>
                {(props.language in languageKey) ? (<Form.Control type='text' size='md' placeholder={'Search in ' + languageKey[props.language]} value={state.text} onChange={setSearchTerm}/>) : (<Form.Control type='text' size='md' placeholder={'Search By Category'} disabled={true} style={{'background-color': '#CCC'}}/>)}
            </div>
            {state.subCats && state.subCats.length > 0 ? (<>{state.subCats.map((cat, i) => {
                if(i % 3 === 0){
                    const subCatButtons = state.subCats.slice(i-3,i).map((cat, j) =>(<Button variant='primary' size='sm' value={cat.title.replace(categoryMap[props.language] + ':', '')} onClick={setSearchTerm}>{cat.title}</Button>));
                    return (
                        <ButtonGroup>
                            {subCatButtons}
                        </ButtonGroup>
                    );
                }
                return '';
            })}</>) : undefined}
        </div>
    );
}

export default CategorySearch;