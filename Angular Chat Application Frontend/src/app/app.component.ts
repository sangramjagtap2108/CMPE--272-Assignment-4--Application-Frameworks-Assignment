import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  socket = io.connect('http://localhost:3001');
  student: string = '';
  studyGroup: string = '';
  displayGroupChat: boolean = false;

  onJoinChat() {
    if (this.student && this.studyGroup) {
      this.socket.emit('Join Study Group', this.studyGroup);
      this.displayGroupChat = true;
    }
  }
}
