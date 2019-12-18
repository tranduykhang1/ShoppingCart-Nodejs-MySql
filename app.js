const express = require('express');
const http = require('http');
var bodyparser = require('body-parser');
const app = express();
const ejs = require('ejs');
const path = require('path');
const routers = require('./Router/router')
const fs = require("fs");
const session = require('express-session');

const router_kh = require('./Router/khach_hang');
const router_cart = require('./Router/cart');
const router_sp = require('./Router/thucuong');
const router_admin = require('./Router/admin');
//
app.set('view engine', 'ejs');
//


//thiet lap view engine

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("."));
app.use(express.static(__dirname));
app.use(session({
    secret: 'serect',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(function(req, res, next) {
        res.locals.session = req.session;
        next();
    })
    //


//ket noi den file html/css
var server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-type": "index/plain" });
    res.write(HTMLFieldSetElement);
    res.end;
})
var server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-type ": "text/css" });
    res.write(CSSFontFaceRule);
    res.end();
});
//khoi tao thu vien bodyparser
var urlencodeBP = bodyparser.urlencoded({ extended: false });
//Get file html hien thi tren Brownser
app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/Html/home.html");
});
app.get("/menu", (req, res) => {
    res.sendFile(__dirname + "/Html/menu.html");
});
app.get("/order", (req, res) => {
    res.sendFile(__dirname + "/Html/order.html");
});
app.get("/confirmOrd", (req, res) => {
    res.sendFile(__dirname + "/Html/confirm_order.html");
});
app.get("/donhang", (req, res) => {
    res.sendFile(__dirname + '/Html/ordered.html');
})

//get api admin
app.get("/adminpage", (req, res) => {
    res.sendFile(__dirname + "/Html/admin.html");
});
app.get("/admin/donhang", (req, res) => {
    res.sendFile(__dirname + "/Html/admin_dh.html");
});
app.get('/admin/khachhang', (req, res) => {
    res.sendFile(__dirname + '/Html/admin_kh.html');
})
app.get('/admin/phanhoi', (req, res) => {
    res.sendFile(__dirname + '/Html/admin_ph.html');
})
app.get('/admin/dathang', (req, res) => {
    res.sendFile(__dirname + '/Html/admin_ord.html');
})
app.get('/admin/dm_km', (req, res) => {
    res.sendFile(__dirname + '/Html/admin_dm.html');
})
app.get('/admin/thongke', (req, res) => {
    res.sendFile(__dirname + '/Html/admin_tk.html');
})
app.get('/admin/edit', (req, res) => {
    res.sendFile(__dirname + '/Html/adminsua.html');
})





//Lang nghe server chay tren cong 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('dang chay cong 3000');
});


app.post('/khachhang/phanhoi', router_kh);

//get menu 
app.get('/menucafe', router_sp);
app.get('/menudaxay', router_sp);
app.get('/menutra', router_sp);
app.get('/menusinhto', router_sp);


// app.get("/delete" , (req, res, next) => {   
//     conn.query('DELETE FROM coffee WHERE ID=?',  req.query.ID, (err, respone) => {
//         res.redirect('display');
//     });
// });
// Hien thi CSDL tu MySql tren console
app.get('/testconnect', (req, res) => {
    if (conn != null) {
        res.send('connect success');
        console.log("Ket noi thanh cong");
    } else {
        res.send('fail');
    }
})

//tạo giỏ hàng strore in session
app.get('/them/:id_thucuong', router_cart);




app.get('/xoacart/:ten', router_cart);
app.get('/themcart/:ten', router_cart);
app.get('/soluong', router_cart);




app.get('/thongtin_donhang', (req, res, next) => {
    var cart = req.session.cart
    cart = JSON.stringify(cart);
    res.end(cart);
});

app.post('/thongtin', router_kh);
app.get('/xacnhan', router_kh);


app.get('/xemdonhang/:sodienthoai', router_kh);
//admin
app.get('/admin/thucuong', router_admin);
app.get('/admin/dh', router_admin)
app.get('/admin/ctdh/:id_donhang', router_admin);
app.get('/admin/ttkh', router_kh);
app.get('/admin/ph', router_kh);

//don hang truc tiep
app.get('/admin/donhangtructiep', router_admin);
app.get('/admin/ctdhtt/:id_donhangtt', router_admin);
//
app.post('/admin/themthucuong', router_admin)
app.get('/admin/xoa/:id', router_admin);

app.get('/admin/ord', router_admin);
app.get('/admin/them/:id_thucuong', router_admin);

app.get('/admin/xuattk_ngay', router_admin);
app.get('/admin/xuattk_tuong', router_admin);
app.get('/admin/xuattk_tenkh', router_admin);


app.get('/admin/xoacart', router_admin)

app.get('/admin/danhmuc', router_admin);
app.get('/admin/khuyenmai', router_admin);

app.post('/admin/themdm', router_admin)
app.post('/admin/themkm', router_admin)
app.get('/admin/sua/:id_thucuong', router_admin);
app.post('/admin/sua/:id_thucuong', router_admin);
app.post('/admin/themdonhang', router_admin);
app.get('/admin/sohoadon', router_admin);
app.get('/xacnhandon/:id_don', router_kh);