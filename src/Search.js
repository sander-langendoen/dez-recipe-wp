import React, { Component } from 'react';
import Searchbar from "./Searchbar"
import Results from "./Results"


class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {
			query: ''
		};
	}

	handleQuery(query) {
		this.setState({'query': query.toLowerCase().trim()})
	}

	render() {

		return (

			<div className="search">
				<Searchbar onQuery={this.handleQuery.bind(this)} /> 
				<Results products={this.props.recipe} query={this.state.query} />
			</div>
		)
	}

}

export default Search