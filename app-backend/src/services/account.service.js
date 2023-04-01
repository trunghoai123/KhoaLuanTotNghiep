const accountModel = require("../models/account.model")
const customerModel = require("../models/customer.model")
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require("./keyToken.service")
const {createTokenPair, verifyToken} = require('../auth/authUtils')


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

                const privateKey = process.env.KEY_PRIVATE
                const publicKey =  process.env.KEY_PUBLIC

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

        
        const privateKey = process.env.KEY_PRIVATE
        const publicKey =  process.env.KEY_PUBLIC


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

    static getAccountCustomerByAccessToken = async ({AccessToken})=>{
        
        if(!AccessToken){
            return {
                code: 404,
                metadata:{
                    success: false,
                    message: "token null",
                    
                }
            }
        }
        const publicKey =  process.env.KEY_PUBLIC
        try {
            const decode  = await JWT.verify( AccessToken.toString(),  publicKey)
            if(decode){
                const account = await accountModel.find({ _id: decode.userId }).select('-MatKhau').lean()
                const customer = await customerModel.find({ MaTaiKhoan: decode.userId }).lean()

                return {
                    code: 200,
                    metadata:{
                        success: true,
                        data: {
                            account,
                            customer
                        },
                        
                    }
                }
            }
            
    
        } catch (error) {
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: error.message,
                    
                }
            }
        }
        
    }

  
    
}

module.exports = AccountService