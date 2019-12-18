const express = require('express');
const router = express.Router();
const db = require('./connect');

router.get('/them/:id_thucuong', (req, res, next) => {
    var id = req.params.id_thucuong;
    db.query("select * from thuc_uong where id_thucuong = ?", [id], (err, result) => {
        Object.keys(result).forEach((key => {
            cf = result[key];


            if (typeof req.session.cart == "undefined") {
                req.session.cart = [];
                req.session.cart.push({
                    ma: cf.id_thucuong,
                    ten: cf.ten_thucuong,
                    soluong: 1,
                    gia: cf.gia_thucuong,
                });
            } else {
                var cart = req.session.cart
                var thucuong_moi = true
                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].ma == id) {
                        cart[i].soluong++;
                        thucuong_moi = false;
                        break;
                    }
                }
                if (thucuong_moi) {
                    cart.push({
                        ma: cf.id_thucuong,
                        ten: cf.ten_thucuong,
                        soluong: 1,
                        gia: cf.gia_thucuong,

                    });
                }

            }

            console.log(req.session.cart);
        }));
        res.redirect('/order');
    })
})


router.get('/xoacart/:ten', (req, res) => {
    var ten = req.params.ten;
    var cart = req.session.cart;
    var capnhat = req.query.action;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].ten == ten) {
            cart[i].soluong--;
            if (cart[i].soluong < 1) { cart.splice(i, 1); }
        }
        res.redirect('/confirmOrd')
    }
})
router.get('/themcart/:ten', (req, res) => {
    var ten = req.params.ten;
    var cart = req.session.cart;
    var capnhat = req.query.action;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].ten == ten) {
            cart[i].soluong++;
        }
        res.redirect('/confirmOrd')
    }
})



router.get('/soluong', (req, res) => {
    var cart = req.session.cart;
    cart = JSON.stringify(cart);
    res.end(cart);
});


module.exports = router;