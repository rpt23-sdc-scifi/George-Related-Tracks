// import React from 'react';

class RelatedTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: 1,
      related: []
    }
  }

  render() {
    return (
      <>
        <img className="nicholas related-tracks band" src="https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg"/>
        <p>LionsBesideUs</p>
        <p>Last Chance</p>
        <p>&#9658 4</p>
        <p>&#9829 6</p>
        <p>&#10226 2</p>
        <p>&#128488 3</p>
      </>
    )
  }
}

export default RelatedTracks;
// ReactDOM.render(<relatedTracks />, document.getElementById('related'));