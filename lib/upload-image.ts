import cloudinary from "./cloudinary"

export const uploadImage = async (file: File, folder: string) => {
    const buffer = await file.arrayBuffer()
    const bytes = Buffer.from(buffer)

    return new Promise((resolve, reject) => (
        cloudinary.uploader.upload_stream({
            resource_type: 'auto',
            folder: folder
        }, async (err, res) => {
            if (err) reject(err.message)
            return resolve(res?.url)
        }).end(bytes)
    ))

}