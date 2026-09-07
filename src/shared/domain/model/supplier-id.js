import {generateUuid, validateUuid} from "./uuid.js";
import {ProductId} from "./product-id.js";

export class SupplierId
{
    #value;
    constructor(value)
    {
        if (!value)
            throw new ValidationError(`Invalid supplier ID: ${value}`);

        this.#value = value;
        Object.freeze(this);
    }

    get value()
    {
        return this.#value;
    }

    equals(other)
    {
        return other instanceof SupplierId && this.#value === other.value;
    }

    toString()
    {
        return this.#value;
    }
    static generate()
    {
        return new SupplierId(generateUuid());
    }
}