const {Router} = require('express');
const config = require('config');
const {check, validationResult} = require('express-validator');
const Movie = require('../models/Movie');
const router = Router();