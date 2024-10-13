import app from "./app";

import { config } from "./config";

app.listen(config.PORT, () =>
  console.log(`Ergon server running on port ${config.PORT}`)
);
