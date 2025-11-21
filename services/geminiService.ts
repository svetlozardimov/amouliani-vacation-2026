import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAmoulianiTip = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Напиши кратък, вдъхновяващ факт или съвет за пътуване до остров Амуляни, Гърция на български език. Нека да е свързано с плажовете или храната. Максимум 2 изречения.',
      config: {
        temperature: 0.7,
      }
    });
    
    return response.text || "Амуляни ви очаква с кристални води!";
  } catch (error) {
    console.error("Error fetching tip:", error);
    return "Не успяхме да заредим съвет в момента, но плажовете със сигурност са прекрасни!";
  }
};
