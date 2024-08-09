import multer from 'multer'


//Temporrary storage for image
const storage = multer.memoryStorage()
const maxSize = 10 * 1024 * 1024; // 10MB

export const singleUpload = multer({storage,limits:{fileSize:maxSize}}).single("file")
export default singleUpload