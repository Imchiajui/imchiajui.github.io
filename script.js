const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100; // 粒子數量

// 粒子類別
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1; // 粒子大小 1px 到 6px
        this.speedX = Math.random() * 3 - 1.5; // X軸速度 -1.5 到 1.5
        this.speedY = Math.random() * 3 - 1.5; // Y軸速度 -1.5 到 1.5
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`; // 主要為藍色調的粒子
    }

    // 更新粒子位置
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // 邊界檢測，讓粒子在畫布內反彈
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.speedY = -this.speedY;
        }
    }

    // 繪製粒子
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 初始化粒子
function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
init();

// 連接粒子形成線條
function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = Math.sqrt(
                (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) +
                (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y)
            );

            if (distance < 100) { // 如果粒子間距離小於100px，則連接它們
                opacityValue = 1 - (distance / 100);
                ctx.strokeStyle = `rgba(100, 150, 255, ${opacityValue})`; // 淺藍色線條，帶透明度
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}


// 動畫循環
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles(); // 連接粒子
    requestAnimationFrame(animate); // 遞迴調用，創建動畫循環
}
animate();

// 響應視窗大小變化
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // 重新初始化粒子，以適應新的畫布大小
});
