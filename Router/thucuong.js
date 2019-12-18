const express = require('express');
const router = express.Router();
const db = require('./connect');


router.get('/menucafe', (req, res) => {
    db.query('SELECT * FROM thuc_uong WHERE id_danhmuc = "dm1"', (err, result) => {
        let cafe = JSON.stringify(result);
        res.end(cafe);
    });
});

router.get('/menudaxay', (req, res) => {
    db.query('SELECT * FROM thuc_uong where id_danhmuc ="dm4"', (err, result) => {
        let daxay = JSON.stringify(result);
        res.end(daxay);
    })
})
router.get('/menutra', (req, res) => {
    db.query('SELECT * FROM thuc_uong where id_danhmuc ="dm2"', (err, result) => {
        let tra = JSON.stringify(result);
        res.end(tra);
    })
})
router.get('/menusinhto', (req, res) => {
    db.query('SELECT * FROM thuc_uong where id_danhmuc ="dm3"', (err, result) => {
        let sinhto = JSON.stringify(result);
        res.end(sinhto);
    })
})

router.get('/admin/ctdonhang', (req, res, next) => {
    db.query('SELECT donhang.id_donhang, thuc_uong.ten_thucuong, chitiet_donhang.so_luong, chitiet_donhang.dongia_chitiet FROM chitiet_donhang, thuc_uong, donhang where donhang.id_donhang = chitiet_donhang.id_donhang and thuc_uong.id_thucuong = chitiet_donhang.id_thucuong', (err, donhang) => {
        let dh = JSON.stringify(donhang);
        res.end(dh);
    })
})
module.exports = router;