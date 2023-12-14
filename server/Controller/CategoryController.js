import Category from '../Model/Category.js';
import slugify from 'slugify';

export const createCategoryController = async (req, res) => {
    try {
        const { categoryName } = req.body;
        if (!categoryName) return res.status(400).send({ success: false, message: 'Please enter category name' });

        const checkExistingCategory = await Category.findOne({ name: categoryName });
        if (checkExistingCategory) {
            return res.status(403).send({
                success: false,
                message: 'Category already exists'
            })
        }

        const category = await new Category({ name: categoryName, slug: slugify(categoryName) });
        await category.save();
        if (category) {
            return res.status(201).send({
                success: true,
                message: 'Category created successfully',
                category
            })
        }
        else {
            return res.status(400).send({
                success: false,
                message: 'Something went wrong with creating category',
                error
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with creating category',
            error
        });
    }

}

export const getCategoryController = async (req, res) => {
    try {
        const categories = await Category.find({});
        if (categories) {
            return res.status(200).send({
                success: true,
                message: 'Categories fetched successfully',
                categories
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with fetching categories',
            error
        });
    }
}

export const getSingleCategoryController = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        if (!category) {
            return res.status(404).send({
                success: true,
                message: 'Category doesnt exist',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Category fetched successfully',
            category
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with creating category',
            error
        });
    }
}


export const deleteCategoryController = async (req, res) => {
    try {
        const deleteCategory = await Category.findOneAndDelete({ slug: req.params.slug });
        if (!deleteCategory) {
            return res.status(404).send({
                success: true,
                message: 'Category doesnt exist',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
            deleteCategory
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with deleting category',
            error
        });
    }
}