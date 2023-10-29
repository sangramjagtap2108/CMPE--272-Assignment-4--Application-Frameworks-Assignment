// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-root',
// //   templateUrl: './app.component.html',
// //   styleUrls: ['./app.component.css']
// // })
// // export class AppComponent {
// //   title = 'chat-app';
// // }

// import { Component } from '@angular/core';
// import * as io from 'socket.io-client';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   socket = io.connect('http://localhost:3001');
//   username: string = '';
//   room: string = '';
//   showChat: boolean = false;

//   joinRoom() {
//     if (this.username && this.room) {
//       console.log('In Join Room');
//       this.socket.emit('Join Study Group', this.room);
//       this.showChat = true;
//     }
//   }
// }

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
