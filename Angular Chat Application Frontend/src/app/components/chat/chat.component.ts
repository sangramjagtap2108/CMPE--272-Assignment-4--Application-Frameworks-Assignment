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
  @Input() socket: any;
  @Input() student: string = '';
  @Input() studyGroup: string = '';

  currentMessage: string = '';
  chatList: Array<any> = [];

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor() {}

  ngOnInit() {
    this.socket.on('Receive Message', (data: any) => {
      this.chatList.push(data);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onMessageSent() {
    if (this.currentMessage !== '') {
      const currentTime = new Date();
      const messageData = {
        group: this.studyGroup,
        student: this.student,
        message: this.currentMessage,
        time: currentTime.getHours() + ':' + currentTime.getMinutes(),
      };
      this.socket.emit('Send Message', messageData);
      this.chatList.push(messageData);
      this.currentMessage = '';
    }
  }

  scrollToBottom(): void {
    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;
  }

  ngOnDestroy() {
    this.socket.off('Receive Message');
  }
}
