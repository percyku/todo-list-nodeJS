const headers = require("./headers");

function successHandle(res, todos) {
  res.writeHead(200, headers);
  res.write(
    JSON.stringify({
      status: "sucess",
      data: todos,
    }),
  );
  res.end();
}

module.exports = successHandle;
