const models = require("../models");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

module.exports = {

    get: {

        getCount: async (req, res, next) => {
            try {
                const count = await mongoose.connection.db.collection('products').countDocuments();
                res.send({ count });
            }

            catch (e) {
                next(e);
            }
        },

        getById: async (req, res, next) =>{
            const { id } = req.params;

            try {
                const product = await models.Product.findById(ObjectId(id));
                res.send(product);
            }

            catch (e) {
                next(e);
            }
        }
    },

    post: {
        create: async (req, res, next) => {

            const {
                title,
                description,
                imageUrl,
                quantity,
                price,
                tag,
                userId
            } = req.body;

            const user = await models.User.findById(userId).populate("roles");

            if (!user || !JSON.stringify(user.roles).includes("ADMIN")){
                return;
            }

            try {

                const tagByName = await models.ProductTag.findOne({
                    name: tag
                });


                if (!tagByName){
                    res.sendStatus(500);
                    return;
                }

                const createdProduct = await models.Product.create({
                    title,
                    description,
                    imageUrl,
                    quantity: parseInt(quantity),
                    price: parseFloat(price),
                    tag: ObjectId(tagByName._id)
                });

                res.send(createdProduct);
            } catch (e) {
                next(e);
            }
        },

        getProducts: async (req, res, next) =>{

            const {
                selectedTags,
                limit,
                skip,
            } = req.body;

            try {

                let products;

                if (selectedTags && selectedTags.length > 0) {

                    const tags = (await Promise.all(selectedTags.map(async (tagName) => {
                        return await models.ProductTag.findOne({
                            name: tagName
                        });
                    }))).map(t => {
                        return t._id;
                    });

                    products = await models.Product.find({
                        'tag': {$in: tags}
                    });

                    products = products.sort((p1, p2) => {
                        return p1.tag - p2.tag
                    });

                }

                else if (limit || skip) {

                    products = await models.Product.aggregate([
                        {$match: {}},
                        {$skip: parseInt(skip)},
                        {$limit: parseInt(limit)},
                    ]);
                }

                else {
                    products = await models.Product.find();
                }

                res.send(products);
            }

            catch (e) {
                next(e);
            }
        },
    }
};