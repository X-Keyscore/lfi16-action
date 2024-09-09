const mongoose = require('mongoose');
const Product = require('../models/product-model')
const List = require('../models/list-model')
const isBase64 = require('is-base64');

const { rep } = require("../functions.js");

module.exports = {
	productCreate: async (req, res) => {
		try {
			if (!req.body) return rep(res, { code: 400, success: false, msg: "Query error" })

			const { parentListId, productField } = req.body;

			if (!parentListId || !productField) {
				return rep(res, { code: 400, success: false, msg: "Query error" })
			}

			const product = new Product({
				...productField,
				img: "test img non def"
			})
			if (!product) return rep(res, { code: 500, success: false, msg: "Error" })

			const newProduct = await product.save();

			const updateList = await List.updateOne(
				{ _id: parentListId },
				{ $push: { products: newProduct._id } }
			);
			
			return rep(res, { code: 200, success: true, msg: "" }, newProduct)
		} catch (err) {
			console.log(err)
			return rep(res, { code: 500, success: false, msg: "Error" })
		}
	},
	productGet: async (req, res) => {
		try {

			const products = await Product.find()
			return rep(res, { code: 200, success: true, msg: "" }, products)
		} catch (err) {
			console.log(err)
			return rep(res, { code: 500, success: false, msg: "Error" })
		}
	},
	productUpdate: async (req, res) => {
		try {
			if (!req.body) return rep(res, { code: 400, success: false, msg: "Query error" })

			const { productId, productField } = req.body;

			if (!productId || !productField) {
				return rep(res, { code: 400, success: false, msg: "Query error" })
			}

			const updateProduct = await Product.findOneAndUpdate(
				{ _id: productId },
				{ $set: { ...productField } },
				{ new: true }
			)
			return rep(res, { code: 200, success: true, msg: "" }, updateProduct)
		} catch (err) {
			console.log(err)
			return rep(res, { code: 500, success: false, msg: "Error" })
		}
	},
	productDelete: async (req, res) => {
		try {
			if (!req.params) return rep(res, { code: 400, success: false, msg: "Query error" })

			const { _id } = req.params;

			if (!_id) {
				return rep(res, { code: 400, success: false, msg: "Query error" })
			}

			const deleteProduct = await Product.deleteOne({ _id })

			const updateList = await List.findOneAndUpdate(
				{ products: { $in: [new mongoose.Types.ObjectId(_id)] } },
				{ $pull: { products: { $in: [new mongoose.Types.ObjectId(_id)] } } },
				{ new: true, useFindAndModify: false }
			);

			return rep(res, { code: 200, success: true, msg: "" }, updateList);
		} catch (err) {
			console.log(err)
			return rep(res, { code: 500, success: false, msg: "Error" })
		}
	}
}