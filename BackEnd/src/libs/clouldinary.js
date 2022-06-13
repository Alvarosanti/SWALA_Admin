const { v2 } = require('cloudinary')

v2.config({
    cloud_name: "dr9mltwij",
    api_key: "346771372182516",
    api_secret: "TFWlo8XdaIGQDbzp2yEgFdqbpe0"
})
const uploadImage = async filePath => {
    return await v2.uploader.upload(filePath, {
        folder: 'LADLOLA'
    })
}

const deleteImage = async id => {
    return await v2.uploader.destroy(id)
}
module.exports = { uploadImage, deleteImage }