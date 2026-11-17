import express from "express";
import {
  getAllTransaksi,
  getTransaksiById,
  getRingkasanSaldo,
  tambahTransaksi,
  updateTransaksi,
  hapusTransaksi
} from "../controllers/transaksiController.js";

const router = express.Router();

// 6 Route Utama Aplikasi
router.get("/", getAllTransaksi);                   // 1. GET semua data
router.get("/ringkasan", getRingkasanSaldo);      // 2. GET ringkasan saldo (aritmatika & perulangan)
router.get("/:id", getTransaksiById);             // 3. GET parameter (pencarian)
router.post("/", tambahTransaksi);                // 4. POST tambah data
router.put("/:id", updateTransaksi);              // 5. PUT ubah data
router.delete("/:id", hapusTransaksi);            // 6. DELETE hapus data

export default router;
