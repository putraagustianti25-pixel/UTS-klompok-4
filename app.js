import express from "express";
import transaksiRoutes from "./routes/transaksiRoutes.js";

const app = express();
const PORT = 3000;

// Middleware untuk membaca JSON dari request body
app.use(express.json());

// Route halaman utama
app.get("/", (req, res) => {
  res.send("Selamat datang di API Manajemen Keuangan Pribadi - Kelompok 4");
});

// Menggunakan modul routes transaksi
app.use("/api/transaksi", transaksiRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
