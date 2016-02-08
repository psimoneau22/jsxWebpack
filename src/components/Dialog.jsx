define(["react"], function (React) {
    
    var Header = React.createClass({
        render: function(){
            return <div className="modal-header" >{this.props.children}</div>
        }
    });
    
    var Body = React.createClass({
        render: function(){
            return <div className="modal-body" >{this.props.children}</div>
        }
    });
    
    var Footer = React.createClass({
        render: function(){
            return <div className="modal-footer" >{this.props.children}</div>
        }
    });
    
    
    return React.createClass({
        statics: {
            Header: Header,
            Body: Body,
            Footer: Footer  
        },
        handleClick: function(e){
            if(this.props.isModal){
                
            }
        },
		render: function(){
			var className = "modal fade";
			var style = { display: "none", backgroundColor: "rgba(0,0,0,0.5)" };

			if(this.props.isOpen) {
				className += " in";
				style.display = "block";
			}
            
            var header = null;
            var body = null;
            var footer = null;
            React.Children.forEach(this.props.children, function(item){
                if(item.type.displayName == "Header"){
                    header = item;
                }
                if(item.type.displayName == "Body"){
                    body = item;
                }
                if(item.type.displayName == "Footer"){
                    footer = item;
                }
            });            

            return  <div className={className} style={style} onClick={this.handleClick} >
				        <div className="modal-dialog" >
                            <div className="modal-content" >
                                {header}
                                {body}
                                {footer}
                            </div>
                        </div>
                    </div>
		}
	});    
});