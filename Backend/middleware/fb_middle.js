const fb_id = (req,res,next)=>{
    const post_id = req.params.id;
    if(!post_id){
        console.log("eror not have id in middle")
    }
    req.id= post_id
    next()
}

module.exports = {fb_id}