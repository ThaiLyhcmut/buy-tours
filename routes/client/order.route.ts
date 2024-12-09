import express from "express"

const router = express.Router()

import * as controller from "../../controllers/client/order.controller"

router.post("/", controller.postOrder)

export const orderRoute = router