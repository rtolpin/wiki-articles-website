import React from 'react';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import './DateSelector.css';

class DateSelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: props.formatDate(props.yesterday, '/', '-')};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const new_value = e.target['value'];
        if(this.state.date !== new_value){
            this.setState({date: new_value});
        }else if(this.state.date === new_value){
            this.setState({date: ''});
        }
        if(new_value.length === 10){
            const m = moment(new_value, 'YYYY-MM-DD');
            if (m.isValid()){
                const valid_date = m.format('YYYY/MM/DD');
                this.props.fetchData(valid_date, this.props.language);
            }
        }
    }

    render(){
        return (
            <div className='align-elements'>
                <span className='date-title'>{this.props.title}</span>
                <div className='date-small'>
                    <Form.Control id='date-selector' type='date' value={this.state.date} onChange={this.handleChange}/>
                </div>
            </div>
        );
    }
};

export default DateSelector;