import express, { request } from "express"
import Note from "../modal/Note.js"
import middleware from '../middleware/middleware.js'
const router = express.Router();

router.post("/create",middleware, async(request,response)=>{
    try{
        const { title , description}=request.body;

        const newNote = new Note({
            title,
            description,
            userId:request.user.id,
        });

        await newNote.save();

        return response
            .status(200)
            .json({success:true, message:"Note is created successfully"});

    } catch (err){
        return response.status(500).json({
            success:false,
            message:"error in adding note",
        });
    }
});

router.get("/", async (request, response)=>{
    try {
      const notes = await Note.find()
      return response.status(200).json({success: true, notes})
    } catch (error) {
      return  response.status(500).json({success: false, message: "server error"})
    }
})

router.put("/:id",middleware, async(request,response)=>{
    try{
        const {id}=request.params;
        const {title, description}=request.body;
        const timestamp= new Date();

        const updateItem= await model.findbyIdandUpdate(
            id,
            {title,description,timestamp},
            {new:true}
        );

        if(!updateItem){
            return response.status(404).json({message:"item not found "});

        }

         response.status(200).json({message:"item updated successfully",data:updateItem});
        
    } catch(error){
        console.log(error);
        response.status(500).json({message:"server error"})
    }
})

export default router