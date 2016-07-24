/// <reference path="./_all.d.ts" />
"use strict";
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const indexRoute = require('./routes/index');
class Server {
    constructor() {
        // create expressjs application
        this.app = express();
        // configure application
        this.config();
        // configure routes
        this.routes();
    }
    static bootstrap() {
        return new Server();
    }
    /**
     * Configure application
     *
     * @class Server
     * @method config
     * @return void
     */
    config() {
        // mount logger
        // this.app.use(logger("dev"));
        this.app.set('views', __dirname + '/views/');
        this.app.engine('html', require('jade').renderFile);
        this.app.set('view engine', 'html');
        // mount json form parser
        this.app.use(bodyParser.json());
        // mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // add static paths
        this.app.use('/client', express.static(path.resolve(__dirname, '../client')));
        this.app.use('/libs', express.static(path.resolve(__dirname, '../build')));
        this.app.use(express.static(path.join(__dirname, '../public')));
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            let error = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    }
    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    routes() {
        // get router
        let router;
        router = express.Router();
        // create routes
        let index = new indexRoute.Index();
        // home page
        router.get('/', index.index.bind(index.index));
        // use router middleware
        this.app.use(router);
    }
}
let server = Server.bootstrap();
module.exports = server.app;
//# sourceMappingURL=server.js.map