
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generateDescriptionWithGemini(imageBuffer, mimetype) {
    const prompt =
        "Gere uma descrição, de maneira informal e descontraída, em português do brasil, para a seguinte imagem:";

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: mimetype,
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Alt-text not include.";
    } catch (erro) {
        console.error("Error fetching alt-text:", erro.message, erro);
        throw new Error("Error fetching alt-text from Gemini.");
    }
}