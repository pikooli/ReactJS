import React from 'react'
import PropTypes from "prop-types"
import './Card.css'

const HIDDEN_SYMBOL = '❓'

const Card = ({card, feedback, index, onClick}) =>
         <div className={`card ${feedback}`}>
            <span className="symbol" onClick={() => onClick(index)}>
                {feedback === "hidden" ? HIDDEN_SYMBOL : card}
            </span>
        </div>

Card.prototype = {
    card: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'hidden',
        'justMatched',
        'justMismatched',
        'visible'
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
}

export default Card