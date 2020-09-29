import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class RelatedTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: 1,
      related: []
    }

    this.updateRelated = this.updateRelated.bind(this);
  }

  updateRelated(data) {
    this.setState({related: data});
  }

  componentDidMount() {
    $.ajax(
      {
        url: '/relatedTracks/1',
        data: {},
        success: data => this.updateRelated(data),
        error: err => console.log(err)
      }
    );
  }

  render() {
    let plays = [<span key="spanPlays">&#9658;</span>, ` 4`];
    let likes = [<span key="spanLikes">&#9829;</span>, ` 6`];
    let reposts = [<span key="spanReposts">&#10226;</span>, ` 2`];
    let comments = [<span key="spanComments">&#128488;</span>, ` 3`];
    return (
      <>
        <img key="image" className="nicholas related-tracks band" src="https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg"/>
        <p key="band">LionsBesideUs</p>
        <p key="song">Last Chance</p>
        <p key="plays">{plays}</p>
        <p key="likes">{likes}</p>
        <p key="reposts">{reposts}</p>
        <p key="comments">{comments}</p>
      </>
    )
  }
}

ReactDOM.render(<RelatedTracks />, document.getElementById('related'));