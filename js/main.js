(() => {
    let yOffset = 0; // window.pageYOffset 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 '섹션'들의 높이값의 합.
    let currentScene = 0; // 현재 활성화된 섹션 = 현재 스크롤에 걸린 섹션이 무엇이냐?

    const sceneInfo = [{
            //0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            obj: {
                container: document.querySelector('#scroll-section-0')
            }
        },
        {
            //1
            type: 'nomal',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            obj: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            //2
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            obj: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            //3
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            obj: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() {
        //각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            //sceneInfo의 i번째의 스크롤 높이는 타겟의 heightNum과 사용자의 OS의 내장 높이값의 곱이다.
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].obj.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        console.log('prevScrollHeight : ' + prevScrollHeight);
        console.log('currentScene SH : ' + sceneInfo[currentScene].scrollHeight);
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
        }
        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) { return; }
            currentScene--;
        }
        console.log(currentScene);
    }

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    setLayout();
})();