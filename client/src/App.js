import React, { Component } from 'react';
import './App.css';
import ItemForm from './components/form'
import ItemContainer from './components/itemContainer'

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			textValue: "",
			items:[],
			hideCompleted: true
		};
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleToggleComplete = this.handleToggleComplete.bind(this);
		this.handleHide = this.handleHide.bind(this);
	}
	componentDidMount() {
		this.updateItems(null);
	}
	handleTextChange(event){
		this.setState({textValue: event.target.value});
	}
	updateItems(res){
		fetch('/items')
			.then(result=>result.json())
			.then(result=>this.setState({items:result}));
	}
	handleFormSubmit(event){
		event.preventDefault();
		let postBody = {
			type: "new",
			text: this.state.textValue
		};
		fetch("/items", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postBody)
		}).then((res) => this.updateItems());
		this.setState({textValue: ""});
	}
	handleToggleComplete(item){
		const itemProps = item.props;
		let postBody = {
			type: "update",
			ID: itemProps.ID,
			completed: 1-itemProps.completed
		}
		fetch("/items", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postBody)
		}).then((res)=>this.updateItems());
	}
	handleHide(){
		this.setState({hideCompleted: !this.state.hideCompleted});
	}
	render() {
		return (
			<div className="App">
				<h1>Todo List</h1>
				<ItemForm
					value={this.state.textValue}
					handleSubmit={this.handleFormSubmit}
					handleChange={this.handleTextChange}
					hideCompleted={this.state.hideCompleted}
					handleHide={this.handleHide}
				/>
				<ItemContainer
					items={this.state.items}
					handleToggle={this.handleToggleComplete}
					hideCompleted={this.state.hideCompleted}
				/>
			</div>
		);
	}
}

export default App;