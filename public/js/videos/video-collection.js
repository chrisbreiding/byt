(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'underscore', 'services/vent', 'services/youtube', 'videos/video-model'], function(Backbone, _, vent, youtube, VideoModel) {
    var VideoCollection;
    VideoCollection = (function(_super) {

      __extends(VideoCollection, _super);

      function VideoCollection() {
        this.mapVideo = __bind(this.mapVideo, this);

        this.loadVideos = __bind(this.loadVideos, this);
        return VideoCollection.__super__.constructor.apply(this, arguments);
      }

      VideoCollection.prototype.model = VideoModel;

      VideoCollection.prototype.initialize = function() {
        var _this = this;
        vent.on('channel:load', function(channelId) {
          _this.type = 'channel';
          return youtube.getVideosByChannel(channelId).done(_this.loadVideos);
        });
        return vent.on('playlist:load', function(playlist) {
          _this.type = 'playlist';
          return youtube.getVideosByPlaylist(playlist).done(_this.loadVideos);
        });
      };

      VideoCollection.prototype.comparator = function(a, b) {
        return Date.parse(b.get('published')) - Date.parse(a.get('published'));
      };

      VideoCollection.prototype.loadVideos = function(results) {
        return this.reset(_.map(results.feed.entry, this.mapVideo));
      };

      VideoCollection.prototype.mapVideo = function(video) {
        return youtube.mapVideoDetails(video, this.type);
      };

      return VideoCollection;

    })(Backbone.Collection);
    return new VideoCollection;
  });

}).call(this);
