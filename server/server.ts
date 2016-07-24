/// <reference path="./_all.d.ts" />

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as indexRoute from './routes/index';


class Server {

    constructor() {
        // create expressjs application
        this.app = express();
        // configure application
        this.config();
        // configure routes
        this.routes();
    }
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     * @return void
     */
    private config() {
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
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
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
    private routes() {
        // get router
        let router: express.Router;
        router = express.Router();

        // create routes
        let index: indexRoute.Index = new indexRoute.Index();

        // home page
        router.get('/', index.index.bind(index.index));

        // use router middleware
        this.app.use(router);
    }

}

let server = Server.bootstrap();
export = server.app;