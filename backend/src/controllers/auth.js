const users=require('../utils/hashPassword')
const {verify}=require('../utils/hashPassword')
const joi=require('joi')
const jwt = require("jsonwebtoken");
const formidable = require('formidable');
const login=async (req,res)=>{
    const form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async (err, field, files) => {
            let keyBody = Object.keys(field);
            let valBody = Object.values(field);
            valBody.forEach((n, i) => {
                field[keyBody[i]] = n[0];
            });
    const validator = joi.object({
        username: joi.string()
            .required()
            .messages({
            'any.required': 'Username is required'
            }),
        password: joi.string()
            .required()
            .messages({
            'any.required': 'Password is required'
            })
    });
    const { error } = validator.validate(field,{ abortEarly: false });
    if (error) {
        return res.status(500).json({
            status:'error',
            message: error.details.map(detail => {return {[detail.path]:detail.message}}) });
    }
    const count=await users.checkUsername(field.username);
    if(count<=0) return res.status(500).json({status:'error','message':'username not found'}); 
    const data = await users.getUsername(field.username);
    if (data) {
        const checkPassword=await verify(field.password,data.password);
        if(!checkPassword) return res.status(500).json({status:'error','message':'password doesnt match'});
        const accessToken= jwt.sign({
            user_id:data.id,
            user_role:data.role
        }, process.env.SECRET_KEY, { expiresIn: '30d' });
        return res.status(200).json({status:'success',data:{accessToken,role:data.role}})      
    } else {
        return res.status(500).json({status:'error','message':''});
    }
})
}

const checkUser=async (req,res)=>{
    if(req.user_id=="") return res.status(200).json({status:'success',data:{role:'public'}})  
    const id=parseInt(req.user_id)
    const data = await users.getOne(id);
    if (data) {
        data.password=null;
        return res.status(200).json({status:'success',data})      
    } else {
        return res.status(500).json({status:'error','message':''});
    }
}

module.exports={login,checkUser};