const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://shema:Bashyitsi2003@loginform.kqzcspe.mongodb.net/?retryWrites=true&w=majority&appName=loginForm")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    }
});

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection