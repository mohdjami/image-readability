import { syllable } from "syllable";
export async function checkReadability(text: string) {
  const words = text.split(/\s+/);
  const syllableCount = words.reduce(
    (count, word) => count + syllable(word),
    0
  );
  const wordCount = words.length;
  const sentenceCount = text.split(/[.!?]/).length - 1;

  const smogIndex =
    1.043 * Math.sqrt(syllableCount * (30 / sentenceCount)) + 3.1291;
  const fleschScore =
    206.835 -
    1.015 * (wordCount / sentenceCount) -
    84.6 * (syllableCount / wordCount);

  if (fleschScore >= 90) {
    return "Fully visible";
  } else if (fleschScore >= 70) {
    return "Fairly Visible";
  } else if (fleschScore >= 60) {
    return "Standard";
  } else if (fleschScore >= 50) {
    return "Difficult to Read";
  } else {
    return "Not visible";
  }
}
