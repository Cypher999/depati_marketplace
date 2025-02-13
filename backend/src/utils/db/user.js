const prisma=require('../prismaClient')
const getAll=async ()=>{
    let data=await prisma.user.findMany()
    return data;
}
const countAll=async ()=>{
    let data=await prisma.user.count()
    return data;
}
const getOne=async (id)=>{
    let data=await prisma.user.findFirst({
        where : { id }
    })
    return data;
}
const countName=async (username)=>{
    let data=await prisma.user.count({
        where : { username }
    })
    return data;
}
const add=async (data)=>{
    const newData=await prisma.user.create({ data});
     return newData;
 }
 const update=async (data,id)=>{
    const results=await prisma.user.update({ data,
       where:{id} 
     });
     return results;
 }
 const del=async (id)=>{
    const result=await prisma.user.delete({
       where:{id} 
     });
     return result;
 }
module.exports={getAll,getOne,add,update,del,countAll,countName}