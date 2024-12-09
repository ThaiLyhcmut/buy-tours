import express, { Express } from "express"
import dotenv from "dotenv"
dotenv.config()
import sequelize from "./configs/database";
import { routesClient } from "./routes/client/index.route";
import bodyParser = require("body-parser");
import { routesAdmin } from "./routes/admin/index.route";
import { prifixAdmin } from "./configs/systemConfig";
sequelize

const app: Express = express();
const port: Number = 3000;

app.locals.prifixAdmin = prifixAdmin

app.set('views', `${__dirname}/views`)
app.set('view engine', `pug`)
app.use(express.static(`${__dirname}/public`)); 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


routesClient(app)
routesAdmin(app)

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`)
})