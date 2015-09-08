var Fieldset = require('./Fieldset');
var React = require('react');

var InputOption = React.createClass({
    render: function() {
        var optionID = this.props.optionInfo;

        return (
            <Fieldset id='inputOption' legend={'Option ' + optionID}>
                <div id='inputOption' className='row'>
                    <div className='column one-whole medium-one-half'>
                        <label htmlFor={'inputOptionTitle' + optionID}> Option Title
                            <input id={'inputOptionTitle' + optionID} name={'inputOptionTitle' + optionID} type='text' required ref={'inputOptionTitle' + optionID} />
                        </label>
                    </div>

                    <div className='column one-whole medium-one-half'>
                        <input id={'inputOptionSelected' + optionID} name='inputOptionSelected' type='radio' ref={'inputOptionSelected' + optionID} />
                        <label htmlFor={'inputOptionSelected' + optionID}>Selected</label>
                    </div>

                    <div className='column one-whole medium-one-half'>
                        <input id={'inputOptionDisabled' + optionID} name='inputOptionDisabled' type='checkbox' ref={'inputOptionDisabled' + optionID} />
                        <label htmlFor={'inputOptionDisabled' + optionID}>Disabled</label>
                    </div>
                </div>
            </Fieldset>
        );
    }
});

var InputOptions = React.createClass({
    getInitialState: function() {
        return {
            inputOptionsList: [<InputOption optionInfo={1} key={1} />]
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
                optionsList.push(<InputOption optionInfo={optionsList.length + 1} key={optionsList.length + 1} />);
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
        return (
            <div id='inputOptions'>
                {this.state.inputOptionsList}

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
