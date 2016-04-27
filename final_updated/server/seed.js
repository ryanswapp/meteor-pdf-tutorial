Meteor.startup(function() {
  if (Pokemon.find().count() < 1) {
    var pokemon = [
      {
        name: 'Pikachu',
        description: 'A cute electric shock',
        image_url: 'http://img1.wikia.nocookie.net/__cb20150717063932/pokemon/images/c/c0/025Pikachu_OS_anime_2.png'
      },
      {
        name: 'Charmander',
        description: 'A cute flame',
        image_url: 'http://vignette3.wikia.nocookie.net/pokemon/images/b/b9/004Charmander_Dream.png/revision/latest?cb=20140603214923'
      },
      {
        name: 'Squirtle',
        description: 'A cute water beast',
        image_url: 'http://vignette2.wikia.nocookie.net/pokemontowerdefense/images/3/39/007Squirtle.png/revision/latest?cb=20130104234028'
      },
      {
        name: 'Bulbasaur',
        description: 'A cute plant thing',
        image_url: 'http://vignette1.wikia.nocookie.net/pokemon/images/b/b8/001Bulbasaur_Dream.png/revision/latest?cb=20140903033758'
      }
    ];

    pokemon.forEach(function(pokemon) {
      Pokemon.insert(pokemon);
    });
  }
});