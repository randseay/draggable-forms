var React = require('react');

var Fieldset = React.createClass({
    render: function() {
        return (
            <fieldset>
                <legend>Something</legend>
                {this.props.children}
            </fieldset>
        );
    }
});

module.exports = Fieldset;