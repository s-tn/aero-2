import createServer from '@tomphttp/bare-server-node';
import http from 'http';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import nodeStatic from 'node-static';
import webpack from 'webpack';

const bare = createServer('/bare/');
const serve = new nodeStatic.Server('static/');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url.startsWith('/service/')) return res.writeHead(200,{'content-type':'text/html'}).end(`<script>if('serviceWorker' in navigator) navigator.serviceWorker.register('/worker.js', {scope: '/service/'}).then(e=>location.reload())</script>`);
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    serve.serve(req, res);
  }
});

server.on('upgrade', (req, socket, head) => {

  if (bare.shouldRoute(req, socket, head)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen({
  port: process.env.PORT || 80,
});

/*var bundle = webpack({
  mode: 'development',
    entry: {
    client: join(__dirname, "blaze/client/index.ts"),
  },
  output: {
    path: path.join(__dirname, "public/blazesw"),
    filename: 'blaze.[name].js',
  }
});

bundle.watch({}, (err)=>{if (err)console.log(err)});*/