import { isArray, isObject, isDate } from "util";

function deepCopy(Item) {
    if (isArray(Item)) {
        return Item.map(index => {
            return deepCopy(Item[index]);
        })
    }
    else if (isObject(Item)) {
        let newObject = {};
        Object.keys(Item).map(index => {
            newObject[index] = deepCopy(Item[index]);
        })
        return newObject;
    }
    // else if (isDate(Item)) {
    //     return new Date(Item);
    // }
    else {
        return Item;
    }
}

export { deepCopy };