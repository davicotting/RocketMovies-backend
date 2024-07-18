
    const TagsControllers = require("../controllers/TagsControllers");

    const tagsControllers = new TagsControllers(); 

    const { Router } = require("express"); 

    const tagsRoutes = Router();

    const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

    tagsRoutes.get("/", ensureAuthenticated, tagsControllers.index);

    module.exports = tagsRoutes;