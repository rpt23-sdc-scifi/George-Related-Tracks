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
    // console.log('MOUNT STATE: 🤪', this.state);
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
    // console.log('RENDER STATE: 🥶', this.state);
    return this.state.related.map(track => {
    let plays = [<span key={"spanPlays" + track.song_id}>&#9658;</span>, ` ${track.plays}`];
    let likes = [<span key={"spanLikes" + track.song_id} >&#9829;</span>, ` ${track.likes}`];
    let reposts = [<span key={"spanReposts" + track.song_id}>&#10226;</span>, ` ${track.reposts}`];
    let comments = [<span key={"spanComments" + track.song_id}>&#128488;</span>, ` 3`];
    return (
      <>
        <img key={"image" + track.song_id} className="nicholas related-tracks band-image" src="https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg"/>
        <p key={"band" + track.song_id} className="nicholas related-tracks band-name">LionsBesideUs</p>
        <p key={"song" + track.song_id} className="nicholas related-tracks song">Last Chance</p>
        <p key={"plays" + track.song_id} className="nicholas related-tracks plays">{plays}</p>
        <p key={"likes" + track.song_id} className="nicholas related-tracks likes">{likes}</p>
        <p key={"reposts" + track.song_id} className="nicholas related-tracks reposts">{reposts}</p>
        <p key={"comments" + track.song_id} className="nicholas related-tracks comments">{comments}</p>
      </>
    )})
  }
}

export default RelatedTracks;