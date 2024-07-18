    
    require("express-async-errors");

    require("dotenv/config")

    const migrationsRunner = require("./database/migrations");

    const AppError = require("./utils/AppError.js");

    const express = require("express");

    const routes = require("../src/routes");

    const server = express();

    const cors = require("cors");

    const PORT = process.env.PORT || 4545;

    server.use(cors());

    server.use(express.json());

    const updateConfigs = require("./configs/update.js");

    server.use("/files", express.static(updateConfigs.UPLOADS_FOLDER));
    

    server.use(routes);

    migrationsRunner();

    server.use((error, request, response, next) => {
        	if(error instanceof AppError){
                return response.status(error.statusCode).json({
                    status: "error",
                    message: error.message
                })
            }

            console.error(error);

            return response.status(500).json({
                status: "error",
                message: "Internal server error"
            });
    });

    server.listen(PORT, () => console.log(`RocketNotes server is running on port ${PORT}`));

    