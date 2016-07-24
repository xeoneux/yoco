/// <reference path='../_all.d.ts' />

import * as express from 'express';

namespace Route {
    export class Index {

        public index(req: express.Request, res: express.Response, next: express.NextFunction) {
            // render page
            res.render('login.html');
        }
    }
}

export = Route;