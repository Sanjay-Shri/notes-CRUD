import jwt from "jsonwebtoken";
import User from  "../modal/User.js"

const middleware = async (request,response,next) => {

  try{
        const token = request.headers.authorization.split(' ')[1]
        if(!token){
            return response.status(401).json({message:"unauthorized"})

        }
        console.log(request.headers.authorization)
        console.log()
        console.log(token)
        console.log()

        const decodedToken = jwt.verify (token,process.env.SECRET_KEY)

        if(!decodedToken){
            return response.status(401).json({message:'Unauthorized'})

        }
        let userId = decodedToken.id
        const user = await User.findById({_id: userId})

        console.log(user)
 
        if (!user){
            return response.status(404).json({message:'User not found '})

        }
         
        request.user ={
            name: user.name, 
            id: user._id, 
        }
        next()
    } catch (err){
        console.log(err.message)
        return response.status(500).json({message: 'internal server error'})
    }
}

export default middleware
