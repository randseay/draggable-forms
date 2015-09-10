var AddInputGroup = require('./AddInputGroup');
var DragDropContext = require('react-dnd').DragDropContext;
var Form = require('./Form');
var HTML5Backend = require('react-dnd/modules/backends/HTML5');
var React = require('react');

var FormBuilder = React.createClass({
    getInitialState: function () {
        return {
            form: {}
        };
    },
    updateForm: function (list) {
        this.setState({
            list: list
        });
    },
    updateInputGroupList: function (inputGroup) {
        var list = this.state.form;
        list[inputGroup.id] = inputGroup;

        this.updateForm(list);
    },
    render: function() {
        var inputGroups = this.state.form;

        return (
            <div className='row'>
                <div className='column one-whole medium-one-half'>
                    <AddInputGroup handleAddInputGroup={this.updateInputGroupList} inputOptionsList={[]} />
                </div>

                <div className='column one-whole medium-one-half'>
                    <Form inputGroups={inputGroups} />
                </div>
            </div>
        );
    }
});

module.exports = DragDropContext(HTML5Backend)(FormBuilder);
