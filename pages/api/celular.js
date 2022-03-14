import fs from "fs";
const filename = "/celular.html";
export default async function api(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(await fs.readFileSync(filename, "utf-8"));
  res.end();
}

rewrites: async () => [
    {
      source: "/public/calculadora.html",
      destination: "/pages/api/calculadora.js",
    },
  ]