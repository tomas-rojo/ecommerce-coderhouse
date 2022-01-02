const { cartService } = require("../services");

exports.getMessages = async (req, res, next) => {
    const cart = await cartService.getCart(req.user.id)
    res.render('chatBox', {cart:cart})
  };


