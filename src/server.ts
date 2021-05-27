import swaggerUi from "swagger-ui-express";

import { app } from ".";
import swaggerConfig from "./swagger.json";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.listen(3333, () => console.log("Server is running!"));
