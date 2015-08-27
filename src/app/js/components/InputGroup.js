var Input = require('./Input');
var React = require('react');

var InputGroup = React.createClass({
    handleAddInput: function(inputGroup) {
        var name = inputGroup.properties.name;

        return (
            <label htmlFor={name}> {name}
                <Input inputInfo={inputGroup} />
            </label>
        );
    },
    render: function() {
        var inputGroup = this.props.inputGroup;

        return (
            <div>
                {this.handleAddInput(inputGroup)}
            </div>
        );
    }
});

module.exports = InputGroup;
