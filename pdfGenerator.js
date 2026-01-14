import puppeteer from "puppeteer";
import fs from "fs";
import Handlebars from "handlebars";

export async function generateResumePDF(data) {
  const templateHtml = fs.readFileSync("templates/resume.html", "utf8");
  const template = Handlebars.compile(templateHtml);
  const html = template(data);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);

  await page.pdf({
    path: "resume.pdf",
    format: "A4"
  });

  await browser.close();
}
