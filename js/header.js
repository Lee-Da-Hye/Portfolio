
    let doc = document.documentElement;
    let w = window;
  

    //초기 스크롤 위치를 계산하고 변수 prevScroll에 할당
    let prevScroll = w.scrollY || doc.scrollTop;
    let curScroll;
    //값 0으로 변수 방향을 시작
    let direction = 0;
    let prevDirection = 0;
  
    const header = document.getElementById('header');
    
    //함수 checkScroll()
    let checkScroll = function() {
  
      /*
      ** Find the direction of scroll
      ** 0 - initial, 1 - up, 2 - down
      */
    
      //현재 스크롤 위치를 확인하고 변수 curScroll에 저장
      curScroll = w.scrollY || doc.scrollTop;
      
      //이전 스크롤 위치와 비교하여 해당 값을 확인하여 사용자가 위 또는 아래로 스크롤했는지 확인, 변수 방향에 값을 할당
      if (curScroll > prevScroll) { 
        //이전 스크롤이 현재 스크롤보다 크면 헤더 안보이기
        direction = 2;
      }
      else if (curScroll < prevScroll) { 
        //이전 스크롤이 현재 스크롤보다 작으면 헤더 보이기
        direction = 1;
      }
  
      if (direction !== prevDirection) {
        toggleHeader(direction, curScroll);
      }
      
      prevScroll = curScroll;
    };
    //더 나은 성능을 위해 스크롤 방향이 변경된 경우에만 헤더의 가시성을 전환
    //현재 방향을 이전 방향과 비교하고 그에 따라 toggleHeader 함수를 호출
    
    //함수 toggleHeader()
    //방향과 스크롤 양을 파라미터로 받음.
    let toggleHeader = function(direction, curScroll) {

    //방향이 아래쪽이고 스크롤 양이 52px(헤더 높이)보다 클 때 클래스 숨기기를 추가
    if (direction === 2 && curScroll > 52) { 
        
        //replace 52 with the height of your header in px
  
        header.classList.add('hide');
        prevDirection = direction;
      }
      //그렇지 않으면 클래스 숨기기를 제거
      else if (direction === 1) {
        header.classList.remove('hide');
        prevDirection = direction;
      }
    };
    
    window.addEventListener('scroll', checkScroll);
  




