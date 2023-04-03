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

const templateMailSendOTP = (OTP) =>{
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác thực tài khoản</title>
        <style>
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            html{
                font-family: 'Roboto' !important;
                font-style: normal;
            }
            .page{
                min-width: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                background-color: #f3f3f3;
            }
            .change-password{
                font-family: 'Google Sans';
                margin: 0 auto;
                width: 500px;
                background: #FFFFFF;
                border-radius: 10px;
                padding: 20px;
            }
            .body{
                padding: 15px 20px 30px;
    
            }
            .logo{
                width: 120px;
                height: 120px;
            }
            .logo img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .title{
                font-weight: 600;
                font-size: 20px;
                line-height: 25px;
                color: #000000;
            }
            .mt-70{
                margin-top: 70px;
            }
            .mt-20{
                margin-top: 20px;
            }
            .mt-30{
                margin-top: 30px;
            }
            .mt-10{
                margin-top: 10px;
            }
            .mb-10{
                margin-bottom: 10px;
            }
            .mt-6{
                margin-top: 6px;
            }
            .mt-4{
                margin-top: 4px;
            }
            .mt-25{
                margin-top: 25px;
            }
            .text{
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
                color: #444444;
            }
            .fz-20{
                font-size: 20px;
            }
            .font-otp{
                font-weight: 600 !important;
                font-size: 30px;
                letter-spacing: 5px;
            }
            .text.active{
                font-weight: 500;
                color: #F8993F;
            }
            .text-right{
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="change-password">
                <div class="body">
                    <div class="logo">
                        <img src="https://res.cloudinary.com/dbar5movy/image/upload/v1680460830/RestaurantManagement/htsdibuokd0tjt5mz3zj.png"/>          
                    </div>
                    <div class="title">
                        Xác thực tài khoản
                    </div>
                    <div class="mt-20">
                        <div>
                            <span class="text">Xin chào</span>
                            <span class="text active"></span>
                       </div>
                        <div>
                            <span class="text">Mã xác thực của bạn là:</span>
                        </div>
                        <div class="mt-10 mb-10">
                            <span class="text active font-otp">${OTP}</span>
                        </div>
                        <div>
                            <span class="text">Không cung cấp mã này cho bất kì ai để bảo vệ tài khoản của bạn</span>
                        </div>
                    </div>
                        
                    <div class="mt-20">
                        <div class="text mt-10">Cảm ơn bạn đã đến với chúng tôi.</div>
                    </div>
                    <div class="mt-20">
                        <div class="text active text-right mt-10">Evergreen Garden</div>
                    </div>
                    
                   
                </div>
               
            </div>
        </div>
    </body>
    </html>`
    return html
}

const templateMailSendOrder = (LoaiPhieuDat) =>{
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác thực tài khoản</title>
        <style>
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            html{
                font-style: normal;
            }
            .page{
                min-width: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                background-color: #f3f3f3;
            }
            .change-password{
                font-family: 'Google Sans';
                margin: 0 auto;
                width: 500px;
                background: #FFFFFF;
                border-radius: 10px;
                padding: 20px;
            }
            .body{
                padding: 15px 20px 30px;
    
            }
            .logo{
                width: 120px;
                height: 120px;
            }
            .logo img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .title{
                font-weight: 600;
                font-size: 20px;
                line-height: 25px;
                color: #000000;
            }
            .mt-70{
                margin-top: 70px;
            }
            .mt-20{
                margin-top: 20px;
            }
            .mt-30{
                margin-top: 30px;
            }
            .mt-10{
                margin-top: 10px;
            }
            .mb-10{
                margin-bottom: 10px;
            }
            .mt-6{
                margin-top: 6px;
            }
            .mt-4{
                margin-top: 4px;
            }
            .mt-25{
                margin-top: 25px;
            }
            .text{
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
                color: #444444;
            }
            .fz-20{
                font-size: 20px;
            }
            .font-otp{
                font-weight: 600 !important;
                font-size: 30px;
                letter-spacing: 5px;
            }
            .text.active{
                font-weight: 500;
                color: #F8993F;
            }
            .text-right{
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="change-password">
                <div class="body">
                    <div class="logo">
                        <img src="https://res.cloudinary.com/dbar5movy/image/upload/v1680460830/RestaurantManagement/htsdibuokd0tjt5mz3zj.png"/>          
                    </div>
                    <div class="title">
                        Yêu cầu đặt ${LoaiPhieuDat == 0 ? "bàn" : "phòng"} thành công
                    </div>
                    <div class="mt-20">
                        <div>
                            <span class="text">Xin chào</span>
                            <span class="text active"></span>
                       </div>
                        <div>
                            <span class="text">Chúng tôi đã nhận được yêu cầu đặt ${LoaiPhieuDat == 0 ? "bàn" : "phòng"} từ bạn</span>
                        </div>
                        <div>
                            <span class="text">Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất</span>
                        </div>
                        <div>
                            <span class="text">Chờ phản hồi từ chúng tôi nhé!!!</span>
                        </div>
                    </div>
                        
                    <div class="mt-20">
                        <div class="text mt-10">Cảm ơn bạn đã đến với chúng tôi.</div>
                    </div>
                    <div class="mt-20">
                        <div class="text active text-right mt-10">Evergreen Garden</div>
                    </div>
                    
                   
                </div>
               
            </div>
        </div>
    </body>
    </html>`
    return html
}

const templateMailChangeStatus = (LoaiPhieuDat) =>{
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác thực tài khoản</title>
        <style>
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            html{
                font-style: normal;
            }
            .page{
                min-width: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                background-color: #f3f3f3;
            }
            .change-password{
                font-family: 'Google Sans';
                margin: 0 auto;
                width: 500px;
                background: #FFFFFF;
                border-radius: 10px;
                padding: 20px;
            }
            .body{
                padding: 15px 20px 30px;
    
            }
            .logo{
                width: 120px;
                height: 120px;
            }
            .logo img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .title{
                font-weight: 600;
                font-size: 20px;
                line-height: 25px;
                color: #000000;
            }
            .mt-70{
                margin-top: 70px;
            }
            .mt-20{
                margin-top: 20px;
            }
            .mt-30{
                margin-top: 30px;
            }
            .mt-10{
                margin-top: 10px;
            }
            .mb-10{
                margin-bottom: 10px;
            }
            .mt-6{
                margin-top: 6px;
            }
            .mt-4{
                margin-top: 4px;
            }
            .mt-25{
                margin-top: 25px;
            }
            .text{
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
                color: #444444;
            }
            .fz-20{
                font-size: 20px;
            }
            .font-otp{
                font-weight: 600 !important;
                font-size: 30px;
                letter-spacing: 5px;
            }
            .text.active{
                font-weight: 500;
                color: #F8993F;
            }
            .text-right{
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="change-password">
                <div class="body">
                    <div class="logo">
                        <img src="https://res.cloudinary.com/dbar5movy/image/upload/v1680460830/RestaurantManagement/htsdibuokd0tjt5mz3zj.png"/>          
                    </div>
                    <div class="title">
                        Yêu cầu đặt ${LoaiPhieuDat == 0 ? "bàn" : "phòng"} thành công
                    </div>
                    <div class="mt-20">
                        <div>
                            <span class="text">Xin chào</span>
                            <span class="text active"></span>
                       </div>
                        <div>
                            <span class="text">Chúng tôi đã nhận được yêu cầu đặt ${LoaiPhieuDat == 0 ? "bàn" : "phòng"} từ bạn</span>
                        </div>
                        <div>
                            <span class="text">Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất</span>
                        </div>
                        <div>
                            <span class="text">Chờ phản hồi từ chúng tôi nhé!!!</span>
                        </div>
                    </div>
                        
                    <div class="mt-20">
                        <div class="text mt-10">Cảm ơn bạn đã đến với chúng tôi.</div>
                    </div>
                    <div class="mt-20">
                        <div class="text active text-right mt-10">Evergreen Garden</div>
                    </div>
                    
                   
                </div>
               
            </div>
        </div>
    </body>
    </html>`
    return html
}




module.exports = {
    getInfoData,
    sendMail,
    templateMailSendOTP,
    templateMailSendOrder,
    templateMailChangeStatus
}