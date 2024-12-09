import { Request, Response } from "express"
import Order from "../../models/order.model"
import { generateOrderCode } from "../../helpers/generate.helper"
import Tour from "../../models/tour.model"
import OrderItem from "../../models/order-item.nodel"

export const postOrder = async (req: Request, res: Response) => {
  const info = req.body.info
  const cart = req.body.cart
  console.log(info)
  const dataOrder = {
    code: "no",
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

  for (const item of cart) {
    const dataItem = {
      orderId: orderId,
      tourId: item.tour_id,
      quantity: item.quantity
    }
    const tourInfo = await Tour.findOne({
      where: {
        id: item.tour_id,
        deleted: false,
        status: "active"
      },
      raw: true,
    })
    dataItem["price"] = tourInfo["price"]
    dataItem["dsicount"] = tourInfo["dsicount"]
    dataItem["timeStart"] = tourInfo["timeStart"]
    await OrderItem.create(dataItem)
  }


  res.json({
    code: "success",
    msg: "Đặt hàng thành công",
    orderCode: code
  })
}

export const getSuccess = async (req: Request, res: Response) => {

  const orderCode = req.query.orderCode
  const order = await Order.findOne({
    where: {
      code: orderCode,
      deleted: false,
    },
    raw: true,
  })
  const orderItems = await OrderItem.findAll({
    where: {
      orderId: order["id"],
    },
    raw: true,
  })
  for (const item of orderItems) {
    item["price_special"] = (item["price"] * (1 - item["discount"]/100));
    item["total"] = item["price_special"] * item["quantity"] 
    const tourInfo = await Tour.findOne({
      where: {
        id: item["tourId"]
      },
      raw: true
    })
    tourInfo["images"] = JSON.parse(tourInfo["images"])
    item["image"] = tourInfo["images"][0]
    item["title"] = tourInfo["title"]
    item["slug"] = tourInfo["slug"]
  }

  order["total_price"] = orderItems.reduce((sum, item) => sum + item["total"], 0)
  res.render("client/pages/order/success", {
    pageTitle: "Đặt hàng thành công",
    order: order,
    orderItems: orderItems
  })
}