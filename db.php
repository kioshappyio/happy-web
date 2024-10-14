<?php
$host = 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com';
$port = 4000;
$username = 'Cmb3isRH6akNrSk.root';
$password = '730K7VTE15C5Lbc1';
$database = 'fortune500';

// Koneksi ke database TiDB Cloud
$conn = new mysqli($host, $username, $password, $database, $port);

// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
