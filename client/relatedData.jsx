import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class RelatedTracks extends React.Component {
  constructor(props) {
    super(props);
    this.song = window.location.pathname.substring(1);
    this.state = {
      currentSong: 1,
      related: [{song_id: 2, plays: 5, likes: 4, reposts: 3, image: 'https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg', song: 'Last Chance', band: 'LionsBesideUs'}]
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
        url: `/relatedTracks/${this.song}`,
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
    let image = [<img key={"image" + track.song_id} className="nicholas related-tracks band-image" src={track.image}/>];
    let song = [<p key={"song" + track.song_id} className="nicholas related-tracks song">{track.song}</p>]
    console.log(track);
    let band = [<p key={"band" + track.song_id} className="nicholas related-tracks band-name">{track.band}</p>]
    return (
      <>
        <div className="section">
        {image}
        <div className="test">
          {band}
          {song}
          <p key={"plays" + track.song_id} className="nicholas related-tracks plays">{plays}</p>
          <p key={"likes" + track.song_id} className="nicholas related-tracks likes">{likes}</p>
          <p key={"reposts" + track.song_id} className="nicholas related-tracks reposts">{reposts}</p>
          <p key={"comments" + track.song_id} className="nicholas related-tracks comments">{comments}</p>
        </div>
        </div>
      </>
    )})
  }
}

export default RelatedTracks;