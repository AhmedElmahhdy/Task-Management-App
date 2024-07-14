import { Category } from "../../../db/models/categories.model.js";

export const createCategory = async (req, res ,next) => {
    const { name, description } = req.body 
    const categories = new Category({
        name,
        description
    })
    await categories.save()
    res.status(200).json({
        message : "Category created successfully"
    })   

}


export const getCategories = async (req, res, next) => {
    const categories = await Category.find()
    if (!categories) return next(new ErrorClass("Categories not found", 400))
    res.status(200).json({
        categories
    })
}


export const updateCategory = async (req, res,next) => {
    const { name, description } = req.body
    const { id } = req.params
    const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true })
    if (!category) return next(new ErrorClass('Category not found', 404))
    res.status(200).json({
        message : "Category updated successfully",
        category
    })
}


export const deleteCategory = async (req, res,next) => {
    const { id } = req.params
    const category = await Category.findByIdAndDelete(id)
    if (!category) return next(new ErrorClass('Category not found', 404))
    res.status(200).json({
        message : "Category deleted successfully"
    })
}