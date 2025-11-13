import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // ✅ ดึงค่าจาก query string
    const { q, limit = 10 } = req.query;

    // ✅ ใส่ ad_account_id แบบ default
    const ad_account_id = "832785012634554";

    // ✅ ใส่ access token ของ Meta (จาก Environment Variables)
    const accessToken = process.env.FB_TOKEN;

    // ✅ สร้าง URL เรียก Facebook API
    const apiUrl = `https://graph.facebook.com/v19.0/act_${ad_account_id}/targetingsearch?access_token=${accessToken}&q=${encodeURIComponent(q)}&type=adinterest&limit=${limit}`;

    // ✅ ดึงข้อมูลจาก Meta API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // ✅ ส่งข้อมูลกลับเป็น JSON
    res.status(200).json({ data: data.data || [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
