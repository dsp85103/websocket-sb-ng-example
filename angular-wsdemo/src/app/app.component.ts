import { Component } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-wsdemo';
  ws: any;
  stompClient: any;
  userInput: any;

  ngOnInit() {
    let ws = new SockJS('http://localhost:8080/wsdemo');
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
        _this.stompClient.subscribe('/topic/lobby', function (sdkEvent: any) {
            console.log(sdkEvent.body);
        });
    }, (error: any) => console.log("error -> " + error));
  }

  send() {
    this.stompClient.send("/app/talk", {},this.userInput )
  }

}
