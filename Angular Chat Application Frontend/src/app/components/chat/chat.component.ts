import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  // export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  @Input() socket: any;
  @Input() username: string = '';
  @Input() room: string = '';

  // socket: any;
  // username: string = '';
  // room: string = '';
  currentMessage: string = '';
  messageList: Array<any> = [];

  constructor() {
    // this.socket.on('Receive_Message', (data: any) => {
    //   console.log('In receive message');
    //   this.messageList.push(data);
    //   console.log('List -', this.messageList);
    // });
  }

  ngOnInit() {
    console.log('In ng init');
    // You can initialize the socket connection here if not passed from parent

    // Listen for incoming messages
    this.socket.on('Receive Message', (data: any) => {
      console.log('In receive message');
      this.messageList.push(data);
      console.log('List -', this.messageList);
    });
  }

  ngAfterViewChecked() {
    // Auto-scroll to bottom
    this.scrollToBottom();
  }

  sendMessage() {
    console.log('In send msg');
    console.log('Current msg', this.currentMessage);
    if (this.currentMessage) {
      const currentTime = new Date();
      const messageData = {
        room: this.room,
        author: this.username,
        message: this.currentMessage,
        time: currentTime.getHours() + ':' + currentTime.getMinutes(),
      };
      console.log('Message Data -', messageData);
      this.socket.emit('Send Message', messageData);
      this.messageList.push(messageData);
      this.currentMessage = '';
    }
  }

  scrollToBottom(): void {
    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;
  }

  ngOnDestroy() {
    // Clean up any listeners to prevent memory leaks
    this.socket.off('Receive Message');
  }
}
