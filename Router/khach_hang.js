const express = require('express');
const router = express.Router();
const db = require('./connect');


router.post('/thongtin', (req, res, next) => {
    const diachi = req.body.diachi;
    const hoten = req.body.hoten;
    const sodienthoai = req.body.sodienthoai;
    const ghichu = req.body.ghichu;
    const cart = req.session.cart
    var tonggia = 0;
    var iddh = 0;
    var idkh = 0;
    var km = 0;
    const today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + +today.getFullYear();

    db.query("insert into khach_hang(diachi_khachhang, hoten_khachhang, sdt_khachhang, ghi_chu)values ('" + diachi + "','" + hoten + "','" + sodienthoai + "','" + ghichu + "')", (err, rs1) => {
        console.log("khach hang")
    });

    cart.forEach(c => {
        const tongso = c.soluong * c.gia;
        tonggia += tongso;
        km = (tonggia * 0.75);
    })

    var idkh = 0;
    var iddh = 0;
    db.query('SELECT id_khachhang FROM khach_hang ORDER BY id_khachhang DESC LIMIT 1', async(err, result) => {
        Object.keys(result).forEach(key => {
            let kq = result[key];
            idkh += kq.id_khachhang++;

            await = db.query("insert into donhang(id_khachhang, ngaylap_donhang, tonggia_donhang,tonggia_km, trangthai_donhang) values ('" + idkh + "','" + date + "','" + tonggia + "', '" + km + "','Chờ xác nhận')", (err) => {
                console.log("don hang", idkh);

            })

        });
    });

    await = db.query('SELECT id_donhang FROM donhang ORDER BY id_donhang DESC LIMIT 1', (err, rs) => {
        Object.keys(rs).forEach(key => {
            let kq = rs[key];
            iddh = kq.id_donhang + 1;
            cart.forEach(c => {
                await = db.query("INSERT INTO `chitiet_donhang` ( `id_donhang`, `id_thucuong`, `so_luong`, `dongia_chitiet`) values('" + iddh + "','" + c.ma + "', '" + c.soluong + "', '" + c.gia + "')", (err) => {
                    console.log("ct don hang", iddh);
                })
            });
        })
    })
    delete req.session.cart
    res.redirect('/confirmOrd');
})


router.post('/khachhang/phanhoi', (req, res) => {
    let hoten = req.body.hoten_ph;
    let sdt = req.body.sdt_ph;
    let noidung = req.body.noidung_ph;

    const today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + +today.getFullYear();

    db.query('INSERT INTO `phan_hoi` (`tenKH_phanhoi`,`sdt_phanhoi`, `noidung_phanhoi`, `thoigian_phanhoi`) VALUES ("' + hoten + '","' + sdt + '","' + noidung + '","' + today + '")', (err) => {
        console.log(hoten, sdt, noidung, today);

    })

    res.redirect('/home');
})


router.get('/admin/ttkh', (req, res) => {
    db.query('select * from khach_hang', (err, khachhang) => {
        let kh = JSON.stringify(khachhang);
        res.end(kh);
    })
})

router.get('/admin/ph', (req, res) => {
    db.query('select * from phan_hoi', (err, phanhoi) => {
        let ph = JSON.stringify(phanhoi);
        res.end(ph);
    })
})




router.get('/xemdonhang/:sodienthoai', function(req, res, next) {
    var sdt = req.params.sodienthoai;
    db.query("select donhang.ngaylap_donhang, khach_hang.diachi_khachhang, khach_hang.hoten_khachhang, donhang.id_donhang, donhang.tonggia_donhang, donhang.trangthai_donhang from khach_hang, donhang where khach_hang.id_khachhang = donhang.id_khachhang and khach_hang.sdt_khachhang = " + sdt + " ", (err, rs) => {
        if (err) {
            console.log(err);
        }
        let dt = JSON.stringify(rs);
        res.end(dt);
    });
});



router.get('/xacnhandon/:id_don', (req, res) => {
    var id = req.params.id_don;
    db.query('UPDATE `donhang` SET `trangthai_donhang` = "Đã nhận" WHERE `donhang`.`id_donhang` = "' + id + '" ', (err) => {

    });
    res.redirect('/admin/donhang');
})
module.exports = router;