import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class RelatedTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: 1,
      related: [{song_id: 2, plays: 5, likes: 4, reposts: 3}]
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
    return this.state.related.map(track => {
    let plays = [<span key={"spanPlays" + track.song_id}>&#9658;</span>, ` ${track.plays}`];
    let likes = [<span key={"spanLikes" + track.song_id} >&#9829;</span>, ` ${track.likes}`];
    let reposts = [<span key={"spanReposts" + track.song_id}>&#10226;</span>, ` ${track.reposts}`];
    let comments = [<span key={"spanComments" + track.song_id}>&#128488;</span>, ` 3`];
    return (
      <>
        <img key={"image" + track.song_id} className="nicholas related-tracks band" src="https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg"/>
        <p key={"band" + track.song_id}>LionsBesideUs</p>
        <p key={"song" + track.song_id}>Last Chance</p>
        <p key={"plays" + track.song_id}>{plays}</p>
        <p key={"likes" + track.song_id}>{likes}</p>
        <p key={"reposts" + track.song_id}>{reposts}</p>
        <p key={"comments" + track.song_id}>{comments}</p>
      </>
    )})
  }
}

export default RelatedTracks;

// ReactDOM.render(<RelatedTracks />, document.getElementById('related'));