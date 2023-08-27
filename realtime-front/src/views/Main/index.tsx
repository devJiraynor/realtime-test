import React, { ChangeEvent } from 'react';
import './style.css';
import { usePathStore, useUserStore } from '../../stores';

//          component: Main 화면 컴포넌트          //
export default function Main() {

  //          state: 닉네임 상태 및 닉네임 상태 변경 함수          //
  const { nickname, setNickname } = useUserStore();
  //          state: Path 상태 변경 함수          //
  const { setPath } = usePathStore();

  //          event handler: 닉네임 입력 이벤트 처리 함수          //
  const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const nickname = event.target.value;
    setNickname(nickname);
  }
  //          event handler: 결정 버튼 클릭 이벤트 처리 함수          //
  const onSubmitClickHandler = () => {
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    setPath('/enter');
  }

  //          render: Main 화면 컴포넌트 렌더링          //
  return (
    <div id='main-wrapper'>
      <div className='main-container'>
        <div className='main-title-box'>
          <div className='main-title'>닉네임을 입력해주세요.</div>
        </div>
        <div className='main-input-box'>
          <input className='main-input' type='text' value={nickname} onChange={onNicknameChangeHandler} />
        </div>
        <div className='main-submit-box'>
          <div className='main-submit-button' onClick={onSubmitClickHandler}>결정</div>
        </div>
      </div>
    </div>
  )
}
