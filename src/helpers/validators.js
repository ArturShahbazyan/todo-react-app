export function isRequired(value) {
    return !!value ? undefined : "Field is required";
}

export function maxLength(length) {
    return function (value) {
        return value.length <= length ? undefined : `Max length of field ${length} `;
    }
}

export function minLength(length) {
    return function (value) {
        return value.length >= length ? undefined : `Min length of field ${length} `;
    }
}

export function validEmail(email) {
    let re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    if (re.test(email)) return undefined;
    return "Please enter a valid email address";
}
