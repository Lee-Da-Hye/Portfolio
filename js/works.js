        let ary = [];
        let pagePerCount = 2;
        let pagers;
        let currentPage; 
        let startIndex;
        let endIndex; 

        let  pagenation = document.querySelector('.pagenation');
        let  lists;
        async function  loadDatas(){
            const response = await fetch('../data/data.json');
            const datas = await response.json(); 


            for( let a = 0 ; a < datas.length ; a++){
                const newData = { myId:a, ...datas[a] }
                ary.push(newData);
                console.log( newData );
            }
            console.log( ary.length );

            calculator();
            pagenationHandle(); 
            activeHandle(1); // 맨처음 오류
            repeatDom();   
        }
        loadDatas();

        function calculator(){
            pagers = Math.ceil(ary.length / pagePerCount); 
            startIndex = (currentPage - 1) * pagePerCount;
            endIndex =  currentPage * pagePerCount; 
        }
        
        function pagenationHandle(){
            pagenation.innerHTML = '';
            for(let a = 1;  a<= pagers ; a++){
                let li = document.createElement('li');
                li.classList.add('list');
                li.innerHTML = a; 
                //console.log( li );
                if( currentPage === a) li.classList.add('active');
                li.addEventListener('click', currentPageHandle );
                pagenation.appendChild(li);
            }
            lists = document.querySelectorAll('.list');
        }  

        function currentPageHandle(){
            console.log(this.innerHTML);
            //1
            activeHandle( this.innerHTML );
        }

        function activeHandle(num){
            //if( currentPage === 0  ) prev.style.display = "none";
            //if( currentPage > 0 ) prev.style.display = "block";
            // 보임 숨김을 이용해서 오류 발생 차단

            lists.forEach( list=> list.classList.remove('active'));

            console.log(lists);
            lists[num - 1].classList.add('active');

            currentPage = Number(num);
            startIndex = (currentPage - 1) * pagePerCount;
            endIndex =  currentPage * pagePerCount;
            repeatDom(); 
        }

        const worksContent = document.querySelector('.works .works-contents');
        repeatDom(); 
        function repeatDom(){
            const viewDiv = ary.slice(startIndex, endIndex);
           // console.log( viewTr );
           worksContent.innerHTML = '';
            let str = '';
            for( div of viewDiv ){
                str += createDom( div );
            }
            worksContent.innerHTML = str; 

            
            let worksItembtns = document.querySelectorAll('.works-item button');
            let worksModal = document.querySelectorAll('.works-md');
            //worksItembtns.forEach(()=>{
                    const ModalDel = document.querySelectorAll('.close');
                    for( let a = 0; a < worksItembtns.length ; a++){
                        //console.log( worksItembtns[a] , a ) ;
                        worksItembtns[a].addEventListener('click', function(){
                            console.log(a);
                            worksModal.forEach(function(worksModal, idx ){
                                if( idx == a ){
                                    worksModal.classList.remove('hidden');
                                }else{
                                    for( let a = 0; a < ModalDel.length ; a++){
                                    ModalDel[a].addEventListener('click', function(){
                                        this.parentNode.classList.add('hidden');
                                    });
                                }
                                }
                            })
                        })
                    }
           // })
        }
        function createDom(data){
            let str = `
                <div class="works-item">
                    <div>
                        <button>
                            <img src="${data.image}">
                        </button>
                    </div>
                    <h3>${data.title}</h3>
                </div>
                <div class="works-md hidden">
                            <button class="close">
                                <i class='bx bx-x-circle'></i>
                            </button>
                        <div class="md_overlay"></div>
                        <div class="md_contents">
                            <h1>${data.title}</h1>

                            <div class="md_text">
                                <p><img src="${data.image}" alt="" /></p>
                                <p><span>제작 기간</span><br>
                                ${data.timeframe}</p>
                                <p><span>프로젝트 소개</span><br>
                                 ${data.projectIntro}</p>
                                <p><span>링크</span><br> <a href="${data.link}">${data.link}</a></p>
                                <p><span>Git</span><br> <a href="${data.git}">${data.git}</a></p>
                            </div>
                            
                            
                        </div>
                </div>
            `
            return str; 
        }

        next.addEventListener('click', function(){
            if( currentPage === pagers) return; 
            currentPage++;
            activeHandle(currentPage);
        })

        prev.addEventListener('click', function(){
            if( currentPage > 0 ) {
                currentPage--;
                activeHandle(currentPage);
            }
        })

        