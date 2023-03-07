// 주메뉴로 이동하는 방법 
const menuWrapBtns = document.querySelectorAll('.menu-wrap button');
menuWrapBtns.forEach(btn => btn.addEventListener('click', function (e) {
console.log(e.currentTarget.classList[0]);
const hidden = document.querySelectorAll('.content-wrap>div');
const menuWrap = document.querySelector('.menu-wrap');
console.log(hidden);
const header = document.querySelector('.header');
menuWrap.classList.add('hidden');
header.classList.remove('hidden');

hidden.forEach(hi => {
    if (hi.classList.contains(e.currentTarget.classList[0])) {
        hi.classList.remove('hidden');
    } else {
        hi.classList.add('hidden');
    }
})
}))

// 콘텐츠를 보여주고 주메뉴로 가는 방법 
const goPrevPage = document.querySelector('.goPrevPage');
goPrevPage.addEventListener('click', function () {
    const hidden = document.querySelectorAll('.content-wrap>div');
    const menutWrap = document.querySelector('.menu-wrap');
    console.log(hidden);
    const header = document.querySelector('.header');
    menutWrap.classList.remove('hidden');
    header.classList.add('hidden');

    hidden.forEach(hi => {
        hi.classList.add('hidden');
    })
    
})
//버튼 누를 시 새로고침
function refreshPage(){
    window.location.reload();
}