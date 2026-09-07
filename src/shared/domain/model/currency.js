import {ValidationError} from "./errors.js";

/**
 * Represents a currency with a specific code (e.g., 'USD', 'EUR').
**/
export class Currency
{
    static #VALID_CODES = ['USD', 'EUR', 'GBP', 'JPY'];
    #code;
    /**
     * Creates a new Currency instance.
     * @param {string} code - The currency code (e.g., 'USD', 'EUR').
     * @throws {Error} If the provided code is not valid.
    **/
    constructor(code)
    {
        if (!Currency.#VALID_CODES.includes(code))
        {
            throw new Error(`Invalid currency code: ${code}. Must be one of: ${Currency.#VALID_CODES.join(', ')}`);
        }
        this.#code = code;
        Object.freeze(this);
    }
    /**
     * Returns the currency code.
     * @returns {string} The currency code.
    **/
    get code()
    {
        return this.#code;
    }
    /**
     * Checks if this currency is equal to another currency.
     * @param {Currency} other - The other currency to compare with.
     * @returns {boolean} True if the currencies are equal, false otherwise.
    **/
    equals(other)
    {
        return other instanceof Currency && this.#code === other.#code;
    }

    toString()
    {
        return this.#code;
    }
}