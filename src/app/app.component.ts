import {Component, OnInit} from '@angular/core';
import construct = Reflect.construct;
import {Options} from 'ng5-slider';
// import * as $ from 'jquery';
// import 'jquery-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  img1: any;
  
  fon: any;
  pers_2: any;
  pers_3: any;
  
  makeTransBack: boolean = false;
  persCom_1: boolean = true;
  persCom_2: boolean = true;
  
  value: number = 190;
  options: Options = {
    floor: 0,
    ceil: 256
  };
  
  construct() {
  }
  
  ngOnInit() {
    
    this.img1 = document.getElementById('img1');
    
    this.fon = <HTMLElement>document.querySelector('.fon');
    this.pers_2 = <HTMLElement>document.querySelector('.pers-2');
    this.pers_3 = <HTMLElement>document.querySelector('.pers-3');
    
    this.videoTransp();
  }
  
  videoTransp() {
    let canv1 = <HTMLCanvasElement>document.getElementById('canv1');
    let canv2 = <HTMLCanvasElement>document.getElementById('canv2');
    const countColor = this.value;
    
    canv1.width = 700;
    canv1.height = 500;
    
    canv2.width = 700;
    canv2.height = 500;
    
    let ctvCanv = canv1.getContext('2d');
    let ctvCanv_2 = canv2.getContext('2d');
    let video = <HTMLVideoElement>document.querySelector('video');
    
    ctvCanv_2.drawImage(video, 0, 0, ctvCanv.canvas.width, ctvCanv.canvas.height);
    
    let imgData = ctvCanv_2.getImageData(0, 0, ctvCanv.canvas.width, ctvCanv.canvas.height);
    let pixels = imgData.data;
    
    if (this.makeTransBack) {
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i] > countColor && pixels[i + 1] > countColor && pixels[i + 2] > countColor) pixels[i + 3] = 0;
      }
    }
    
    ctvCanv_2.putImageData(imgData, 0, 0);
    
    ctvCanv.drawImage(this.fon, 0, -190);
    
    ctvCanv.drawImage(canv2, 0, 0);
    
    if (this.persCom_1) {
      ctvCanv.drawImage(this.pers_2, -10, 40);
    }
  
    if (this.persCom_2) {
      ctvCanv.drawImage(this.pers_3, 430, 40);
    }
    
    window.requestAnimationFrame(this.videoTransp.bind(this));
  }
  
  
  makeTrans() {
    this.makeTransBack = !this.makeTransBack;
  }
  
  perst1() {
    this.persCom_1 = !this.persCom_1;
  }
  
  perst2() {
    this.persCom_2 = !this.persCom_2;
  }
  
  takeFoto() {
    let canv1 = <HTMLCanvasElement>document.getElementById('canv1');
    let ctvCanv = canv1.getContext('2d');
    let fotoReady = <HTMLImageElement>document.querySelector('#foto-ready');
    fotoReady.src = canv1.toDataURL("image/png");
  }
}
