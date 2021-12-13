const crypto = require('crypto');
const http =require('http');
const SECRET = '123456'

function sign(body){
    return 'sha1=' + crypto.creatHmac('sha1',SECRET).update(body).digest('hex')
}

let server = http.createServer (function (req, res){
    console.log(req.method,req.url);
    if (req.method =='POST' && req.url == '/webhook'){
        let buffers = [];
        req.on('data', function(buffer){
            buffers.push(push);
        });
        req.on('end',function(){
            let body = Buffer.concat(buffers);
            let event = req.headers['x-gitHub-Event'];
            let signature = req.headers['x-hub-signature'];
            if (signature !==sign(body)){
                return res.end('Not Allowed');
            }
        });
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify({ok:true}));
    }else{
        res.end('Not Found');
    }
});
server.listen(4000,()=>{
    console.log('webhook service  is running on port 4000');
});