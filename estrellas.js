class Estrellas {
    constructor() {
        this.stars = [];
        this.startTime = millis();
        this.createStars();
        this.finished = false;
    }

    createStars() {
        let numStars = 50;

        for (let i = 0; i < numStars; i++) {
            let size = this.getRandomStarSize();
            let x = random(size / 2, width - size / 2);
            let y = random(size / 2, height - size / 2);
            let minSize = size * 0.5;
            let maxSize = size * 1.5;
            let sizeChange = random(0.2, 0.5);
            let star = {
                x: x,
                y: y,
                size: size,
                minSize: minSize,
                maxSize: maxSize,
                sizeChange: sizeChange,
                img: starImg,
            };
            this.stars.push(star);
        }
    }
    getRandomStarSize() {
        let r = random();
        let size;


        if (r < 0.6) {
            size = random(30, 50);
        } else if (r < 0.9) {
            size = random(50, 80);
        } else {
            size = random(90, 100);
        }

        return size;
    }

    show() {
        background(0);
        let elapsedTime = (millis() - this.startTime) / 1000;

        for (let i = this.stars.length - 1; i >= 0; i--) {
            let star = this.stars[i];

            star.size += star.sizeChange;
            if (star.size > star.maxSize || star.size < star.minSize) {
                star.sizeChange *= -1;
            }

            tint(255, this.getOpacity(elapsedTime));
            image(star.img, star.x, star.y, star.size, star.size);

        }

        this.checkEndCondition(elapsedTime);

    }


    getOpacity(elapsedTime) {
        return 255;
    }

    checkEndCondition(elapsedTime) {
    }
    showEndScreen() { }
}


class ModoInteractivo extends Estrellas {
    constructor() {
        super();
        this.mostrarCartelito = true;
        this.tiempoCartelito = millis();
        this.duracionCartelito = 5000;
        inicio.lowVolume();
        interaccion.play();
        interaccion.upVolume();
    }

    show() {
        super.show();
        this.handleInteraction();
        if (this.mostrarCartelito) {
            textSize(20);
            fill(255);
            textAlign(CENTER, TOP);
            text('Pasa el cursor por encima de las estrellas para tomarlas', width / 2, 20);


            if (millis() - this.tiempoCartelito > this.duracionCartelito) {
                this.mostrarCartelito = false;
            }
        }
    }

    handleInteraction() {
        for (let i = this.stars.length - 1; i >= 0; i--) {
            let star = this.stars[i];
            let d = dist(mouseX, mouseY, star.x + star.size / 2, star.y + star.size / 2);

            if (d < star.size / 2) {
                this.stars.splice(i, 1);
            }
        }
    }

    checkEndCondition() {
        if (this.stars.length == 0) {
            this.finished = true;
            estado = "pantallaPerdiste";

        }
    }
    showEndScreen() {
        setTimeout(() => {
        text("Al querer tomar todas las estrellas al mismo tiempo,\nal intentar acumular su fulgor en un solo instante,\nme he quedado sin nada.\nLa oscuridad se cierra a mi alrededor, un vacío inmenso donde antes brillaban ellas.\nY en el silencio de la noche, solo queda la sombra de lo que una vez fue la promesa de un cielo lleno de estrellas.", width / 2, height / 2);}, 8000);
        interaccion2.play();
        interaccion2.upVolume();
        inicio.lowVolume();
        interaccion2.onended();
        background(0);
    }
}


class ModoNoInteractivo extends Estrellas {
    constructor() {
        super();
        nointeraccion.play();
        nointeraccion.upVolume();
        inicio.lowVolume();
    }
    show() {
        super.show();
        noCursor();
    }
    getOpacity(elapsedTime) {
        if (elapsedTime > 5) {
            let opacity = map(elapsedTime, 5, 30, 255, 0);
            return constrain(opacity, 0, 255);
        }
        return 255;
    }

    checkEndCondition(elapsedTime) { 
        if (elapsedTime > 30) {
            this.finished = true;
            estado = "pantallaPerdiste"; 

        }
    }
    showEndScreen() {
        background(0);
        setTimeout(() => {
        text(" La oscuridad se cierra cuando, finalmente, la última estrella extingue su luz.\nEn ese instante de absoluto vacío, me encuentro sola,\ninmersa en la penumbra donde antes danzaban sus fulgores.\nLa vastedad del cielo, ahora silencioso y desolado, refleja el eco de mi propia soledad,\nun vacío que se ha apoderado de todo lo que una vez tenia para mi.", width / 2, height / 2);}, 8000);
        nointeraccion2.play();
        nointeraccion2.upVolume();
        inicio.lowVolume();
        nointeraccion2.onended();
        
        
    }
}