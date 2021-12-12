let http =require('http');
let server = http.createserver (function (req, res){
    console.log(req.ethod,req.url);
    if (req.method =='POST' && req.url == '/webhook'){
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify({ok:true}));
    }else{
        res.end('Not Found');
    }
});
server.listen(4000,()=>{
    console.log('webhook service  is running on port 4000');
});