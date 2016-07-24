import { Component, OnInit } from '@angular/core';
import {yocoInit} from '../script';

@Component({
    selector: 'app-component',
    templateUrl: './client/app/components/app.component.html',
    styleUrls: ['./client/app/components/app.component.css']
})
export class AppComponent implements OnInit {
    ngOnInit() {
        yocoInit();
    }
}