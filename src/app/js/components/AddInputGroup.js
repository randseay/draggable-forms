var React = require('react');
var uuid = require('node-uuid');

var addInputGroup = React.createClass({
    handleSubmit: function(event) {
        event.preventDefault();

        var inputGroup = {
            id: uuid.v4(),
            date: new Date(),
            properties: {
                name: this.refs.inputName.getDOMNode().value.trim(),
                type: this.refs.inputType.getDOMNode().value.trim(),
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
                            <label htmlFor='inputName'>Name
                                <input id='inputName' name='inputName' type='text' required ref='inputName' />
                            </label>
                        </div>

                        <div className='column one-whole medium-one-half'>
                            <label htmlFor='inputType'>Type
                                <select id='inputName' type='text' required ref='inputType' defaultValue='text'>
                                    <option value='text'>Text</option>
                                    <option value='radio'>Radio</option>
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
