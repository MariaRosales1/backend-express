"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sprintController_1 = require("../controllers/sprintController");
class SpintRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/nextSprint', sprintController_1.sprintController.getNextSprint);
        this.router.post('/creation', sprintController_1.sprintController.creationSprint);
    }
}
const spintRoutes = new SpintRoutes();
exports.default = spintRoutes.router;
