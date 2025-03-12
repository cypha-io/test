import fs from "fs";
import path from "path";

const dbFilePath = path.join(__dirname, "passwords.json");

export const savePasswordToDB = (password: string) => {
  const passwords = JSON.parse(fs.readFileSync(dbFilePath, "utf-8") || "[]");
  passwords.push({ password, timestamp: new Date().toISOString() });
  fs.writeFileSync(dbFilePath, JSON.stringify(passwords, null, 2));
};
