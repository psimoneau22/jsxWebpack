define(["require", "react", "react-addons-update", "./StartScreen", "./AddPlayers", "./PlayerAction", "./SelectWinner", "./ShowResults"], 
function(require, React, update, StartScreen, AddPlayers, PlayerAction, SelectWinner, ShowResults) {
    
    var GameStatus = require("../enums").GameStatus;
    var HandStatus = require("../enums").HandStatus;
        
    function getNextIndex(currentIndex, arr, evaluator){
        if(evaluator){
            for(var i = getNextIndex(currentIndex, arr); i != currentIndex; i = getNextIndex(i, arr)){
                if(evaluator(arr[i])){
                    return i;
                }
            }
            
            return null;
        }
        
        return (currentIndex + 1) % arr.length;
    }
    
    function getNextActivePlayerIndex(currentIndex, arr){
        return getNextIndex(currentIndex, arr, function(player){
           return !player.hasFolded; 
        });
    }
    
    return React.createClass({
    
        getInitialState: function() {
            return { 
                gameStatus: GameStatus.Start,
                handStatus: HandStatus.PreFlop,
                dealerIndex: 0,
                playerIndex: 1,                
                bettorIndex: 1,
                players: []
            };
        },      
        handleNextCard: function(){
            var newPlayers = update(this.state.players, {});
            newPlayers.forEach(function(player){
                player.handBet += player.cardBet;     
                player.cardBet = 0;
            });
            
            var newPlayerIndex = getNextActivePlayerIndex(this.state.dealerIndex, this.state.players);
            
            var updateInfo = {
                players: newPlayers,
                playerIndex: newPlayerIndex,
                bettorIndex: newPlayerIndex,
                handStatus: HandStatus.PreFlop,
                gameStatus: GameStatus.PlayerAction
            };
            
            switch(this.state.handStatus){
                case HandStatus.PreFlop:
                    updateInfo.handStatus = HandStatus.Flop;
                    break;
                case HandStatus.Flop:
                    updateInfo.handStatus = HandStatus.Turn;
                    break;
                case HandStatus.Turn:
                    updateInfo.handStatus = HandStatus.River;
                    break;
                case HandStatus.River:
                    updateInfo.gameStatus = GameStatus.SelectWinner;
                    break;
            } 
            
            this.setState(updateInfo);
        },
        handleNextHand: function(isInitial){
            var dealerIndex = isInitial ? 0 : getNextIndex(this.state.dealerIndex, this.state.players);
            var playerIndex = isInitial ? 1 : getNextIndex(this.state.dealerIndex + 1, this.state.players);
                        
            var newPlayers = update(this.state.players, {});
            newPlayers.forEach(function(player){
                var pot = this.state.players.reduce(function(prev, current){ 
                    return prev + current.handBet;
                }, 0);
                player.total += player.isWinner ? pot - player.handBet : -player.handBet;     
                player.handBet = 0;
                player.handBet += this.props.options.blind
                player.hasFolded = false;
                player.isWinner = false;
            }, this);
            
            this.setState({
                gameStatus: GameStatus.PlayerAction,
                dealerIndex: dealerIndex,
                playerIndex: playerIndex,
                bettorIndex: playerIndex,
                players: newPlayers
            });
        },
        handleWinner: function(player){
            var winnerIndex = this.state.players.findIndex(function(playerMatch){
                return player.name == playerMatch.name;
            });
            
            var updateDefinition = {};
            updateDefinition[winnerIndex] = { isWinner: { $set: true}}
            var newPlayers = update(this.state.players, updateDefinition);
            
            this.setState({players: newPlayers, gameStatus: GameStatus.ShowResults});
        },
        handlePlayerAdded: function(playerName, playerStartingScore) {            
            var newPlayers = update(this.state.players, {
                $push: [{name: playerName, handBet: 0, cardBet: 0, hasFolded: false, isWinner: false, total: playerStartingScore}]
            });
            this.setState({players: newPlayers});
        },
        handleBet: function(amount){
            var currentBet = this.state.players.reduce(function(prev, curr){                
                return curr.cardBet > prev ? curr.cardBet : prev;                
            }, 0);
            
            var updateDefinition = {};
            updateDefinition[this.state.playerIndex] = { 
                cardBet: { $set: currentBet + amount  }
            };            
            var newPlayers = update(this.state.players, updateDefinition);
            
            var playerIndex = getNextActivePlayerIndex(this.state.playerIndex, this.state.players)
            this.setState({
               players: newPlayers,
               playerIndex: playerIndex,
               bettorIndex: this.state.playerIndex
            });
        },
        handleCall: function(){
            var currentBet = this.state.players.reduce(function(prev, curr){                
                return curr.cardBet > prev ? curr.cardBet : prev;                
            }, 0);
                        
            var updateDefinition = {};
            updateDefinition[this.state.playerIndex] = { cardBet: { $set: currentBet}}
            var newPlayers = update(this.state.players, updateDefinition);
            
            this.setState({ players: newPlayers}, function(){  // set state, then once state is set, call into this to update it again
                var nextPlayerIndex = getNextActivePlayerIndex(this.state.playerIndex, this.state.players);
                if(nextPlayerIndex == this.state.bettorIndex){ 
                    this.handleNextCard();   
                }
                else { 
                    this.setState({ playerIndex: nextPlayerIndex });
                }
            });    
        },
        handleFold: function(){
            var updateDefinition = {};
            updateDefinition[this.state.playerIndex] = { hasFolded: { $set: true}}            
            var newPlayers = update(this.state.players, updateDefinition);
            
            this.setState({ players: newPlayers}, function(){  // again, needs to be in a callback because this updates state again and relies on previous state
                
                var playersRemaining = this.state.players.filter(function(player){ return !player.hasFolded});
                if(playersRemaining.length == 1){
                    this.handleWinner(playersRemaining[0]);
                    return;
                }
                
                var nextPlayerIndex = getNextActivePlayerIndex(this.state.playerIndex, this.state.players);
                if(nextPlayerIndex == this.state.bettorIndex){
                    this.handleNextCard();
                }
                else {
                    this.setState({ playerIndex: nextPlayerIndex });
                } 
            });
        },
        handleStart: function(){
            this.setState({
                gameStatus: GameStatus.AddPlayers
            });
        },
        handlePlayersComplete: function(){            
            if(this.state.players.length < 2){
                alert("Must add players");
                return;
            }
            
            this.handleNextHand(true);
        },
        render: function(){
            
            var handTotal = 0;
            var cardTotal = 0;
            this.state.players.forEach(function(player) {
                handTotal += player.cardBet + player.handBet;
                cardTotal += player.cardBet;
            }, 0);
            
            return  <div>
                        {this.state.gameStatus == GameStatus.PlayerAction ? <h3>{this.state.handStatus} - Pot: ${handTotal}.00</h3> : null}
                        {this.state.gameStatus == GameStatus.Start ? <StartScreen onStart={this.handleStart} /> : null}
                        {this.state.gameStatus == GameStatus.AddPlayers ? <AddPlayers onDone={this.handlePlayersComplete} onPlayerAdded={this.handlePlayerAdded} players={this.state.players}/> : null}
                        {this.state.gameStatus == GameStatus.PlayerAction ? <PlayerAction player={this.state.players[this.state.playerIndex]} allowCheck={cardTotal == 0} onBet={this.handleBet} onCall={this.handleCall} onFold={this.handleFold} /> : null}
                        {this.state.gameStatus == GameStatus.SelectWinner ? <SelectWinner players={this.state.players} onSelectedWinner={this.handleWinner} /> : null }
                        {this.state.gameStatus == GameStatus.ShowResults ? <ShowResults players={this.state.players} onNextHand={this.handleNextHand} /> : null }
                    </div>
        }
    });
});