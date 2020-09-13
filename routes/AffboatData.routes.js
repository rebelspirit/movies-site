const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const AffboatData = require('../models/AffboatData');
const fetch = require('node-fetch');

const router = Router();

// /api/lead/data
router.post(
    '/affboat',
    [
        check('first_name', 'Invalid name').exists(),
        check('last_name', 'Invalid last name').exists(),
        check('email', 'Invalid E-mail').isEmail(),
        check('phone', 'Invalid Phone number').exists(),
        check('ip', 'Invalid IP Address').exists(),
        check('link_id', 'Invalid Link id').exists(),
        check('country', 'Некорректная Страна').exists(),
    ],
    async (req, res) => {
        try {
            console.log("body: ", req.body);

            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect lead registration data"
                })
            }

            const {first_name, last_name, email, phone, ip, link_id, country, campaign, source, media, content, domain } = req.body;

            const candidate = await AffboatData.findOne({email});

            if(candidate) {
                return res.status(400).json({message: 'This lead already exists'});
            }

            const url = 'https://marketing.affboat.com/api/v3/integration?api_token=F5hqH1VlLg0vrtLP3FPz00ZuHCsQG4ilZPL99d2NgDIu52qB0CsvLgt638VN';

            const data = {
                fname: first_name,
                email: email,
                fullphone: phone,
                ip: ip,
                link_id: link_id,
                domain: domain,
                lname: last_name,
                utm_source: source,
                utm_campaign: campaign,
                utm_media: media,
                utm_content: content
            };

            const deployLeadToAffboat = await fetch(url, { method: 'POST',  headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(data)});

            const json = await deployLeadToAffboat.json();

            console.log("Reply from Affboat: ", json);

            const success = json.success;
            const id = json.id;
            const autologin = json.autologin;
            const password = json.password;
            const error = json.error;
            const message = json.message;


            const lead = new AffboatData({first_name, last_name, email, phone, ip, link_id, country, campaign, source, media, content, domain, success, id, autologin, password, error, message });

            await lead.save();

            res.status(201).json({message: "New lead registered", redirect: autologin})
        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again'});
        }
    });

router.get('/get/affboat', async (req, res) => {
    try {
        const data = await AffboatData.find({});
        res.json(data)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, при получении данных геолокации от сервера'});
    }
});

module.exports = router;