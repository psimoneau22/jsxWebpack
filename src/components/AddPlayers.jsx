define(["react"], function(React) {
    return React.createClass({
        
        handlePlayerAdded: function(){
            if(this.refs.playerName.value && this.refs.playerName.value.length && !isNaN(this.refs.playerScore.value)){
                this.props.onPlayerAdded(this.refs.playerName.value, Number(this.refs.playerScore.value));
                this.refs.playerName.focus();
                this.refs.playerName.value = null;
                this.refs.playerScore.value = null;
            }
        },
        render: function(){
                        
            return  <div className="container-fluid"> 
                        <h3 className="actionHeader">Add Players</h3>
                        <form className="form-inline">
                            <div className="form-group">
                                <input type="text" ref="playerName" placeholder="name" className="form-control"/>
                                <input type="number" ref="playerScore" placeholder="starting score" className="form-control"/>
                                <button type="button" className="btn btn-block btn-lg btn-success" onClick={this.handlePlayerAdded}>Add</button>
                            </div>
                        </form>
                        <ol>
                            {this.props.players.map(function(player){ return <li key={player.name}>{player.name} ({player.total})</li>})}
                        </ol>
                        <button className="btn btn-success btn-block btn-lg" onClick={this.props.onDone}>Done</button>
                    </div>
        }
    });
});