import { createWorker } from "tesseract.js";

export async function converter(url: string) {
  try {
    const worker = await createWorker("eng");
    const res = await worker.recognize(url);
    console.log(res.data.text);
    await worker.terminate();
    return res.data.text;
  } catch (error) {
    console.log(error);
    return null;
  }
}
