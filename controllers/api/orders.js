const Order = require('../../models/order')

module.exports = {
    cart,
    addToCart,
    setItemQtyInCart,
    checkout,
    history
}
    
// a cart is the unpaid order for a user
async function cart(req, res) {
    try {
        const cart = await Order.getCart(req.user_id)
        res.status(200).json(cart)
    } catch (e){
        res.status(400).json({ msg: e.message })
    }
}

// add item to the cart
async function addToCart(req, res) {
    try {
        const cart = await Order.getCart(req.user_id)
        await cart.addItemToCart(req.params.id)
        res.status(200).json(cart)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
}

// updates items  qty in  the cart
async function setItemQtyInCart(req, res) {
    try {
        const cart = await Order.getCart(req.user_id)
        await cart.setItemQty(req.body.itemId, req.body.newQty)       
        res.status(200).json(cart)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
}

// update the carts ispaid property to true
async function checkout(req, res) {
    try {
        const cart = await Order.getCart(req.user_id)
        cart.isPaid = true
        await cart.save()
        res.status(200).json(cart)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
}

// return the logged in users paid order history
async function history(req, res) {
    // sort most recent oerders first
    try {
        const orders = await Order
        .find({ user: req.user._id, isPaid: true })
        .sort('-updatedAt').exec()
        res.status(200).json(cart)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
}