var React = require('react');

var Input = React.createClass({
    render: function() {
        var attrs = {};
        var inputInfo = this.props.inputInfo;

        attrs.id = inputInfo.properties.name;
        attrs.name = inputInfo.properties.name;
        attrs.type = inputInfo.properties.type;
        if (inputInfo.properties.disabled) {
            attrs['disabled'] = 'disabled';
        }
        if (inputInfo.properties.readonly) {
            attrs['readonly'] = 'readonly';
        }

        return (
            <input {...attrs} />
        );
    }
});

module.exports = Input;
