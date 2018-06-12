(function() {
     function Fixtures() {
         var Fixtures = {};

         var albumTerry = {
             title: 'Red Handed EP',
             artist: 'Myke Terry',
             label: 'Break Entertainment',
             year: '2015',
             albumArtUrl: '/assets/images/album_covers/001.png',
             songs: [
                 { title: 'Whatcha Think About That', duration: '213.37', audioUrl: '/assets/music/whatcha-think' },
                 { title: 'Underage', duration: '205.25', audioUrl: '/assets/music/underage' },
                 { title: 'Slide', duration: '199.55', audioUrl: '/assets/music/slide' },
                 { title: 'F\'d Up Girl Across the Street', duration: '190.64', audioUrl: '/assets/music/fd-up-girl' },
                 { title: 'Red Handed', duration: '263.26', audioUrl: '/assets/music/red-handed' },
                 { title: 'Just Distance', duration: '173.57', audioUrl: '/assets/music/just-distance' },
                 { title: 'Come As You Are', duration: '144.58', audioUrl: '/assets/music/come' },
             ]
         };

         Fixtures.getAlbum = function() {
           return albumTerry;
         };

         Fixtures.getCollection = function(numberOfAlbums) {
           var albumCollection = [];
           for (var i=0; i < numberOfAlbums; i++) {
              albumCollection.push(angular.copy(albumTerry));
            }
            return albumCollection;
          };

         return Fixtures;
     }

     angular
         .module('blocJams')
         .factory('Fixtures', Fixtures);
 })();
