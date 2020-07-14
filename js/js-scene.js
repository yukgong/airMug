const body = document.querySelector('body');

(() => {
    let yOffset = 0;
    let prevScrollHeight = 0;
    let currentScene = 0;
    let enterNewScene = false; // 새로운 씬이 시작되는 순간 true

    const sceneInfo = [{
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-msg.a'),
                messageB: document.querySelector('#scroll-section-0 .main-msg.b'),
                messageC: document.querySelector('#scroll-section-0 .main-msg.c'),
                messageD: document.querySelector('#scroll-section-0 .main-msg.d'),
                canvas: document.querySelector("#video-canvas-0"),
                context: document.querySelector("#video-canvas-0").getContext("2d"),
                videoImages: []
            },
            values: {
                // 캔버스 요소 값
                videoImageCount: 300,
                imageSequence: [0, 299],
                canvas_opacity: [1, 0, { start: 0.9, end: 1 }],

                // 메세지 요소의 투명도     //애니메이션이 시작되고 끝나는 구간 -> 씬의 전체 높이를 1로 봤을때, 해당 비율이라는 뜻.
                messageA_opacity_fadeIn: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_fadeIn: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_fadeIn: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_fadeIn: [0, 1, { start: 0.7, end: 0.8 }],

                messageA_opacity_fadeOut: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_fadeOut: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_fadeOut: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_fadeOut: [1, 0, { start: 0.85, end: 0.9 }],

                messageA_translateY_fadeIn: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_fadeIn: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_fadeIn: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_fadeIn: [20, 0, { start: 0.7, end: 0.8 }],

                messageA_translateY_fadeOut: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_fadeOut: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_fadeOut: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_fadeOut: [0, -20, { start: 0.85, end: 0.9 }],

            }
        },
        { // 1
            type: 'normal',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            }

        },
        { // 2
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
                messageB: document.querySelector('#scroll-section-2 .b'),
                messageC: document.querySelector('#scroll-section-2 .c'),
                pinB: document.querySelector("#scroll-section-2 .b .pin"),
                pinC: document.querySelector("#scroll-section-2 .c .pin"),
                canvas: document.querySelector("#video-canvas-2"),
                context: document.querySelector("#video-canvas-2").getContext("2d"),
                videoImages: []
            },
            values: {
                // 캔버스 요소 값
                videoImageCount: 960,
                imageSequence: [0, 959],
                canvas_opacity_fadeIn: [0, 1, { start: 0, end: 0.1 }],
                canvas_opacity_fadeOut: [1, 0, { start: 0.95, end: 1 }],

                messageA_opacity_fadeIn: [0, 1, { start: 0.15, end: 0.2 }],
                messageB_opacity_fadeIn: [0, 1, { start: 0.6, end: 0.65 }],
                messageC_opacity_fadeIn: [0, 1, { start: 0.87, end: 0.92 }],

                messageA_opacity_fadeOut: [1, 0, { start: 0.4, end: 0.45 }],
                messageB_opacity_fadeOut: [1, 0, { start: 0.68, end: 0.73 }],
                messageC_opacity_fadeOut: [1, 0, { start: 0.95, end: 1 }],

                messageA_translateY_fadeIn: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_translateY_fadeIn: [20, 0, { start: 0.6, end: 0.65 }],
                messageC_translateY_fadeIn: [20, 0, { start: 0.87, end: 0.92 }],

                messageA_translateY_fadeOut: [0, -20, { start: 0.4, end: 0.45 }],
                messageB_translateY_fadeOut: [0, -20, { start: 0.68, end: 0.73 }],
                messageC_translateY_fadeOut: [0, -20, { start: 0.95, end: 1 }],

                pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
                pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }],

            }

        },
        { // 3
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
            }

        }
    ];

    function setCanvasImages() {
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
            let imgElem = new Image();
            imgElem.src = `../airMug/video/001/IMG_${6726 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }

        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
            let imgElem2 = new Image();
            imgElem2.src = `../airMug/video/002/IMG_${7027 + i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }
        console.log(sceneInfo[0].objs.videoImages);
    }
    setCanvasImages();

    // setLayout(); 
    function setLayout() {
        for (let i = 0; i < sceneInfo.length; i++) {
            // sticky 와 normal 타입의 레이아웃 차이를 준다.
            if (sceneInfo[i].type === "sticky") {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
                sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
            } else if (sceneInfo[i].type === "normal") {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
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

        const heightRation = window.innerHeight / 1080;
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRation})`;
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRation})`;

    }


    // 현재 씬에서 얼만큼의 비율로 스크롤 되었는지를 알 수 있도록 하는 함수
    // @ para = values : 각 씬의 values 객체를 가져옴
    // @ para = currentYoffset : 현재 씬에서 얼마나 스크롤 됐는지 나타내는 값.
    function calcValues(values, currentYoffset) {
        let returnValue;

        // 현재 씬에서 스크롤된 범위를 비율로 구하기
        // 전체 높이를 1로 봤을 때 스크롤할때마다 비율은 0.1,0.2... 으로 계산된다.
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYoffset / scrollHeight;

        if (values.length === 3) {
            //start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYoffset >= partScrollStart && currentYoffset <= partScrollEnd) {
                returnValue = (currentYoffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0]

            } else if (currentYoffset < partScrollStart) {
                returnValue = values[0];
            } else if (currentYoffset > partScrollEnd) {
                returnValue = values[1];
            }
        } else {
            // 각 씬의 values에 정의된 범위 안에서 비율이 계산되도록 계산한다.
            returnValue = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return returnValue;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs; // DOM 객체
        const values = sceneInfo[currentScene].values; // 값에 해당하는 요소
        const currentYoffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight // 현재 씬의 scrollHeight
        const scrollRatio = currentYoffset / scrollHeight; // 현재씬의 현재 스크롤 비율

        switch (currentScene) {
            case 0:
                // 비디오 캔버스 처리하기 
                let sequence = Math.round(calcValues(values.imageSequence, currentYoffset));
                objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYoffset);

                if (scrollRatio <= 0.22) {
                    //in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_fadeIn, currentYoffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_fadeIn, currentYoffset)}%)`;
                } else {
                    //out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_fadeOut, currentYoffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_fadeOut, currentYoffset)}%)`;
                }
                if (scrollRatio <= 0.42) {
                    //in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_fadeIn, currentYoffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_fadeIn, currentYoffset)}%)`;
                } else {
                    //out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_fadeOut, currentYoffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_fadeOut, currentYoffset)}%)`;
                }
                if (scrollRatio <= 0.62) {
                    //in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_fadeIn, currentYoffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_fadeIn, currentYoffset)}%)`;
                } else {
                    //out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_fadeOut, currentYoffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_fadeOut, currentYoffset)}%)`;
                }
                if (scrollRatio <= 0.93) {
                    //in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_fadeIn, currentYoffset);
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translateY_fadeIn, currentYoffset)}%)`;
                } else {
                    //out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_fadeOut, currentYoffset);
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translateY_fadeOut, currentYoffset)}%)`;
                }
                break;

            case 2:
                // 비디오 캔버스 처리하기 
                let sequence2 = Math.round(calcValues(values.imageSequence, currentYoffset));
                objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

                if (scrollRatio <= 0.32) {
                    //in
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_fadeIn, currentYoffset);
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_fadeIn, currentYoffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_fadeIn, currentYoffset)}%, 0)`;
                } else {
                    //out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_fadeOut, currentYoffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_fadeOut, currentYoffset)}%, 0)`;
                }
                if (scrollRatio <= 0.67) {
                    //in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_fadeIn, currentYoffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_fadeIn, currentYoffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYoffset)}%)`;
                } else {
                    //out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_fadeOut, currentYoffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_fadeOut, currentYoffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYoffset)}%)`;
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_fadeOut, currentYoffset);
                }
                if (scrollRatio <= 0.93) {
                    //in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_fadeIn, currentYoffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_fadeIn, currentYoffset)}%, 0)`;
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYoffset)}%)`;
                } else {
                    //out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_fadeOut, currentYoffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_fadeOut, currentYoffset)}%, 0)`;
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYoffset)}%)`;
                }
                break;

            case 3:

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
        if (enterNewScene) return;
        playAnimation();
    }


    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    window.addEventListener('load', () => {
        setLayout();
        //문서가 로드될 때 바로 캔버스에 이미지가 그려지도록 조정
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    });
    window.addEventListener('resize', setLayout);
})();