"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const registerUserRoutes_1 = __importDefault(require("./routes/registerUserRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const orderChangeRoute_1 = __importDefault(require("./routes/orderChangeRoute"));
const cors_1 = __importDefault(require("cors"));
const sprintRoutes_1 = __importDefault(require("./routes/sprintRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/user', registerUserRoutes_1.default);
        this.app.use('/order', orderChangeRoute_1.default);
        this.app.use('/sprint', sprintRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port:', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
