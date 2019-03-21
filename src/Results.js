import React, { Component } from 'react';


class Results extends Component {

	constructor(props){
        super(props);

        this.state = {
          recipes: [],
          dataRoute: "http://dietist-elinezuiderwijk.nl/wp-json/wp/v2/posts?_embed&categories=8&per_page=24" // only output recipes with category 'recept' = category #8
        }
    }

    componentDidMount(){

        fetch(this.state.dataRoute)
            .then(res => res.json())
            .then(recipes => this.setState((prevState, props) => {
                return { recipes: recipes.map(this.mapRecipe)};
            }));
    }

    mapRecipe(recipe){
        return {
          id: recipe.id,
          name: recipe.title.rendered,
          image: recipe._embedded['wp:featuredmedia']['0'].source_url
        }
    }
	
	render() {

		return(
		    <div className="recipes">

	            {this.state.recipes.map((recipe) => 
    	            <div className="recipe" key={`recipe-${recipe.id}`}>

    	                <p>{ recipe.name }</p>
    	                <img src={ recipe.image } className="recipe-image" alt={recipe.name}/>

    	            </div>
	             )}
	          
	        </div>
	    )
	}
}


export default Results