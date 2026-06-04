const http = require("http");
const { v4: uuidv4 } = require("uuid");
const errHandle = require("./errorHandle");
const todos = [
  {
    title: "學習nodeJS",
    id: uuidv4(),
  },
  {
    title: "睡覺",
    id: uuidv4(),
  },
];

const requestListner = (req, res) => {
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json",
  };

  let body = "";
  req.on("data", (chunk) => {
    // console.log(chunk);
    body += chunk;
  });

  if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "sucess",
        data: todos,
      }),
    );
    res.end();
  } else if (req.url === "/todos" && req.method === "POST") {
    req.on("end", () => {
      try {
        const title = JSON.parse(body).title;

        if (title !== undefined) {
          const todo = {
            title: title,
            id: uuidv4(),
          };

          todos.push(todo);
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "sucess",
              data: todos,
            }),
          );
          res.end();
        } else {
          errHandle(res);
        }
      } catch (error) {
        errHandle(res);
      }
    });
  } else if (req.url === "/todos" && req.method === "DELETE") {
    todos.length = 0;

    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "sucess",
        data: todos,
      }),
    );
    res.end();
  } else if (req.url.startsWith("/todos/") && req.method === "DELETE") {
    const id = req.url.split("/").pop();
    const idx = todos.findIndex((element) => element.id === id);

    if (idx !== -1) {
      todos.splice(idx, 1);
      res.writeHead(200, headers);
      res.write(
        JSON.stringify({
          status: "sucess",
          data: todos,
        }),
      );
      res.end();
    } else {
      errHandle(res);
    }
  } else if (req.url.startsWith("/todos/") && req.method === "PATCH") {
    req.on("end", () => {
      try {
        const todo = JSON.parse(body).title;
        const id = req.url.split("/").pop();
        const idx = todos.findIndex((element) => element.id === id);

        if (todo !== undefined && idx !== -1) {
          todos[idx].title = todo;
        } else {
          errHandle(res);
        }
        res.end();
      } catch (error) {
        console.log(error);
        errHandle(res);
      }
    });
  } else if (req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "not found this page",
      }),
    );
    res.end();
  }
};

const server = http.createServer(requestListner);
server.listen(process.env.PORT || 3005);
