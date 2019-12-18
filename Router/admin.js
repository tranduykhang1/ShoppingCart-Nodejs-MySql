const express = require('express');
const router = express.Router();
const db = require('./connect');


router.get('/admin/ctdh/:id_donhang', (req, res) => {
    var id = req.params.id_donhang;
    db.query('SELECT chitiet_donhang.id_ctdonhang, donhang.id_donhang, thuc_uong.ten_thucuong, chitiet_donhang.so_luong, chitiet_donhang.dongia_chitiet FROM chitiet_donhang, thuc_uong, donhang where donhang.id_donhang = chitiet_donhang.id_donhang and thuc_uong.id_thucuong = chitiet_donhang.id_thucuong and donhang.id_donhang = "' + id + '"', (err, ctdonhang) => {
        let dh = JSON.stringify(ctdonhang);
        res.end(dh);
    })
})

router.get('/admin/dh', (req, res) => {
    db.query('SELECT donhang.trangthai_donhang, chitiet_donhang.id_ctdonhang, donhang.id_donhang, khach_hang.hoten_khachhang, chitiet_donhang.so_luong, donhang.tonggia_donhang, donhang.ngaylap_donhang FROM chitiet_donhang, thuc_uong, donhang, khach_hang where donhang.id_donhang = chitiet_donhang.id_donhang and thuc_uong.id_thucuong = chitiet_donhang.id_thucuong and donhang.id_khachhang = khach_hang.id_khachhang group by donhang.id_donhang', (err, donhang) => {
        let dh = JSON.stringify(donhang);
        res.end(dh);
    })
})

router.get('/admin/thucuong', (req, res) => {
    db.query('SELECT thuc_uong.id_thucuong, thuc_uong.ten_thucuong, thuc_uong.gia_thucuong, danh_muc.ten_danhmuc from thuc_uong, danh_muc where thuc_uong.id_danhmuc = danh_muc.id_danhmuc', (err, thucuong) => {
        let t_uong = JSON.stringify(thucuong);
        res.end(t_uong);
    })
})

//them sua xoa products

router.post('/admin/themthucuong', (req, res) => {
    let ma = req.body.matu;
    let ten = req.body.tentu;
    let madm = req.body.madm;
    let makm = req.body.makm;
    let anh = req.body.anhtu;
    let gia = req.body.giatu;
    let ghichu = req.body.ghichu;

    db.query('insert into thuc_uong (id_thucuong, id_danhmuc, id_khuyenmai, ten_thucuong,anh_thucuong, gia_thucuong, ghichu_thucuong) values("' + ma + '","' + madm + '","' + makm + '","' + ten + '","' + anh + '","' + gia + '","' + ghichu + '")', (err) => {
        if (err) {
            console.log('Loi them', err);
        }
        console.log(req.body);
    })
    res.redirect('/adminpage');

})


router.get('/admin/xoa/:id', (req, res) => {
    let id = req.params.id
    db.query('delete from thuc_uong where id_thucuong = ?', [id], (err) => {
        res.redirect('/adminpage');
    })
})

router.get('/admin/ord', (req, res) => {
    db.query('SELECT * FROM `thuc_uong`', (err, data) => {
        let dh = JSON.stringify(data);
        res.end(dh);
    })
})


router.get('/admin/them/:id_thucuong', (req, res, next) => {
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
        res.redirect('/admin/dathang');
    })
})



router.get('/admin/xuattk_ngay', (req, res) => {
    db.query('select donhang.ngaylap_donhang, COUNT(donhang.ngaylap_donhang) as "sodonhang", SUM(donhang.tonggia_donhang) as "tonggia" from donhang GROUP by donhang.ngaylap_donhang order by  donhang.ngaylap_donhang desc ', (err, data) => {
        let dt = JSON.stringify(data);
        res.end(dt);
    })
})

router.get('/admin/xuattk_tuong', (req, res) => {
    db.query('SELECT tu.ten_thucuong, dh.ngaylap_donhang, ctdh.dongia_chitiet, COUNT(dh.ngaylap_donhang) as soluong from donhang as dh, thuc_uong as tu, chitiet_donhang as ctdh where dh.id_donhang = ctdh.id_donhang and tu.id_thucuong = ctdh.id_thucuong GROUP by  dh.ngaylap_donhang, tu.ten_thucuong order by dh.ngaylap_donhang desc', (err, data) => {
        let dt = JSON.stringify(data);
        res.end(dt);
        console.log(data);
    });
})



router.get('/admin/xoacart', (req, res) => {
    delete req.session.cart;
    res.redirect('/admin/dathang')
})




