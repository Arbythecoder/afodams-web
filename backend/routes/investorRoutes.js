const express = require("express");
const Property = require("../models/Property");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get investor dashboard
router.get("/dashboard", async (req, res) => {
    try {
        // Get investment opportunities (premium properties)
        const opportunities = await Property.find({
            status: "approved",
            $or: [
                { isPremium: true },
                { price: { $gte: 100000000 } } // Properties worth 100M+
            ]
        })
            .select("title price location images type listingType")
            .sort({ price: -1 })
            .limit(6);

        res.json({
            success: true,
            data: {
                totalInvestments: 0, // Would come from Investment model
                activeDeals: 0,
                totalROI: "0%",
                portfolioValue: "₦0",
                opportunities
            }
        });
    } catch (error) {
        console.error("Error fetching investor dashboard:", error);
        res.status(500).json({ message: "Failed to fetch dashboard" });
    }
});

// Get investment opportunities
router.get("/opportunities", async (req, res) => {
    try {
        const opportunities = await Property.find({
            status: "approved",
            $or: [
                { isPremium: true },
                { price: { $gte: 50000000 } }
            ]
        })
            .select("title description price location images type listingType features amenities")
            .sort({ price: -1 });

        res.json({
            success: true,
            count: opportunities.length,
            data: opportunities
        });
    } catch (error) {
        console.error("Error fetching opportunities:", error);
        res.status(500).json({ message: "Failed to fetch opportunities" });
    }
});

// Get investor's investments (placeholder)
router.get("/investments", async (req, res) => {
    try {
        // Would normally fetch from an Investment model
        res.json({
            success: true,
            count: 0,
            data: []
        });
    } catch (error) {
        console.error("Error fetching investments:", error);
        res.status(500).json({ message: "Failed to fetch investments" });
    }
});

// Create investment interest (placeholder)
router.post("/investments", async (req, res) => {
    try {
        const { propertyId, amount } = req.body;

        if (!propertyId || !amount) {
            return res.status(400).json({ message: "Property ID and amount are required" });
        }

        // Would normally create an Investment record
        res.status(201).json({
            success: true,
            message: "Investment interest recorded",
            data: {
                propertyId,
                amount,
                status: "pending",
                investor: req.user._id
            }
        });
    } catch (error) {
        console.error("Error creating investment:", error);
        res.status(500).json({ message: "Failed to create investment" });
    }
});

module.exports = router;
