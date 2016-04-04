var koa     = require('koa'),
    send    = require('koa-send'),
    router  = require('koa-router')(),
    serve   = require('koa-static');

var app = koa();
// serve files in public folder (css, js etc)
app.use(serve(__dirname));
app.use(serve(__dirname + '/dist'));

router.get('/api/books', function *(){
    this.body = 'hi from get books';
});
// rest endpoints
router.get('*', function *(){
    yield send(this,'index.html');
});

app.use(router.routes());

// this last middleware catches any request that isn't handled by
// koa-static or koa-router, ie your index.html in your example
app.use(function* index() {
    yield send(this, __dirname + '/index.html');
});

app.listen(process.env.PORT || 8080);