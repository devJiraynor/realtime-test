import React, { useRef, ChangeEvent, KeyboardEvent } from 'react';
import './style.css';
import { usePathStore, useRoomStore } from '../../stores';

export default function Enter() {

  const roomEnterRef = useRef<HTMLDivElement | null>(null);
  const { setPath } = usePathStore();
  const { room, setRoom } = useRoomStore();

  const onBackClickEvent = () => {
    setPath('/');
  }

  const onEnterClickEvent = () => {
    setPath('/room');
  }

  const onEnterKeyDownEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!roomEnterRef.current) return;
    roomEnterRef.current.click();
  }

  const onRoomChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const room = event.target.value;
    setRoom(room);
  }

  return (
    <div id='enter-wrapper'>
      <div className='enter-back-button' onClick={onBackClickEvent}>뒤로가기</div>
      <div className='enter-input-box'>
        <input className='enter-input' type='text' placeholder='방 번호를 입력하세요.' value={room} onChange={onRoomChangeEvent} onKeyDown={onEnterKeyDownEvent} />
        <div ref={roomEnterRef} className='enter-button' onClick={onEnterClickEvent}>들어가기</div>
      </div>
    </div>
  )
}
