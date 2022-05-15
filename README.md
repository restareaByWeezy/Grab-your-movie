# Grip Assignment!

## Grab your movie

## ✨ 주요 기능들


![ezgif-2-535d0628e3](https://user-images.githubusercontent.com/64529155/168459752-8d110e5c-d79d-419a-a62e-95f1c8d271c5.gif)


👉  첫 화면은 검색창으로 검색어를 입력하면 api call을 통해 해당하는 영화들이 10개단위로 불러와집니다.  
  
👉  상태 관리를 위해 recoil을 사용하였습니다.  
  
👉  Intersection observer를 통해 무한스크롤을 구현했습니다.  

👉  페이지 이동은 react-router-dom으로 구현하였습니다.



![ezgif-2-137abe32f4](https://user-images.githubusercontent.com/64529155/168459749-22c6be9c-2d66-4045-a67f-48941df87b36.gif)

👉  아이템을 클릭하면 모달이 나오며 즐겨찾기를 해놨던 아이템인지 판별 후에  
추가하지 않았던 아이템이라면 추가 버튼을, 추가했던 아이템이라면 삭제 버튼을 추가하였습니다.  
  
👉  즐겨찾기한 아이템들은 하단 navbar를 통해 즐겨찾기 탭으로 이동해 조회가 가능하고 아이템들은 recoil-persist를 이용해 로컬스토리지에 담아서 새로고침이 되어도 지워지지 않도록 구현했습니다.  
  
👉  React-beautiful-dnd를 이용하여 drag & drop을 구현하였습니다.  
