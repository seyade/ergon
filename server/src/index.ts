import app from "./app";

import { config } from "./config";

app.listen(config.PORT, "0.0.0.0", () =>
  console.log(`Ergon server running on port ${config.PORT}`)
);
