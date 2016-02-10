define(["react"], function(React) {
    return React.createClass({           
        render: function(){
            return  <div className="container-fluid"> 
                        <div className="row" >
                            <div className="col-xs-8 col-xs-offset-2">
                                <button className="btn btn-lg btn-success btn-block" onClick={this.props.onStart}>Start</button>
                            </div>
                        </div>
                    </div>
        }
    });
});