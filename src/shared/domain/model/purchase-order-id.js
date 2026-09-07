import {validateUuid} from "./uuid.js";
import {ProductId} from "./product-id.js";
export class PurchaseOrderId
{
    #value;
    constructor(value)
    {
        if (!validateUuid(value))
            throw new Error(`Invalid product ID: ${value}`);

        this.#value = value;
        Object.freeze(this);
    }

    get value()
    {
        return this.#value;
    }

    equals(other)
    {
        return other instanceof ProductId && this.#value === other.value;
    }

    toString()
    {
        return this.#value;
    }
}