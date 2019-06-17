import React from 'react';
import SDroom  from '../components/sdroom';

// 스피드 데이팅은 검색 안 함 ^^ 랜덤매칭 예아 (여기에서 리스트 렌더링하고, 클릭해서 채팅함.)
export default class SpeedDatingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SDroom />
    );
  }
}