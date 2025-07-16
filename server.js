const express = require("express");
const cors = require("cors");
require("dotenv").config();
const leadsRoute = require("./routes/leads");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/leads", leadsRoute);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));