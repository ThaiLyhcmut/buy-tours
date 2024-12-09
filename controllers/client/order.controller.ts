import { Request, Response } from "express"
import Order from "../../models/order.model"
import { generateOrderCode } from "../../helpers/generate.helper"

export const postOrder = async (req: Request, res: Response) => {
  const info = req.body.info
  const cart = req.body.cart
  console.log(info)
  const dataOrder = {
    code: "",
    fullName: info.fullName,
    phone: info.phone,
    note: info.note,
    status: "initial"
  }
  
  const order = await Order.create(dataOrder);
  const orderId = order.dataValues.id

  const code = generateOrderCode(orderId);

  await Order.update({
    code: code
  }, {
    where: {
      id: orderId
    }
  })

  res.json({
    code: "success",
    msg: "Đặt hàng thành công",
    orderCode: code
  })
}