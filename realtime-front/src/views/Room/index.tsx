import React, { ChangeEvent, KeyboardEvent, useEffect, useState, useRef } from 'react';
import './style.css';
import { usePathStore, useRoomStore, useUserStore } from '../../stores';
import { socket } from '../../utils/socket';
import { Message } from '../../types';
import moment from 'moment';

export default function Room() {

  const sendButtonRef = useRef<HTMLDivElement | null>(null);
  const { setPath } = usePathStore();
  const { room, setRoom } = useRoomStore();
  const { id, nickname } = useUserStore();
  const [message, setMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const onMessageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value;
    setMessage(message);
  }

  const onEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!sendButtonRef.current) return;
    sendButtonRef.current.click();
  }

  const onSendHandler = () => {
    const datetime = moment().format('YYYY-MM-DD hh:mm:ss');
    const messageObject: Message = {
      room, id, nickname, message, datetime
    }
    socket.emit('sendRoom', messageObject);
  }

  const onReceiveHandler = (messageObject: Message) => {
    const newMessageList = [...messageList];
    newMessageList.push(messageObject);
    console.log(newMessageList);
    setMessageList(newMessageList);
  }
  
  socket.on('roomReceive', onReceiveHandler);

  let effectFlag = false;

  useEffect(() => {
    if (effectFlag) return;
    effectFlag = true;

    const onConnected = () => {
      console.log(socket.id);
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    }

    socket.on('connect', onConnected);
    socket.on('disconnect', onDisconnect);

    socket.emit('join', room);
  }, []);

  return (
    <div>
      <div className='message-list-box'>
        <div className='message-title'>{`방 제목 : ${room}`}</div>
        { messageList.map((message) => (
          message.id === id ? 
            <div className='message-row-me'>
              <div className='message'>{message.message}</div>
            </div> :
            <div className='message-row-other'>
              <div className='message-box-other'>
                <div className='nickname'>{message.nickname}</div>
                <div className='message-other'>{message.message}</div>
              </div>
            </div>
        )) }
      </div>
      <div className='message-send-box'>
        <input className='message-input' value={message} onChange={onMessageChangeHandler} onKeyDown={onEnterKeyDownHandler} />
        <div ref={sendButtonRef} className='message-send-button' onClick={onSendHandler}>전송</div>
      </div>
    </div>
  )
}
