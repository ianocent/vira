/*
 * calc-core.js — core kalkulator cicilan (fungsi murni, tanpa DOM).
 * Sumber tunggal: shared/js/calc-core.js — di-vendor ke tiap site.
 * Bunga flat: bunga per tahun % dari pokok, proporsional tenor.
 */
function hitungKredit(otr, dp, bungaPersenTahun, tenorBulan) {
    var pokok = Math.max(otr - dp, 0);
    var totalBunga = pokok * (bungaPersenTahun / 100) * (tenorBulan / 12);
    var cicilan = tenorBulan > 0 ? (pokok + totalBunga) / tenorBulan : 0;
    return {
        pokok: Math.round(pokok),
        totalBunga: Math.round(totalBunga),
        cicilan: Math.round(cicilan)
    };
}

function fmtRp(n) {
    return n.toLocaleString('id-ID');
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { hitungKredit: hitungKredit, fmtRp: fmtRp };
}
