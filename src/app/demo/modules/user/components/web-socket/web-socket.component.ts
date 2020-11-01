import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../../auth/models/User';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Message} from '../../models/Message';

const SERVER_URL = 'http://localhost:8082/ws';

@Injectable()
@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit {
  sendMessageForm: FormGroup;
  socket: any;
  stompClient: any;
  user: User;
  client: any;
  oneMessage: Message = null;

  // myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:8082/ws');
  sockJS: any;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  get userMessage() {
    return this.sendMessageForm.get('userMessage');
  }

  ngOnInit(): void {
    this.sendMessageForm = this.formBuilder.group({
      userMessage: ['']
    });

    this.user = this.userService.user.getValue();
    console.log(this.user);
  }

  onSubmit() {
    if (this.userMessage.value.trim() !== '') {
      this.stompClient.send('/app/chat', {}, JSON.stringify({
        senderId: this.user.id,
        recipientId: 5,
        senderName: this.user.userName,
        recipientName: 'Admin',
        content: this.userMessage.value,
        timestamp: new Date()
      }));
    }

  }

  connect() {
    this.sockJS = new SockJS('http://localhost:8082/ws');
    this.stompClient = Stomp.over(this.sockJS);

    this.stompClient.connect({}, this.onConnected(), this.onError());
  }

  onConnected() {
    console.log('On connected');
    console.log(this.stompClient);
    if (this.stompClient.status === 'CONNECTED') {
      console.log('if condition 🥰');
      this.stompClient.subscribe('user/' + this.user.id + '/queue/messages', this.onMessageReceived);
    }
  }

  onError() {
    console.log('Error');
    console.log(this);
    console.log('🥶');
  }

  onMessageReceived() {
    console.log('Message received');
  }

}
