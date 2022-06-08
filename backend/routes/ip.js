
const router = require('express').Router();
let ip_addr = require('../models/ip_address.model');

router.route('/').get((req,res) => {
    ip_addr.find()
    .then(ip_address => res.json(ip_address))
    .catch(err => res.status(400).json('Error: ' + err));
}

);

router.route('/add').post((req,res)=>{
    const ip_address = req.body.ip_address;
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const country = req.body.country;
    const city = req.body.city;

    const newip = new ip_addr({
        ip_address,
        date,
        country,
        city
    });

    newip.save()
        .then(() => res.json('IP Created!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;