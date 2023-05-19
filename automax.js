const http = require('http');
const fs = require('fs');


http.createServer((request, response)=>{

  if (request.url == '/guardar' && request.method == 'POST') {
    let datos = '';

    request.on('data', chunk => {
      datos += chunk;
    });

    request.on('end', () => {
      fs.appendFile('datos.txt', datos, err => {
        if (err) {
          console.error(err);
          response.statusCode = 500;
          response.end('Error al guardar los datos');
        } else {
          console.log('Datos guardados correctamente');
          response.end('Datos guardados correctamente');
        }
      });
    });
  }

  const file = request.url == '/' ?
  './www/landingpage.html' : `./www${request.url}`;

  fs.readFile(file, (err, data) =>{
    if(err){
      response.writeHead(404, {"Content-Type":"text/plain"});
      response.write("Not found");
      response.end();
    }else{
      const extension = request.url.split('.').pop();
      console.log(extension);
      switch (extension){
        case 'txt':
          response.writeHead(200, {"Content-Type":"text/plain"});
          break;
        case 'html':
          response.writeHead(200, {"Content-Type":"text/html"});
          break;
        case 'css':
          response.writeHead(200, {"Content-Type":"text/css"});
          break;
        case 'ico':
          response.writeHead(200, {"Content-Type":"image/x-icon"});
          break;
        case 'js':
          response.writeHead(200, {"Content-Type":"text/javascript"});
          break;
        case 'jpeg':
          response.writeHead(200, {"Content-Type":"image/jpeg"});
          break;
        case 'png':
          response.writeHead(200, {"Content-Type":"image/png"});
          break;
        case 'svg':
          response.writeHead(200, {"Content-Type":"image/svg"});
          break;
      default:
        response.writeHead(200, {"Content-Type":"text/html"});
      }
      response.write(data);
      response.end();
    }
  });
}).listen(8888);
