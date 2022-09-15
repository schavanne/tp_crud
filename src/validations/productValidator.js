const {check} = require('express-validator')

module.exports = [

    check('name')
        .notEmpty().withMessage('El nombre de producto es obligatorio').bail()
        .matches(/^[A-Za-z0-9- ]+$/).withMessage('Solo caracteres alfanumericos y - ').bail()
        .isLength({
            min : 5
        }).withMessage('Cómo mínimo 5 caracteres'),

    check('price')
        .notEmpty().withMessage('El precio es obligatorio').bail()
        .isNumeric({
            no_symbols : true,
        }).withMessage('Debe un número entero positivo'),

    check('discount')
        .isInt({
            min : 0,
            max: 100
        }).withMessage('El descuento no puede ser mayor que 100').bail()
        .isNumeric({
            no_symbols : true,
        }).withMessage('Debe un número entero positivo'),
    check('description')
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({
            min : 20,
        }).withMessage('Cómo mínimo 20 caracteres'),
    check('category')
        .notEmpty().withMessage('La categoría es obligatoria'),
    
]