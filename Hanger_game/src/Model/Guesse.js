import React from "react"


const  ShowGuesse = ({word}) =>
{
    let formatedword = word.join('')
    return (
        <p>
           {word.length ? "Try to guesse this word:" : null}
           {word.length ? <br/> : null}
           {word.length ? formatedword : null}
        </p>
        )
}

export default ShowGuesse