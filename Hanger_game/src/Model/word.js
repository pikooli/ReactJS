import React from "react"


class Word extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            word: ""
        }
    }

    render(){
        return (
            <div>
                <form onSubmit={this.props.onSubmitWord}> 
                    <input 
                        placeholder="Word to guesses" 
                        autoFocus
                        onChange= {this.props.onWordChange}
                    ></input>
                <button onSubmit={this.props.onSubmitWord}>save</button>
                </form>
            </div>    
        )}
}

export default Word