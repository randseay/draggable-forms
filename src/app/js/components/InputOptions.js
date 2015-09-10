var Fieldset = require('./Fieldset');
var React = require('react');

var InputOption = React.createClass({
    handleChange: function(event) {
        this.props.option.title = this.refs.optionTitle.getDOMNode().value;
        this.props.option.selected = this.refs.optionSelected.getDOMNode().checked;
        this.props.option.disabled = this.refs.optionDisabled.getDOMNode().checked;
    },
    render: function() {
        var optionID = this.props.option.id;

        return (
            <Fieldset id='inputOption' legend={'Option ' + optionID}>
                <div id='inputOption' className='row'>
                    <div className='column one-whole medium-one-half'>
                        <label htmlFor={'optionTitle' + optionID}> Option Title
                            <input onChange={this.handleChange} id={'optionTitle' + optionID} name={'optionTitle' + optionID} type='text' required ref='optionTitle' />
                        </label>
                    </div>

                    <div className='column one-whole medium-one-half'>
                        <input onChange={this.handleChange} id={'optionSelected' + optionID} name='optionSelected' type='radio' ref='optionSelected' />
                        <label htmlFor={'optionSelected' + optionID}>Selected</label>
                    </div>

                    <div className='column one-whole medium-one-half'>
                        <input onChange={this.handleChange} id={'optionDisabled' + optionID} name='optionDisabled' type='checkbox' ref='optionDisabled' />
                        <label htmlFor={'optionDisabled' + optionID}>Disabled</label>
                    </div>
                </div>
            </Fieldset>
        );
    }
});

var InputOptions = React.createClass({
    getInitialState: function() {
        var initialOptionsList = this.props.inputOptionsList;
        var option = {id: 1, selected: false, disabled: false};
        initialOptionsList.push(option)

        return {
            inputOptionsList: initialOptionsList
        }
    },
    addOption: function() {
        this.handleRepeatable(1);
    },
    removeOption: function() {
        this.handleRepeatable(-1);
    },
    handleRepeatable: function(n) {
        var optionsList = this.state.inputOptionsList;

        if (n > 0) {
            for (var i = 1; i <= n; i++) {
                var option = {id: optionsList.length + 1, selected: false, disabled: false};
                optionsList.push(option);
            }
        } else if (n < 0 && optionsList.length >= 2) {
            for (var i = 1; i <= Math.abs(n); i++) {
                optionsList.splice(-1,1);
            }
        }
        this.setState({
            inputOptionsList: optionsList
        });
    },
    render: function() {
        var options = this.state.inputOptionsList;

        return (
            <div id='inputOptions'>
                {options.map(function(option) {
                    return <InputOption option={option} key={option.id} />
                })}

                <a onClick={this.removeOption} className='button tiny secondary right repeat-control'>
                    <i className='fa fa-minus-square'></i>
                    {String.fromCharCode(160)}Remove
                </a>

                <a onClick={this.addOption} className='button tiny primary right repeat-control'>
                    <i className='fa fa-plus-square'></i>
                    {String.fromCharCode(160)}Add
                </a>
            </div>
        );
    }
});

module.exports = InputOptions;
