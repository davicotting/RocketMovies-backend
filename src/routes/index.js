    
    const { Router } = require('express');  

    const usersRoutes = require('./userRoutes');
    const notesRoutes = require('./notesRoutes');
    const tagsRoutes = require("./tagsRoutes");
    const sessionRoutes = require("./sessionsRoutes");


    const routes = Router();

    routes.use('/users', usersRoutes);
    routes.use('/notes', notesRoutes);
    routes.use('/tags', tagsRoutes);
    routes.use("/sessions", sessionRoutes);

    module.exports = routes;