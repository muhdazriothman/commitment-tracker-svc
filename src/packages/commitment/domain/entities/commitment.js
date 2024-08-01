'use strict';

/**
 * @typedef {Object} CommitmentProps
 * @property {string} id
 * @property {string} userId
 * @property {string} type
 * @property {string} title
 * @property {string} description
 * @property {string} provider
 * @property {string} category
 * @property {number} amount
 * @property {Frequency} frequency
 * @property {string} firstPaymentDate
 * @property {string} lastPaymentDate
 * @property {string} nextPaymentDate
 * @property {number} lastPaymentAmount
 * @property {string} notes
 * @property {boolean} reminder
 * @property {boolean} isCompleted
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {boolean} deleted
 * @property {string} deletedAt
 */

/**
 * @typedef {Object} Frequency
 * @property {string} type
 * @property {number} interval
 * @property {string} specificDay
 * @property {string} specificWeek
 */

/**
 * @typedef {(LoanPayment|Rent|Utility|Subscription|Other)} CommitmentType
 * @enum {CommitmentType}
 * @readonly
 */
const CommitmentType = {
    Loan: 'loan',
    Rent: 'rent',
    Utility: 'utility',
    Subscription: 'subscription',
    Other: 'other'
};

/**
 * @typedef {(Housing|Transportation|Food|Utilities|Clothing|MedicalHealthcare|Insurance|Savings|Personal|Debt|Entertainment|Miscellaneous)} CommitmentCategory
 * @enum {CommitmentCategory}
 * @readonly
 */
const CommitmentCategory = {
    Housing: 'housing',
    Transportation: 'transportation',
    Food: 'food',
    Utilities: 'utilities',
    Clothing: 'clothing',
    MedicalHealthcare: 'medical/healthcare',
    Insurance: 'insurance',
    Savings: 'savings',
    Personal: 'personal',
    Debt: 'debt',
    Entertainment: 'entertainment',
    Miscellaneous: 'miscellaneous',
    Vehicle: 'vehicle',
};

/**
 * @typedef {(Daily|Weekly|Monthly)} FrequencyType
 * @enum {FrequencyType}
 * @readonly
 */
const FrequencyType = {
    Daily: 'daily',
    Weekly: 'weekly',
    Monthly: 'monthly'
};

class Commitment {
    static CommitmentType = CommitmentType;
    static CommitmentCategory = CommitmentCategory;
    static FrequencyType = FrequencyType;

    /**
     * @param {CommitmentProps} props
     */
    constructor(props) {
        this.id = props.id;
        // TODO: To ennable userId when authentication is implemented
        // this.userId = props.userId;
        this.type = props.type;
        this.name = props.name;
        this.description = props.description;
        this.provider = props.provider;
        this.category = props.category;
        this.amount = props.amount;
        this.amountPaid = props.amountPaid;
        this.duration = props.duration;
        this.frequency = props.frequency; // 'daily', 'weekly', 'bi-weekly', 'monthly', 'bi-monthly', 'quarterly', 'bi-annually', 'annually'
        this.startDate = props.startDate;
        this.endDate = props.endDate;
        this.notes = props.notes;
        this.status = props.status;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deleted = props.deleted;
        this.deletedAt = props.deletedAt;
    }

    /**
     * Create a new instance of the Commitment class
     * @param {CommitmentProps} props
     * @returns {Commitment}
     */
    static create(props) {
        const now = new Date();

        return new Commitment({
            id: props.id || null,
            // TODO: To ennable userId when authentication is implemented
            // userId: props.userId,
            type: props.type,
            name: props.name,
            description: props.description,
            provider: props.provider,
            category: props.category,
            amount: props.amount,
            amountPaid: props.amountPaid,
            duration: props.duration,
            frequency: props.frequency,
            startDate: props.startDate,
            endDate: props.endDate || null,
            notes: props.notes || null,
            status: props.status || 'active',
            createdAt: props.createdAt || now,
            updatedAt: props.updatedAt || now,
            deleted: props.deleted === true,
            deletedAt: props.deletedAt || null
        });
    }
}

module.exports = Commitment;