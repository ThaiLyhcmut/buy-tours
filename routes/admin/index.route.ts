import { Express } from "express"
import { categoryRouter } from "./category.route"
import { prifixAdmin } from "../../configs/systemConfig"
export const routesAdmin = (app: Express) => {
  const pathAdmin = prifixAdmin
  app.use(`/${pathAdmin}/categories`, categoryRouter)
}