import express from "express"

export const Product = express.Router()

Product.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send({ data: products})
    } catch (err) {
        res.status(400).send({ error: err})
    }
})

Product.get('/products-by-categories', async(req, res) => {
    try {
        const products = await Product.aggregate([
            { $match: {}},
            { $group: {
                _id: '$category',
                products: { $push: '$$ROOT'}
            }},
            { $project: { name: '$_id', products: 1, _id: 0}}
        ])
        res.status(200).send({ data: products})
    } catch (err) {
        res.status(400).send({ error: err})
    }
})