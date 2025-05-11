const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the Quentin Bridge on Render!");
});

app.get("/grok", async (req, res) => {
  const name = req.query.name || "barbra streisand";
  const query = encodeURIComponent(name);

  const url = `https://scatistics.com/api/01/index.php?key=2922570813&action=search&content=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.text(); // fallback in case JSON fails
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: "API call failed", details: err.toString() });
  }
});

app.listen(process.env.PORT || 3000);
