const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// SETTINGS SCHEMA
// ===============================
const settingsSchema = new mongoose.Schema({
  merchantId: String,
  merchantName: String,

  appNotifications: Boolean,
  emailAlerts: Boolean,
  instantSettlement: Boolean,

  businessHours: String,
  language: String,

  bankName: String,
  upiId: String,

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Setting = mongoose.model("Setting", settingsSchema);


// ===============================
// SAVE SETTINGS
// ===============================
app.post("/api/settings", async (req, res) => {
  try {

    const existing = await Setting.findOne({
      merchantId: req.body.merchantId
    });

    if (existing) {

      await Setting.updateOne(
        { merchantId: req.body.merchantId },
        req.body
      );

      res.json({
        message: "Settings Updated Successfully"
      });

    } else {

      const newSetting = new Setting(req.body);
      await newSetting.save();

      res.json({
        message: "Settings Saved Successfully"
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// ===============================
// GET SETTINGS
// ===============================
app.get("/api/settings/:merchantId", async (req, res) => {
  try {

    const data = await Setting.findOne({
      merchantId: req.params.merchantId
    });

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{
    res.send("Backend Running Successfully");
});



// =======================
// Schema + Model
// =======================
const merchantSchema = new mongoose.Schema({
    businessName: String,
    ownerName: String,
    mobile: String,
    radius: String,
    address: String
});

const Merchant = mongoose.model("Merchant", merchantSchema);

const kycSchema = new mongoose.Schema({
  aadhaar: String,
  pan: String,
  gst: String,
  license: String,
  aadhaarFile: String,
  panFile: String
});

const KYC = mongoose.model("KYC", kycSchema);

const settlementSchema = new mongoose.Schema({
  holderName: String,
  bankName: String,
  accountNumber: String,
  ifsc: String,
  upi: String
});

const Settlement = mongoose.model("Settlement", settlementSchema);

const productSchema = new mongoose.Schema({
  productType: String,
  priceUnit: String,
  fatPercentage: Number,
  description: String,
  price: Number,
  quantity: Number,
  cows: Number,
  buffaloes: Number,
  supplyTime: String,
  deliveryRadius: Number,
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

const orderSchema = new mongoose.Schema({
  orderId: String,
  customerName: String,
  product: String,
  qty: Number,
  amount: Number,
  date: { type: Date, default: Date.now },
  status: String,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

// =======================
// Save Merchant Data
// =======================
app.post("/api/onboarding", async (req, res) => {
    try {

        const data = req.body;

        const newMerchant = new Merchant(data);

        await newMerchant.save();

        console.log("Saved In Atlas:", data);

        res.json({
            message: "Merchant Data Saved Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Saving Data"
        });
    }
});



// =======================
// Get All Merchant Data
// =======================
app.get("/api/onboarding", async (req, res) => {

    const allData = await Merchant.find();

    res.json(allData);

});

app.post("/api/kyc", async (req, res) => {
  try {
    const newKYC = new KYC(req.body);
    await newKYC.save();

    console.log("KYC Saved In Atlas:", req.body);
    res.json({
      message: "KYC Saved Successfully"
    });

  } catch (error) {
    console.error("Error saving KYC:", error.message);
    res.status(500).json({
      message: "Error Saving KYC: " + error.message
    });
  }
});

app.post("/api/settlement", async (req, res) => {
  try {
    const newSettlement = new Settlement(req.body);
    await newSettlement.save();

    console.log("Settlement Saved In Atlas:", req.body);
    res.json({
      message: "Settlement Saved Successfully"
    });

  } catch (error) {
    console.error("Error saving Settlement:", error.message);
    res.status(500).json({
      message: "Error Saving Settlement: " + error.message
    });
  }
});

// =======================
// Save Product Data
// =======================
app.post("/api/products", async (req, res) => {
  try {
    const data = req.body;
    
    console.log("Received product data:", data);
    
    // Validate required fields
    if (!data.productType || !data.priceUnit || !data.description || !data.supplyTime) {
      return res.status(400).json({
        message: "Missing required fields: productType, priceUnit, description, or supplyTime"
      });
    }
    
    const newProduct = new Product(data);
    await newProduct.save();
    
    console.log("✓ Product Saved In Atlas:", data);
    
    res.status(201).json({
      message: "Product Listed Successfully",
      productId: newProduct._id
    });
  } catch (error) {
    console.error("✗ Error saving product:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      message: "Error Saving Product: " + error.message
    });
  }
});

// =======================
// Get All Products
// =======================
app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await Product.find();
    console.log("✓ Retrieved", allProducts.length, "products from database");
    res.json(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      message: "Error Fetching Products: " + error.message
    });
  }
});

// =======================
// Save Order Data
// =======================
app.post("/api/orders", async (req, res) => {
  try {
    const data = req.body;
    
    console.log("Received order data:", data);
    
    // Validate required fields
    if (!data.orderId || !data.customerName || !data.product || !data.qty || !data.amount || !data.status) {
      return res.status(400).json({
        message: "Missing required fields: orderId, customerName, product, qty, amount, or status"
      });
    }
    
    const newOrder = new Order(data);
    await newOrder.save();
    
    console.log("✓ Order Saved In Atlas:", data);
    
    res.status(201).json({
      message: "Order Saved Successfully",
      orderId: newOrder.orderId,
      _id: newOrder._id
    });
  } catch (error) {
    console.error("✗ Error saving order:", error.message);
    res.status(500).json({
      message: "Error Saving Order: " + error.message
    });
  }
});

// =======================
// Get All Orders
// =======================
app.get("/api/orders", async (req, res) => {
  try {
    const allOrders = await Order.find().sort({ createdAt: -1 });
    console.log("✓ Retrieved", allOrders.length, "orders from database");
    res.json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({
      message: "Error Fetching Orders: " + error.message
    });
  }
});

// =======================
// Get Earnings Data
// =======================
app.get("/api/earnings", async (req, res) => {
  try {
    // Sample orders data (in production, these would be fetched from an Orders collection)
    const sampleOrders = [
      { orderId: "ORD-001", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), amount: 4500, status: "Delivered", product: "Cow Milk" },
      { orderId: "ORD-002", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), amount: 1245, status: "Delivered", product: "Buffalo Milk" },
      { orderId: "ORD-003", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), amount: 2860, status: "Delivered", product: "Paneer" },
      { orderId: "ORD-004", date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), amount: 1120, status: "Delivered", product: "Curd" },
      { orderId: "ORD-005", date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), amount: 11200, status: "Delivered", product: "Ghee" },
      { orderId: "ORD-006", date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), amount: 980, status: "Delivered", product: "Cow Milk" },
      { orderId: "ORD-007", date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), amount: 3500, status: "Delivered", product: "Buffalo Milk" },
      { orderId: "ORD-008", date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), amount: 2100, status: "Pending", product: "Paneer" }
    ];
    
    // Filter only delivered orders for earnings calculation
    const deliveredOrders = sampleOrders.filter(order => order.status === "Delivered");
    
    // Calculate totals
    const totalEarnings = deliveredOrders.reduce((sum, order) => sum + order.amount, 0);
    
    // Calculate today revenue
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayOrders = deliveredOrders.filter(order => order.date >= todayStart);
    const todayRevenue = todayOrders.reduce((sum, order) => sum + order.amount, 0);
    
    // Calculate weekly revenue
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekOrders = deliveredOrders.filter(order => order.date >= weekStart);
    const weeklyRevenue = weekOrders.reduce((sum, order) => sum + order.amount, 0);
    
    // Calculate monthly revenue
    const monthStart = new Date();
    monthStart.setDate(1);
    const monthOrders = deliveredOrders.filter(order => order.date >= monthStart);
    const monthlyRevenue = monthOrders.reduce((sum, order) => sum + order.amount, 0);
    
    // Calculate pending payout (70% of total)
    const pendingPayout = Math.floor(totalEarnings * 0.7);
    
    console.log("✓ Earnings Data Calculated:");
    console.log(`  Total Earnings: ₹${totalEarnings}`);
    console.log(`  Today Revenue: ₹${todayRevenue}`);
    console.log(`  Weekly Revenue: ₹${weeklyRevenue}`);
    console.log(`  Pending Payout: ₹${pendingPayout}`);
    
    res.json({
      totalEarnings,
      todayRevenue,
      weeklyRevenue,
      monthlyRevenue,
      pendingPayout,
      transactions: deliveredOrders.map(order => ({
        orderId: order.orderId,
        date: order.date,
        amount: order.amount,
        status: order.status,
        product: order.product
      }))
    });
  } catch (error) {
    console.error("✗ Error fetching earnings:", error.message);
    res.status(500).json({
      message: "Error Fetching Earnings: " + error.message,
      totalEarnings: 0,
      todayRevenue: 0,
      weeklyRevenue: 0,
      monthlyRevenue: 0,
      pendingPayout: 0,
      transactions: []
    });
  }
});

app.listen(5000, ()=>{
    console.log("Server Started on Port 5000");
});