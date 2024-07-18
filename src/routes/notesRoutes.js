
    const { Router } = require('express')  // here

    const NotesController = require('../controllers/notesController'); 

    const notesRoutes = Router();  // here

    const notesController = new NotesController();

    const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

    notesRoutes.use(ensureAuthenticated);

    notesRoutes.post('/',  notesController.create);
    notesRoutes.get('/:id', notesController.show);
    notesRoutes.delete('/:id', notesController.delete);
    notesRoutes.get('/', notesController.index);


    module.exports = notesRoutes;