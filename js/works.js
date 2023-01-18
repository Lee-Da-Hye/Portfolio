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
            console.log(datas[0]);
            // ary = [...datas.data.movies];
            // ary = datas.data.movies;

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
        }
        function createDom(data){
            let str = `
                <div class="works-item">
                    <div><img src="${data.image}"></div>
                    <div>${data.title}</div>
                   
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