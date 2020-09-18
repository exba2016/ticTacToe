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
  aleatoireMove(stat = null) {
    let x = -1, y = -1;
    let lo = this.getListJeu("ordinateur")
    let lj = this.getListJeu("joueur");
    let cpt = 0;
    while (!(x >= 0 && y >= 0 && lj[x][y] == 1 && lo[x][y] == 1)) {
      x = Math.floor((Math.random() * 3) + 0);
      y = Math.floor((Math.random() * 3) + 0);
      cpt++;


    }
    if (stat) {
      let rs = this.listJeu.filter(s => s.i == x && s.j == y)[0];
      let index = this.listJeu.indexOf(rs);
      rs.resultat = "O";
      let temp = this.listJeu;
      temp[index] = rs;
      console.log(" hello world ", this.nbMoves);
      return temp;
    } else {


      let rs = this.listJeu.filter(s => s.i == x && s.j == y)[0];
      let index = this.listJeu.indexOf(rs);
      rs.resultat = "O";
      let temp = this.listJeu;
      this.listJeu[index] = rs;
      let resultat = this.verifVictory();
      if (resultat == 0) {
        console.log("victoire ordinateur");

      } else if (resultat == 1) {
        console.log("victoire joueur");

      }
    }
    return null;

  }

  ordinateurMoves() {
    
      let mvJoueur = this.getListJeu("joueur");
      let mvOrdinateur = this.getListJeu("ordinateur");
      for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
          mvOrdinateur[i][j]=mvJoueur[i][j]*mvOrdinateur[i][j];
        }
      }
      console.log("mvOrdinateur ",mvOrdinateur);
      
      mvOrdinateur=this.isVictory(mvOrdinateur);
      console.log("prob ordinateur ", mvOrdinateur);
      let max={
        value:0,
        i:0,
        j:0
      };
      for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
          if(mvOrdinateur[i][j] >max.value){
            max.value=mvOrdinateur[i][j];
            max.i=i;
            max.j=j;
          }
        }
      }
      let rs = this.listJeu.filter(s => s.i == max.i && s.j == max.j)[0];
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
  
  isVictory(listJoueur) {

    let probabilite = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    let somme=(list)=>{
      let cpt=0;
      for(let s of list){
        cpt+=s;
      }
      return cpt;
    }
    let vecteurInvariant=(nbre_iter,MatP)=>{
      let lig=nbre_iter,col=nbre_iter;
      let Pi_O=[(Math.random() * parseFloat("1.0")) + parseFloat("0.0"),(Math.random() * parseFloat("1.0")) + parseFloat("0.0"),(Math.random() * parseFloat("1.0")) + parseFloat("0.0")];
      let somme_lig=somme(Pi_O);
      for(let i=0;i<nbre_iter;i++){
        Pi_O[i]=Pi_O[i]/somme_lig;
      }
      console.log("vecteur inv ",Pi_O);
      let X=Pi_O;
    }
    
    for(let i=0;i<3;i++){
      let diviseur=somme(listJoueur[i]);
      for(let j=0;j<3;j++){
        probabilite[i][j]=listJoueur[i][j]?listJoueur[i][j]/diviseur:0;
      }
    }
    vecteurInvariant(3,probabilite);
    return probabilite;

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
      if (this.nbMoves == 4) {
        return this.initGame();
      }

      this.ordinateurMoves();


    }
  }
}
