import 'dotenv/config';

import express, { Application } from "express";
import routes from './routes';
import { connectToDatabase } from './models';

async function app(app: Application) {
  const port = process.env.PORT || 4000;

  await connectToDatabase();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/', routes);
  app.use(express.static('public'));

  app.get('/', (req, res) => { res.send("poecilo-auth-server API is working") });

  app.listen(port, () => {
    console.log(`Listen on port ${ port }`);
  });
};

app(express());
