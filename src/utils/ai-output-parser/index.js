export function AIOutputParser(raw_text) {
  // EXTRACT JSON FROM THE RAW STRING
  const jsonString = text.slice(
    raw_text.indexOf("{"),
    raw_text.lastIndexOf("}") + 1
  );

  // CLEANING THE EXTRACTED JSON AND CONVERT INTO PARSED JSON OBJECT
  try {
    // Remove any stray characters or malformed parts from the string
    const cleanedString = jsonString
      .replace(/[\r\n]+/g, " ") // Replace line breaks with spaces
      .replace(/([,{}])\s*/g, "$1") // Remove spaces before/after braces and commas
      .replace(/:\s+(?=[}\]])/g, ":") // Fix issues with colons before closing braces/brackets
      .trim(); // Remove leading and trailing whitespace

    // Parse the cleaned string into JSON
    returnJSON.parse(cleanedString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}
