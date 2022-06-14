# Grab your movie!

## 배포링크

https://grab-your-movie.vercel.app/

## Dependencies

React, React-beautiful-dnd, React-router-dom, Recoil

## ✨ 주요 기능들


![ezgif-1-3cf1105161](https://user-images.githubusercontent.com/64529155/173596173-ebd6d810-45ec-4081-82e9-1677411b0bcc.gif)


* 첫 화면은 검색창으로 검색어를 입력하면 api call을 통해 해당하는 영화들이 10개단위로 불러와집니다.  
* 상태 관리를 위해 recoil을 사용하였습니다.  
* Intersection observer를 통해 무한스크롤을 구현했습니다.  
* 페이지 이동은 react-router-dom으로 구현하였습니다.
* 아이템을 클릭하면 모달이 나오며 즐겨찾기를 해놨던 아이템인지 판별 후에  
추가하지 않았던 아이템이라면 추가 버튼을, 추가했던 아이템이라면 삭제 버튼을 추가하였습니다.  
* 즐겨찾기한 아이템들은 하단 navbar를 통해 즐겨찾기 탭으로 이동해 조회가 가능하고 아이템들은 recoil-persist를 이용해 로컬스토리지에 담아서 새로고침이 되어도 지워지지 않도록 구현했습니다.  
* React-beautiful-dnd를 이용하여 drag & drop을 구현하였습니다.  
* portal을 이용해 모달을 구현하였습니다.
