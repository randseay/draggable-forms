var React = require('react');

var Select = React.createClass({
    render: function() {
        var select = this.props.inputInfo;

        return (
            <select id={select.properties.name} name={select.properties.name}>
            </select>
        );
    }
});

module.exports = Select;
