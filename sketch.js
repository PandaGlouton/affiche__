class objet {
  constructor() {
    this.x = random(0, 600);
    this.y = random(0, 850);
    this.vitesseX = random(-1, 1);
    this.vitesseY = random(-1, 1);
    this.size = random(10, 30);
  }

  voler() {
    this.vitesseX = random(-1, 1);

    if (this.x < 0 || this.x > 800) {
      this.vitesseX = this.vitesseX * -1;
    }
    this.x = this.x + this.vitesseX;

    this.vitesseY = random(-1, 1);

    if (this.y < 0 || this.y > 400) {
      this.vitesseY = this.vitesseY * -1;
    }
    this.y = this.y + this.vitesseY;
  }

  dessiner() {
    image(rouge, this.x, this.y, this.size, this.size);
  }
}

class medium extends objet {
  constructor() {
    super();
  }

  dessiner() {
    image(jaune, this.x, this.y, this.size, this.size);
  }
}

class hard extends objet {
  constructor() {
    super();
  }

  dessiner() {
    image(blanc, this.x, this.y, this.size, this.size);
  }
}

class F1 {
  constructor() {
    this.tailleX = 25;
    this.tailleY = 25;
    this.x = 322;
    this.y = 290;
    this.vitesse = 3;
    this.image = Bas;
    this.alive = true;
  }

  dessiner() {
    if (this.alive == true) {
      image(this.image, this.x, this.y, this.tailleX, this.tailleY);
      if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
        this.image = HautGauche;
      } else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)) {
        this.image = BasGauche;
      } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)) {
        this.image = BasDroit;
      } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
        this.image = HautDroit;
      } else if (keyIsDown(LEFT_ARROW)) {
        this.image = Gauche;
      } else if (keyIsDown(UP_ARROW)) {
        this.image = Haut;
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.image = Droit;
      } else if (keyIsDown(DOWN_ARROW)) {
        this.image = Bas;
      }
      image(this.image, this.x, this.y, this.tailleX, this.tailleY);
      
    }
  }

  conduire() {
    //flèche gauche
    if (this.alive == true) {
      if (keyIsDown(LEFT_ARROW)) {
        if (this.x <= 25) {
          this.x = this.x;
        } else {
          this.x = this.x - this.vitesse;
        }
      }
      //flèche droite
      if (keyIsDown(RIGHT_ARROW)) {
        if (this.x >= 575) {
          this.x = this.x;
        } else {
          this.x = this.x + this.vitesse;
        }
      }
      //flèche haut
      if (keyIsDown(UP_ARROW)) {
        if (this.y <= 25) {
          this.y = this.y;
        } else {
          this.y = this.y - this.vitesse;
        }
      }
      //flèche bas
      if (keyIsDown(DOWN_ARROW)) {
        if (this.y >= 825) {
          this.y = this.y;
        } else {
          this.y = this.y + this.vitesse;
        }
      }
    }
  }
}

let fond;

let calque;

let pilote;

let element;

let animation;

let son;

function preload() {
  Haut = loadImage("f1Haut.png");
  Bas = loadImage("f1Bas.png");
  Droit = loadImage("f1Droit.png");
  Gauche = loadImage("f1Gauche.png");
  BasDroit = loadImage("f1BasDroit.png");
  HautDroit = loadImage("f1HautDroit.png");
  BasGauche = loadImage("f1BasGauche.png");
  HautGauche = loadImage("f1GaucheHaut.png");
  fond = loadImage("circuit_paul_ricard.png");
  calque = loadImage("circuit_paul_ricard dessus.png");
  rouge = loadImage("soft.png");
  jaune = loadImage("medium.png");
  blanc = loadImage("hard.png");
}

function setup() {
  createCanvas(600, 850);

  pilote = new F1();
  element = new objet();

  groupementR = [];
  nb = 50;

  for (let i = 0; i < nb; i = i + 1) {
    groupementR[i] = new objet();
  }

  groupementJ = [];
  nb = 50;

  for (let i = 0; i < nb; i = i + 1) {
    groupementJ[i] = new medium();
  }

  groupementB = [];
  nb = 50;

  for (let i = 0; i < nb; i = i + 1) {
    groupementB[i] = new hard();
  }

  imageMode(CENTER);
  fond.resize(600, 850);
  calque.resize(600, 850);
  
    
}

function draw() {
  image(fond, 300, 425);

  for (let i = 0; i < nb; i = i + 1) {
    groupementR[i].dessiner();
    groupementR[i].voler();
  }

  for (let i = 0; i < nb; i = i + 1) {
    groupementJ[i].dessiner();
    groupementJ[i].voler();
  }

  for (let i = 0; i < nb; i = i + 1) {
    groupementB[i].dessiner();
    groupementB[i].voler();
  }
  
  image(calque, 300, 425);

  pilote.dessiner();
  pilote.conduire();
}
