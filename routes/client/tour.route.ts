import express from "express"
const router = express.Router()

import * as controller from "../../controllers/client/tour.controller"

router.get("/detail/:slug", controller.detail) 
router.get("/:slug", controller.index)


export const tourRouter = router