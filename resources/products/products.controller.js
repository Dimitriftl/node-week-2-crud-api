const Product = require('./products.model');

const Joi = require('joi');

module.exports = {
    async getOneProduct(req, res) {
        const id = req.params.id;

        try {
            const product = await Product.findById(id);

            res.send({
                ok: true,
                data: product
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send({
                ok: false,
                msg: 'Internal Server Error'
            });
        }
    },
    async getAllProducts(req, res) {
        const products = await Product.find();

        res.send({
            ok: true,
            data: products,
        });
    },
    async createOneProduct(req, res) {
        const schema = Joi.object({
            title: Joi.string().required(),
            year: Joi.number(),
            desc: Joi.string(),
            price: Joi.number().required(),
            color: Joi.string(),
        });

        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).send({
                ok: false,
                msg: result.error.details[0].message,
            });
        }
        else {
            try {
                const newProduct = await Product.create(req.body);
                res.send({
                    ok: true,
                    data: newProduct,
                });
            } catch (err) {
                console.error(err.message);
                res.status(500).send({
                    ok: false,
                    msg: 'Internal Server Error',
                });
            }
        }
    },
    async updateOneProduct(req, res) {
        const id = req.params.id;

        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.send({
                ok: true,
                data: updatedProduct
            });

        } catch (err) {
            console.error(err.message);
            res.status(404).send({
                ok: false,
                sg: 'Id given not correct'
            });
        }
    },
    async deleteOneProduct(req, res) {
        const id = req.params.id;

        try {
            const deletedProduct = await Product.findByIdAndDelete(id);
            res.send({
                ok: true,
                data: deletedProduct
            });
        } catch (err) {
            console.error(err.message);
            res.status(404).send({
                ok: false,
                msg: 'Id given not correct'
            });
        }
    },
};