(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    SongPlayer.currentSong = null;
    var currentBuzzObject = null;


  // stores album information to be accessed by the SongPlayer service
    var currentAlbum = Fixtures.getAlbum();


    /* @function getSongIndex
      @desc returns index of song from currentAlbum
      @param {Object} song */
    var getSongIndex = function(song) {
    return currentAlbum.songs.indexOf(song);
};

    /* @function setSong
       @desc Stops currently playing song and loads new audio file as currentBuzzObject
       @param {Object} song */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong();
      }


      /* @desc Buzz object audio file
         @type {Object} */
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    /* @function playSong
       @desc plays song and sets song.playing to true so album.html changes play/pause icon
       @param {Object} song */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

    /* @function pauseSong
       @desc pauses song at its current point
       @param {Object} song */
    var pauseSong = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }

    /* @function stopSong
       @desc stops and clears the currently playing song */
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }

    /* @function SongPlayer.play(song)
       @desc resume playback of a paused song or otherwise start playback from the beginning. sets song.playing to true
       @params {Object} song */
    SongPlayer.play = function(song) {
     song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        currentBuzzObject.play();
        song.playing = true;
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.pause()) {
          currentBuzzObject.play();
        }
      }
    };

    /* @function SongPlayer.pause(song)
       @desc pauses playback at the current time elapsed. sets song.playing to false
       @param song */
    SongPlayer.pause = function(song) {
     song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /* @function Songplayer.previous
       @desc starts playback of the previous song on album. if current song is the first on the album, pressing previous stops playback */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /* @function SongPlayer.next
       @desc skip to the next song on the album. if current song is the last on the album, pressing next stops playback. */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > Object.keys(currentAlbum).length) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
