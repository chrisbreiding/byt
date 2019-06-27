import _ from 'lodash'
import { observer } from 'mobx-react'
import React from 'react'

import { icon, duration, date } from '../lib/util'
import PlaylistPicker from './playlist-picker/playlist-picker'

const Video = observer((props) => {
  const playlists = _.filter(props.subs, (sub) => sub.isCustom)

  function playlistPicker () {
    if (!playlists.length) return null

    return (
      <PlaylistPicker
        videoId={props.video.id}
        playlists={playlists}
        addedToPlaylist={props.addedToPlaylist}
        removedFromPlaylist={props.removedFromPlaylist}
      />
    )
  }

  return (
    <div className='video'>
      <div className='contents'>
        <aside>
          <button className='play-video' onClick={props.onPlay}>
            <img src={props.video.thumb} />
            {props.channelImage && <img className='channel' src={props.channelImage} />}
            {icon('youtube-play')}
          </button>
        </aside>
        <main>
          <h4>{props.video.title}</h4>
          <div>
            <p className='duration'>{icon('clock-o', duration(props.video.duration))}</p>
            <p className='pub-date'>{date(props.video.published)}</p>
          </div>
        </main>
      </div>
      {playlistPicker()}
    </div>
  )
})

export default Video
