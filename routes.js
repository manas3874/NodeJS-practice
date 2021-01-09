const fs = require("fs");
const requestHandler = (request, response) => {
  // console.log(request);
  const url = request.url;
  const method = request.method;
  if (url === "/") {
    response.write(
      '<html><body><h1>Your name?</h1><form action="/message" method="POST"><input type="text" name="User Name"><button type="submit">Proceed now</button></form></body></html>'
    );
    return response.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
    });

    request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      var messageBody = parsedBody.split("=")[1];
      while (messageBody.includes("+")) {
        messageBody = messageBody.replace("+", " ");
      }
      fs.writeFile("message.text", messageBody, (error) => {
        response.setHeader("Content-Type", "text/html");
        response.write(
          `<html><body><h1>Hello ${messageBody}, from node</h1></body></html>`
        );
        return response.end();
      });
    });
  }
  if (url === "/article") {
    const article = fs.readFileSync("./index.html");
    response.write(article);
    return response.end();
  }
};

module.exports = requestHandler;
