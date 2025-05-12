const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the Quentin Bridge on Render!");
});

app.get("/grok", async (req, res) => {
  const name = req.query.name;
  const wid = req.query.wid;
  const meta = req.query.meta;

  let url = "";

  // Choose endpoint
  if (name) {
    const encodedName = encodeURIComponent(name);
    url = `https://scatistics.com/api/01/index.php?key=2922570813&action=search&content=${encodedName}`;
  } else if (wid) {
    const encodedWid = encodeURIComponent(wid);
    const encodedMeta = meta ? encodeURIComponent(meta) : "";
    url = `https://scatistics.com/api/esabatad/?wid=${encodedWid}&meta=${encodedMeta}`;
  } else {
    return res.status(400).json({ error: "Missing name or wid parameter." });
  }

  try {
    const response = await fetch(url);
    const raw = await response.text();
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(raw);
  } catch (err) {
    res.status(500).json({ error: "API call failed", detail: err.toString() });
  }
});

app.listen(process.env.PORT || 3000);

