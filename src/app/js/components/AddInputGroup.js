var camelize = require('../utilities/camelize');
var React = require('react');
var uuid = require('node-uuid');

var addInputGroup = React.createClass({
    handleSubmit: function(event) {
        event.preventDefault();

        var inputGroup = {
            id: uuid.v4(),
            date: new Date(),
            properties: {
                label: this.refs.inputLabel.getDOMNode().value.trim(),
                name: camelize(this.refs.inputLabel.getDOMNode().value.trim()),
                type: this.refs.inputType.getDOMNode().value.trim(),
                disabled: false,
                readonly: false,
                options: [
                    {value: 'test-1', title: 'Test 1', disabled: true, selected: true},
                    {value: 'test-2', title: 'Test 2'}
                ]
            }
        }

        this.props.handleAddInputGroup(inputGroup);
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Add an input group</legend>

                    <div className='row'>
                        <div className='column one-whole medium-one-half'>
                            <label htmlFor='inputLabel'>Label
                                <input id='inputLabel' name='inputLabel' type='text' required ref='inputLabel' />
                            </label>
                        </div>

                        <div className='column one-whole medium-one-half'>
                            <label htmlFor='inputType'>Type
                                <select id='inputName' type='text' required ref='inputType' defaultValue='text'>
                                    <option value='text'>Text</option>
                                    <option value='password'>Password</option>
                                    <option value='radio'>Radio</option>
                                    <option value='checkbox'>Checkbox</option>
                                    <option value='select'>Select</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <button type='submit'>Add to form <i className='fa fa-arrow-circle-right'></i></button>
                </fieldset>
            </form>
        );
    }
});

module.exports = addInputGroup;
