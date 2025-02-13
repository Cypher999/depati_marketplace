const userUtils=require("../../utils/db/user")
const joi=require('joi')
const formidable = require('formidable');
const generateRandom=require('../../utils/generateRandom');
const { writeFileSync, readFileSync, unlinkSync } = require("fs");
const {hash}=require("../../utils/hashPassword")
const index=async(req,res)=>{
    const data=await userUtils.getAll()
    data.forEach((item,index)=>{
        data[index]._photo=process.env.BASE_URL+'/img-user/'+item.photo+".jpg"
    })
    return res.status(200).json({
        status:'success',
        data,
    })
}

const getOne=async(req,res)=>{
    const id=parseInt(req.params.id)
    const data=await userUtils.getOne(id)
    data._photo=process.env.BASE_URL+'/img-user/'+data.photo+".jpg"
    return res.status(200).json({
        status:'success',
        data,
    })
}

const create=async(req,res)=>{
    const form = new formidable.IncomingForm({ multiples: true });
    const validator = joi.object({
        username: joi.string()
            .required()
            .messages({
            'any.required': 'username is required'
            }),
        name: joi.string()
            .required()
            .messages({
            'any.required': 'name is required'
            }),
        password: joi.string()
            .min(8)
            .required()
            .messages({
            'any.required': 'password is required',
            'any.min':'password must more than 8 character'
            }),
        confirm: joi.string()
            .valid(joi.ref('password'))
            .required()
            .messages({
            'any.only':'password must match with confirm',
            'any.required': 'confirm is required',
            }),
        role: joi.string()
            .required()
            .messages({
            'any.required': 'role is required',
            }),
        
    });
    form.parse(req, async (err, field, files) => {
        let keyBody = Object.keys(field);
        let valBody = Object.values(field);
        let keyFile = Object.keys(files);
        let valFile = Object.values(files);
        valBody.forEach((n, i) => {
            field[keyBody[i]] = n[0];
        });
        valFile.forEach((n, i) => {
            files[keyFile[i]] = n[0];
        });
        const { error } = validator.validate(field,{ abortEarly: false });
        if (error) {
            return res.status(500).json({
                code:500, 
                status:'error',
                message: error.details.map(detail => {return {[detail.path]:detail.message}}) });
        }
        const checkName=await userUtils.countName(field.username);
        if(checkName>0) return res.status(500).json({status:'error',message:"user name already used"})
        let photo="man"
        if(files.photo!==undefined){
            if(files.photo.size/1000>5200){
                return res.status(500).json({ code:500,status:"error",message: 'max filesize is 5 Mb' });
            }
            if(files.photo.mimetype.split("/")[0] != 'image'){
                return res.status(500).json({ code:500,status:"error",message: 'file must be an image' });
            }
            photo=generateRandom(10);
            await writeFileSync('./public/image/user/'+photo+".jpg",await readFileSync(files.photo.filepath))
        }
        const result=await userUtils.add({
            name:field.name,
            password:await hash(field.password),
            username:field.username,
            role:field.role,
            photo:photo
        })
        if(!result) return res.status(500).json({status:'error',message:"error when saving data"})
        return res.status(200).json({
            status:'success',
            message:'create new user',
            result
        })
    })
}

const updateData=async(req,res)=>{
    const id=parseInt(req.params.id);
    const validator = joi.object({
        username: joi.string()
            .required()
            .messages({
            'any.required': 'username is required'
            }),
        name: joi.string()
            .required()
            .messages({
            'any.required': 'name is required'
            }),
        role: joi.string()
            .required()
            .messages({
            'any.required': 'role is required',
            }),
        
    });
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (err, field, files) => {
        let keyBody = Object.keys(field);
        let valBody = Object.values(field);
        let keyFile = Object.keys(files);
        let valFile = Object.values(files);
        valBody.forEach((n, i) => {
            field[keyBody[i]] = n[0];
        });
        valFile.forEach((n, i) => {
            files[keyFile[i]] = n[0];
        });
        const { error } = validator.validate(field,{ abortEarly: false });
        if (error) {
            return res.status(500).json({
                code:500, 
                status:'error',
                message: error.details.map(detail => {return {[detail.path]:detail.message}}) });
        }
        const checkName=await userUtils.countName(field.username);
        const oldData=await userUtils.getOne(id);
        let photo=oldData.photo;
        if(checkName>0&&oldData.name!=field.name) return res.status(500).json({status:'error',message:"user name already used"})
        if(files.photo!==undefined){
            if(files.photo.size/1000>5200){
                return res.status(500).json({ code:500,status:"error",message: 'max filesize is 5 Mb' });
            }
            if(files.photo.mimetype.split("/")[0] != 'image'){
                return res.status(500).json({ code:500,status:"error",message: 'file must be an image' });
            }
            if(photo!='user'){
                await unlinkSync(process.cwd()+'/public/image/user/'+photo+'.jpg')
            }
            photo=generateRandom(10);
            await writeFileSync('./public/image/user/'+photo+".jpg",await readFileSync(files.photo.filepath))
        }
        const result=await userUtils.update({
            name:field.name,
            username:field.username,
            role:field.role,
            photo
        },id)
        if(!result) return res.status(500).json({status:'error',message:"error when saving data"})
        return res.status(200).json({
            status:'success',
            message:'update new user',
            result
        })
    })
}
const updatePassword=async(req,res)=>{
    const id=parseInt(req.params.id);
    const validator = joi.object({
        password: joi.string()
            .min(8)
            .required()
            .messages({
            'any.required': 'password is required',
            'any.min':'password must more than 8 character'
            }),
        confirm: joi.string()
            .valid(joi.ref('password'))
            .required()
            .messages({
            'any.only':'password must match with confirm',
            'any.required': 'confirm is required',
            }),
        
    });
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (err, field, files) => {
        let keyBody = Object.keys(field);
        let valBody = Object.values(field);
        let keyFile = Object.keys(files);
        let valFile = Object.values(files);
        valBody.forEach((n, i) => {
            field[keyBody[i]] = n[0];
        });
        valFile.forEach((n, i) => {
            files[keyFile[i]] = n[0];
        });
        const { error } = validator.validate(field,{ abortEarly: false });
        if (error) {
            return res.status(500).json({
                code:500, 
                status:'error',
                message: error.details.map(detail => {return {[detail.path]:detail.message}}) });
        }
        const checkName=await userUtils.countName(field.username);
        const oldData=await userUtils.getOne(id);
        
        const result=await userUtils.update({
            password:await hash(field.password)
        },id)
        if(!result) return res.status(500).json({status:'error',message:"error when saving data"})
        return res.status(200).json({
            status:'success',
            message:'update new user',
            result
        })
    })
}
const del=async(req,res)=>{
    const id=parseInt(req.params.id)
    const checkData=await userUtils.getOne(id);
    if(checkData.photo!='user'){
        await unlinkSync(process.cwd()+'/public/image/user/'+checkData.photo+'.jpg')
    }
    await userUtils.del(id);
    return res.status(200).json({
        status:'success',
        message:'delete user',
    })
}
module.exports={index,getOne,create,updatePassword,updateData,del}