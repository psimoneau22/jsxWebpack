var React = require('react');
var ReactDOM = require('react-dom');
var App = require("./components/App");
require("./../css/App.css");
ReactDOM.render(
    React.createElement(App, { options: { 
        blind: 1000
    }}),
    document.body
);