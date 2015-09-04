var InputGroup = require('./InputGroup');
var Fieldset = require('./Fieldset');
var React = require('react');

var EmptyForm = React.createClass({
    render: function() {
        return (
            <h2 className='gray-text'>
                <i className='fa fa-frown-o'></i> Your form is empty!
            </h2>
        );
    }
});

var Form = React.createClass({
    getInputGroupIDs: function(inputGroups) {
        return Object.keys(inputGroups);
    },
    getNumberOfInputGroups: function(inputGroups) {
        var numberOfInputGroups = 0;
        var inputGroup;

        this.getInputGroupIDs(inputGroups).forEach(function(inputGroupID) {
            numberOfInputGroups += parseInt(inputGroups[inputGroupID].quantity, 10);
        });

        return numberOfInputGroups;
    },
    createInputGroups: function(inputGroups) {
        return (
            this.getInputGroupIDs(inputGroups).map(function(inputGroupID) {
                return (
                    <InputGroup inputGroup={inputGroups[inputGroupID]} key={inputGroups[inputGroupID].id} />
                );
            }.bind(this)).reverse()
        );
    },
    render: function() {
        var inputGroups = this.props.inputGroups;
        var createdInputGroups = this.createInputGroups(inputGroups);

        return (
            <form>
                <Fieldset legend='Your Form'>
                    {createdInputGroups.length > 0 ? createdInputGroups : <EmptyForm />}
                </Fieldset>
                {this.props.children}
            </form>
        );
    }
});

module.exports = Form;