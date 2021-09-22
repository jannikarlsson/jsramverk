import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {}

  sendText(doc: object) {
    this.socket.emit('doc', doc);
  }

  getText() {
  return this.socket.fromEvent('doc').pipe(map((data: any) => data));
  }

  createRoom(id: string) {
    this.socket.emit("create", id);
  }
}
