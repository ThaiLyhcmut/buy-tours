import { Request, Response } from "express"
import Tour from "../../models/tour.model"
import sequelize from "../../configs/database"
import { QueryTypes } from "sequelize"

export const index = async (req: Request, res: Response) => {
  const slug = req.params.slug
  const tours = await sequelize.query('CALL getToursByCategory(:slug)', {
    replacements: { slug },
    type: QueryTypes.RAW,
  })
  for (const item of tours) {
    if(item["images"]) {
      item["images"] = JSON.parse(item["images"])
      item["image"] = item["images"][0]
      item["price_special"] = parseInt(item["price_special"])
    }
  }
  console.log(tours)
  res.render("client/pages/tours/index", {
    pageTitle: "Trang danh sach tour",
    tours: tours
  })
}


export const detail = async (req: Request, res: Response) => {
  const slug = req.params.slug

  const tourDetail = await Tour.findOne({
    where: {
      slug: slug,
      deleted: false,
      status: "active"
    },
    raw: true
  })
  if(tourDetail["images"]) {
    tourDetail["images"] = JSON.parse(tourDetail["images"]);
  }
  tourDetail["price_special"] = (1 - tourDetail["discount"]/100) * tourDetail["price"];
  console.log(tourDetail)
  res.render("client/pages/tours/detail", {
    pageTitle: "Chi tiết tour",
    tourDetail: tourDetail
  });
}