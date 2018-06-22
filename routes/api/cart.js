const Cart = require('../../db').Cart
const route = require('express').Router();

route.get('/', (req, res) => {
    // Get all products
    Cart.findAll()
        .then((items) => {
            res.status(200).send(items)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve cart items"
            })
        })
})

route.post('/', (req, res) => {
    if(req.body.quantity == 0) {
        console.log("Deleting")
        Cart.destroy({
            where : {
                name : req.body.name,
                manufacturer : req.body.manufacturer
            }
        })
            .then((items)=>res.send(items))
            .catch((err) => console.error(err))
        return
    }

    // Validate the values
    if (isNaN(req.body.price) || isNaN(req.body.quantity)) {
        return res.status(403).send({
            error: "Price or Quantity is not valid number"
        })
    }
    Cart.findAll({
        where : {
            manufacturer : req.body.manufacturer,
            name : req.body.name,
            price : req.body.price
        }
    }).then((items) => {
        if(items.length === 0) {
            console.log("Creating new item")
            addNewProduct(req.body.name,req.body.manufacturer,req.body.price,req.body.quantity,req,res)
        }else {
            console.log("Updating Value")
            Cart.update({
                    quantity: items[0].quantity + 1,
                },
                {
                    where:{
                        id:items[0].id
                    }
                })
                .then((updated_items) => {
                    ++items[0].quantity
                    res.status(201).send(items[0])
                }).catch((error) => {
                res.status(501).send({
                    error: "Error adding product"
                })
            })
        }
    })
    // Add a new product

})

function addNewProduct(name,manufacturer,price,quantity,req,res)
{
    Cart.create({
        name: name,
        manufacturer: manufacturer,
        price: parseFloat(price),
        quantity: parseInt(quantity)
    }).then((items) => {
        res.status(201).send(items)
    }).catch((error) => {
        res.status(501).send({
            error: "Error adding product"
        })
    })
}

exports = module.exports = route