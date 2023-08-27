import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(4010, { transports: ['websocket', 'polling'], cors: { origin: '*' } })
export class Chat {

  @WebSocketServer()
  server: Server
  logger = new Logger();

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() room: string,
    @ConnectedSocket() socket: Socket
  ): void {
    this.logger.verbose(JSON.stringify(room));
    socket.join(room);
  }

  @SubscribeMessage('send')
  handleSend(@MessageBody() data: any): void {
    this.logger.verbose(JSON.stringify(data));
    this.server.emit('receive', data);
  }

  @SubscribeMessage('sendRoom')
  handleSendRoom(@MessageBody() data: any): void {
    const { room } = data;
    this.logger.verbose(JSON.stringify(data));
    this.server.to(room).emit('roomReceive', data);
  }

}
