const headers = require("./headers");

function errorHandle(res) {
  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      status: "false",
      message: "欄位沒有寫正確",
    }),
  );
  res.end();
}

module.exports = errorHandle;
