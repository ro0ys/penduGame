import React from 'react';
import './Mot.css'

const Mot = ({mot, usedLetters}) => (
           <div className = "mot">{cryptage(mot, usedLetters)}</div>
)

function cryptage(motCode, usedLetters) {
    return motCode.replace(/\w/g,
        (letter) => (usedLetters.includes(letter) ? letter : '_')
    )
}

export default Mot;