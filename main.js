const PI2 = Math.PI * 2;
const random = (min, max) => Math.random() * (max - min + 1) + min | 0;
const timestamp = () => new Date().getTime();

class Firework {
    constructor(x, y, targetX, targetY, shade, offsprings) {
        this.dead = false;
        this.offsprings = offsprings;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.shade = shade;
        this.history = [];
        this.madeChilds = false;
        
    }
    
    update(delta, ctx, fireworks) {
        if (this.dead) return;

        let xDiff = this.targetX - this.x;
        let yDiff = this.targetY - this.y;
        if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
            this.x += xDiff * 2 * delta;
            this.y += yDiff * 2 * delta;
            
            this.history.push({ x: this.x, y: this.y });

            if (this.history.length > 20) this.history.shift();

        } else {
            if (this.offsprings && !this.madeChilds) {
                let babies = this.offsprings / 2;
                for (let i = 0; i < babies; i++) {
                    let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0;
                    let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0;

                    fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0));
                }
            }
            this.madeChilds = true;
            this.history.shift();
        }

        if (this.history.length === 0) this.dead = true;
        else if (this.offsprings) {
            for (let i = 0; i < this.history.length; i++) {
                let point = this.history[i];
                ctx.beginPath();
                ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)';
                ctx.arc(point.x, point.y, 1, 0, PI2, false);
                ctx.fill();
            }
        } else {
            ctx.beginPath();
            ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)';
            ctx.arc(this.x, this.y, 1, 0, PI2, false);
            ctx.fill();
        }
    }
}

let canvas = document.getElementById('birthday');
let ctx = canvas.getContext('2d');

let then = timestamp();

let fireworks = [];
let counter = 0;



const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

const onClick = (evt) => {
    let x = evt.clientX || evt.touches && evt.touches[0].pageX;
    let y = evt.clientY || evt.touches && evt.touches[0].pageY;

    let count = random(3, 5);
    for (let i = 0; i < count; i++) {
        fireworks.push(new Firework(
            random(0, canvas.width),
            canvas.height,
            x,
            y,
            random(0, 260),
            random(30, 110)
        ));
    }

    counter = -1;
};

const update = (delta) => {
    ctx.globalCompositeOperation = 'hard-light';
    ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'lighter';
    for (let firework of fireworks) firework.update(delta, ctx, fireworks);

    counter += delta * 3;
    if (counter >= 1) {
        fireworks.push(new Firework(
            random(0, canvas.width),
            canvas.height,
            random(0, canvas.width),
            random(0, canvas.height),
            random(0, 360),
            random(30, 110)
            
        ));
        counter = 0;
    }

    if (fireworks.length > 1000) {
        fireworks = fireworks.filter(firework => !firework.dead);
    }
    
};

const animate = () => {
    requestAnimationFrame(animate);

    let now = timestamp();
    let delta = now - then;
    then = now;
    update(delta / 1000);
    
};

// Event listeners
window.addEventListener('resize', resize);
document.addEventListener('click', onClick);
document.addEventListener('touchstart', onClick);

// Button to trigger celebration
document.getElementById('celebrateButton')?.addEventListener('click', onClick);

resize();
animate();
