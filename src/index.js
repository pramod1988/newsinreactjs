import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import css from './css/bootstrap.css';
//import Search from './Search';

class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    // Remove the 'www.' to cause a CORS error (and see the error state)
    axios.get(`https://newsapi.org/v1/articles?source=techcrunch&apiKey=5f9660935b874991b172628cd67412f1`)
      .then(res => {
        console.log(res.data);
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
        //console.log(this.setState);
      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        //console.log('error');
        this.setState({
          loading: false,
          error: err
        });
      });
  }

  renderLoading() {
    return <div > Loading... < /div>;
  }

  renderError() {
    return ( < div >
      Uh oh: {
        this.state.error.message
      } < /div>
    );
  }

  _updateState(posts){
     //console.log('calling', posts);
     this.setState({
          posts,
          loading: false,
          error: null
      });
   }

  renderPosts() {
    if (this.state.error) {
      return this.renderError();
    }

    return ( 
     <div className="row">
      <div className="col-md-3 filter">

          <First1 _updateState={this._updateState.bind(this)}/> 
          <Source _updateState={this._updateState.bind(this)}/>
          </div>
          <div className="col-md-9">
            < h1 > Top Stories< /h1>
          <div className="row">

          {
            this.state.posts.map(post =>

              <div className="col-md-4">
                 <div className="news">
                      <img src = {post.urlToImage} className = "img-responsive" / >
                      <h2 key={post.id} > {post.title} </h2> 
                      <p className="lead">by {post.author} < /p> 
                      <p> <span className="glyphicon glyphicon-time"> </span> Posted on {post.publishedAt}</p>
                      <p> {post.description} </p> 
                </div>
              </div>
            )
          } </div></div>< /div>
    );
  }

  render() {
    return ( < div >
       {
        this.state.loading ?
          this.renderLoading() : this.renderPosts()
      } < /div>
    );
  }
}

var First1 = React.createClass({
  myClick: function(e) {
    //alert(e.currentTarget.getAttribute("data-city"));
    var city = e.currentTarget.getAttribute("data-city");
    //alert('Show 1');
    axios.get('https://newsapi.org/v1/articles?source=techcrunch&sortBy='+city+'&apiKey=5f9660935b874991b172628cd67412f1')
      .then(res => {
        //console.log(res.data);
        // Transform the raw data by extracting the nested posts
        const posts = res.data.articles;

        //console.log(posts);

        // Update state to trigger a re-render.
        // Clear any errors, and turn off the loading indiciator.
        //console.log(posts);
       this.props._updateState(res.data.articles);
        //console.log(this.setState);
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
    return ( < div> <h3>Sort By</h3>
             <ul className="list-unstyled">
                 <li><a onClick = {this.myClick} data-city='latest'> Latest < /a> </li>
                <li><a onClick = {this.myClick} data-city='top'> Top < /a> </li>
             </ul>
      < /div>
    );
  }
});


var Source = React.createClass({
  myClick: function(e) {
    //alert(e.currentTarget.getAttribute("data-city"));
    var city = e.currentTarget.getAttribute("data-city");
    //alert('Show 1');
    axios.get('https://newsapi.org/v1/articles?source='+city+'&sortBy=top&apiKey=5f9660935b874991b172628cd67412f1')
      .then(res => {
        //console.log(res.data);
        // Transform the raw data by extracting the nested posts
        const posts = res.data.articles;

        //console.log(posts);

        // Update state to trigger a re-render.
        // Clear any errors, and turn off the loading indiciator.
        //console.log(posts);
       this.props._updateState(res.data.articles);
        //console.log(this.setState);
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
    return ( < div > 
            <h3>Sort By Source </h3>
            <ul className="list-unstyled">
              <li> <a onClick = {this.myClick} data-city='business-insider'> Business Insider < /a> </li>
              <li><a onClick = {this.myClick} data-city='bloomberg'> bloomberg< /a> </li>
              <li><a onClick={this.myClick} data-city='buzzfeed'>buzzfeed</a></li>
              <li><a onClick={this.myClick} data-city='daily-mail'>daily-mail</a></li>
              <li> <a onClick={this.myClick} data-city='financial-times'>financial-times</a></li>
              <li><a onClick={this.myClick} data-city='mashable'>mashable</a></li>
              <li><a onClick={this.myClick} data-city='wired-de'>wired-de</a></li>
              <li><a onClick={this.myClick} data-city='time'>time</a></li>
              <li><a onClick={this.myClick} data-city='the-washington-post'>the-washington-post</a></li>
              <li><a onClick={this.myClick} data-city='the-new-york-times'>the-new-york-times</a></li>
              <li><a onClick={this.myClick} data-city='the-times-of-india'>the-times-of-india</a></li>
            </ul>
           
      < /div>
    );
  }
});



// Change the subreddit to anything you like
ReactDOM.render( < FetchDemo subreddit = "reactjs" / > ,
  document.getElementById('root')
);
