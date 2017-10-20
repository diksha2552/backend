var express = require('express')
var todoController = require('./controllers/todoController')

var app = express();

app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.get('/.well-known/assetlinks.json',function(req,res)
{
res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.example.navendu.myapplication",
    "sha256_cert_fingerprints":
    ["60:6E:4A:F2:10:82:A7:7E:68:58:6B:04:84:1C:90:5A:50:61:D9:A3:D1:DF:3D:14:56:30:F2:A6:FB:63:9C:F2"]
  }
}]));
})


todoController(app);


app.listen(process.env.PORT || 3000)
console.log('server is running')
