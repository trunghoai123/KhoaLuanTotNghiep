const accountModel = require("../models/account.model")
const customerModel = require("../models/customer.model")
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require("./keyToken.service")
const {createTokenPair} = require('../auth/authUtils')


class AccountService {

    static signUp = async ({Email , MatKhau , LoaiTaiKhoan , TrangThai })=>{
        try{

            //check exist
            //hàm lean trả về 1 obj thuần túy
            const account = await accountModel.findOne({ Email }).lean()
            if(account){
                return {
                    code: 300,
                    metadata:{
                        success: false,
                        message: "Email đã tồn tại",
                    }
                }
            }

            const passwordHash = await bcrypt.hash(MatKhau, 10)
            const newAccount = await accountModel.create({
                Email , MatKhau: passwordHash, LoaiTaiKhoan , TrangThai
            })
            if(newAccount){

                //tạo private key và public key
                // const { privateKey , publicKey } = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,
                //     publicKeyEncoding:{
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                //     privateKeyEncoding:{
                //         type: 'pkcs1',
                //         format: 'pem'
                //     }
                // })

                const newCustomer = await customerModel.create({
                    Email , MaTaiKhoan : newAccount._id
                })

                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newAccount._id,
                    publicKey,
                    privateKey
                })

                if(!keyStore){
                    return {
                        code: 300,
                        metadata:{
                            success: false,
                            message: "Lỗi tạo public key",
                        }
                    }
                }


                const tokens = await createTokenPair({userId: newAccount._id , Email} , publicKey , privateKey )
                
                return {
                    code: 201,
                    metadata:{
                        success: true,
                        account: newAccount,
                        tokens
                    }
                }
            }
            return {
                code: 200,
                metadata: null
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'add account error',
                }
            }
        }
    }


    static signIn = async ({Email , MatKhau })=>{
        const account = await accountModel.findOne({Email}).lean();
        if(!account) 
            return {
                code: 500,
                metadata:{
                    message: 'Không tìm thấy tài khoản',
                }
            }

        // if(!account.XacThuc) 
        //     return {
        //         code: 500,
        //         metadata:{
        //             message: 'Tài khoản chưa xác thực',
        //         }
        //     }

    
        
        const match = await bcrypt.compare(MatKhau, account.MatKhau);
    
        if(!match) {
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: 'Mật khẩu không chính xác',
                }
            }
        }

        
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        const tokens = await createTokenPair({userId: account._id , Email} , publicKey , privateKey )

        await KeyTokenService.createKeyToken({
            privateKey , publicKey , refreshToken: tokens.refreshToken , userId: account._id 
        })

        return {
            code: 200,
            metadata:{
                success: true,
                account: account,
                tokens
            }
        }

    }

    
}

module.exports = AccountService