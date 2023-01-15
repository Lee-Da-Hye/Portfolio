window.addEventListener("load", function(){
    const elSendBtn = document.getElementById("btnSend");
    elSendBtn.addEventListener("click", function(){
        const elForm = document. getElementById("fContact");
        let formData = new FormData(elForm);
        
        //필수 입력 체크
        if(!formData.get("writer")){
            //피드백..
           
            return;
        }
        let email = formData.get("email");
        if(!email){
            //피드백..
            return;
        }
        if(!formData.get("content")){
            //피드백..
           
            return;
        }
        //이메일이 올바른지 체크(정규표현식으로 체크)
        let regexp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
        if(!email.match(regexp)) {
            //피드백(이메일 주소가 바르지 않음.)
            return;
        }
        //서버에 전송
        let promise = fetch("/mypogal/_process/index.php", { 
            method: "POST",
            body: formData
        });
        promise.then(response => response.text()).then(msg => {
            if(msg == "OK"){
                //접수가 완료했을 때의 피드백
                location.href = "/?sub=contact-ok";
            } else {
                //접수가 처리되지 않음에 대한 피드백
                location.href = "/?sub=contact-failure";
            }

        });
    });
       
     });