define(["react", "./Dialog"], function(React, Dialog) {
    return React.createClass({
        getInitialState: function(){
            return  { betDialogOpen: false }
        },
        handleBetClick: function(){
            this.setState({ betDialogOpen: true});
        },
        handleBetConfirm: function(){
            if(isNaN(this.refs.bet.value)) {
                alert("You must enter a number");
                return;
            }
            
            this.props.onBet(Number(this.refs.bet.value));
            this.closeBetDialog();
        },
        closeBetDialog: function(){
            this.refs.bet.value = null;
            this.setState({ betDialogOpen: false});            
        },
        render: function(){            
            return  <div className="container-fluid">
                        <h3>{this.props.handStatus} - Pot: ${this.props.handTotal}.00</h3>
                        <h3>{this.props.player.name}</h3>
                        <button className="btn btn-lg btn-success btn-block" onClick={this.props.onCall}>{this.props.cardTotal == 0 ? "Check" : "Call"}</button>
                        <button className="btn btn-lg btn-success btn-block" onClick={this.handleBetClick}>{this.props.cardTotal == 0 ? "Bet" : "Raise"}</button>
                        {this.props.cardTotal == 0 ? null : <button className="btn btn-lg btn-success btn-block" onClick={this.props.onFold} >Fold</button>}
                        <Dialog isOpen={this.state.betDialogOpen} onCloseRequest={this.closeBetDialog}>
                            <Dialog.Header>
                                <button type="button" className="close" onClick={this.closeBetDialog}><span className="glyphicon glyphicon-remove"></span></button>
                            </Dialog.Header>
                            <Dialog.Body>
                                <h3 className="actionHeader">Enter Bet</h3>
                                <input ref="bet" id="bet" type="number" className="form-control"/>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <button type="submit" className="btn btn-success btn-block btn-lg" onClick={this.handleBetConfirm}>Submit</button>
                            </Dialog.Footer>
                        </Dialog>
                    </div>
        }
    });
});