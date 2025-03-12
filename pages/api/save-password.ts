import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const dbFilePath = path.join(process.cwd(), "passwords.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { password } = req.body;
      const passwords = fs.existsSync(dbFilePath)
        ? JSON.parse(fs.readFileSync(dbFilePath, "utf-8"))
        : [];
      passwords.push({ password, timestamp: new Date().toISOString() });
      fs.writeFileSync(dbFilePath, JSON.stringify(passwords, null, 2));
      res.status(200).json({ message: "Password saved successfully" });
    } catch {
      res.status(500).json({ message: "Failed to save password" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
