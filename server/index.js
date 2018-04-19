require('./hero/hero');
require('./work/work');
require('./story/story');
require('./user/user');
require('./materials/materials');
require('./externalTeleInfo/externalTeleInfo');
require('./finishedStory/finishedStory');
require('./halfStory/halfStory');
require('./subscription/subscription');
require('./gateway/gateway');
require('./favorites/favorites');
require('./message-center/message-center');
require('./search/search');
require('./signStory/signStory');
require('./internetData/internetData');
require('./reporterCluesUserPoint/reporterCluesUserPoint');
require('./documentLiterature/documentLiterature');
require('./repository/repository');

var app = require('./app');


app.listen(app.get('port'), function() {
    console.log('app running on port', app.get('port'));
});
