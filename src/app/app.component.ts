import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ticTocToe';

  listJeu = [
  ];
  listScore = [0, 0];
  constructor() {


  }
  ngOnInit(): void {
    this.initGame();
  }
  /**
   * Cette methode initialise le jeu
   */
  initGame() {
    this.listJeu=[];
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
    let v=0;
    for(let i=2;i>=0;i--){
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
  getListJeu(s) {
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

  ClickJoueur(rs) {
   

    if (rs.resultat == " ") {
      let index = this.listJeu.indexOf(rs);
      rs.resultat = "X";
      this.listJeu[index] = rs;
      console.log("Position dans la list joueur ", this.getListJeu("joueur"));
      let resultat =this.verifVictory();
      if(resultat==0){
        console.log("victoire ordinateur");
        
      }else if(resultat==1){
        console.log("victoire joueur");
        
      }
    }
  }
}
