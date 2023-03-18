const keyTokenModel = require('../models/keytoken.model')

class KeyTokenService{

    static createKeyToken = async ({userId , publicKey , privateKey ,refreshToken}) =>{
        try {
            // const tokens = await keyTokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // })
            // return tokens ? tokens.publicKey : null

            const filter = { user: userId}, update = {
                publicKey, privateKey ,refreshTokens : [], refreshToken
            }, options = {upsert: true , new: true}

            const tokens = await keyTokenModel.findOneAndUpdate(filter , update, options)
            return tokens ? tokens.publicKey : null


        } catch (error) {
            return error
        }
    }



}

module.exports = KeyTokenService