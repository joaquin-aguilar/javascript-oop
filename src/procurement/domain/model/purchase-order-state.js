import {Money} from "../../../shared/domain/model/money.js";

export class PurchaseOrderState
{
    static #VALID_STATES = {
        DRAFT: "Draft",
        SUBMITTED: "Submitted",
        APPROVED: "Approved",
        SHIPPED: "Shipped",
        COMPLETED: "Completed",
        CANCELLED: "Cancelled"
    }
    #value;

    constructor(value = PurchaseOrderState.#VALID_STATES.DRAFT)
    {
        this.#validateState(value);
        this.#value = value;
    }
    #validateState(state)
    {
        if(!Object.values(PurchaseOrderState.#VALID_STATES).includes(state))
            throw new Error(`Invalid order state: ${state}`);
    }
    get value()
    {
        return this.#value;
    }
    equals(other)
    {
        return other instanceof PurchaseOrderState && this.#value === other.value;
    }
    toSubmittedFrom(currentOrderState)
    {
        if(currentOrderState.value !== PurchaseOrderState.#VALID_STATES.DRAFT)
            throw new Error(`Cannot transition from: ${currentOrderState.value} to Submitted`);
        return new PurchaseOrderState(currentOrderState.#VALID_STATES.SUBMITTED);
    }
    toApprovedFrom(currentOrderState)
    {
        if(currentOrderState.value !== PurchaseOrderState.#VALID_STATES.SUBMITTED)
            throw new Error(`Cannot transition from: ${currentOrderState.value} to Approved`);
        return new PurchaseOrderState(currentOrderState.#VALID_STATES.APPROVED);
    }
    toShippedFrom(currentOrderState)
    {
        if(currentOrderState.value !== PurchaseOrderState.#VALID_STATES.APPROVED)
            throw new Error(`Cannot transition from: ${currentOrderState.value} to Shipped`);
        return new PurchaseOrderState(currentOrderState.#VALID_STATES.SHIPPED);
    }
    toCompletedFrom(currentOrderState)
    {
        if(currentOrderState.value !== PurchaseOrderState.#VALID_STATES.SHIPPED)
            throw new Error(`Cannot transition from: ${currentOrderState.value} to Completed`);
        return new PurchaseOrderState(currentOrderState.#VALID_STATES.COMPLETED);
    }
    toCancelledFrom(currentOrderState)
    {
        if(currentOrderState.value === PurchaseOrderState.#VALID_STATES.COMPLETED)
            throw new Error(`Cannot transition from: ${currentOrderState.value} to Cancelled`);
        return new PurchaseOrderState(currentOrderState.#VALID_STATES.CANCELLED);
    }
}