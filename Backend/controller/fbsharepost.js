const Facebook = require('facebook-node-sdk');

const facebook = new Facebook({ appId: '1272065693819004', secret: '3d3d1b28a8dfd4a44920679676642643' });

const fb_fun = async(req,res)=>{

        facebook.api(`/375958932263001/feed`, 'post', { message: 'Hello, world!' }, function (res) {
            if (!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }
            console.log('Post Id: ' + res.id);
        });

  


}
    
module.exports = fb_fun