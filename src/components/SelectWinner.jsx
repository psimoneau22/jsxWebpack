define(["react"], function(React){
        
    return React.createClass({
        render: function(){
            return  <div>
                        <div>Select the winner</div>
                        {this.props.players.map(function(player){
                            if(player.hasFolded){
                                return null;
                            }
                            return <button onClick={this.props.onSelectedWinner.bind(null, player)}>{player.name}</button>                            
                        })}
                    <div>   
        }
    });
})