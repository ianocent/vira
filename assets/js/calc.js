/*
 * calc.js — adapter tipis kalkulator cicilan (Vira).
 * Logika hitung ada di calc-core.js (hitungKredit, fmtRp).
 * Perilaku khas site ini: alert jika DP > OTR, tampilkan total pembiayaan.
 */
function setModel(val) {
    if (val) document.getElementById('cOtr').value = val;
}

function hitung() {
    var otr = parseFloat(document.getElementById('cOtr').value) || 0;
    var dp = parseFloat(document.getElementById('cDp').value) || 0;
    var bunga = parseFloat(document.getElementById('cBunga').value) || 0;
    var tenor = parseInt(document.getElementById('cTenor').value) || 36;
    if (otr - dp <= 0) { alert('Cek lagi: DP tidak boleh lebih besar dari harga OTR.'); return; }
    var h = hitungKredit(otr, dp, bunga, tenor);
    var out = document.getElementById('cOut');
    out.innerHTML = 'Uang Muka: Rp ' + fmtRp(dp) + '<br>' +
        'Total Pembiayaan: Rp ' + fmtRp(h.pokok + h.totalBunga) + '<br>' +
        'Angsuran per Bulan (±): Rp ' + fmtRp(h.cicilan);
    out.classList.add('show');
}
