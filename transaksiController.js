import { transaksiList } from "../data/transaksiData.js";

// 1. GET: Menampilkan semua data transaksi
export const getAllTransaksi = (req, res) => {
  res.status(200).json({
    status: "sukses",
    total_data: transaksiList.length,
    data: transaksiList
  });
};

// 2. GET Parameter: Mencari transaksi berdasarkan ID
export const getTransaksiById = (req, res) => {
  const idCari = parseInt(req.params.id);
  const hasil = transaksiList.find((item) => item.id === idCari);

  // Percabangan untuk mengecek ketersediaan data
  if (!hasil) {
    return res.status(404).json({
      status: "gagal",
      pesan: `Transaksi dengan ID ${idCari} tidak ditemukan.`
    });
  }

  res.status(200).json({
    status: "sukses",
    data: hasil
  });
};

// 3. GET Ringkasan: Menghitung total pemasukan, pengeluaran, dan sisa saldo
export const getRingkasanSaldo = (req, res) => {
  let totalPemasukan = 0;
  let totalPengeluaran = 0;

  // Perulangan untuk menjumlahkan setiap nominal transaksi
  transaksiList.forEach((item) => {
    // Percabangan berdasarkan jenis transaksi
    if (item.jenis === "pemasukan") {
      totalPemasukan += item.nominal; // Operator aritmatika penjumlahan
    } else if (item.jenis === "pengeluaran") {
      totalPengeluaran += item.nominal;
    }
  });

  // Operator aritmatika pengurangan untuk sisa saldo
  const sisaSaldo = totalPemasukan - totalPengeluaran;

  res.status(200).json({
    status: "sukses",
    ringkasan: {
      total_pemasukan: totalPemasukan,
      total_pengeluaran: totalPengeluaran,
      sisa_saldo: sisaSaldo,
      status_keuangan: sisaSaldo >= 0 ? "Aman" : "Defisit"
    }
  });
};

// 4. POST: Menambahkan transaksi baru
export const tambahTransaksi = (req, res) => {
  const { keterangan, jenis, nominal, tanggal } = req.body;

  // Percabangan validasi input
  if (!keterangan || !jenis || !nominal || nominal <= 0) {
    return res.status(400).json({
      status: "gagal",
      pesan: "Data tidak lengkap atau nominal harus lebih dari 0."
    });
  }

  if (jenis !== "pemasukan" && jenis !== "pengeluaran") {
    return res.status(400).json({
      status: "gagal",
      pesan: "Jenis transaksi harus 'pemasukan' atau 'pengeluaran'."
    });
  }

  // Operator aritmatika untuk membuat ID otomatis
  const idBaru = transaksiList.length > 0 
    ? transaksiList[transaksiList.length - 1].id + 1 
    : 1;

  const dataBaru = {
    id: idBaru,
    keterangan,
    jenis,
    nominal: Number(nominal),
    tanggal: tanggal || new Date().toISOString().split("T")[0]
  };

  transaksiList.push(dataBaru);

  res.status(201).json({
    status: "sukses",
    pesan: "Transaksi berhasil ditambahkan.",
    data: dataBaru
  });
};

// 5. PUT: Mengubah data transaksi berdasarkan ID
export const updateTransaksi = (req, res) => {
  const idCari = parseInt(req.params.id);
  const { keterangan, jenis, nominal, tanggal } = req.body;

  const index = transaksiList.findIndex((item) => item.id === idCari);

  if (index === -1) {
    return res.status(404).json({
      status: "gagal",
      pesan: `Transaksi dengan ID ${idCari} tidak ditemukan.`
    });
  }

  // Memperbarui data yang dikirim
  transaksiList[index] = {
    ...transaksiList[index],
    keterangan: keterangan || transaksiList[index].keterangan,
    jenis: jenis || transaksiList[index].jenis,
    nominal: nominal ? Number(nominal) : transaksiList[index].nominal,
    tanggal: tanggal || transaksiList[index].tanggal
  };

  res.status(200).json({
    status: "sukses",
    pesan: "Data transaksi berhasil diperbarui.",
    data: transaksiList[index]
  });
};

// 6. DELETE: Menghapus data transaksi berdasarkan ID
export const hapusTransaksi = (req, res) => {
  const idCari = parseInt(req.params.id);
  const index = transaksiList.findIndex((item) => item.id === idCari);

  if (index === -1) {
    return res.status(404).json({
      status: "gagal",
      pesan: `Transaksi dengan ID ${idCari} tidak ditemukan.`
    });
  }

  const dataTerhapus = transaksiList.splice(index, 1);

  res.status(200).json({
    status: "sukses",
    pesan: "Transaksi berhasil dihapus.",
    data_dihapus: dataTerhapus[0]
  });
};
