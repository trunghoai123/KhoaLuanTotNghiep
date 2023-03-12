const express = require('express');
const router = express.Router()


router.use('/api/menu', require('./menu'))
router.use('/api/table', require('./table'))
router.use('/api/area', require('./area'))
router.use('/api/room', require('./room'))



// router.get('', (req, res , next) => {
//     return res.status(200).json({
//         message: 'OK',
//     })
// })


module.exports = router