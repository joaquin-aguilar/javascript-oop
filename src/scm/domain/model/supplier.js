import {ValidationError} from "../../../shared/domain/model/errors.js";
import {Money} from "../../../shared/domain/model/money.js";
import {SupplierId} from "../../../shared/domain/model/supplier-id.js";

export class Supplier
{
    #id;
    #name;
    #contactEmail;
    #lastOrderTotalPrice;
    constructor({id, name, contactEmail = null, lastOrderTotalPrice = null})
    {
        if(!id instanceof SupplierId)
            throw new ValidationError("Invalid supplier id");

        this.#id = id;
        if(contactEmail !== null)
            this.changeName(name);
        this.updateEmail(contactEmail);

    }

    #isValidEmail(email)
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    changeName(newName)
    {
        if(typeof newName !== "string" || newName.length > 100)
            throw new ValidationError("Invalid name");
    }

    updateEmail(newEmail)
    {
        if(!this.#isValidEmail(newEmail))
            throw new ValidationError("Invalid email");
    }
    recordOrder(orderTotal)
    {
        if(!(orderTotal instanceof Money))
        throw new ValidationError("Order total must be a Money instance");
    }
    get id()
    {
        return this.#id;
    }

    get name()
    {
        return this.#name;
    }

    get contactEmail()
    {
        return this.#contactEmail;
    }

    get lastOrderTotalPrice()
    {
        return this.#lastOrderTotalPrice;
    }
}