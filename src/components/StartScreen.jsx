define(["react"], function(React) {
    return React.createClass({           
        render: function(){
            return  <div> 
                        <div>Begin Game</div>
                        <button onClick={this.props.onStart}>Start</button>
                    </div>
        }
    });
});