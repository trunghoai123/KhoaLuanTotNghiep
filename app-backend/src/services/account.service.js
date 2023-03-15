const accountModel = require("../models/account.model")
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
                            message: "Lỗi tạo public key",
                        }
                    }
                }


                const tokens = await createTokenPair({userId: newAccount._id , Email} , publicKey , privateKey )
                
                return {
                    code: 201,
                    metadata:{
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
                    message: err.message,
                    status: 'add account error',
                }
            }
        }
    }


    
}

module.exports = AccountService