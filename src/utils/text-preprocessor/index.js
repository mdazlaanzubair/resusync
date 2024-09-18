import { stopWords } from "../constants/stop-words";

export const preprocessText = (text) => {
  // REMOVING WHITESPACE CHARACTERS
  const whiteSpaceRemovedText = text?.replace(/\s\s+/g, " ");

  // TOKENIZING
  const tokenizedText = whiteSpaceRemovedText?.split(" ");

  // REMOVING STOP WORDS
  const removedStopWordsText = tokenizedText?.filter(
    (token) => !stopWords.has(token)
  );

  // JOINING TOKENS BACK INTO STRINGS
  const rawString = removedStopWordsText?.join(" ");

  // RETURNING THE RAW STRING BACK
  return rawString;
};
