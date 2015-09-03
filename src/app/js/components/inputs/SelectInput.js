var React = require('react');

var Option = React.createClass({
    render: function() {
        var attrs = {};
        var optionDetails = this.props.optionDetails;

        attrs.key = this.props.key;
        attrs.value= optionDetails.value;
        if (optionDetails.disabled) {
            attrs['disabled'] = 'disabled';
        }
        if (optionDetails.selected) {
            attrs['selected'] = 'selected';
        }

        return (
            <option {...attrs}>
                {optionDetails.title}
            </option>
        );
    }
});

var Select = React.createClass({
    handleAddOptions: function(options) {
        var optionList = [];

        for (var i = 0; i < options.length; i++) {
            optionList.push(<Option optionDetails={options[i]} key={i}/>)
        }
        return optionList;
    },
    render: function() {
        var attrs = {};
        var select = this.props.inputInfo;
        var options = select.properties.options;

        attrs.id = select.properties.name;
        attrs.name = select.properties.name;
        if (select.properties.disabled) {
            attrs['disabled'] = 'disabled';
        }

        return (
            <select {...attrs}>
                {this.handleAddOptions(options)}
            </select>
        );
    }
});

module.exports = Select;
