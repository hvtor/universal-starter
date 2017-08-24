// Load zone.js for the server.
require('zone.js/dist/zone-node');
const fs = require('fs');

// Import renderModuleFactory from @angular/platform-server.
const { renderModuleFactory } = require('@angular/platform-server');

const files = fs.readdirSync(`${process.cwd()}/dist-server`);
const mainFiles = files.filter(file => file.startsWith('main'));
const hash = mainFiles[0].split('.')[1];``

// Import the AOT compiled factory for your AppServerModule.
// This import will change with the hash of your built server bundle.
const { AppServerModuleNgFactory } = require(`./dist-server/main.${hash}.bundle`);
const AppServerMod = require(`./dist-server/main.${hash}.bundle`);

// Load the index.html file.
const index = require('fs').readFileSync('./dist/index.html', 'utf8');

// Render to HTML and log it to the console.
renderModuleFactory(AppServerModuleNgFactory, {document: index, url: '/'})
  .then(html => fs.writeFileSync('./dist/index.html', html));
