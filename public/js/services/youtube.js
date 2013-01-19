(function() {

  define(['underscore'], function(_) {
    var baseUrl, channelVideoId, playlistVideoId, youTubeIdRegEx;
    baseUrl = 'https://gdata.youtube.com/feeds/';
    youTubeIdRegEx = /\/([a-zA-Z0-9_-]+)$/;
    channelVideoId = function(video) {
      var matches;
      matches = video.id.$t.match(youTubeIdRegEx);
      return matches[1];
    };
    playlistVideoId = function(video) {
      return video.media$group.yt$videoid.$t;
    };
    return {
      queryYouTube: function(url, data) {
        var defaultData;
        if (data == null) {
          data = {};
        }
        defaultData = {
          alt: 'json'
        };
        data = _.extend(defaultData, data);
        return $.ajax({
          dataType: 'JSONP',
          url: baseUrl + url,
          data: data
        });
      },
      searchChannels: function(query) {
        return this.queryYouTube('api/channels', {
          q: query,
          v: 2,
          'max-results': 10
        });
      },
      getPlaylistsByChannel: function(channelId) {
        return this.queryYouTube("api/users/" + channelId + "/playlists");
      },
      getVideosByChannel: function(channelId) {
        return this.queryYouTube("users/" + channelId + "/uploads");
      },
      getVideosByPlaylist: function(playlist) {
        return this.queryYouTube("api/playlists/" + playlist.playlistId, {
          v: 2,
          orderby: 'published',
          'start-index': playlist.count > 24 ? playlist.count - 24 : 1
        });
      },
      mapChannelDetails: function(entry) {
        return {
          channelId: entry.yt$channelId.$t,
          title: entry.title.$t,
          author: entry.author[0].name.$t,
          thumb: entry.media$thumbnail[0].url
        };
      },
      mapPlaylistDetails: function(playlist) {
        return {
          playlistId: playlist.yt$playlistId.$t,
          title: playlist.title.$t,
          thumb: playlist.media$group.media$thumbnail[0].url,
          count: playlist.gd$feedLink[0].countHint
        };
      },
      mapVideoDetails: function(video, type) {
        var videoId;
        videoId = type === 'channel' ? channelVideoId(video) : playlistVideoId(video);
        return {
          videoId: videoId,
          title: video.title.$t,
          published: video.published.$t,
          updated: video.updated.$t,
          thumb: video.media$group.media$thumbnail[0].url,
          duration: video.media$group.yt$duration.seconds
        };
      }
    };
  });

}).call(this);
