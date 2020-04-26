import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
class ItemForm extends Component{
	render(){
		return (
			<Form onSubmit={this.props.handleSubmit}>
				<Form.Group controlId="exampleForm.ControlInput1" id="textBoxGroup">
					<Form.Label>Add an item: </Form.Label>
					<Form.Control type="text" value={this.props.value} onChange={this.props.handleChange}/>
				</Form.Group>
				<Button type="submit" id="formButton">Add</Button>
				<Form.Check
					type="switch"
					checked={this.props.hideCompleted}
					label="Hide completed tasks"
					onChange={this.props.handleHide}
					id="hideSwitch"
				/>
			</Form>
			);

	}
}

export default ItemForm;