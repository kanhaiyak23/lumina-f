function formatString(input) {
    return input
        .split("_") // Split the string into an array by underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(" "); // Join the words back together with a space
}

export default formatString;
