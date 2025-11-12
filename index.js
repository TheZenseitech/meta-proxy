import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/meta-interest", async (req, res) => {
  const { ad_account_id, q, limit = 10 } = req.query;

  // ✅ ดึง token จาก environment variable (ปลอดภัย)
  const ACCESS_TOKEN = process.env.FB_TOKEN;

  if (!ACCESS_TOKEN) {
    return res.status(401).json({ error: "Missing FB_TOKEN in environment" });
  }

  const url = `https://graph.facebook.com/v20.0/act_${ad_account_id}/targetingsearch?q=${encodeURIComponent(
    q
  )}&type=adinterest&limit=${limit}&access_token=${ACCESS_TOKEN}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("✅ Proxy running on port 3000"));
export default app;
