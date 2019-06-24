import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";

import schema from "./schema";
import "./connection";
import "./env";

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  uploads: {
    maxFileSize: 10000000,
    maxFiles: 20
  },
  context: (context: any) => ({ context })
});

app.use("*", cors());
app.use(compression());
server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);

httpServer.listen({ port: 4000 }, (): void => console.log(`Hey guys`));
