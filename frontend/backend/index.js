import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userPrompt = req.body.message;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer hf_ZW........(FREE TOKEN)", 
        },
        body: JSON.stringify({ inputs: userPrompt }),
      }
    );

    const data = await response.json();
    const reply = data[0]?.generated_text || "Model response unavailable.";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.json({ reply: "⚠️ AI backend error — check HuggingFace API." });
  }
});

app.listen(5000, () => console.log("FREE AI running on port 5000"));
