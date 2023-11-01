import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isOffline: boolean = true
  title = 'landingPage_montes';

  ngOnInit(): void {
    this.isOffline = navigator.onLine
  }
}
