'use strict';

const Ajv = require('ajv').default;
const addFormats = require('ajv-formats');

const Commitment = require('../../../domain/entities/commitment');

const {
    InvalidPayloadError
} = require('../../../../common/application/exception');

class SchemaValidationError extends InvalidPayloadError {
    constructor(message) {
        super(message);
    }
}

const ajv = new Ajv();
addFormats(ajv);

const schema = {
    type: 'object',
    properties: {
        type: {
            type: 'string',
            enum: Object.values(Commitment.CommitmentType)
        },
        // userId: {
        //     type: 'string'
        // },
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        provider: {
            type: 'string'
        },
        category: {
            type: 'string',
            enum: Object.values(Commitment.CommitmentCategory)
        },
        amount: {
            type: 'number'
        },
        frequency: {
            type: 'string',
            enum: Object.values(Commitment.FrequencyType)
        },
        firstPaymentDate: {
            type: 'string',
            format: 'date-time'
        },
        lastPaymentDate: {
            type: 'string',
            format: 'date-time'
        },
        lastPaymentAmount: {
            type: 'number'
        },
        notes: {
            type: 'string'
        },
    },
    required: [
        'type',
        // 'userId',
        'title',
        'provider',
        'category',
        'amount',
        'frequency',
        'firstPaymentDate',
        'lastPaymentDate',
        'lastPaymentAmount'
    ]
};


class CreateCommitmentDTO {
    static validate = ajv.compile(schema);

    /**
     * @param {Object} data
     * @param {string} data.type
     * @param {string} data.title
     * @param {string} data.description
     * @param {string} data.provider
     * @param {string} data.category
     * @param {number} data.amount
     * @param {string} data.frequency
     * @param {string} data.firstPaymentDate
     * @param {string} data.lastPaymentDate
     * @param {number} data.lastPaymentAmount
     * @param {string} data.notes
     */
    constructor(data) {
        this.type = data.type;
        // this.userId = props.userId;
        this.title = data.title;
        this.description = data.description;
        this.provider = data.provider;
        this.category = data.category;
        this.amount = data.amount;
        this.frequency = data.frequency;
        this.firstPaymentDate = data.firstPaymentDate;
        this.lastPaymentDate = data.lastPaymentDate;
        this.lastPaymentAmount = data.lastPaymentAmount;
        this.notes = data.notes;
    }

    static create(data) {
        const valid = ajv.validate(schema, data);

        if (!valid) {
            throw new SchemaValidationError(ajv.errorsText());
        }

        return new CreateCommitmentDTO(data);
    }
}

module.exports = CreateCommitmentDTO;