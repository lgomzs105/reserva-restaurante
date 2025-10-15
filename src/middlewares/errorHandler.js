module.exports = (err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
};