import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        email:{
            type: String,
            required:true,
            unique:true,
        },
        fullName:{
            type: String,
            required:true,
        },
        password:{
            type: String,
            required: true,
            minlength: 6,
        },
        QuizCount: {
            type: Number, // Changed from String to Number
            required: true,
            default: 0, // Default value set to 0
            min: 0, // Ensures no negative values
        },
        QuestionCount: {
            type: Number, // Changed from String to Number
            required: true,
            default: 0, // Default value set to 0
            min: 0, // Ensures no negative values
        },
        CorrectAnswersCount: {
            type: Number, // Changed from String to Number
            required: true,
            default: 0, // Default value set to 0
            min: 0, // Ensures no negative values
        },
        profilePic:{
            type: String,
            default: "",
        },
    },
    {timestamps: true}
)

const User= mongoose.model("User",userSchema);

export default User;