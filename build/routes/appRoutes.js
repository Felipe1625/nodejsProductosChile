"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appController_1 = __importDefault(require("../controllers/appController"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var multipart = require('connect-multiparty');
const multiPartMiddleware = multipart({
    uploadDir: './src/solicitud-onePage'
});
const multiPartMiddlewareProducto = multipart({
    uploadDir: './src/imagenes/productos'
});
const multiPartMiddlewareServicio = multipart({
    uploadDir: './src/imagenes/servicios'
});
class AppRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/list-all', appController_1.default.list);
        this.router.get('/get-one/:id', appController_1.default.getOne);
        this.router.post('/a', appController_1.default.create);
        this.router.delete('/:id', appController_1.default.delete);
        this.router.post('/send-email-user', appController_1.default.sendEmailUser);
        this.router.post('/send-email-client', appController_1.default.sendEmailClient);
        this.router.post('/signin', appController_1.default.signin);
        this.router.get('/get-usuario/:id', appController_1.default.getUsuario);
        this.router.get('/get-pyme/:id', appController_1.default.getPyme);
        this.router.put('/update-datos-empresariales/:id', appController_1.default.updateDatosEmpresariales);
        this.router.put('/update-datos-usuario/:id', appController_1.default.updateDatosUsuario);
        this.router.post('/solicitar-OnePage/:id', appController_1.default.solicitarOnePage);
        this.router.get('/get-productos-by-user/:id', appController_1.default.getProductosbyUser);
        this.router.get('/get-servicios-by-user/:id', appController_1.default.getServiciosbyUser);
        this.router.put('/delete-producto/:id', appController_1.default.deleteProducto);
        this.router.put('/delete-service/:id', appController_1.default.deleteService);
        this.router.put('/update-producto/:id', appController_1.default.updateProducto);
        this.router.put('/update-service/:id', appController_1.default.updateService);
        this.router.get('/get-tipos-servicios-by-rubro/:id', appController_1.default.getTiposServiciosbyRubro);
        this.router.post('/add-producto', appController_1.default.addProducto);
        this.router.post('/add-service', appController_1.default.addService);
        this.router.post('/get-productos-servicios-por-nombre', appController_1.default.getProductosServiciosPorNombre);
        this.router.post('/get-productos-servicios-por-rubro', appController_1.default.getProductosServiciosPorRubro);
        this.router.post('/get-productos-servicios-por-filtros', appController_1.default.getProductosServiciosPorFiltros);
        this.router.post('/get-producto-servicio/:id', appController_1.default.getProductoServicio);
        this.router.post('/subir-imagen-node', multiPartMiddleware, appController_1.default.subirImagenNode);
        this.router.post('/subir-imagen-producto-server', multiPartMiddlewareProducto, appController_1.default.subirImagenProductoServer);
        this.router.post('/subir-imagen-servicio-server', multiPartMiddlewareServicio, appController_1.default.subirImagenServicioServer);
    }
}
const appRoutes = new AppRoutes();
exports.default = appRoutes.router;
function verifyToken(req, res, next) {
    console.log(req.headers.authorization);
    //en el header viene el authorization, que es el token, si es undefined es porque no viene nada, o sea, no esta logueado, si viene algo, se tiene que comprobar que es un token valido
    if (!req.headers.authorization) {
        //si no viene algo en el authorization
        return res.status(401).send('unauthorized request');
    }
    const token = req.headers.authorization.split(' ')[1];
    //dividimos el req en 2 , por que despues del espacio esta el token como tal
    console.log(token);
    if (token == null) { // si el token que viene es nulo, retornamos el mensaje de solicitud no autorizada
        return res.status(401).send('unauthorized request');
    }
    console.log('error');
    const payload = jsonwebtoken_1.default.verify(token, 'secretkey');
    //ejemplo de token=  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE2LCJpYXQiOjE1NzcyOTE4MTB9.mE-duTHebllE1LhYFjDqPVoI21JzBzjAqhqnKfqlO2o
    console.log(payload); //aqui tenemos 2 datos , el id y iat, el id es lo unico importante 
    req.userId = payload._id;
    next();
}
