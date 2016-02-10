define(["react"], function(React){
        
    return React.createClass({
        render: function(){
            return  <div className="container-fluid">
                        <h3 className="actionHeader">Select the winner</h3>
                        {this.props.players.map(function(player){
                            if(player.hasFolded){
                                return null;
                            }
                            return <button className="btn btn-lg btn-success btn-block" key={player.name} onClick={this.props.onSelectedWinner.bind(null, player)}>{player.name}</button>                            
                        }, this)}
                    </div>   
        }
    });
})