import { stopWords } from "../constants/stop-words";

// FUNCTION FOR TEXT CLEANING
export function textPreprocessor(text = "") {
  if (text?.length <= 0) {
    return;
  }

  // CONVERT TO LOWER CASE
  const lowerCasedText = text.toLocaleLowerCase();

  // REMOVING URLS IF ANY
  const urlRemovedText = lowerCasedText.replace(/(https?:\/\/[^\s]+)/g, "");

  // REMOVING NON-WORD AND NON-WHITESPACE CHARACTERS
  const whiteSpaceRemovedText = urlRemovedText.replace(/[^\w\s]/g, "");

  // TOKENIZING
  const tokenizedText = whiteSpaceRemovedText.split(/\s+/);

  // REMOVING STOP WORDS
  const removedStopWordsText = tokenizedText.filter(
    (token) => !stopWords.has(token)
  );

  // RETURNING PRE PROCESSED TEXT TOKENS
  return removedStopWordsText.join(" ");
}

// FUNCTION FOR STEMMING TEXT
export function stemTokenedText(tokens) {
  if (tokens?.length <= 0) {
    return;
  }

  // STEMMING EACH TOKEN
  const stemmedTokens = tokens.map((token) =>
    natural.PorterStemmer.stem(token)
  );

  return stemmedTokens;
}
