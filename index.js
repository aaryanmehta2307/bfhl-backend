const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const USER_ID = "aryan_mehta_23112003"; // Change this to your details
const EMAIL = "22bcs12209@cuchd.in";
const ROLL_NUMBER = "22BCS12209";

// POST API Endpoint
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        let numbers = [], alphabets = [];

        // Separate numbers and alphabets
        data.forEach(item => {
            if (!isNaN(item)) numbers.push(item);
            else if (typeof item === "string" && /^[A-Za-z]$/.test(item)) alphabets.push(item);
        });

        // Find the highest alphabet
        let highest_alphabet = alphabets.length ? [alphabets.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1).pop()] : [];

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

// GET API Endpoint
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
