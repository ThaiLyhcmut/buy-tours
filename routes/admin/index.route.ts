import { Express } from "express"
import { categoryRouter } from "./category.route"
import { prifixAdmin } from "../../configs/systemConfig"
import { tourRouter } from "./tour.route"
import { uploadRouter } from "./upload.route"
export const routesAdmin = (app: Express) => {
  const pathAdmin = prifixAdmin
  app.use(`/${pathAdmin}/categories`, categoryRouter)
  app.use(`/${pathAdmin}/tours`, tourRouter)
  app.use(`/${pathAdmin}/upload`, uploadRouter);
}