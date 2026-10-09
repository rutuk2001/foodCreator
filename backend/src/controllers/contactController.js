import asyncHandler from "express-async-handler";
import Contact from "../models/Contact.js";

// @desc    Submit a collaboration / contact inquiry
// @route   POST /api/contact
// @access  Public
export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, company, collaborationType, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email, and message are required");
  }

  const contact = await Contact.create({ name, email, company, collaborationType, message });
  res.status(201).json({
    success: true,
    message: "Thanks for reaching out — I'll get back to you soon!",
    data: contact,
  });
});

// @desc    Get all contact submissions (dashboard)
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort("-createdAt");
  res.json({ success: true, count: contacts.length, data: contacts });
});
