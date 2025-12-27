import ApiClient from "../models/ApiClient.js";

export const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return res.status(401).json({ message: "API key missing" });

  const client = await ApiClient.findOne({ where: { api_key: apiKey } });
  if (!client || !client.is_active) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  next();
};
