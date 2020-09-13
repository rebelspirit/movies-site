const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const WalkData = require('../models/WalkData');
const fetch = require('node-fetch');

const router = Router();

// /api/lead/walkmarketing
router.post(
    '/walkmarketing',
    [
        check('first_name', 'Invalid name').exists(),
        check('last_name', 'Invalid last name').exists(),
        check('email', 'Invalid E-mail').isEmail(),
        check('phone', 'Invalid Phone number').exists(),
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

            const {first_name, last_name, af, country, phone, email, click_id, partner_click_id, campaign, content, source, media, domain } = req.body;

            const candidate = await WalkData.findOne({email});

            if(candidate) {
                return res.status(400).json({message: 'This lead already exists'});
            }

            const url = 'https://956crm.com/your/callback';

            const data = {
                "params": {
                    "first_name": first_name,
                    "last_name": last_name,
                    "af": af,
                    "country": country,
                    "phone": phone,
                    "email": email,
                    "click_id": click_id,
                    "partner_click_id": partner_click_id,
                    "sub": campaign,
                    "utm_content": content,
                    "utm_source": source,
                    "utm_media": media
                }
            };

            const deployToWalkmarketing = await fetch(url, { method: 'POST',  headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }, body: JSON.stringify(data)});

            const json = await deployToWalkmarketing.json();

            console.log("Reply from Walkmarketing: ", json);

            const result = JSON.parse(json.result);
            const status = result.status;
            const id = result.lead_id;

            const lead = new WalkData({first_name, last_name, af, country, phone, email, click_id, partner_click_id, campaign, content, source, media, domain, status, id });

            await lead.save();

            res.status(201).json({message: "New lead registered"})
        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again'});
        }
    });

router.get('/get/walkmarketing', async (req, res) => {
    try {
        const data = await WalkData.find({});
        res.json(data)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, при получении данных геолокации от сервера'});
    }
});

module.exports = router;