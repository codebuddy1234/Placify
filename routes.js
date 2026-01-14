router.post("/generate-resume", async (req, res) => {
  const resumeData = req.body;
  await generateResumePDF(resumeData);
  res.download("resume.pdf");
});
