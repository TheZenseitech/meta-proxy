import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Meta Proxy Server is running!");
});

// ✅ Route หลักสำหรับค้นหา Interest จาก Meta API
app.get("/meta-interest", async (req, res) => {
  const { ad_account_id, q, limit } = req.query;
  const token = process.env.FB_TOKEN;

  if (!token) {
    return res.status(400).json({ error: "Missing FB_TOKEN in environment variables" });
  }

  if (!ad_account_id || !q) {
    return res.status(400).json({ error: "Missing ad_account_id or q" });
  }

  try {
    const url = `https://graph.facebook.com/v21.0/act_${ad_account_id}/targetingsearch?type=adinterest&q=${encodeURIComponent(
      q
    )}&limit=${limit || 10}&access_token=${token}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ ให้ Vercel รู้ว่าจะใช้พอร์ตไหน
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

