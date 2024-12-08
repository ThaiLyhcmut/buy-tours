import { Request, Response } from "express"
import Category from "../../models/category.model"

export const index = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true
  })
  console.log(categories)
  res.render("client/pages/categories/index", {
    pageTitle: "Danh muc category",
    categories: categories
  })
}