var camelize = require('../utilities/camelize');
var inputTypes = require('../utilities/inputTypes');
var Fieldset = require('./Fieldset');
var React = require('react');
var uuid = require('node-uuid');

var InputOptions = React.createClass({
    getInitialState: function() {
        return {showOptions: false}
    },
    handleRepeatable: function() {

    },
    handleAddOptions: function() {

    },
    render: function() {
        return (
            <div id='inputOptions'>
                <Fieldset id='inputOption' legend='Option 1'>
                    <div id='inputOption' className='row'>
                        <div className='column one-whole medium-one-half'>
                            <label htmlFor='inputOptionTitle'> Option Title
                                <input id='inputOptionTitle' name='inputOptionTitle' type='text' required ref='inputOptionTitle' />
                            </label>
                        </div>

                        <div className='column one-whole medium-one-half'>
                            <input id='inputOptionSelected' name='inputOptionSelected' type='radio' required ref='inputOptionSelected' />
                            <label htmlFor='inputOptionSelected'>Selected</label>
                        </div>

                        <div className='column one-whole medium-one-half'>
                            <input id='inputOptionDisabled' name='inputOptionDisabled' type='checkbox' required ref='inputOptionDisabled' />
                            <label htmlFor='inputOptionDisabled'>Disabled</label>
                        </div>
                    </div>
                </Fieldset>
            </div>
        );
    }
});

var AddInputGroup = React.createClass({
    getInitialState: function() {
        return {showOptions: false}
    },
    handleChangeType: function(event) {
        if (event.target.value == 'dropdown') {
            console.log('test');
            return {showOptions: true}
        }
    },
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
                <Fieldset legend='Add Input Group'>
                    <div className='row'>
                        <div className='column one-whole medium-one-half'>
                            <label htmlFor='inputLabel'>Label
                                <input id='inputLabel' name='inputLabel' type='text' required ref='inputLabel' />
                            </label>
                        </div>

                        <div className='column one-whole medium-one-half'>
                            <label htmlFor='inputType'>Type
                                <select id='inputName' type='text' required ref='inputType' defaultValue='text' onChange={this.handleChangeType}>
                                    <option value='text'>Text</option>
                                    <option value='password'>Password</option>
                                    <option value='radio'>Radio</option>
                                    <option value='radioGroup'>Radio Group</option>
                                    <option value='checkbox'>Checkbox</option>
                                    <option value='checkboxGroup'>Checkbox Group</option>
                                    <option value='dropdown'>Dropdown</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    { this.state.showOptions ? <InputOptions /> : null }

                    <button type='submit'>Add to form <i className='fa fa-arrow-circle-right'></i></button>
                </Fieldset>
            </form>
        );
    }
});

module.exports = AddInputGroup;
