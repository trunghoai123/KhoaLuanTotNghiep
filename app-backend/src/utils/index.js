const _ = require('lodash')
const transport = require('../config/config.mail')

const getInfoData = ({ fileds = [], object = {}})=>{
    return _.pick(object, fileds)
}


const sendMail = (mailTo , subject , html) =>{
    transport.sendMail({
        from: process.env.GMAIL,
        to: mailTo,
        subject: subject,
        html: html
    }, function(err, info){
        if (err) {
            console.log(err);
            return false;
        } else {
            return true;
        }
    })
}

module.exports = {
    getInfoData,
    sendMail
}