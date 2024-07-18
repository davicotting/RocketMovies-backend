    const fs = require("fs");
    const path = require("path");
    const updateConfigs = require("../configs/update");
    class diskStorage{
        async saveFile(file){
            await fs.promises.rename(
                path.resolve(updateConfigs.TMP_FOLDER, file),
                path.resolve(updateConfigs.UPLOADS_FOLDER, file)
            );
            return file;
        };

        async deleteFile(file){
            
            const filePath = path.resolve(updateConfigs.UPLOADS_FOLDER, file);

            try{
                await fs.promises.stat(filePath);
            }catch{

                return;
            }

            await fs.promises.unlink(filePath);

        }

    };

    module.exports = diskStorage;