// utils/generator.js

// Function to generate a random number within a range
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random string of characters
function randomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Function to generate a username using initials and a random number
function generateUsername(firstName, lastName) {
    const initials = (firstName.charAt(0) + lastName.charAt(0)).toLowerCase();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${initials}${randomNumber}`;
}

// Function to generate a password using a passphrase
function generatePassword() {
    const words = ['apple', 'banana', 'cherry', 'dog', 'elephant', 'frog', 'giraffe', 'horse'];
    const separator = '-';
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(separator) + randomNumber(10, 99);
}

module.exports = {
    randomNumber,
    randomString,
    generateUsername,
    generatePassword
};
