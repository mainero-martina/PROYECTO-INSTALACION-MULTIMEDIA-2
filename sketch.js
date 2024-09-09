let estado = "primerPantalla";
let estrellas;
let message = '"deseo” proviene del latín “desiderium”,\ndel verbo “desiderare” (desear)\n(cf. compuesto por el prefijo “de-” y la palabra “sidus, sideris”,\n“estrella, constelación”\n\nSi no estás seguro de cuál debería ser tu próximo paso no vale la pena elegir porque si,\nno es útil tomar decisiones apresuradas.\nReflexiona sobre lo que ya conoces y pregúntate qué información te falta.\nRevisa lo que ya has aprendido y haz conexiones.\nmantén los ojos abiertos a todo lo que te rodea y no dejes de lado ningún aspecto.\n\nSu vida depende de ti, decides tomar accion o quedarte expectante?';
let modeSelected = false;
let starImg;
let backSound;
let inicio, interaccion, interaccion2, nointeraccion, nointeraccion2;
let button1, button2;
let estrellasTitilantes = [];
let numEstrellasTitilantes = 50;

function preload() {
  starImg = loadImage('./assets/angel1.png');
  backSound = loadSound('./assets/audio-2.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  estrellas = new Estrellas();
  
  backSound.onended(showMainMenu);
  createButtons(); 
  inicio = new AudioElement('./assets/auudioo.mp3');
  interaccion = new AudioElement('./assets/interaccion-2.mp3');
  interaccion2 = new AudioElement('./assets/interaccion-final-2.mp3');
  nointeraccion = new AudioElement('./assets/nointeraccion-2.mp3');
  nointeraccion2 = new AudioElement('./assets/nointeraccion-final-2.mp3');
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function keyPressed() {
  if (key === 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
    resizeCanvas(windowWidth, windowHeight);
  }
}
function draw() {
  inicio.play();
  if (estado === "primerPantalla") {
    primerPantalla();
  } else if (estado === "pantallaInicial") {
    mostrarPantallaInicial(); 
  }else if (estado === "pantallaSeleccionModo") {
    showMainMenu();
  } else if ("modoSeleccionado" && modeSelected) {
    estrellas.show();
  }
  if (estrellas.finished) {
    estrellas.showEndScreen();
  }
}
function primerPantalla(){
  background(0);
  fill(255); 
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Presiona A para empezar", width / 2, height / 2);
  button1.hide();
  button2.hide();
}
function mostrarPantallaInicial() {
  if (estrellasTitilantes.length === 0) {
    for (let i = 0; i < numEstrellasTitilantes; i++) {
      let size = random(35, 90);
      let minSize = size * 0.2;
      let maxSize = size * 1;
      let sizeChange = random(0.1, 0.4);
      let x = random(size / 2, width - size / 2);
      let y = random(size / 2, height - size / 2);
      estrellasTitilantes.push({ x, y, size, minSize, maxSize, sizeChange });
    }
  }
 
  background(0);
  button1.hide();
  button2.hide();

  for (let i = 0; i < estrellasTitilantes.length; i++) {
    let estrella = estrellasTitilantes[i];
    image(starImg, estrella.x, estrella.y, estrella.size, estrella.size);


    estrella.size += estrella.sizeChange;
    if (estrella.size > estrella.maxSize || estrella.size < estrella.minSize) {
      estrella.sizeChange *= -1;
    }
  }
}
function showMainMenu() {
  estado = "pantallaSeleccionModo";
  button1.show();
  button2.show();
  background(0);
  fill(255);
  textSize(24); 
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
} 
function createButtons() {
  button1 = createButton("Tratar de modificar su destino");
  button1.addClass("custom-button");
  button1.position(width / 2 -150, height / 2 + 300);
  button1.size(150, 100);
  button1.mousePressed(() => selectMode(true));

  button2 = createButton("No modificar su destino");
  button2.addClass("custom-button");
  button2.position(width / 2 + 50, height / 2 + 300); 
  button2.size(150, 100);
  button2.mousePressed(() => selectMode(false));
}
function selectMode(interactive) {
  if (interactive) {
    estrellas = new ModoInteractivo();
  } else {
    estrellas = new ModoNoInteractivo();
  }
  estrellas.startTime = millis();
  modeSelected = true;
  button1.hide();
  button2.hide();
  estado = "modoSeleccionado";
}
function mousePressed (){
  if (estado === "primerPantalla") {
    backSound.play();
    estado = "pantallaInicial"; // Cambia al siguiente estado cuando se presiona A
  }
}