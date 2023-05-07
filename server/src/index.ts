import { app } from "./app";

const start = () => {

  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

};

start();
