import React, { Component } from 'react';

class Searchbar extends Component {

	// constructor() {
	// 	super()

	// }

	handleChange(event) {
		//this.props.onQuery(event.target.value);

		console.log(event.target.value)

		
	}

	render() {

		return (
			<div className="search-bar">
				<input placeholder="Zoeken" type="search" onChange={this.handleChange.bind(this)} />
			</div>
		)
	}

}

export default Searchbar