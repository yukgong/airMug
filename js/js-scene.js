const body = document.querySelector('body');

(() => {
    let yOffset = 0;
    let prevScrollHeight = 0;
    let currentScene = 0;
    let enterNewScene = false; // 새로운 씬이 시작되는 순간 true

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-msg.a'),
                messageB: document.querySelector('#scroll-section-0 .main-msg.b'),
                messageC: document.querySelector('#scroll-section-0 .main-msg.c'),
                messageD: document.querySelector('#scroll-section-0 .main-msg.d')
            },
            values: {
                messageA_opacity: [0, 1] // 메세지 요소의 투명도
                // messageB_opacity: [0, 1],
                // messageC_opacity: [0, 1],
                // messageD_opacity: [0, 1]

            }
        },
        {   // 1
            type: 'nomal',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            }

        },
        {   // 2
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
            }

        },
        {   // 3
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
            }

        }];

    // setLayout(); 
    function setLayout() {
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        // 최근 씬 자동으로 잡도록 설정하기 
        let totalScrollHeight = 0;
        yOffset = window.pageYOffset;

        // 씬의 갯수만큼 반복문 실행
        for (let i = 0; i < sceneInfo.length; i++) {
            // totalScrollHeight의 높이는 각 씬의 높이값을 더한 값이다.
            totalScrollHeight += sceneInfo[i].scrollHeight;

            // totalScrollHeight가 현재 스크롤 높이보다 같거나 커질 때 
            // currentScene에 반복문이 실행된 횟수를 대입하고 반복문 종료
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }

        // 바디에 currentScene 갱신 
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }


    // 0번째 씬 안에서 4개의 메세지가 스크롤 위치에 따라 나타나도록 하기 위해서는
    // 현재 씬에서 얼만큼의 비율로 스크롤 되었는지를 알 수 있어야한다.
    // @ para = values : 각 씬의 values 객체를 가져옴
    // @ para = currentYoffset : 현재 씬에서 얼마나 스크롤 됐는지 나타내는 값.
    function calcValues(values, currentYoffset) {
        let returnValue;

        // 현재 씬에서 스크롤된 범위를 비율로 구하기
        // 전체 높이를 1로 봤을 때 스크롤할때마다 비율은 0.1,0.2... 으로 계산된다.
        let scrollRatio = currentYoffset / sceneInfo[currentScene].scrollHeight;

        // 범위를 비율로 계산했다면, 
        // 각 씬의 values에 정의된 범위 안에서 비율이 계산되도록 계산한다.
        // values의 두번째 값에서 첫번째 값을 빼면,
        // ex) valuesp[0] = 200 / - values[1] = 700 -> 700 - 200 = 500 
        //     500px 범위 안에서 비율 계산을 할 수 있음.
        returnValue = scrollRatio * (values[1] - values[0]) + values[0];

        return returnValue;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs; // DOM 객체
        const values = sceneInfo[currentScene].values; // 값에 해당하는 요소
        const currentYoffset = yOffset - prevScrollHeight;

        console.log(currentScene);

        switch (currentScene) {
            case 0:
                // console.log('1 play');
                let messageA_opacity_fadeIn = calcValues(values.messageA_opacity, currentYoffset);
                objs.messageA.style.opacity = messageA_opacity_fadeIn;
                console.log(messageA_opacity_fadeIn);
                break;

            case 1:
                // console.log('2 play');
                // let messageB_opacity_fadeIn = calcValues(values.messageB_opacity, currentYoffset);
                // objs.messageB.style.opacity = messageB_opacity_fadeIn;
                break;

            case 2:
                // console.log('3 play');
                // let messageC_opacity_fadeIn = calcValues(values.messageC_opacity, currentYoffset);
                // objs.messageC.style.opacity = messageC_opacity_fadeIn;
                break;

            case 3:
                // console.log('4 play');
                // let messageD_opacity_fadeIn = calcValues(values.messageD_opacity, currentYoffset);
                // objs.messageD.style.opacity = messageD_opacity_fadeIn;
                break;
        }
    }


    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;

        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;

            // 바디에 currentScene 갱신 
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) { return; }
            // 브라우저 바운스 효과로 인해 마이너스 되는 것을 방지(모바일)

            currentScene--;

            // 바디에 currentScene 갱신 
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        // 스크롤 비율값에 음수가 나타나지 않도록 -> 오류 발생 위험을 방지하기 위해
        // 씬이 바뀌는 순간에는 애니메이션을 잠깐 멈춘다.
        if(enterNewScene) return;
        playAnimation();
    }


    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);
})();


