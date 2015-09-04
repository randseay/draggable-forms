var camelize = require('../utilities/camelize');
var InputOptions = require('./InputOptions');
var inputTypes = require('../utilities/inputTypes');
var Fieldset = require('./Fieldset');
var React = require('react');
var uuid = require('node-uuid');

var AddInputGroup = React.createClass({
    getInitialState: function() {
        return {
            showOptions: false,
            inputOptionsList: []
        }
    },
    updateOptions: function(list) {
        this.setState({
            inputOptionsList: list
        });
    },
    handleChangeType: function(event) {
        if (event.target.value == 'dropdown') {
            this.setState({showOptions: true});
        } else {
            this.setState({showOptions: false});
        }
    },
    handleSubmit: function(event) {
        event.preventDefault();
        console.log(this.inputOptionsList);

        var inputGroup = {
            id: uuid.v4(),
            date: new Date(),
            properties: {
                label: this.refs.inputLabel.getDOMNode().value.trim(),
                name: camelize(this.refs.inputLabel.getDOMNode().value.trim()),
                type: this.refs.inputType.getDOMNode().value.trim(),
                disabled: false,
                readonly: false,
                options: this.state.inputOptionsList
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

                    { this.state.showOptions ? <InputOptions handleAddInputOptions={this.updateOptions} /> : null }

                    <button type='submit'>Add to form <i className='fa fa-arrow-circle-right'></i></button>
                </Fieldset>
            </form>
        );
    }
});

module.exports = AddInputGroup;
