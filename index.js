const app = require("fastify")({
  logger: true,
});
const mongoose = require("mongoose");
const fastifyEnv = require("fastify-env");

//connected fastify to mongoose
try {
  mongoose.connect("mongodb://localhost:27017/blog_db");
} catch (e) {
  console.error(e);
}

const options = {
  confKey: "config",
  schema: {
    type: "object",
    required: ["PORT"],
    properties: {
      PORT: {
        type: "string",
        default: 1000,
      },
    },
  },
};

app.register(fastifyEnv, options).ready((err) => {
  if (err) console.error(err);

  console.log(app.config);
  // output: { PORT: 1000 }
});
// hooks
app.addHook("onRoute", (routeOptions) => {
  console.log(`Registered route: ${routeOptions.url}`);
});

// Declare a route
app.get("/", function (req, reply) {
  reply.send({ hello: "world" });
});

// Register routes to handle blog posts
const blogRoutes = require("./api/routes/v1/blogs");
blogRoutes.forEach((route, index) => {
  app.route(route);
});

// Multiple parameters within same couple of slash "/"
// e.g. /example/100-500 -> prints 100 and 500
app.get("/example/:lat-:lon", (req, reply) => {
  console.log(req.params.lat);
  console.log(req.params.lon);

  return { msg: "success" };
});

// Run the server!
app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
