var React = require('react');

var Input = React.createClass({
    render: function() {
        var input = this.props.inputInfo;

        return (
            <input id={input.properties.name} name={input.properties.name} type={input.properties.type} />
        );
    }
});

module.exports = Input;
