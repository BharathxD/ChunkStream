import express from "express";

const app = express();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

const gracefulShutdown = (signal: string) => {
  process.on(signal, () => {
    server.close();
    // TODO: Disconnect from the DataBase
    process.exit(0);
  });
};

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
