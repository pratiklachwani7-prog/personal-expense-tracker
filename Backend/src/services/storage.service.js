const ImageKit = require("@imagekit/nodejs") ;

const imagekit = new ImageKit({
    publicKey : process.env.PUBLIC_KEY , 
    privateKey : process.env.PRIVATE_KEY , 
})

const uploadImage = async (buffer) =>
{
    const result = await imagekit.files.upload( {
        file:buffer.toString("base64"),
        fileName : "image.jpeg" ,
    } )

    return result ;
}

module.exports = uploadImage ;
