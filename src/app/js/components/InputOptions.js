var Fieldset = require('./Fieldset');
var React = require('react');

var InputOption = React.createClass({
    render: function() {
        return (
            <Fieldset id='inputOption' legend='Option 1'>
                <div id='inputOption' className='row'>
                    <div className='column one-whole medium-one-half'>
                        <label htmlFor='inputOptionTitle'> Option Title
                            <input id='inputOptionTitle' name='inputOptionTitle' type='text' required ref='inputOptionTitle' />
                        </label>
                    </div>

                    <div className='column one-whole medium-one-half'>
                        <input id='inputOptionSelected' name='inputOptionSelected' type='radio' ref='inputOptionSelected' />
                        <label htmlFor='inputOptionSelected'>Selected</label>
                    </div>

                    <div className='column one-whole medium-one-half'>
                        <input id='inputOptionDisabled' name='inputOptionDisabled' type='checkbox' ref='inputOptionDisabled' />
                        <label htmlFor='inputOptionDisabled'>Disabled</label>
                    </div>
                </div>
            </Fieldset>
        );
    }
});

var InputOptions = React.createClass({
    getInitialState: function() {
        return {
            inputOptionsList: [<InputOption />]
        }
    },
    updateOptionsList: function(list) {
        this.setState({
            inputOptionsList: list
        });
    },
    handleRepeatable: function(incOrDec) {
        console.log('Hai');
    },
    render: function() {
        return (
            <div id='inputOptions'>
                {this.state.inputOptionsList.map(function(option, i) {
                    return (
                        <InputOption key={i} ref={'option' + i} />
                    );
                }, this)}

                <a onClick={this.handleRepeatable(1)} className='button tiny secondary right repeat-control'>
                    <i className='fa fa-minus-square'></i>
                    {String.fromCharCode(160)}Remove
                </a>

                <a onClick={this.handleRepeatable(-1)} className='button tiny primary right repeat-control'>
                    <i className='fa fa-plus-square'></i>
                    {String.fromCharCode(160)}Add
                </a>
            </div>
        );
    }
});

module.exports = InputOptions;
