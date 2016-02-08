define(["react"], function(React){
    
    return React.createClass({
        shouldComponentUpdate: function(props, state){
            console.log("test");
            return true;
        },
        render: function(){
            return <li>{this.props.player.name}</li>
        }
    });
})