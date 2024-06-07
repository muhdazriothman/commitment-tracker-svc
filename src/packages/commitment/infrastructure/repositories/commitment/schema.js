'use strict';

/**
 * @typedef {Object} CommitmentDO
 * @property {import('mongodb').ObjectId} _id Commitment Id
 * @property {import('mongodb').ObjectId} userId User Id
 * @property {('loan payment'|'rent'|'utility'|'subscription'|'other')} type Commitment type
 * @property {string} title Commitment title
 * @property {string} description Commitment description
 * @property {string} provider Commitment provider
 * @property {('housing'|'transportation'|'food'|'utilities'|'clothing'|'medical/healthcare'|'insurance'|'savings'|'personal'|'debt'|'entertainment'|'miscellaneous')} category Commitment category
 * @property {number} amount Commitment amount 
 * @property {('daily'|'weekly'|'monthly')} frequency Commitment frequency
 * @property {Date} firstPaymentDate Commitment first payment date
 * @property {Date} lastPaymentDate Commitment last payment date
 * @property {Date} nextPaymentDate Commitment next payment date
 * @property {number} lastPaymentAmount Commitment last payment amount
 * @property {string} [notes] Commitment notes
 * @property {boolean} isCompleted Commitment completion status
 * @property {Date} createdAt Commitment creation date
 * @property {Date} updatedAt Commitment update date
 * @property {boolean} deleted True if commitment is deleted. False otherwise
 * @property {Date} deletedAt Commitment delete date
 */

module.exports = {
    type: 'object',
    required: [
        '_id',
        'propertyId',
        'type',
        'credentials',
        'name',
        'slug',
        'description',
        'priority',
        'enabled',
        'availableTools',
        'unsupportedTools',
        'enabledTools',
        'createdAt',
        'updatedAt',
        'deleted',
        'deletedAt'
    ],
    properties: {
        _id: {
            description: 'Commitment Id',
            type: 'objectId'
        },
        userId: {
            description: 'User Id',
            type: 'objectId'
        },
        type: {
            description: 'Commitment type',
            type: 'string'
        },
        title: {
            description: 'Commitment title',
            type: 'string'
        },
        description: {
            description: 'Commitment description',
            type: 'string'
        },
        provider: {
            description: 'Commitment provider',
            type: 'string'
        },
        category: {
            description: 'Commitment category',
            type: 'string'
        },
        amount: {
            description: 'Commitment amount',
            type: 'number'
        },
        frequency: {
            description: 'Commitment frequency',
            type: 'string'
        },
        firstPaymentDate: {
            description: 'Commitment first payment date',
            type: 'date-time'
        },
        lastPaymentDate: {
            description: 'Commitment last payment date',
            type: 'date-time'
        },
        nextPaymentDate: {
            description: 'Commitment next payment date',
            type: 'date-time'
        },
        lastPaymentAmount: {
            description: 'Commitment last payment amount',
            type: 'number'
        },
        notes: {
            description: 'Commitment notes',
            type: 'string'
        },
        isCompleted: {
            description: 'True if commitment is completed. False otherwise',
            type: 'boolean'
        },
        createdAt: {
            description: 'Commitment created on date',
            type: 'date-time'
        },
        updatedAt: {
            description: 'Commitment updated on date',
            type: 'date-time'
        },
        deleted: {
            description: 'True if commitment is deleted. False otherwise',
            type: 'boolean'
        },
        deletedAt: {
            description: 'Commitment deleted on date',
            oneOf: [{
                type: 'date-time'
            }, {
                const: null
            }]
        }
    }
};
