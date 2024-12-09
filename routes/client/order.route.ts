import express from "express"

const router = express.Router()

import * as controller from "../../controllers/client/order.controller"

router.post("/", controller.postOrder)
router.get("/success", controller.getSuccess)

export const orderRoute = router