import React from 'react';
import './Touche.css'

const Touche = ({lettre, onClick, usedLetters}) => (
    <div className={`touche ${renderTouche(lettre, usedLetters)}`  } onClick={() => onClick(lettre)} >
        {lettre}
    </div>
)

function renderTouche(lettre, usedLetters){
    if (usedLetters.includes(lettre)) {
        return 'used'
    }
}

export default Touche;