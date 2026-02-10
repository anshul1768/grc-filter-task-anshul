import mongoose from "mongoose";

const riskSchema=mongoose.Schema({
    asset:{
        type:String,
        required:true
    },
    threat:{
        type:String,
        required:true,
    },
    likelihood:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    impact:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    score:{
        type:Number,
    },
    level:{
        type:String,
    }
})

const Risk=mongoose.model('risk',riskSchema);

export {Risk}