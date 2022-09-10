const {loadProducts} = require('../data/dbModule');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		let products = loadProducts();
		return res.render('products', {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let products =loadProducts();
		let product = products.find(product => product.id === +req.params.id);
		return res.render('detail', {
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const {name, price, discount, category, description} = req.body;
		let products = loadProducts();

		const newProduct = {
			id : products[products.length -1].id + 1,
			name : name.trim(),
			price : +price,
			discount : +discount,
			category,
			description : description.trim(),
			image : 'default-image.png'
		}

		products = [...products, newProduct];
	},

	// Update - Form to edit
	edit: (req, res) => {
		let products =loadProducts();
		let productToEdit = products.find(product => product.id === +req.params.id);
		return res.render('product-edit-form', {
			productToEdit
		})

	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;