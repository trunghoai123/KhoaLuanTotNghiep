const JWT = require('jsonwebtoken')

const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION : 'authorization',
}


const createTokenPair = async (payload , publicKey , privateKey) =>{
    try {
        const accessToken = await JWT.sign(payload , publicKey , {
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign(payload , privateKey , {
            expiresIn: '7 days'
        })

        JWT.verify(accessToken , publicKey , (err, decode) =>{
            if(err){
                console.error("error verify: " + err)
            }else{
                console.log("decode verify: " + decode)
            }

        })


        return { accessToken , refreshToken }
    } catch (error) {
        
    }
}


// const verifyToken = async (req, res, next) => {
//     const accessToken = req.headers[HEADER.AUTHORIZATION]
//     const token = accessToken && accessToken.split(' ')[1]

//     if(!token) {
//         return res.status(401).json({
//             message: "accessToken not found"
//         })
//     }

//     try {
//         const decoded = JWT.verify(token, )

// 		req.userId = decoded.userId
// 		next()
//     }catch (error) {
//         return res.status(401).json({
//             message: "Invalid token"
//         })
//     }
// }


module.exports = {
    createTokenPair,
    
}