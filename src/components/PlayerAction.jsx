define(["react"], function(React) {
    return React.createClass({
        handleBet: function(){
            
        },
        render: function(){            
            return  <div>  
                        <div>{this.props.player.name}</div>     
                        <button onClick={this.props.onCall}>{this.props.allowCheck ? "Check" : "Call"}</button>
                        <button onClick={this.handleBet}>{this.props.allowCheck ? "Bet" : "Raise"}</button>
                        <button onClick={this.props.onFold}>Fold</button>
                    </div>
        }
    });
});