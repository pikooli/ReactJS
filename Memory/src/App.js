import React, { Component } from 'react'
import './App.css'
import Card from "./Card"
import GuessCount from './GuessCount'
import shuffle from 'lodash.shuffle'
import HallofFlame, {FAKE_HOF} from './HallOfFlame'
import HighScoreInput from "./HighScoreInput"

const SIDE = 6;
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750

class App extends Component {
    state = {
        cards: this.generateCards(),
        currentPair: [],
        guesses: 0,
        HallOfFame: null,
        matchedCardIndices: [],
    }
 
    getFeedbackForCard(index){
        const {currentPair, matchedCardIndices} = this.state;
        const indexMatched = matchedCardIndices.includes(index);
        
        if (currentPair.length < 2)
            return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
        if (currentPair.includes(index))
            return indexMatched ? 'justMatched' : "justMismatched"
        return indexMatched ? "visible" : "hidden"
    }

    generateCards(){
        const result = [];
        const size = SIDE  * SIDE;
        const candidates = shuffle(SYMBOLS);
        while(result.length < size){
            const card = candidates.pop();
            result.push(card, card);
        }
        return shuffle(result);
    }

    handleNewPairClosedBy(index){
        const {cards, currentPair, guesses, matchedCardIndices} = this.state

        const newPair = [currentPair[0], index]
        const newGuesses = guesses + 1
        const matched = cards[newPair[0]] === cards[newPair[1]]

        this.setState({currentPair: newPair, guesses: newGuesses})
        if (matched)
            this.setState({matchedCardIndices: [...matchedCardIndices, ...newPair]})
        setTimeout(() => this.setState({currentPair: []}), VISUAL_PAUSE_MSECS)
    }


    handleCardCick = index => {
        const {currentPair} = this.state;
        if ( currentPair.length === 2)
            return;
        if (currentPair.length === 0){
            this.setState({currentPair: [index]})
            return 
        }
        this.handleNewPairClosedBy(index)
    }

    dsplayHallOfFlame = (HallOfFame) =>{
        this.setState({HallOfFame: HallOfFame})
    } 

    render() {
        const {cards, guesses, HallOfFame ,matchedCardIndices } = this.state
        const won = matchedCardIndices.length === cards.length;
    return (
    <div className="memory">
       <GuessCount guesses={guesses}></GuessCount>
        {
            cards.map((card, index) => (
                <Card 
                    key ={index}
                    card = {card} 
                    index={index}
                    feedback = {this.getFeedbackForCard(index)}
                    onClick = {this.handleCardCick}
                    />
            ))
        }
        {won && (HallOfFame ? (<HallofFlame entries={HallOfFame}/>) : (<HighScoreInput guesses={guesses} onStored={this.dsplayHallOfFlame}/>))}
    </div>

    )
  }
}

export default App