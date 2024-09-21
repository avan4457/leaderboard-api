import env from "./config/env";
import app from "./server";

const PORT = env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
