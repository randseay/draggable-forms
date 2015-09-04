var inputTypes = require('../utilities/inputTypes');
var Input = require('./inputs/TextInput');
var React = require('react');
var Select = require('./inputs/SelectInput');

var InputGroup = React.createClass({
    handleAddMajorInput: function(inputGroup) {
        if (inputGroup.properties.type == 'dropdown') {
            return (<Select inputInfo={inputGroup} handleAddOptions={inputGroup.options}></Select>);
        } else {
            return (<Input inputInfo={inputGroup} />);
        }
    },
    render: function() {
        var inputGroup = this.props.inputGroup;
        var name = inputGroup.properties.name;
        var label = inputGroup.properties.label;
        var type = inputGroup.properties.type;

        if (inputTypes.getInputNamesByTag('major', slugs=true).indexOf(inputGroup.properties.type) >= 0) {
            return (
                <label htmlFor={name}> {label}
                    {this.handleAddMajorInput(inputGroup)}
                </label>
            );
        } else if (inputTypes.getInputNamesByTag('inline', slugs=true).indexOf(inputGroup.properties.type) >= 0) {
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
