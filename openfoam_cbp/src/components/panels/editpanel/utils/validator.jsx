export function isValidFloat (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

export function isValidInt (value) {
    return /^\d+$/.test(value);
}

export function isValidSignedInt (value) {
    return /^-?\d+$/.test(value);
}

export function isValidNonZero2Digit (value) {
    return /^[1-9]?[1-9]$/.test(value);
}