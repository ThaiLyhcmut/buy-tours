import express, { Express } from "express"
import dotenv from "dotenv"
dotenv.config()
import sequelize from "./configs/database";
import Tour from "./models/tour.model";
import { routesClient } from "./routes/client/index.route";

sequelize

const app: Express = express();
const port: Number = 3000;

app.set('views', `${__dirname}/views`)
app.set('view engine', `pug`)
app.use(express.static(`${__dirname}/public`)); 

routesClient(app)

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`)
})