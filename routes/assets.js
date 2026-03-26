import express from "express";
import { assets } from "../data.js";

const router = express.Router();

// GET all assets
router.get("/", (req, res) => {
  res.json(assets);
});

// GET asset by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const asset = assets.find(a => a.AssetID === id);
  asset ? res.json(asset) : res.status(404).json({ error: "Asset not found" });
});

// GET by branch
router.get("/branch/:branch", (req, res) => {
  const branch = req.params.branch.toLowerCase();
  const filtered = assets.filter(a => a.Branch.toLowerCase() === branch);
  res.json(filtered);
});

// POST create asset
router.post("/", (req, res) => {
  const newAsset = {
    AssetID: assets.length + 1,
    Branch: req.body.Branch,
    Type: req.body.Type,
    Model: req.body.Model,
    SerialNumber: req.body.SerialNumber,
    Status: req.body.Status,
    AddedDate: req.body.AddedDate
  };
  assets.push(newAsset);
  res.json(newAsset);
});

// PUT update asset
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = assets.findIndex(a => a.AssetID === id);
  if (index === -1) return res.status(404).json({ error: "Asset not found" });

  assets[index] = { ...assets[index], ...req.body };
  res.json(assets[index]);
});

// DELETE asset
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = assets.findIndex(a => a.AssetID === id);
  if (index === -1) return res.status(404).json({ error: "Asset not found" });

  const deleted = assets.splice(index, 1);
  res.json(deleted[0]);
});

export default router;
