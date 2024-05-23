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

  return fleschScore;
}
