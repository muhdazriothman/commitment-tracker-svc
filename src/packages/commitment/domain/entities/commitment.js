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
    LoanPayment: 'loan-payment',
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
    Miscellaneous: 'miscellaneous'
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
        // this.userId = props.userId;
        this.type = props.type;
        this.title = props.title;
        this.description = props.description;
        this.provider = props.provider;
        this.category = props.category;
        this.amount = props.amount;
        this.frequency = props.frequency; // 'daily', 'weekly', 'bi-weekly', 'monthly', 'bi-monthly', 'quarterly', 'bi-annually', 'annually'
        this.firstPaymentDate = props.firstPaymentDate;
        this.lastPaymentDate = props.lastPaymentDate;
        this.nextPaymentDate = props.nextPaymentDate;
        this.lastPaymentAmount = props.lastPaymentAmount;
        this.notes = props.notes;
        this.isCompleted = props.isCompleted;
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
    static createForLoanPayment(props) {
        const now = new Date();

        return new Commitment({
            id: props.id,
            // userId: props.userId,
            type: CommitmentType.LoanPayment,
            title: props.title,
            description: props.description,
            provider: props.provider,
            category: props.category,
            amount: props.amount,
            /**
             * Notes for frequency:
             * type: Specifies the type of frequency (e.g., daily, weekly, monthly).
             * interval: Represents how often the commitment occurs within the chosen frequency (e.g., every 2 weeks, every 3 months).
             * specificDay: If the frequency is weekly or monthly, this field can hold the specific day of the week (e.g., Monday, Tuesday) or day of the month (e.g., 1st, 15th).
             * specificWeek: If the frequency is monthly, this field specifies the specific week of the month the commitment occurs (e.g., first, second, last).
             */
            frequency: props.frequency,
            firstPaymentDate: props.firstPaymentDate,
            lastPaymentDate: props.lastPaymentDate || null,
            nextPaymentDate: props.nextPaymentDate,
            lastPaymentAmount: props.lastPaymentAmount || null,
            notes: props.notes,
            isCompleted: props.isCompleted === true,
            createdAt: props.createdAt || now,
            updatedAt: props.updatedAt || now,
            deleted: props.deleted === true,
            deletedAt: props.deletedAt || null
        });
    }
}

module.exports = Commitment;