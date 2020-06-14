import React from "react"
import Word from "./word"
import ShowGuesse from "./Guesse"
import Choice from "./Choice"

class Game extends React.Component
{
    constructor(props){
        super(props)
        this.onSubmitWord = this.onSubmitWord.bind(this)
        this.onWordChange = this.onWordChange.bind(this)
        this.onClick = this.onClick.bind(this)
        this.state = {
            tmpWord: "",
            word: "",
            guesses: [],
            numberAttend: 0,
            pickResult: "",
            guessedLetter: []
        }
    }
    onSubmitWord(event){
        event.preventDefault();
        let word = this.state.tmpWord.toString()
        let upperWord = word.toUpperCase()
        this.setState({
            word: upperWord,
            guesses: this.formateString(upperWord),
            pickResult: "",
            numberAttend: 0,
            guessedLetter: []
        })
        event.target.querySelector("input").value = ""
    }

    onWordChange(e){
        this.setState({
            tmpWord: e.target.value
        })
    }
    formateString(word){
        let words = word.split("");
        let cachedword = [];
        for(let word of words)
            cachedword.push(word === " " ? "\xa0\xa0" : "_\xa0")
        return cachedword;
    }
    setLetter(letter){
        const cache = this.state.guesses
        const word = this.state.word;
        for(let i=0; i < word.length; i++)
        {
            if (letter === word[i])
                cache[i] = letter;
        }
        return cache;
    }
    onClick(e)
    {
        let cache = this.state.guesses;
        if (this.state.guesses.length === 0 || !cache.includes("_\xa0"))
            return
        let guessedLetter = this.state.guessedLetter;
        let pickResult = "Wrong"
        if (this.state.word.includes(e))
        {
                cache = this.setLetter(e)
                if (cache.includes("_\xa0"))
                    pickResult = "Right"
                else 
                    pickResult = "You Win Congratulation"
        }
        guessedLetter.push(e)
        this.setState({
                guesses: cache,
                numberAttend: this.state.numberAttend + 1,
                pickResult: pickResult,
                guessedLetter: guessedLetter
        })
    }

    showAnswer(){
        alert(this.state.word);
    }

    render(){
     return (
         <div>
            <Word 
               onSubmitWord = {this.onSubmitWord}
               onWordChange = {this.onWordChange}
                value = {this.word}
            />
            <p>Number of attend : {this.state.numberAttend}</p>
            <button onClick={() => this.showAnswer()}>Show anwers</button>
            <ShowGuesse word={this.state.guesses}/>
            <p>{this.state.pickResult ? this.state.pickResult : <br/> }</p>
            <br/>Click on a letter : 
            <Choice onClick={this.onClick}/>
            <p>Guessed letter : </p>
            <p>{this.state.guessedLetter.map((ele) => ele + " ")}</p>
        </div>
     )
    }
}


export default Game