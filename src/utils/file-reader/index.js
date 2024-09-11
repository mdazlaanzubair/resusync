import { stopWords } from "../constants/stop-words";
import * as pdfjsLib from "pdfjs-dist";
// Set the path to the worker script
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.worker.min.mjs`;

/**
 * FUNCTION TO READ THE FILE AS AN "ArrayBuffer" USING "FileReader".
 *
 * @param {File} file - THE FILE TO BE READ
 * @returns {Promise<ArrayBuffer>} - A PROMISE THAT RESOLVES WITH FILE's "ArrayBuffer"
 */
function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);

    reader.readAsArrayBuffer(file);
  });
}

/**
 * FUNCTION TO EXTRACT TEXT FROM PDF FILE
 *
 * @param {File} file - THE PDF FILE TO BE EXTRACT
 * @returns {Promise<string>} - A PROMISE THAT WILL RESOLVES WITH THE EXTRACTED TEXT
 */

export async function pdfReader(file) {
  try {
    // READ FILE AS "ArrayBuffer"
    const arrayBuffer = await readFileAsArrayBuffer(file);

    // CONVERTING "ArrayBuffer TO TYPED ARRAY
    const typedArray = new Uint8Array(arrayBuffer);

    // LOAD TYPED ARRAY USING "pdfjsLib" AS A PDF DOCUMENT
    const pdf = await pdfjsLib.getDocument(typedArray).promise;

    let extractedText = "";

    // LOOP THROUGH EACH PAGE/ARRAY-ELEMENT IN THE PDF DOCUMENT
    for (let i = 1; i <= pdf.numPages; i++) {
      // GET CURRENT PAGE/ARRAY-ELEMENT
      const page = await pdf.getPage(i);

      // EXTRACT TEXT-CONTENT ELEMENTS FROM THAT PAGE/ARRAY-ELEMENT
      const textContent = await page.getTextContent();

      // EXTRACT TEXT FROM EACH TEXT-CONTENT ELEMENT CONCATENATE INTO A STRING
      const pageText = textContent.items.map((item) => item.str).join(" ");

      // APPENDING THE PAGE/ARRAY-ELEMENT TEXT INTO THE OVERALL DOCUMENT TEXT VARIABLE
      extractedText += pageText + " ";
    }

    // PRE-PROCESSING TEXT BEFORE RETURNING
    if (extractedText?.length <= 0) {
      return;
    }

    // REMOVING WHITESPACE CHARACTERS
    const whiteSpaceRemovedText = extractedText?.replace(/\s\s+/g, " ");

    // TOKENIZING
    const tokenizedText = whiteSpaceRemovedText?.split(" ");

    // REMOVING STOP WORDS
    const removedStopWordsText = tokenizedText?.filter(
      (token) => !stopWords.has(token)
    );

    // JOINING TOKENS BACK INTO STRINGS
    const rawString = removedStopWordsText?.join(" ");

    // REMOVING NULL CHARACTERS (IF ANY)
    const sanitizedData = rawString?.replace(/\u0000/g, "");

    // RETURNING PRE PROCESSED TEXT TOKENS AFTER CONCATENATING AS SINGLE STRING
    return sanitizedData;
  } catch (error) {
    // THROW ERROR WHILE EXTRACTING THE TEXT FROM PDF
    throw new Error(error);
  }
}
