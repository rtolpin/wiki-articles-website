import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import './LanguageSelect.css';

function LanguageSelect(props){
    // eslint-disable-next-line
    const [state, setState] = useState({country_code: 'en'});

    return(
        <>
            <div className='align-elements'>
                <span className='language-select-title'>Select Language:</span>
                <Form.Select defaultValue={'en'} onChange={(e) => {props.changeLanguageSelection(e.currentTarget.value); setState({country_code: e.currentTarget.value});}}>
                    <option value='af'>Afrikaans</option>
                    <option value='ar'>Arabic</option>
                    <option value='nl'>Dutch</option>
                    <option value='en'>English</option>
                    <option value='fr'>French</option>
                    <option value='ka'>Georgian</option>
                    <option value='de'>German</option>
                    <option value='he'>Hebrew</option>
                    <option value='hi'>Hindi</option>
                    <option value='it'>Italian</option>
                    <option value='ja'>Japanese</option>
                    <option value='ko'>Korean</option>
                    <option value='fa'>Persian</option>
                    <option value='pl'>Polish</option>
                    <option value='pa'>Punjabi</option>
                    <option value='pt'>Portuguese</option>
                    <option value='ru'>Russian</option>
                    <option value='sr'>Serbian</option>
                    <option value='sv'>Swedish</option>
                    <option value='es'>Spanish</option>
                    <option value='tr'>Turkish</option>
                    <option value='uk'>Ukrainian</option>
                    <option value='uz'>Uzbek</option>
                    <option value='vi'>Vietnamese</option>
                    <option value='yi'>Yiddish</option>
                </Form.Select>
            </div>
        </>
    );
}

export default LanguageSelect;