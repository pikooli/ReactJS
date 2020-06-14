import React from "react"
import "./Choice.css"

const alphabet = ["A",	"B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    	           "M","N","O","P","Q","R", "S","T","U","V","W","X","Y","Z"]

function Choice({onClick}){
        return (
            <div className="choice">
                { alphabet.map(
                    (letter, index) => <span className="letter" key={index} onClick={() => {onClick(letter)}}>{letter}</span>)
                }
            </div>
        )
}

export default Choice