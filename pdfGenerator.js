import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import Handlebars from "handlebars";

export async function generateResumePDF(data) {
  const templatePath = path.resolve("backend/templates/resume.html");
  const html = fs.readFileSync(templatePath, "utf8");

  const template = Handlebars.compile(html);
  const content = template(data);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(content);

  const outputPath = "backend/resume.pdf";
  await page.pdf({ path: outputPath, format: "A4" });

  await browser.close();
  return outputPath;
}
