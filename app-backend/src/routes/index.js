const express = require('express');
const router = express.Router()


router.use('/api', require('./menu'))

// router.get('', (req, res , next) => {
//     return res.status(200).json({
//         message: 'OK',
//     })
// })


module.exports = router