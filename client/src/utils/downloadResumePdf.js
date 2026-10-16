import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

// Turns "Ayush Pal" into "Ayush-Pal" so it is safe to use as a file name.
function toFileName(name) {
  const clean = String(name || "resume")
    .trim()
    .replace(/[^\w\- ]+/g, "")
    .replace(/\s+/g, "-");

  return `${clean || "resume"}.pdf`;
}

/**
 * Captures the resume preview element and downloads it as an A4 PDF.
 * Long resumes are split across multiple pages.
 */
export async function downloadResumePdf(element, name) {
  if (!element) {
    throw new Error("Resume preview not found.");
  }

  const canvas = await html2canvas(element, {
    scale: 2,              // sharper text
    useCORS: true,         // allow images from other domains
    backgroundColor: "#ffffff",
  });

  const image = canvas.toDataURL("image/jpeg", 0.95);

  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Scale the image to the page width, keep the aspect ratio.
  const imageHeight = (canvas.height * pageWidth) / canvas.width;

  let heightLeft = imageHeight;
  let position = 0;

  pdf.addImage(image, "JPEG", 0, position, pageWidth, imageHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imageHeight;
    pdf.addPage();
    pdf.addImage(image, "JPEG", 0, position, pageWidth, imageHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(toFileName(name));
}
