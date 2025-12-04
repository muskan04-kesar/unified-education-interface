import mongoose from "mongoose";
import dotenv from "dotenv";
import GovernmentUser from "./models/government.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const dummyGovUsers = [
  { name: "MoE Central", email: "moe@gov.in", role: "government" },
  { name: "School Education Dept", email: "school-division@gov.in", role: "government" },
  { name: "Higher Education Dept", email: "higher-education@gov.in", role: "government" },
  { name: "Digital Learning Mission", email: "digital-education@gov.in", role: "government" },
  { name: "Gov Admin Controller", email: "admin@gov.in", role: "government" }
];

async function seed() {
  await GovernmentUser.insertMany(dummyGovUsers);
  console.log("Government users added!");
  process.exit();
}

seed();
