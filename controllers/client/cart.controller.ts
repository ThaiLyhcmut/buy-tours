import { Request, Response } from "express"
import Tour from "../../models/tour.model";

export const index = async (req: Request, res: Response) => {
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng"
  })
}


export const postList = async (req: Request, res: Response) => {
  const tours = req.body;
  let totle = 0
  for (const tour of tours) {
    const infoTour = await Tour.findOne({
      where: {
        id: tour.tour_id
      },
      raw: true
    })
    if(infoTour["images"]){
      infoTour["images"] = JSON.parse(infoTour["images"]);
      tour["image"] = infoTour["images"][0]
    }
    tour["title"] = infoTour["title"]
    tour["slug"] = infoTour["slug"]
    tour["price_special"] = (1 - infoTour["discount"]/100) * infoTour["price"]
    tour["totle"] = tour["price_special"] * tour["quantity"]
    totle = totle + tour["totle"]
  }

  res.json({
    tours: tours,
    totle: totle
  })
}