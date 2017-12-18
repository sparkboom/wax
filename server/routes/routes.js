module.exports = (server) => {
  require('./static')(server);
  require('./index')(server);
};
