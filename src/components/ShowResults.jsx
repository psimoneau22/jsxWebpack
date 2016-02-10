define(["react"], function(React){
          
    return React.createClass({
        render: function(){
            
            var pot = this.props.players.reduce(function(previous, current) {
                return previous + current.handBet;
            }, 0);
            
            var playerResults = this.props.players.map(function(player){
                var handResult = player.isWinner ? pot - player.handBet : -player.handBet;
                return  <tr key={player.name}>
                            <td>{player.name}</td>
                            <td>{handResult}</td>
                            <td>{player.total + handResult}</td>
                        </tr>                            
            });
            
            return  <div>
                        <h3 className="actionHeader">Results</h3>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Last Hand</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {playerResults}       
                            </tbody>
                        </table>
                        <button className="btn btn-block btn-lg btn-success" onClick={this.props.onNextHand} >Next Hand</button>                        
                    </div>   
        }
    });
})