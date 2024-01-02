/**
 * Created by vinhnt on 6/16/2017.
 */



const router = require("express").Router();
var tz = require('moment-timezone');
var moment = require('moment-timezone');
require('dotenv').config();

router.get('/order/create_payment_url', function (req, res, next) {
    var date = tz(Date.now(), 'Asia/Ho_Chi_Minh');

    var desc = 'Thanh toan don hang thoi gian: ' + date.format('YYYY-MM-DD HH:mm:ss');
    res.render('order', {title: 'Tạo mới đơn hàng', amount: 10000, description: desc})
});

router.post('/order/create_payment_url', function (req, res, next) {
    
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    console.log(req.body);
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    
    
    var tmnCode =process.env.VNPAY_TMNCODE;
    var secretKey = process.env.VNPAY_HASHSECRET;
    var vnpUrl = process.env.VNPAY_URL;
    var returnUrl = process.env.VNPAY_RETURN_URL;
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount || 230000;
    let bankCode = req.body.bankCode || 'NCB';
    
    let locale = req.body.language || 'vn';
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    console.log("VNPRUL: ", vnpUrl)
    res.status(200).json({ "vnpUrl": vnpUrl });
});


router.get('/order/vnpay_return', function (req, res, next) {
    var vnp_Params = req.query;

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var tmnCode = process.env.VNPAY_TMNCODE;
    var secretKey = process.env.VNPAY_HASHSECRET;

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

  /*      res.status(200).json({
            vnp_ResponseCode: vnp_Params['vnp_ResponseCode']
        });
*/
        res.render('success', {code: vnp_Params['vnp_ResponseCode']})
    } else{
        /*
        res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
         */
        res.render('success', {code: '97'})
    }
});

router.get('/order/vnpay_ipn', function (req, res, next) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = process.env.VNPAY_HASHSECRET;
    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        if(vnp_Params['vnp_ResponseCode'] === '00'){
        res.send(`
            <script>
                window.location.href = 'http://localhost:3000/ticket-result';
            </script>
        `);
        }
        else
        res.send(`
            <script>
                window.location.href = 'http://localhost:3000/payment';
            </script>
        `);
    }
    else {
        res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
    }
});

function sortObject(obj) {
	var sorted = {};
	var str = [];
	var key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
module.exports = router;