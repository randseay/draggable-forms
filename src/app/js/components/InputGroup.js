var Input = require('./inputs/TextInput');
var React = require('react');
var Select = require('./inputs/SelectInput');

var majorInputs = ['select', 'text', 'password'];
var inlineInputs = ['checkbox', 'radio'];

var InputGroup = React.createClass({
    handleAddMajorInput: function(inputGroup) {
        if (inputGroup.properties.type == 'select') {
            return (<Select inputInfo={inputGroup}></Select>);
        } else {
            return (<Input inputInfo={inputGroup} />);
        }
    },
    render: function() {
        var inputGroup = this.props.inputGroup;
        var name = inputGroup.properties.name;
        var label = inputGroup.properties.label;
        var type = inputGroup.properties.type;

        if (majorInputs.indexOf(inputGroup.properties.type) >= 0) {
            return (
                <label htmlFor={name}> {label}
                    {this.handleAddMajorInput(inputGroup)}
                </label>
            );
        } else if (inlineInputs.indexOf(inputGroup.properties.type) >= 0) {
            return (
                <div>
                    <Input inputInfo={inputGroup} />
                    <label htmlFor={name}>{label}</label>
                </div>
            );
        }
    }
});

module.exports = InputGroup;
