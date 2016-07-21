import { Component, OnInit } from '@angular/core';
import {yocoInit} from '../script';

@Component({
    selector: 'app-component',
    templateUrl: './src/app/components/app.component.html',
    styleUrls: ['./src/app/components/app.component.css']
})
export class AppComponent implements OnInit {
    ngOnInit() {
        yocoInit();
    }
}