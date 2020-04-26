import React, { Component } from 'react';
import Item from './item'
import ListGroup from 'react-bootstrap/ListGroup'

class ItemContainer extends Component{
	render(){
		const itemsList = this.props.items
			.filter(item=>!this.props.hideCompleted||item.completed===0)
			.map(item=>(
				<ListGroup.Item
					key={item.ID}
					className={item.completed===0?"notCompleted":"completed"}>
					<Item
						ID={item.ID}
						content={item.content}
						completed={item.completed}
						handleToggle={this.props.handleToggle}
					/>
				</ListGroup.Item>
			));
		return (
			<ListGroup id="itemList">
				{itemsList}
			</ListGroup>
		);
	}
}

export default ItemContainer;