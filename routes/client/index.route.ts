import { Express } from "express"
import { tourRouter } from "./tour.route"
import { categoryRouter } from "./category.route"
import { cartRouter } from "./cart.route"
import { orderRoute } from "./order.route"

export const routesClient = (app: Express) => {
  app.use("/tours", tourRouter)
  app.use("/categories", categoryRouter)
  app.use("/cart", cartRouter)
  app.use("/order", orderRoute)
}