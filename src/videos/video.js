import { createFactory, createClass, DOM } from 'react';
import { icon, duration, date } from '../lib/util';
import PlaylistPickerComponent from './playlist-picker/playlist-picker';

const PlaylistPicker = createFactory(PlaylistPickerComponent);

export default createClass({
  render () {
    const playlists = _.filter(this.props.subs, (sub) => sub.custom );

    return DOM.div({ className: 'video' },
      DOM.aside(null,
        DOM.button({ className: 'play-video', onClick: this.props.onPlay },
          DOM.img({ src: this.props.thumb }),
          icon('youtube-play')
        ),
        playlists.length ? this._playlistPicker(playlists) : null
      ),
      DOM.main(null,
        DOM.h4(null, this.props.title),
        DOM.div(null,
          DOM.p({ className: 'duration' }, icon('clock-o', duration(this.props.duration))),
          DOM.p({ className: 'pub-date' }, date(this.props.published))
        )
      )
    );
  },

  _playlistPicker (playlists) {
    return PlaylistPicker({
      videoId: this.props.id,
      playlists: playlists,
      addedToPlaylist: this.props.addedToPlaylist,
      removedFromPlaylist: this.props.removedFromPlaylist,
    });
  }
});
