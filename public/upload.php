<?php
// Koneksi ke database
include 'db.php';

// Menangkap data dari form
$nominal_utang = $_POST['nominal_utang'];
$produk = $_POST['produk'];
$tanggal_transaksi = $_POST['tanggal_transaksi'];

// Upload QRIS
$qris_path = 'uploads/' . basename($_FILES['qris']['name']);
move_uploaded_file($_FILES['qris']['tmp_name'], $qris_path);

// Upload Bukti Pembayaran
$bukti_path = 'uploads/' . basename($_FILES['bukti_pembayaran']['name']);
move_uploaded_file($_FILES['bukti_pembayaran']['tmp_name'], $bukti_path);

// Insert data ke database
$sql = "INSERT INTO Transaksi (Nominal_utang, Produk, Tanggal_transaksi, QRIS_path, Status_pembayaran, Bukti_pembayaran_path) 
        VALUES (?, ?, ?, ?, 'Belum Lunas', ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("issss", $nominal_utang, $produk, $tanggal_transaksi, $qris_path, $bukti_path);

if ($stmt->execute()) {
    echo "Transaksi berhasil ditambahkan!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
