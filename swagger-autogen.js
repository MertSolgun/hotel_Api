"use strict";
/* -------------------------------------------------------
	EXPRESS - Personnel API
------------------------------------------------------- */
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8003;
/* ------------------------------------------------------- */
const swaggerAutogen = require("swagger-autogen")();
const packageJson = require("./package.json");

const document = {
  info: {
    version: packageJson.version,
    title: packageJson.title,
    description: packageJson.description,
    termsOfService: "https://github.com/MertSolgun?tab=repositories",
    contact: { name: packageJson.author, email: "solgunmert@gmail.com" },
    license: { name: packageJson.license },
  },
  host: `${HOST}:${PORT}`,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    Token: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "Simple Token Authentication * Example: <b>Token ...tokenKey...</b>",
    },
    Bearer: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "JWT Authentication * Example: <b>Bearer ...accessToken...</b>",
    },
  },
  security: [{ Token: [] }, { Bearer: [] }],
  definitions: {
    Models: {
      reservation: require("./src/models/reservation").schema.obj,
      room: require("./src/models/room").schema.obj,
      user: require("./src/models/usermodel").schema.obj,
    },
  },
};

const routes = ["./index.js"];
const outputFile = "./src/configs/swagger.json";

// Create JSON file:
swaggerAutogen(outputFile, routes, document);
