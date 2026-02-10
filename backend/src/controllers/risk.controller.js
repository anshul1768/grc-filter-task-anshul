import { Risk } from "../model/riskmodels.js";
const addRisk =async(req,res)=>{
    const {asset,threat,likelihood,impact}=req.body;


    if((likelihood<1 || likelihood>5)&&(impact<1 || impact>5)){
        return res.json({
            "status":400,
            "error":"Invalid range: Likelihood and Impact must be 1–5."
        })
    }

    const score=likelihood*impact;

    let level;

    if(score<=5) level='Low'
    else if(score>=6 && score<=12) level='Medium'
    else if(score>=13 && score<=18) level='High'
    else if(score>=19 && score <=25) level='Critical'

    const risk=await Risk.create({
        asset,
        threat,
        likelihood,
        impact,
        score,
        level
    })

    res.json({
        status:201,
        'msg':"Risk details created successfully"
    })
}

const getRisk=async(req,res)=>{
    const level=req.query.level;
    console.log(level);
    if(!level){
        const risks=await Risk.find();
        console.log(risks);
        res.status(200).json(risks);
    }
    const risks=await Risk.find({level});
    res.status(200).json(risks);
}

export {addRisk,getRisk}