export function getStaticsName(method: string) {
    let name: string;
    switch (method) {
        case 'excludedLineCount': name = '전멸구간 개수'
            break;
        case "carryCount": name = '이월 개수'
            break;
        case "lowCount": name = '저값(1~22) 개수'
            break;
        case "sum": name = '번호 합계'
            break;
        case "oddCount": name = '홀수 개수'
            break;
        case "primeCount": name = '소수 개수'
            break;
        case "$3Count": name = '3배수 개수'
            break;
        case "sum$10": name = '첫수(십의자리) 합'
            break;
        case "diffMaxMin": name = '고저차'
            break;
        case "AC": name = 'AC'
            break;
    }
    return name;
}

export function mqInit(){
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const filterBoxContainer=document.querySelector('.filter-box-container');
    const filterBox=document.querySelector('.filter-box');
    const filterArrow = document.querySelector('.filter-arrow');
    const filterListBox = document.querySelector<HTMLElement>(".filter-list");
    
    if (mqMobile.matches) {
        //모바일 레이아웃
            mqMobileInit();
    } else {
        //데스크탑 레이아웃
       mqDeskTopInit();
    }
        mqMobile.addListener(mqFunc);
        
        let flag = false;
        
        filterBox.addEventListener("click",dropDownEvent);
        document.addEventListener('click',dropDownExceptEvent);

        function dropDownEvent(e){
                if (!flag) {
                    filterArrow.classList.remove("fa-sort-down");
                    filterArrow.classList.add("fa-sort-up");
                    filterListBox.classList.remove("none");
                } else {
                    filterArrow.classList.add("fa-sort-down");
                    filterArrow.classList.remove("fa-sort-up");
                    filterListBox.classList.add("none");
                }
                flag = !flag;
            
                e.stopPropagation();
        }

        function dropDownExceptEvent(e){
                if (flag) {
                    //target 다른 곳
                    filterListBox.classList.add("none");
                    filterArrow.classList.add("fa-sort-down");
                    filterArrow.classList.remove("fa-sort-up");
                    flag = false;
                }
        }
    
        function mqFunc(mediaQuery) {
            if (mediaQuery.matches) {
                //모바일 레이아웃
              mqMobileInit();
            } else {
              mqDeskTopInit();
            }
        }

        function mqMobileInit(){
            filterBoxContainer.classList.remove('none');
            filterBox.addEventListener("click",dropDownEvent);
            document.addEventListener('click',dropDownExceptEvent);
        }
        function mqDeskTopInit(){
            filterBoxContainer.classList.add('none');
            filterBox.removeEventListener("click",dropDownEvent);
             document.removeEventListener('click',dropDownExceptEvent);
        }
    }