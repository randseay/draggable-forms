'use strict';

var camelize = require('./camelize');

module.exports = {
    allInputs: [
        {
            name: 'Checkbox',
            tags: ['inline']
        },
        {
            name: 'Checkbox Group',
            tags: ['major', 'children']
        },
        {
            name: 'Password',
            tags: ['major']
        },
        {
            name: 'Radio',
            tags: ['inline']
        },
        {
            name: 'Radio Group',
            tags: ['major', 'children']
        },
        {
            name: 'Dropdown',
            tags: ['major', 'children']
        },
        {
            name: 'Text',
            tags: ['major']
        }
    ],
    getInputsByTag: function(tag) {
        var inputs = [];

        this.allInputs.map(function(input) {
            if (input.tags.indexOf(tag) >= 0) {
                inputs.push(input);
            }
        });
        return inputs;
    },
    getInputNamesByTag: function(tag, slugs) {
        slugs = slugs || false
        var inputs = [];

        this.getInputsByTag(tag).map(function(input) {
            inputs.push(slugs ? camelize(input.name) : input.name);
        });
        return inputs;
    }
};
