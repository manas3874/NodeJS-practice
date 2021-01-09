const http = require("http");
const routes = require("./routes");
// const { parse } = require("path");
// const requestHandler = require("./routes");
const server = http.createServer(routes);

server.listen(9000);
