(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};


//  @desc stores album information to be accessed by the SongPlayer service
    var currentAlbum = Fixtures.getAlbum();

/*
  @function getSongIndex
  @desc returns index of song from currentAlbum
  @param {Object} song
*/
    var getSongIndex = function(song) {
    return currentAlbum.songs.indexOf(song);
};

    SongPlayer.currentSong = null;
    var currentBuzzObject = null;

/*
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong();
      }

/*
* @desc Buzz object audio file
* @type {Object}
*/
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };


    SongPlayer.play = function(song) {
      if (currentSong !== song) {

/*
  @function playSong
  @desc plays song and sets song.playing to true so album.html changes play/pause icon
  @param {Object} song
*/
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

/*
  @function pauseSong
  @desc pauses song at its current point
  @param {Object} song
*/
    var pauseSong = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }

/*
  @function stopSong
  @desc stops and clears the currently playing song
*/
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }

/*
  @function SongPlayer.play(song)
  @desc plays a song from the beginning if the song has not already started and continues playing the song from where it left off if not
  @params {Object} song
*/
    SongPlayer.play = function(song) {
     song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        currentBuzzObject.play();
        song.playing = true;
      } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };

    SongPlayer.pause = function(song) {
     song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

/*
  @function Songplayer.previous
  @desc skips the track to the previous song in the album. if pressed while playing the first song (i.e. there is no previous track) the song stops playing.
*/
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

/*
  @function SongPlayer.next
  @desc skips the track to the next song on the album. if there isn't a next song, the playing stops.
*/
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex < currentAlbum.length) {
        stopSong(SongPlayer.currentson);
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
