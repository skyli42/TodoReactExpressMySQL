import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class Item extends Component{
    render(){
        return (
            <div >
                <Form.Check
                    type="checkbox"
                    custom
                    checked={this.props.completed===1}
                    label={this.props.content}
                    onChange = {()=>this.props.handleToggle(this)}
                    id={`check${this.props.ID}`}
                />
            </div>
        );
    }
}

export default Item;