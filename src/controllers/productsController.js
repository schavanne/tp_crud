const {loadProducts,storeProducts} = require('../data/dbModule');
const {validationResult} = require('express-validator');
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
	indexAlert: (req, res) => {
		// Do the magic
		let products = loadProducts();
		let newProduct = products.find(product => product.id === +req.params.id) ?? "borrado";

		return res.render('products', {
			products,
			toThousand,
			newProduct
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
		let errors = validationResult(req);
        errors = errors.mapped();
		if(Object.entries(errors).length === 0){
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
			
			let productsModify = [...products, newProduct];
			
			storeProducts(productsModify);

			return res.redirect('/products/'+newProduct.id);
		}else{
			return res.render('product-create-form',{
                errors,
                old : req.body
            })
		}

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
		const {name, price, discount, category, description} = req.body;
		let productsModify = loadProducts().map(product => {
			if(product.id === +req.params.id){
				return {
					id : product.id,
					name : name.trim(),
					price : +price,
					discount : +discount,
					category,
					description : description.trim(),
					image : product.image
				}
			}
			return product
		});
		console.log(productsModify);
		storeProducts(productsModify);
		return res.redirect('/products/detail/' + req.params.id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let productsModify = loadProducts().filter(product => product.id !== +req.params.id);

		storeProducts(productsModify);
		return res.redirect('/products/'+req.params.id)
	}
};

module.exports = controller;