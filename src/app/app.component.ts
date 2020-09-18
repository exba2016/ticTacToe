import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ticTocToe';

  listJeu = [
  ];
  listScore = [0, 0];
  nbMoves = 0;

  constructor() {

  }

  ngOnInit(): void {
    this.initGame();
  }
  /**
   * Cette methode initialise le jeu
   */
  initGame() {
    this.nbMoves = 0;
    this.listJeu = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {

        this.listJeu.push({
          resultat: " ",
          i: i,
          j: j
        });



      }
    }
  }
  joueurMoves() {
    let listJoueur = this.getListJeu("joueur");
    let rs = listJoueur.filter((x, y) => x[y] == 0);
    if (rs) {
      return this.isVictory(this.getListJeu("joueur"));
    }
    return null;
  }
  

  ordinateurMoves() {

    let mvJoueur = this.getListJeu("joueur");
    let mvOrdinateur = this.getListJeu("ordinateur");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        mvOrdinateur[i][j] = mvJoueur[i][j] * mvOrdinateur[i][j];
      }
    }
    console.log("mvOrdinateur ", mvOrdinateur);

    let resultatProb = this.successProbabilite();
    let xy = {
      x: -1,
      y: -1
    };
    do {
      let max = [{
        pourcentage: resultatProb.horizontal.pourcentage,
        ligne: resultatProb.horizontal.ligne,
        col: -1,
        is: "horizontal"
      }];
      let maxEnd = {
        pourcentage: 0,
        ligne: -1,
        col: -1,
        is: ""
      };
      if (resultatProb.vertical.pourcentage > max[0].pourcentage && !max.includes({
        pourcentage: resultatProb.vertical.pourcentage,
        ligne: -1,
        col: resultatProb.vertical.col,
        is: "vertical"
      })) {
        max = [{
          pourcentage: resultatProb.vertical.pourcentage,
          ligne: -1,
          col: resultatProb.vertical.col,
          is: "vertical"
        }];
      } else if (resultatProb.vertical.pourcentage >= max[0].pourcentage && !max.includes({
        pourcentage: resultatProb.vertical.pourcentage,
        ligne: -1,
        col: resultatProb.vertical.col,
        is: "vertical"
      })) {
        max.push({
          pourcentage: resultatProb.vertical.pourcentage,
          ligne: -1,
          col: resultatProb.vertical.col,
          is: "vertical"
        });
      }
      if (resultatProb.diagonal.pourcentage > max[0].pourcentage && !max.includes({
        pourcentage: resultatProb.diagonal.pourcentage,
        ligne: -1,
        col: -1,
        is: "diagonal"
      })) {
        max = [{
          pourcentage: resultatProb.diagonal.pourcentage,
          ligne: -1,
          col: -1,
          is: "diagonal"
        }];
      } else if (resultatProb.diagonal.pourcentage >= max[0].pourcentage && !max.includes({
        pourcentage: resultatProb.diagonal.pourcentage,
        ligne: -1,
        col: -1,
        is: "diagonal"
      })) {
        max.push({
          pourcentage: resultatProb.diagonal.pourcentage,
          ligne: -1,
          col: -1,
          is: "diagonal"
        });
      }

      if (resultatProb.diagonalInverse.pourcentage > max[0].pourcentage && !max.includes({
        pourcentage: resultatProb.diagonalInverse.pourcentage,
        ligne: -1,
        col: -1,
        is: "diagonalInverse"
      })) {
        max = [{
          pourcentage: resultatProb.diagonalInverse.pourcentage,
          ligne: -1,
          col: -1,
          is: "diagonalInverse"
        }];
      } else if (resultatProb.diagonalInverse.pourcentage >= max[0].pourcentage && !max.includes({
        pourcentage: resultatProb.diagonalInverse.pourcentage,
        ligne: -1,
        col: -1,
        is: "diagonalInverse"
      })) {
        max.push({
          pourcentage: resultatProb.diagonal.pourcentage,
          ligne: -1,
          col: -1,
          is: "diagonalInverse"
        });
      }


      if (max.length > 1) {
        let choix = Math.floor((Math.random() * max.length) + 0);
        maxEnd = max[choix];
      } else {
        maxEnd = max[0];
      }
      console.log("max ", max);
      console.log("maxEND ", maxEnd);

      if (maxEnd.is == "horizontal") {
        let y = -1;
        do {
          y = Math.floor((Math.random() * 3) + 0);
          if (mvOrdinateur[maxEnd.ligne][y] == 0) {
            y = -1;
          }
        } while (y == -1);
        xy.x = maxEnd.ligne;
        xy.y = y;

      } else if (maxEnd.is == "vertical") {
        let x = -1;
        do {
          x = Math.floor((Math.random() * 3) + 0);
          if (mvOrdinateur[x][maxEnd.col] == 0) {
            x = -1;
          }
        } while (x == -1);
        xy.x = x;
        xy.y = maxEnd.col;

      } else if (maxEnd.is == "diagonal") {
        let y = -1;
        do {
          y = Math.floor((Math.random() * 3) + 0);
          if (mvOrdinateur[y][y] == 0) {
            y = -1;
          }
        } while (y == -1);
        xy.x = y;
        xy.y = y;

      } else {
        let y = -1;
        do {
          y = Math.floor((Math.random() * 3) + 0);
          if (mvOrdinateur[y][2 - y] == 0) {
            y = -1;
          }
        } while (y == -1);
        xy.x = y;
        xy.y = 2 - y;
        console.log("xy ", xy);


      }


    } while (!(xy.x >= 0 && xy.y >= 0));

    let rs = this.listJeu.filter(s => s.i == xy.x && s.j == xy.y)[0];
    let index = this.listJeu.indexOf(rs);
    rs.resultat = "O";
    this.listJeu[index] = rs;
    let resultat = this.verifVictory();
    if (resultat == 0) {
      console.log("victoire ordinateur");

    } else if (resultat == 1) {
      console.log("victoire joueur");

    }
  }

  successProbabilite() {
    let probabilite = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "]
    ];
    for (let s of this.listJeu) {
      probabilite[s.i][s.j] = s.resultat;
    }
    console.log("before init ", probabilite);


    let probGame = (rs) => {
      let prob = {
        horizontal: [{
          value: {
            joueur: 0,
            ordinateur: 0
          },
          occurence: [0, 0],
          exclude: 0
        },
        {
          value: {
            joueur: 0,
            ordinateur: 0
          },
          occurence: [0, 0],
          exclude: 0
        },
        {
          value: {
            joueur: 0,
            ordinateur: 0
          },
          occurence: [0, 0],
          exclude: 0
        }],
        vertical: [{
          value: {
            joueur: 0,
            ordinateur: 0
          },
          occurence: [0, 0],
          exclude: 0
        }, {
          value: {
            joueur: 0,
            ordinateur: 0
          },
          occurence: [0, 0],
          exclude: 0
        }, {
          value: {
            joueur: 0,
            ordinateur: 0
          },
          occurence: [0, 0],
          exclude: 0
        }],
        diagonal: {
          value: {
            joueur: 0,
            ordinateur: 0
          },
          occurence: [0, 0],
          exclude: 0
        },
        diagonalInverse: {
          value: {
            joueur: 0,
            ordinateur: 0
          },
          occurence: [0, 0],
          exclude: 0
        }
      };

      //Success
      for (let i = 0; i < 3; i++) {
        //diagonal
        if (rs[i][i] == "X") {
          prob.diagonal.value.joueur += 1 / 3;
          prob.diagonal.occurence[0]++;
          prob.diagonal.exclude++;
          if (prob.diagonal.occurence[0] == 2) {
            prob.diagonal.value.joueur += 1 / 3;
          }
        } else
          if (rs[i][i] == "O") {
            prob.diagonal.value.ordinateur += 1 / 3;
            prob.diagonal.occurence[1]++;
            prob.diagonal.exclude++;
            if (prob.diagonal.occurence[1] == 2) {
              prob.diagonal.value.ordinateur += 1 / 3;
            }
            if (prob.diagonal.value.joueur > 0) {
              prob.diagonal.value.ordinateur -= 1 / 3;
            }
          }
        for (let j = 0; j < 3; j++) {
          //horizontal

          if (rs[i][j] == "X") {
            prob.horizontal[i].value.joueur += 1 / 3;
            prob.horizontal[i].occurence[0]++;
            prob.horizontal[i].exclude++;
            if (prob.horizontal[i].occurence[0] == 2) {
              prob.horizontal[i].value.joueur += 1 / 3;
            }
          } else
            if (rs[i][j] == "O") {
              prob.horizontal[i].value.ordinateur += 1 / 3;
              prob.horizontal[i].occurence[1]++;
              prob.horizontal[i].exclude++;
              if (prob.horizontal[i].occurence[1] == 2) {
                prob.horizontal[i].value.ordinateur += 1 / 3;
              }
              if (prob.horizontal[i].value.joueur > 0) {
                prob.horizontal[i].value.ordinateur -= 1 / 3;
              }
            }
          //vertical
          console.log("diag xy ", j, i);
          if (rs[j][i] == "X") {
            prob.vertical[i].value.joueur += 1 / 3;
            prob.vertical[i].occurence[0]++;
            prob.vertical[i].exclude++;
            if (prob.vertical[i].occurence[0] == 2) {
              prob.vertical[i].value.joueur += 1 / 3;
            }
          } else
            if (rs[j][i] == "O") {
              prob.vertical[i].value.ordinateur += 1 / 3;
              prob.vertical[i].occurence[1]++;
              prob.vertical[i].exclude++;
              if (prob.vertical[i].occurence[1] == 2) {
                prob.vertical[i].value.ordinateur += 1 / 3;
              }
              if (prob.vertical[i].value.joueur > 0) {
                prob.vertical[i].value.ordinateur -= 1 / 3;
              }
            }
        }
      }
      let v = 0;
      //diagonal inverse
      for (let i = 2; i >= 0; i--) {


        if (rs[v][i] == "X") {

          prob.diagonalInverse.value.joueur += 1 / 3;
          prob.diagonalInverse.occurence[0]++;
          prob.diagonalInverse.exclude++;
          if (prob.diagonalInverse.occurence[0] == 2) {
            prob.diagonalInverse.value.joueur += 1 / 3;
          }
        } else
          if (rs[v][i] == "O") {
            prob.diagonalInverse.value.ordinateur += 1 / 3;
            prob.diagonalInverse.occurence[1]++;
            prob.diagonalInverse.exclude++;
            if (prob.diagonalInverse.occurence[1] == 2) {
              prob.diagonalInverse.value.ordinateur += 1 / 3;
            }
            if (prob.diagonalInverse.value.joueur > 0) {
              prob.diagonalInverse.value.ordinateur -= 1 / 3;
            }
          }
        v++;
      }
      console.log("init ", prob);

      //Max
      let maxH = {
        pourcentage: 0,
        ligne: -1
      }, maxV = {
        pourcentage: 0,
        col: -1
      }, maxD = 0, maxDI = 0;
      let cpt = 0;
      for (let s of prob.horizontal) {
        if ((s.value.ordinateur + s.value.joueur) > maxH.pourcentage && s.exclude != 3) {
          maxH.pourcentage = s.value.ordinateur + s.value.joueur;
          maxH.ligne = cpt;
        }
        cpt++;
      }
      cpt = 0;
      for (let s of prob.vertical) {
        if ((s.value.ordinateur + s.value.joueur) > maxV.pourcentage && s.exclude != 3) {
          maxV.pourcentage = s.value.ordinateur + s.value.joueur;
          maxV.col = cpt;
        }
        cpt++;
      }



      return {
        horizontal: maxH,
        vertical: maxV,
        diagonal: { pourcentage: prob.diagonal.exclude == 3 ? 0 : (prob.diagonal.value.joueur + prob.diagonal.value.ordinateur) },
        diagonalInverse: { pourcentage: prob.diagonalInverse.exclude == 3 ? 0 : (prob.diagonalInverse.value.joueur + prob.diagonalInverse.value.ordinateur) }
      };
    }

    let resultatProb = probGame(probabilite);
    console.log("probabilité ", resultatProb);
    return resultatProb;

  }
  isVictory(listJoueur) {

    let probabilite = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    let somme = (list) => {
      let cpt = 0;
      for (let s of list) {
        cpt += s;
      }
      return cpt;
    }
    let vecteurInvariant = (nbre_iter, MatP) => {
      console.log("chaine de markov ", MatP);
      let lig = nbre_iter, col = nbre_iter;
      let Pi_O = [(Math.random() * parseFloat("1.0")) + parseFloat("0.0"), (Math.random() * parseFloat("1.0")) + parseFloat("0.0"), (Math.random() * parseFloat("1.0")) + parseFloat("0.0")];
      let somme_lig = somme(Pi_O);
      for (let i = 0; i < nbre_iter; i++) {
        Pi_O[i] = Pi_O[i] / somme_lig;
      }
      let multiplieur = (m, m2) => {
        let s = 0, rs = [0, 0, 0];
        for (let i = 0; i < nbre_iter; i++) {
          s = 0;
          for (let j = 0; j < nbre_iter; j++) {
            s += m[i] * m2[j][i];
          }
          rs[i] = s;
        }
        return rs;
      }
      let X = Pi_O;
      for (let i = 0; i < nbre_iter; i++) {
        X = multiplieur(X, MatP);
      }
      console.log("vecteur inv ", X);
      return X;
    }

    for (let i = 0; i < 3; i++) {
      let diviseur = somme(listJoueur[i]);
      for (let j = 0; j < 3; j++) {
        probabilite[i][j] = listJoueur[i][j] ? listJoueur[i][j] / diviseur : 0;
      }
    }
    let rs = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    for (let i = 0; i < 3; i++) {
      rs[i] = vecteurInvariant(3, probabilite);
    }
    return rs;

  }
  /**
   * Cette methode verifie s'il y'a un gagnant
   */
  verifVictory() {
    //cette variable contient la matrice de jeu du joueur
    let listJoueur = this.getListJeu("joueur");
    //cette variable contient la matrice de jeu de l'ordinateur
    let listOrdi = this.getListJeu("ordinateur");
    //cette variable contient les victoires diagonal
    let victoireDiagonal = [0, 0];


    for (let i = 0; i < 3; i++) {
      //cette variable contient les victoires horizontal
      let victoireHorizontal = [0, 0];
      //cette variable contient les victoires vertical
      let victoireVertical = [0, 0];
      //je teste la diagonal pour voir s'il y'a un jeu
      if (listJoueur[i][i] == 0) {
        victoireDiagonal[1]++;
      } else if (listOrdi[i][i] == 0) {
        victoireDiagonal[0]++;
      }
      for (let j = 0; j < 3; j++) {
        //je teste l'horizontal pour voir s'il y'a un jeu
        if (listJoueur[i][j] == 0) {
          victoireHorizontal[1]++;
        } else if (listOrdi[i][j] == 0) {
          victoireHorizontal[0]++;
        }
        //je teste la vertical pour voir s'il y'a un jeu
        if (listJoueur[j][i] == 0) {
          victoireVertical[1]++;
        } else if (listOrdi[j][i] == 0) {
          victoireVertical[0]++;
        }


      }
      //je verifie s'il ya alignement de 3 coups
      if (victoireHorizontal[0] == 3) {
        this.listScore[0]++;
        //je redemarre le jeu
        this.initGame();
        return 0;
      } else if (victoireHorizontal[1] == 3) {
        this.listScore[1]++;
        //je redemarre le jeu
        this.initGame();
        return 1;
      }
      //je verifie s'il ya alignement de 3 coups
      if (victoireVertical[0] == 3) {
        this.listScore[0]++;
        //je redemarre le jeu
        this.initGame();
        return 0;
      } else if (victoireVertical[1] == 3) {
        this.listScore[1]++;
        //je redemarre le jeu
        this.initGame();
        return 1;
      }



    }
    //je verifie s'il ya alignement de 3 coups
    if (victoireDiagonal[0] == 3) {
      this.listScore[0]++;
      //je redemarre le jeu
      this.initGame();
      return 0;
    } else if (victoireDiagonal[1] == 3) {
      this.listScore[1]++;
      //je redemarre le jeu
      this.initGame();
      return 1;
    }

    //Je verifie la diagonal inverse
    victoireDiagonal = [0, 0];
    let v = 0;
    for (let i = 2; i >= 0; i--) {
      //je teste la diagonal pour voir s'il y'a un jeu
      if (listJoueur[i][v] == 0) {
        victoireDiagonal[1]++;
      } else if (listOrdi[i][v] == 0) {
        victoireDiagonal[0]++;
      }
      v++;
    }
    //je verifie s'il ya alignement de 3 coups
    if (victoireDiagonal[0] == 3) {
      this.listScore[0]++;
      //je redemarre le jeu
      this.initGame();
      return 0;
    } else if (victoireDiagonal[1] == 3) {
      this.listScore[1]++;
      //je redemarre le jeu
      this.initGame();
      return 1;
    }
    return -1;

  }
  /**
   * Cette methode crée la matrice pour un joueur
   */
  getListJeu(s, list = null) {
    if (list) {
      let rs = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ];
      for (let l of list) {
        if (s == "ordinateur") {
          if (l.resultat == "O") {
            rs[l.i][l.j] = 0;
          } else if (l.resultat == " ") {
            rs[l.i][l.j] = 1;
          }
        } else {
          if (l.resultat == "X") {
            rs[l.i][l.j] = 0;
          } else if (l.resultat == " ") {
            rs[l.i][l.j] = 1;
          }
        }

      }

      return rs;
    } else {
      let rs = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ];
      for (let l of this.listJeu) {
        if (s == "ordinateur") {
          if (l.resultat == "O") {
            rs[l.i][l.j] = 0;
          } else if (l.resultat == " ") {
            rs[l.i][l.j] = 1;
          }
        } else {
          if (l.resultat == "X") {
            rs[l.i][l.j] = 0;
          } else if (l.resultat == " ") {
            rs[l.i][l.j] = 1;
          }
        }

      }

      return rs;
    }

  }

  ClickJoueur(rs) {


    if (rs.resultat == " ") {
      let index = this.listJeu.indexOf(rs);
      rs.resultat = "X";
      this.listJeu[index] = rs;
      console.log("Position dans la list joueur ", this.getListJeu("joueur"));
      this.nbMoves++;
      console.log("\n\n");

      let resultat = this.verifVictory();
      if (resultat == 0) {
        console.log("victoire ordinateur");

      } else if (resultat == 1) {
        console.log("victoire joueur");

      }
      let cpt=0;
      for(let s of this.listJeu){
        if(s.resultat=="X" || s.resultat=="O"){
          cpt++;
        }
      }
      console.log("cpt end game ",cpt);
      
      if (cpt >= 8) {
        return this.initGame();
      }

      this.ordinateurMoves();


    }
  }
}
