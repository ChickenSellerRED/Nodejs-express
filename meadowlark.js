var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();
app.set('port', process.env.PORT || 3000);
// 设置 handlebars 视图引擎
var handlebars = require('express3-handlebars')
    .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
    res.status(200)
    res.render('home')
});
app.get('/about', function(req, res){
    res.status(200)
    res.render('about',{fortuneCookie:fortune.getFortune()})
});
app.get('/about1', function(req, res){
    res.status(500)
    res.end()
});
// 定制 404 页面
app.use(function(req, res){
    res.status(404);
    res.render('404')
});
// 定制 500 页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500')
});
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});