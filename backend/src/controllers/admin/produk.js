const produkUtils=require("../../utils/db/produk")
const joi=require('joi')
const formidable = require('formidable');
const validator = joi.object({
    nama: joi.string()
        .required()
        .messages({
        'any.required': 'nama is required'
        }),
    deskripsi: joi.string()
        .required()
        .messages({
        'any.required': 'deskripsi is required'
        }),
    harga: joi.number()
        .required()
        .messages({
        'any.required': 'harga is required'
        }),
    satuan: joi.string()
        .required()
        .messages({
        'any.required': 'satuan is required'
        }),
    stok: joi.number()
        .required()
        .messages({
        'any.required': 'stok is required'
        })
});
const index=async(req,res)=>{
    const data=await produkUtils.getAll()
    return res.status(200).json({
        status:'success',
        data,
    })
}

const getOne=async(req,res)=>{
    const id=parseInt(req.params.id)
    const data=await produkUtils.getOne(id)
    return res.status(200).json({
        status:'success',
        data,
    })
}

const create=async(req,res)=>{
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (err, field, files) => {
        let keyBody = Object.keys(field);
        let valBody = Object.values(field);
        valBody.forEach((n, i) => {
            field[keyBody[i]] = n[0];
        });
        const { error } = validator.validate(field,{ abortEarly: false });
        if (error) {
            return res.status(500).json({
                code:500, 
                status:'error',
                message: error.details.map(detail => {return {[detail.path]:detail.message}}) });
        }
        const checkName=await produkUtils.countName(field.nama);
        if(checkName>0) return res.status(500).json({status:'error',message:"product name already used"})
        const result=await produkUtils.add({
            nama:field.nama,
            satuan:field.satuan,
            deskripsi:field.deskripsi,
            stok:parseInt(field.stok),
            harga:parseInt(field.harga)
        })
        if(!result) return res.status(500).json({status:'error',message:"error when saving data"})
        return res.status(200).json({
            status:'success',
            message:'create new product',
            result
        })
    })
}

const update=async(req,res)=>{
    const id=parseInt(req.params.id)
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (err, field, files) => {
        let keyBody = Object.keys(field);
        let valBody = Object.values(field);
        valBody.forEach((n, i) => {
            field[keyBody[i]] = n[0];
        });
        const { error } = validator.validate(field,{ abortEarly: false });
        if (error) {
            return res.status(500).json({
                code:500, 
                status:'error',
                message: error.details.map(detail => {return {[detail.path]:detail.message}}) });
        }
        const checkName=await produkUtils.countName(field.nama);
        const oldData=await produkUtils.getOne(id)
        if(checkName>0&&oldData.nama!=field.nama) return res.status(500).json({status:'error',message:"product name already used"})
        const result=await produkUtils.update({
            nama:field.nama,
            satuan:field.satuan,
            deskripsi:field.deskripsi,
            stok:parseInt(field.stok),
            harga:parseInt(field.harga)
        },id)
        if(!result) return res.status(500).json({status:'error',message:"error when saving data"})
        return res.status(200).json({
            status:'success',
            message:'update new product',
            result
        })
    })
}
const del=async(req,res)=>{
    const id=parseInt(req.params.id)
    await produkUtils.del(id);
    return res.status(200).json({
        status:'success',
        message:'delete product',
    })
}
module.exports={index,getOne,create,update,del}