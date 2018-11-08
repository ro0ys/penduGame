import React, { Component } from 'react';
import Clavier from './Clavier.js';
import Mot from './Mot.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import HighScoreInput from './HighScoreInput.js';
import HallOfFame from './HallOfFame.js';

const MOTS = [
    "Je veux bien la note maximale", 
    "Bon courage", 
    "Sois gentil", 
    "Hello", 
    "Anticonstitutionnellement", 
    "Bonjour", 
    "Le jeu du pendu", 
    "Nounours", 
    "Champion", 
    "Amour", 
    "Force et honneur",
    "Bravo",]

const JOUEURS = [{nom:"Joueur1 🤪", couleur: "EcranBleu"}, {nom: "Joueur2 🙍", couleur: "EcranRose"}]

class App extends Component {

  constructor(){
    super();
    this.state = this.initJeu();
  }

  initJeu () {
    return  {
        motCode : MOTS[Math.floor(Math.random() * MOTS.length)].toUpperCase(),
        usedLetters : [],
        nbTentativesRestantes : 6,
        hallOfFame: null,
        joueurCourant : JOUEURS[Math.floor(Math.random() * JOUEURS.length)],
    };
  }

  clickTouche = lettre => {
    const {usedLetters, motCode, nbTentativesRestantes, joueurCourant} = this.state;
    if (!motCode.includes(lettre) && !usedLetters.includes(lettre)) {
        this.setState(
          {nbTentativesRestantes : nbTentativesRestantes - 1,
          joueurCourant: joueurCourant === JOUEURS[0] ? JOUEURS[1] : JOUEURS[0]}
      );
    }

    if (!usedLetters.includes(lettre)) {
        usedLetters.push(lettre);
        this.setState(usedLetters);
    }
  }

  // Arrow fx for binding
  displayHallOfFame = hallOfFame => {
    this.setState({ hallOfFame })
  }
    
  render() {
    const {motCode, usedLetters, nbTentativesRestantes, hallOfFame, joueurCourant} = this.state;
    var lettresMotCode = Array.from(new Set(motCode)).filter(character => character !== " " );
    var nbLettresTrouvees = usedLetters.filter(letter => lettresMotCode.includes(letter)).length;
    const won = (nbLettresTrouvees === lettresMotCode.length ? true : false);
    const loose = nbTentativesRestantes === 0 ;
    return (
      <div className="App">
        <div className="container">
        <br />{joueurCourant.nom}, à toi de jouer !!
          <div className={joueurCourant.couleur}>
            <Mot mot={motCode} usedLetters={usedLetters} />
            <span>Tentatives restantes: {nbTentativesRestantes}</span>
          </div>
          {won || loose ? 
            <div>
                {hallOfFame ? <HallOfFame entries={hallOfFame}/> : null }
                {won ? <HighScoreInput nbTentativesRestantes = {nbTentativesRestantes} onStored={this.displayHallOfFame} /> : null }
                {loose ? <div>Perdu... <span role="img" aria-label="peur">😨</span> le mot à trouver était "{this.state.motCode}" <br />
                mais tu peux retenter ta chance <span role="img" aria-label="bisou">😘</span></div> : null }
                <button type="button" onClick={() => this.setState(this.initJeu())}>Relancer ?</button>
            </div> 
          : <Clavier onClick={this.clickTouche} usedLetters={usedLetters} /> }
        </div>
      </div>
    );
  }
}

export default App;
