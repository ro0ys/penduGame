import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './HighScoreInput.css'

import { saveHOFEntry } from './HallOfFame'

class HighScoreInput extends Component {
    state = { 
        winner: '',
        winnerSaved : false,
    }

    // Arrow fx for binding
    handleWinnerUpdate = (event) => {
        this.setState({ winner: event.target.value.toUpperCase() })
    }

    // Arrow fx for binding
    persistWinner = (event) => {
        event.preventDefault();
        const newEntry = { nbTentativesRestantes: this.props.nbTentativesRestantes, player: this.state.winner };
        saveHOFEntry(newEntry, this.props.onStored);
        this.setState({winnerSaved:true});
    }

    render() {
        return (
        <form className="highScoreInput" onSubmit={this.persistWinner}>
            {this.state.winnerSaved === false ?
            <p>
            <label>
                Bravo ! <span role="img" aria-label="vainqueur">😁</span> <br />
                Entre ton prénom :
                <input 
                    autoComplete="given-name" 
                    type="text"  
                    onChange={this.handleWinnerUpdate}
                    value={this.state.winner} 
                />
            </label><br />
            <button type="submit">J’ai gagné !</button>

            </p>
            : null }
        </form>
        )
    }
}

HighScoreInput.propTypes = {
    nbTentativesRestantes: PropTypes.number.isRequired,
    onStored: PropTypes.func.isRequired,
}

export default HighScoreInput