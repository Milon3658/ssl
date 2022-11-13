const express = require('express')
const app = express()
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'bornobanglalive'
const store_passwd = '625BE3B98069137636'
const is_live = true //true for live, false for sandbox
const port = process.env.PORT || 3838;
var cors = require('cors')

app.use(cors())

app.get('/init', (req, res) => {
    const data = {
        total_amount: req.query.payment_amount,
        currency: 'BDT',
        tran_id: 'brbla12xx07', // use unique tran_id for each api call
        success_url: 'https://payment.bornobangla.com/success',
        fail_url: 'https://payment.bornobangla.com/fail',
        cancel_url: 'https://payment.bornobangla.com/fail',
        ipn_url: 'https://payment.bornobangla.com/ipn',
        shipping_method: '',
        product_name: '.',
        product_category: '',
        product_profile: '',
        cus_name: req.query.customer_name ?? 'Customer Name',
        cus_email: req.query.customer_email ?? 'customer@example.com',
        cus_add1: req.query.address ?? '',
        cus_add2: '',
        cus_city: req.query.city ?? '',
        cus_state: req.query.state ?? 'Dhaka',
        cus_postcode: req.query.postcode ?? '',
        cus_country: req.query.country ?? 'Bangladesh',
        cus_phone: req.query.phone ?? '01711111111',
        cus_fax: req.query.phone ?? '01711111111',
        ship_name: req.query.customer_name ?? 'Customer Name',
        ship_add1: req.query.address ?? '',
        ship_add2: '',
        ship_city: req.query.city ?? '',
        ship_state: req.query.state ?? '',
        ship_postcode: req.query.postcode ?? '',
        ship_country: req.query.country ?? 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.redirect(GatewayPageURL)
        console.log('Redirecting to: ', GatewayPageURL)
    });
})

app.post('/success', (req, res) => {
    console.log('Success')
    res.sendFile('success.html', { root: __dirname })
})

app.post('/fail', (req, res) => {
    console.log('fail')
    res.sendFile('fail.html', { root: __dirname })
})

app.listen(port, () => {
})