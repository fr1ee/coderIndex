var fs = require("fs");
var app = require('../app');

var heroDataFile = __dirname + "/" + "hero.data.json";

app.get('/api/heroes', function (req, res) {
  var heroes = JSON.parse(fs.readFileSync(heroDataFile, 'utf-8'));
  res.send(heroes);
});

app.get('/api/heroes/:id', function (req, res) {
  var heroes = JSON.parse(fs.readFileSync(heroDataFile, 'utf-8'));
  var data = heroes.find(hero => hero.id == +req.params.id);
  res.send(data);
});

app.post('/api/heroes', function (req, res) {
  var heroes = JSON.parse(fs.readFileSync(heroDataFile, 'utf-8'));

  var data = req.body;
  data.id = heroes.reduce((maxId, hero) => Math.max(hero.id, maxId), 0) + 1;
  heroes.push(data);

  fs.writeFileSync(heroDataFile, JSON.stringify(heroes));
  res.send(data);
});

app.put('/api/heroes/:id', function (req, res) {
  var heroes = JSON.parse(fs.readFileSync(heroDataFile, 'utf-8'));

  var data = req.body;
  heroes.some((hero, index, array) => {
    return hero.id == data.id ? array[index] = data : false;
  });

  fs.writeFileSync(heroDataFile, JSON.stringify(heroes));
  res.send(data);
});

app.delete('/api/heroes/:id', function (req, res) {
  var heroes = JSON.parse(fs.readFileSync(heroDataFile, 'utf-8'));

  var id = req.params.id;
  let index = this.heroes.findIndex(hero => hero.id == id);
  if (index >=0) {
    heroes.splice(index, 1);
  }

  fs.writeFileSync(heroDataFile, JSON.stringify(heroes));
  res.send('');
});