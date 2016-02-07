define(["react"], function(React){
        
    return React.createClass({
        render: function(){
            
            var pot = this.state.players.reduce(function(previous, current) {
                return previous + current.value;
            }, 0);
            
            var playerResults = this.props.players.map(function(player){
                var handResult = player.isWinner ? pot : -player.value;
                return  <tr>
                            <td>{player.name}</td>
                            <td>{handResult}</td>
                            <td>{player.total + handResult}</td>
                        </tr>                            
            });
            
            return  <div>
                        <div>Results</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Last Hand</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playerResults}       
                            </body>
                        </table>
                        <button onClick={this.props.onNextHand} >Next Hand</button>                        
                    <div>   
        }
    });
})