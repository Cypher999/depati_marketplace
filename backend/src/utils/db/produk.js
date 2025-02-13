const prisma=require('../prismaClient')
const getAll=async ()=>{
    let data=await prisma.produk.findMany()
    return data;
}
const countAll=async ()=>{
    let data=await prisma.produk.count()
    return data;
}
const getOne=async (id)=>{
    let data=await prisma.produk.findFirst({
        where : { id }
    })
    return data;
}
const countName=async (nama)=>{
    let data=await prisma.produk.count({
        where : { nama }
    })
    return data;
}
const add=async (data)=>{
    const newData=await prisma.produk.create({ data});
     return newData;
 }
 const update=async (data,id)=>{
    const results=await prisma.produk.update({ data,
       where:{id} 
     });
     return results;
 }
 const del=async (id)=>{
    const result=await prisma.produk.delete({
       where:{id} 
     });
     return result;
 }
module.exports={getAll,getOne,add,update,del,countAll,countName}