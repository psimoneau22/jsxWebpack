define(["react"], function(React){
        
    return React.createClass({
        render: function(){
            return  <div className="container-fluid">
                        <h3>Select the winner</h3>
                        {this.props.players.map(function(player){
                            if(player.hasFolded){
                                return null;
                            }
                            return <button className="btn btn-success" key={player.name} onClick={this.props.onSelectedWinner.bind(null, player)}>{player.name}</button>                            
                        }, this)}
                    </div>   
        }
    });
})