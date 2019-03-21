import React, { Component } from 'react';

import './App.css';
import './Recipes.css';
// import Searchbar from "./Searchbar"
// import Results from "./Results"



class App extends Component {

	// Initialize the component
	constructor() {
		// Recieve the goodies from the React Component
		super() 

		// set your initial state
		this.state = {
			// put the items in a list (empty array)
			list: [],
			filtered: [],
			// and call the API
          	dataRoute: "http://dietist-elinezuiderwijk.nl/wp-json/wp/v2/posts?_embed&categories=8&per_page=24" // only output recipes with category 'recept' = category #8
		}

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){

        fetch(this.state.dataRoute)
            .then(res => res.json())
            .then(list => this.setState((prevState, props) => {
                return { list: list.map(this.mapList)};
            }));

        this.setState({
		    filtered: this.props.items
		});
    }

    componentWillReceiveProps(nextProps) {
		this.setState({
			filtered: nextProps.items
		});
	}

    mapList(item){
        return {
          id: item.id,
          name: item.title.rendered,
          image: item._embedded['wp:featuredmedia']['0'].source_url
        }
    }

    handleChange(e) {
        // Variable to hold the original version of the list
		let currentList = [];
	    // Variable to hold the filtered list before putting into state
		let newList = [];

	    // If the search bar isn't empty
		if (e.target.value !== "") {
		    // Assign the original list to currentList
		    console.log(e.target.value)
		    currentList = this.state.list;
		   	console.log(currentList)

		    // Use .filter() to determine which items should be displayed
		    // based on the search terms
		  	newList = currentList.filter(item => {
			    
			    // change current item to lowercase
			   // const lc = item.toLowerCase();
			    
			    // change search term to lowercase
			  //  const filter = e.target.value.toLowerCase();

	            // check to see if the current list item includes the search term
	            // If it does, it will be added to newList. Using lowercase eliminates
	            // issues with capitalization in search terms and search content
			   // return lc.includes(filter);
		  	});

		} else {
		    // If the search bar is empty, set newList to original task list
		  	newList = this.state.list;
		}
		
		// Set the filtered state based on what our rules added to newList
		this.setState({
		    filtered: newList
		});
	}

	// Render your app
    render() {
        return (
          <div className="App">

            <h1>Zoek naar gezonde recepten</h1>

            <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." className="search-bar" />
         
            <section className="list">

            	{this.state.list.map((item) => 

		            <div className="item" key={`item-${item.id}`}>

		                <p>{ item.name }</p>
		                <img src={ item.image } className="item-image" alt={item.name}/>

		            </div>
		         )}
            </section>

            <p>source: https://hackernoon.com/react-js-with-wordpress-as-a-backend-wp-rest-api-example-127639a6cc41</p>
          </div>
        );
    }
}

export default App;
