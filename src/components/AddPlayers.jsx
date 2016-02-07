define(["react"], function(React) {
    return React.createClass({
        
        handlePlayerAdded: function(){
            if(this.refs.playerName.value && this.refs.playerName.value.length){
                this.props.onPlayerAdded(this.refs.playerName.value, this.refs.playerScore.value);
                this.refs.playerName.focus();
                this.refs.playerName.value = null;
                this.refs.playerScore.value = null;
            }
        },
        render: function(){
                        
            return  <div> 
                        <div>Add Players</div>
                        <input type="text" ref="playerName" placeholder="name"/>
                        <input type="number" ref="playerScore" placeholder="starting score" />
                        <button onClick={this.handlePlayerAdded}>Add</button>
                        <ul>
                            {this.props.players.map(function(player){ return <li key={player.name}>{player.name} ({player.total})</li>})}
                        </ul>
                        <button onClick={this.props.onDone}>Done</button>
                    </div>
        }
    });
});