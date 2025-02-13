const exp=require('express')
class AdminRouter{
    constructor(){
        const adminFilter=require("../middleware/adminFilter");
        this.router=exp.Router()
        this.router.use(adminFilter);
        this.produk=require("../controllers/admin/produk")
        // this.user=require("../controllers/admin/user")
        this.router.use("/produk",this.produkRoute())
        
        // this.router.use("/user",this.userRoute())
    }
    produkRoute=()=>{
        let route=exp.Router();        
        route.get('/',this.produk.index)
        route.get('/:id',this.produk.getOne)
        route.post('/',this.produk.create)
        route.put('/:id',this.produk.update)
        route.delete('/:id',this.produk.del)
        return route
    }
}

class PublicRouter{
    constructor(){
        this.router=exp.Router()
        this.auth=require("../controllers/auth")
        this.router.use("/auth",this.authRoute())
    }
    authRoute=()=>{
        let route=exp.Router();
        route.post("/",this.auth.login)
        route.get("/",this.auth.checkUser)
        return route;
    }
}
const route=exp.Router();
const admin_router=new AdminRouter();
const public_router=new PublicRouter();
route.use("/admin",admin_router.router);
route.use("/public",public_router.router);
route.all("*",(req,res)=>{
    return res.status(404).json({status:'error','message':"NOT FOUND"})
})
module.exports=route;