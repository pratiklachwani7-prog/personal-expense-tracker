const ImageKit = require("@imagekit/nodejs") ;

const imagekit = new ImageKit({
    publicKey : process.env.PUBLIC_KEY , 
    privateKey : process.env.PRIVATE_KEY , 
})

const uploadImage = async (buffer) =>
{
    const result = imagekit.files.upload( {
        file:buffer ,
        fileName : "image.jpeg" ,
    } )

    return result ;
}

module.exports = uploadImage ;