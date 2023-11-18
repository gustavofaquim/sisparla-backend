// config/multer.js
import multer from 'multer';
import path from 'path';


// config/multer.js
const storage = multer.diskStorage({
    destination:  (req, file, callback) => {
        callback(null, path.resolve("uploads"));
    },
    filename: (req, file, callback) => {
        
        const time = new Date().getTime();
        const nomeEditado = file.originalname.replace(/\s/g, "_").toLowerCase();
        const name = time + '_' + nomeEditado

        callback(null, name);
    },
});


const upload = multer({ storage });

upload.any();

export default upload;


/**

import multer from 'multer';
import path from 'path';

export const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // Log para verificar o destino do arquivo
        console.log('Destination:', 'uploads/');
        callback(null, path.resolve("uploads"));
    },
    filename: (req, file, callback) => {
        // Log para verificar o nome do arquivo
        console.log('Originalname:', file.originalname);

        const time = new Date().getTime();
        
        const filename = time + '_' + file.originalname
        console.log('Generated Filename:', filename);

        callback(null, filename);
    },
});





 */
