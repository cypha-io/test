import fs from "fs";
import path from "path";

const dbFilePath = path.join("/tmp", "passwords.json"); // Change to /tmp

export const savePasswordToDB = (password: string) => {
  const passwords = fs.existsSync(dbFilePath)
    ? JSON.parse(fs.readFileSync(dbFilePath, "utf-8"))
    : []; 

  passwords.push({ password, timestamp: new Date().toISOString() });

  fs.writeFileSync(dbFilePath, JSON.stringify(passwords, null, 2));
};
