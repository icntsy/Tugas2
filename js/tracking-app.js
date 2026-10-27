var app = new Vue({
  el: '#app',
  data: Object.assign({}, sharedData, {
    selectedPaketIndex: '',
    selectedPaketDetail: null,
    sequenceNum: 2,
    formDO: {
      nim: '',
      nama: '',
      ekspedisi: '',
      tanggalKirim: new Date().toISOString().split('T')[0]
    }
  }),
  computed: {
    generatedDONumber() {
      let year = new Date().getFullYear();
      let seqStr = String(this.sequenceNum).padStart(4, '0');
      return `DO${year}-${seqStr}`;
    }
  },
  methods: {
    onPaketChange() {
      if (this.selectedPaketIndex !== '') {
        this.selectedPaketDetail = this.paket[this.selectedPaketIndex];
      } else {
        this.selectedPaketDetail = null;
      }
    },
    addDO() {
      if (!this.selectedPaketDetail) return;

      let currentDONum = this.generatedDONumber;
      
      this.$set(this.tracking, currentDONum, {
        nim: this.formDO.nim,
        nama: this.formDO.nama,
        status: 'Sedang Diproses',
        ekspedisi: this.formDO.ekspedisi,
        tanggalKirim: this.formDO.tanggalKirim,
        paket: this.selectedPaketDetail.kode,
        total: this.selectedPaketDetail.harga,
        perjalanan: [
          { waktu: new Date().toLocaleString(), keterangan: 'Delivery Order diterbitkan dan diverifikasi' }
        ]
      });

      this.sequenceNum++;
      this.formDO.nim = '';
      this.formDO.nama = '';
      this.formDO.ekspedisi = '';
      this.selectedPaketIndex = '';
      this.selectedPaketDetail = null;
    }
  }
});