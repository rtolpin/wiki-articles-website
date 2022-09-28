import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import './NumSelect.css';

function NumResultSelect(props){
    // eslint-disable-next-line
    const [state, setState] = useState({rows: 100});
    
    return(
        <>
            <div className='align-elements'>
                <span className='results-title'>Number of Results</span>
                <Form.Select defaultValue={'100'} className='results-select' onChange={(e) => { setState({rows: Number(e.currentTarget.value)}); props.setNumResults(Number(e.currentTarget.value));}}>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='75'>75</option>
                    <option value='100'>100</option>
                    <option value='200'>200</option>
                    <option value='300'>300</option>
                    <option value='400'>400</option>
                    <option value='500'>500</option>
                </Form.Select>
            </div>
        </>
    );
}

export default NumResultSelect;