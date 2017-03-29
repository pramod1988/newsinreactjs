import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Search extends React.Component {
  
  render() {
    
    return (
      <div className="col-md-3">
         <div className="row">
            <div className="col-md-12">
                <First1/>
                <h3>Sort By</h3>
                <a onClick={this.myClick} data-city="latest"> Saludo</a>
                <ul class="list-unstyled">

                    <li><a href="#" onClick={this.loadStory} data-sort="top">top</a>
                    </li>
                    <li><a href="#">latest</a>
                    </li>
                    <li><a href="#">popular</a>
                    </li>
                    
                </ul>
            </div>
            <div className="col-md-12">
                <h3>Source</h3>
                <ul class="list-unstyled">
                    <li><a href="#">abc-news-au</a>
                    </li>
                    <li><a href="#">bbc-news</a>
                    </li>
                    <li><a href="#">bloomberg</a>
                    </li>
                    <li><a href="#">business-insider</a>
                    </li>
                    <li><a href="#">buzzfeed</a>
                    </li>
                    <li><a href="#">bloomberg</a>
                    </li>
                    
                </ul>
            </div>
         </div>
      </div>
    );
  }
}



var First1 = React.createClass({
    myClick: function(e){
        alert(e.currentTarget.getAttribute("data-city"));
        var city = e.currentTarget.getAttribute("data-city");
        //alert('Show 1');
         axios.get('https://newsapi.org/v1/articles?source=techcrunch&&sortBy='+city+'&apiKey=789ea3cd651a49e5ba9fc2061d68138f')
      .then(res => {
         //console.log(res.data);
        // Transform the raw data by extracting the nested posts
        const posts = res.data.articles;

        //console.log(posts);

        // Update state to trigger a re-render.
        // Clear any errors, and turn off the loading indiciator.
        this.setState({
          posts,
          loading: false,
          error: null
        });
      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        this.setState({
          loading: false,
          error: err
        });
      });
    },
    render: function() {
        return <a onClick={this.myClick} data-city="latest"> Saludo</a>;
    }
});





