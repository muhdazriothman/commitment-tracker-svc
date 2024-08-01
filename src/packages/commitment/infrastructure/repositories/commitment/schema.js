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
        'userId',
        'type',
        'name',
        'description',
        'provider',
        'category',
        'amount',
        'amountPaid',
        'duration',
        'frequency',
        'startDate',
        'endDate',
        'notes',
        'status',
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
            type: 'string',
            enum: ['installment', 'one-time', 'debt', 'savings']
            /**
             * Installment: Commitment that occurs on a regular basis - e.g. rent, utility bills
             * One-time: Commitment that occurs only once - e.g. buying a new phone
             * Debt: Commitment that represents a debt - e.g. credit card debt
             * Savings: Commitment that represents a saving goal - e.g. saving for a new car
             */
        },
        name: {
            description: 'Commitment name',
            type: 'string'
        },
        description: {
            description: 'Commitment description',
            type: 'string'
        },
        provider: {
            description: 'Commitment provider',
            type: 'string'
            /**
             * Represents the entity that provides the commitment - e.g. bank, utility company, landlord
             */
        },
        category: {
            description: 'Commitment category',
            type: 'string'
            /**
             * Represents the category of the commitment - e.g. housing, transportation, food, utilities, clothing, medical/healthcare, insurance, savings, personal, debt, entertainment, miscellaneous
             */
        },
        amount: {
            description: 'Commitment amount',
            type: 'number'
        },
        amountPaid: {
            description: 'Commitment amount paid',
            type: 'number'
        },
        duration: {
            description: 'Commitment duration',
            type: 'object',
            properties: {
                value: {
                    description: 'Commitment duration value',
                    type: 'number'
                },
                unitOfTime: {
                    description: 'Commitment duration unit of time',
                    type: 'string',
                    enum: ['days', 'weeks', 'months', 'years']
                },
            }
        },
        frequency: {
            description: 'Commitment frequency',
            type: 'string'
            /**
             * Represents the frequency of the commitment - e.g. daily, weekly, monthly
             * Installment: daily, weekly, monthly
             * One-time: null
             * Debt: daily, weekly, monthly
             * Savings: daily, weekly, monthly
             */
        },
        startDate: {
            description: 'Commitment first payment date',
            type: 'date-time'
        },
        endDate: {
            /**
             * Can be null depending on the commitment type
             * installment: null, will be calculated based on the duration, more convenient to calculate the end date based on the duration
             * One-time: same as start date
             * Debt: Debt end date, most of the time we don't know when the debt will be paid off, just the duration, like making a 3 year loan, in this case end date will be determined by the duration
             * Savings: null, will be calculated based on the duration, more convenient to calculate the end date based on the duration
             */
            description: 'Commitment last payment date',
            type: 'date-time'
        },
        notes: {
            description: 'Commitment notes',
            type: 'string'
        },
        status: {
            description: 'Commitment status',
            type: 'string',
            enum: ['active', 'completed', 'cancelled']
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
