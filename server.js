require('zone.js/dist/zone-node');
const { Request, Response } = require('express');
const { platformServer, renderModuleFactory } = require('@angular/platform-server');
const { ngExpressEngine } = require('@nguniversal/express-engine');
const express = require('express');
const fs = require('fs');

const files = fs.readdirSync(`${process.cwd()}/../dist-server`);
const mainFiles = files.filter(file => file.startsWith('main'));
const hash = mainFiles[0].split('.')[1];``

const { AppServerModuleNgFactory } = require(`./../dist-server/main.${hash}.bundle`);

const app = express();
const port = 8000;
const baseUrl = `http://localhost:${port}`;

// Set the engine
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory//AppServerModuleFactory // Give it a module to bootstrap
}));

app.set('view engine', 'html');

app.set('views', './');
app.use('/', express.static('./', {index: false}));

app.get('*', (req, res) => {
  res.render('index', {
    req,
    res
  });
});

app.listen(port, () => {
	console.log(`Listening at ${baseUrl}`);
});
