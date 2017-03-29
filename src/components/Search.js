import React from 'react';


export default class Search extends React.Component {
  loadStory: function(e){
    var city = $(e.currentTarget).data('sort');
    console.log(city);
    // now make your ajax request with the city's name passed to pull out the correct data
}
  render() {
    
    return (
      <div className="col-md-3">
         <div className="row">
            <div className="col-md-12">
                <h3>Sort By</h3>
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
