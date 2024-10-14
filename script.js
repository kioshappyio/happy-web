// Mengambil dan menampilkan tagihan
function loadTagihan() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const tagihanList = document.getElementById('tagihanList');
            tagihanList.innerHTML = ''; // Bersihkan daftar sebelumnya
            data.forEach((transaction, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>Produk:</strong> ${transaction.produk}<br>
                    <strong>Nominal Utang:</strong> ${transaction.nominal_utang}<br>
                    <strong>Tanggal Transaksi:</strong> ${transaction.tanggal_transaksi}<br>
                    <strong>Link Tagihan:</strong> <a href="${transaction.link}" target="_blank">${transaction.link}</a><br>
                    <strong>QRIS:</strong> <img src="${transaction.qris}" alt="QRIS" width="100"><br>
                    <button onclick="deleteTagihan(${index})">Hapus Tagihan</button><br><br>
                `;
                tagihanList.appendChild(listItem);
            });
        });
}

// Menangani pengiriman form untuk tagihan
document.getElementById('utangForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nominalUtang = document.getElementById('nominal_utang').value;
    const produk = document.getElementById('produk').value;
    const tanggalTransaksi = document.getElementById('tanggal_transaksi').value;
    const qris = document.getElementById('qris').files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
        const newEntry = {
            nominal_utang: nominalUtang,
            produk: produk,
            tanggal_transaksi: tanggalTransaksi,
            qris: reader.result,
            link: `https://kioshappyio.github.io/happy-web/tagihan/${Date.now()}` // Link tagihan yang dihasilkan
        };

        // Mengambil data lama dan menambahkan entri baru
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                data.push(newEntry);
                const updatedData = JSON.stringify(data, null, 2);

                // Mengupdate data.json tidak dapat dilakukan langsung di GitHub Pages
                // Anda memerlukan backend untuk menyimpan data ini secara permanen
                Swal.fire({
                    title: 'Sukses!',
                    text: 'Tagihan berhasil dibuat! Link: ' + newEntry.link,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Memuat ulang daftar tagihan
                loadTagihan();
            });
    };
    reader.readAsDataURL(qris);
});

// Menghapus tagihan
function deleteTagihan(index) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.splice(index, 1); // Menghapus tagihan
            const updatedData = JSON.stringify(data, null, 2);

            // Mengupdate data.json tidak dapat dilakukan langsung di GitHub Pages
            // Anda memerlukan backend untuk menyimpan data ini secara permanen
            Swal.fire({
                title: 'Sukses!',
                text: 'Tagihan berhasil dihapus!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Memuat ulang daftar tagihan
            loadTagihan();
        });
}

// Memuat tagihan saat halaman dimuat
window.onload = loadTagihan;
