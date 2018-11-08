import React from 'react';
import Touche from './Touche.js';
import './Clavier.css'

const ALPHABET = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n' ]

const Clavier = ({onClick, usedLetters}) => (
  <div className="clavier row">
    {ALPHABET.map((lettre) => <Touche lettre={lettre.toUpperCase()} onClick={onClick} usedLetters={usedLetters} />)}
  </div>
  );

export default Clavier;