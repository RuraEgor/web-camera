import {Component, OnInit} from '@angular/core';
import construct = Reflect.construct;
// import * as $ from 'jquery';
// import 'jquery-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  img1: any;
  input: any;

  fon: any;
  pers_2: any;
  pers_3: any;

  construct() {}

  ngOnInit() {
    this.img1 = document.getElementById('img1');
    this.input = <HTMLElement>document.querySelector('.count-color');

    this.fon = <HTMLElement>document.querySelector('.fon');
    this.pers_2 = <HTMLElement>document.querySelector('.pers-2');
    this.pers_3 = <HTMLElement>document.querySelector('.pers-3');

    this.videoTransp();
  }

  videoTransp() {
    let canv1 = <HTMLCanvasElement>document.getElementById('canv1');
    let countColor = this.input.value;

    canv1.width = 700;
    canv1.height = 500;

    let ctvCanv = canv1.getContext('2d');
    // let video = <HTMLVideoElement>document.querySelector('video');

    // ctvCanv.drawImage(video, 0, 0, ctvCanv.canvas.width, ctvCanv.canvas.height);

    ctvCanv.drawImage(this.fon, 0, -190);

    let imgData = ctvCanv.getImageData(0, 0, ctvCanv.canvas.width, ctvCanv.canvas.height);
    let pixels = imgData.data;

    // for (let i = 0; i < pixels.length; i += 4) {
    //   if (pixels[i] > countColor && pixels[i + 1] > countColor && pixels[i + 2] > countColor) pixels[i + 3] = 0;
    // }

    ctvCanv.putImageData(imgData, 0, 0);


    ctvCanv.drawImage(this.pers_2, -10, 40);
    ctvCanv.drawImage(this.pers_3, 430, 40);


    window.requestAnimationFrame(this.videoTransp.bind(this));
  }
}
