const http = require('http');
const url = require('url');
const config = require('../appsettings.json');
const port = config.leadAnalyticsApi.port;

const requestHandler = (request, response) => {
  const urlParts = url.parse(request.url);
  const file = `./endpoints${urlParts.pathname}`;
  let data;

  try {
    data = require(file);
  } catch(e) {
    response.statusCode = 404;
  }

  response.end(JSON.stringify(data));
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
