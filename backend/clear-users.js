require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const clearUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/afodams', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ Connected to MongoDB");

        // Delete all users except admin
        const result = await User.deleteMany({ role: { $ne: 'admin' } });
        
        console.log(`✅ Deleted ${result.deletedCount} non-admin users`);
        console.log("⚠️  All non-admin user accounts have been removed");
        console.log("✅ You can now register new users without conflicts");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error clearing users:", error);
        process.exit(1);
    }
};

clearUsers();
