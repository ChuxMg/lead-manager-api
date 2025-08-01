const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Add new lead
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all leads
router.get("/", async (req, res) => {
  try {
    const leads = await prisma.lead.findMany();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a lead
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.lead.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: "Lead not found" });
  }
});

module.exports = router;