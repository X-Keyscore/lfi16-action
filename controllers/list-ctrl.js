const mongoose = require('mongoose');
const List = require('../models/list-model')
const Product = require('../models/product-model')

const { rep } = require("../functions.js");

module.exports = {
	listCreate: async (req, res) => {
		try {
			if (!req.body) return rep(res, { code: 400, success: false, msg: "Query error" })

			const { title } = req.body;

			if (!title) {
				return rep(res, { code: 400, success: false, msg: "Query error" })
			}

			const list = new List({
				title,
				products: []
			})
			if (!list) return rep(res, { code: 500, success: false, msg: "Error" })

			const newList = await list.save();

			return rep(res, { code: 200, success: true, msg: "OK" }, newList)
		} catch (err) {
			console.log(err)
			return rep(res, { code: 500, success: false, msg: "Error" })
		}
	},
	listGet: async (req, res) => {
		try {

			const lists = await List.find()
			return rep(res, { code: 200, success: true, msg: "" }, lists)
		} catch (err) {
			console.log(err)
			return rep(res, { code: 500, success: false, msg: "Error" })
		}
	},
	listTitleUpdate: async (req, res) => {
		try {
			if (!req.body) return rep(res, { code: 400, success: false, msg: "Query error" })

			const { _id, title } = req.body;

			if (!_id || !title) {
				return rep(res, { code: 400, success: false, msg: "Query error" })
			}

			const updateTitle =  List.updateOne(
				{ _id },
				{ $set: { title: title } }
			)

			return rep(res, { code: 200, success: true, msg: "OK" })
		} catch (err) {
			console.log(err)
			return rep(res, { code: 500, success: false, msg: "Error" })
		}
	},
	listProductsMove: async (req, res) => {
		console.log(req.body)
		try {
			if (!req.body) return rep(res, { code: 400, success: false, msg: "Query error" })

			const { _id, newListId, newProductPosition  } = req.body;

			if (!_id || !newListId) {
				return rep(res, { code: 400, success: false, msg: "Query error" })
			}

			// Get product
			const product = await Product.findOne({ _id });

			console.log(product)

			// Delete product in old list
			const updateList = await List.updateOne(
				{ products: { $in: [product._id] } },
				{ $pull: { products: product._id } }
			);

			const updateList2 = await List.updateOne(
				{ _id: newListId },
				{
					$push: {
						products: {
							$each: [product._id],
							$position: newProductPosition
						},
					}
				}
			)

			return rep(res, { code: 200, success: true, msg: "OK" })
		} catch (err) {
			console.log(err)
			return rep(res, { code: 500, success: false, msg: "Error" })
		}
	},
	listDelete: async (req, res) => {
		try {
			if (!req.params) return rep(res, { code: 400, success: false, msg: "Query error" })

			const { _id } = req.params;

			if (!_id) {
				return rep(res, { code: 400, success: false, msg: "Query error" })
			}

			const deleteList = await List.deleteOne({ _id });

			return rep(res, { code: 200, success: true, msg: "OK" })
		} catch (err) {
			console.log(err)
			return rep(res, { code: 500, success: false, msg: "Error" })
		}
	}
}

