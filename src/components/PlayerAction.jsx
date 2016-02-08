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
                        <h3>{this.props.player.name}</h3>
                        <button className="btn btn-success btn-block" onClick={this.props.onCall}>{this.props.allowCheck ? "Check" : "Call"}</button>
                        <button className="btn btn-success btn-block" onClick={this.handleBetClick}>{this.props.allowCheck ? "Bet" : "Raise"}</button>
                        <button className="btn btn-success btn-block" onClick={this.props.onFold}>Fold</button>
                        <Dialog isOpen={this.state.betDialogOpen} onCloseRequest={this.closeBetDialog}>
                            <Dialog.Header>
                                <button type="button" className="close" onClick={this.closeBetDialog}><i className="fa fa-times"></i></button>
                            </Dialog.Header>
                            <Dialog.Body>
                                <label>Enter Bet</label>
                                <input ref="bet" type="number" />
                            </Dialog.Body>
                            <Dialog.Footer>
                                <button type="submit" className="btn btn-primary" onClick={this.handleBetConfirm}>Submit</button>
                            </Dialog.Footer>
                        </Dialog>
                    </div>
        }
    });
});