router.get('/admin/danhmuc', (req, res) => {
    db.query('select * from danh_muc', (err, dmuc) => {
        let dm = JSON.stringify(dmuc);
        res.end(dm);
    })
})
router.get('/admin/khuyenmai', (req, res) => {
    db.query('select * from khuyen_mai', (err, kmai) => {
        let km = JSON.stringify(kmai);
        res.end(km);
    })
})

router.post('/admin/themdm', (req, res, next) => {
    db.query('insert into danh_muc values ("' + req.body.madm + '","' + req.body.tendm + '" )', (err) => {
        console.log("Them thanh cong", req.body);
    })
    res.redirect('/admin/dm_km');
})

router.post('/admin/themkm', (req, res, next) => {
    db.query('insert into khuyen_mai values ("' + req.body.makm + '","' + req.body.loaikm + '", "' + req.body.km_apdung + '" )', (err) => {
        console.log("Them thanh cong", req.body);
    })
    res.redirect('/admin/dm_km');
});


router.get('/admin/sua/:id_thucuong', (req, res) => {
    var id = req.params.id_thucuong;
    db.query('select * from thuc_uong where id_thucuong = ?', [id], (err, thucuong) => {
        res.render('adminsua', { data: thucuong });
    });
});

//
router.post('/admin/sua/:id_thucuong', (req, res) => {
    db.query('update thuc_uong SET id_danhmuc = "' + req.body.s_madm + '", id_khuyenmai = "' + req.body.s_makm + '" ,ten_thucuong ="' + req.body.s_tentu + '",anh_thucuong= "' + req.body.s_anhtu + '",gia_thucuong ="' + req.body.s_giatu + '",ghichu_thucuong ="' + req.body.s_ghichu + '" where id_thucuong = "' + req.body.s_id + '" ', (err) => {
        console.log(req.body);
    })
    res.redirect('/adminpage');
})


router.get('/admin/xuattk_tenkh', (req, res) => {
    db.query('select kh.hoten_khachhang, dh.ngaylap_donhang, dh.tonggia_donhang, COUNT(kh.hoten_khachhang) as sodon from khach_hang as kh, donhang as dh where kh.id_khachhang = dh.id_khachhang group by kh.hoten_khachhang order by dh.ngaylap_donhang desc', (err, data) => {
        let dt = JSON.stringify(data);
        res.end(dt);
    })
})
router.get('/admin/sohoadon', (req, res) => {
    db.query('select ma_hdtt from donhang_tt ORDER BY ma_hdtt DESC LIMIT 1', (err, rs) => {
        let kq = JSON.stringify(rs);
        res.end(kq);
    })
})

router.post('/admin/themdonhang', (req, res) => {
    var cart = req.session.cart;
    var tongdon = 0;
    var id_dhtt = 0;
    const today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + +today.getFullYear();

    cart.forEach(c => {
        const tongso = c.soluong * c.gia;
        tongdon += tongso;
    })
    db.query('insert into donhang_tt (ngay_hdtt, tonggia_hdtt, trangthai_hdtt) values("' + date + '", "' + tongdon + '","Đã thanh toán")', (err) => {

        console.log("okedh");
    })
    db.query('select ma_hdtt from donhang_tt ORDER BY ma_hdtt DESC LIMIT 1', async(err, rs) => {
        Object.keys(rs).forEach(key => {
            let kq = rs[key];
            id_dhtt += kq.ma_hdtt++;

            cart.forEach(c => {
                await = db.query('insert into chitiet_dhtt(ma_hdtt,id_thucuong, soluong_tt, dongia_tt) values("' + id_dhtt + '", "' + c.ma + '","' + c.soluong + '", "' + c.gia + '")', (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("okectdh");
                })
            })
        })
    })
    delete req.session.cart;
    res.redirect('/admin/dathang');
})



router.get('/admin/donhangtructiep', (req, res) => {
    db.query('SELECT * FROM `donhang_tt`', (err, data) => {
        let dt = JSON.stringify(data);
        res.end(dt);
    });
})

router.get('/admin/ctdhtt/:id_donhangtt', (req, res) => {
    var id = req.params.id_donhangtt;
    console.log(id);
    db.query('SELECT  ct.ma_cthdtt, ct.ma_hdtt, tu.ten_thucuong, ct.soluong_tt, ct.dongia_tt from chitiet_dhtt as ct, donhang_tt hd, thuc_uong tu where ct.ma_hdtt = hd.ma_hdtt and tu.id_thucuong = ct.id_thucuong and hd.ma_hdtt = "' + id + '"', (err, ctdonhang) => {
        let dh = JSON.stringify(ctdonhang);
        res.end(dh);
        console.log(dh);
    })

})
module.exports = router;