var app = new Vue({
  el: '#app',
  data: Object.assign({}, sharedData, {
    filterUPBJJ: '',
    filterKategori: '',
    filterReorder: 'all',
    sortBy: 'judul',
    isEditing: false,
    form: {
      kode: '',
      judul: '',
      kategori: '',
      upbjj: '',
      lokasiRak: '',
      qty: 0,
      safety: 0,
      harga: 0,        // <-- Ditambahkan agar input harga ikut tersimpan
      catatanHTML: ''
    }
  }),
  computed: {
    filteredStok() {
      return this.stok
        .filter(item => {
          if (this.filterUPBJJ && item.upbjj !== this.filterUPBJJ) return false;
          if (this.filterUPBJJ && this.filterKategori && item.kategori !== this.filterKategori) return false;
          if (this.filterReorder === 'reorder' && !(item.qty < item.safety || item.qty === 0)) return false;
          return true;
        })
        .sort((a, b) => {
          if (this.sortBy === 'qty' || this.sortBy === 'harga') {
            return a[this.sortBy] - b[this.sortBy];
          }
          return a[this.sortBy].localeCompare(b[this.sortBy]);
        });
    }
  },
  methods: {
    getStatusText(item) {
      if (item.qty === 0) return 'Kosong';
      if (item.qty < item.safety) return 'Menipis';
      return 'Aman';
    },
    getStatusClass(item) {
      if (item.qty === 0) return 'status-kosong';
      if (item.qty < item.safety) return 'status-menipis';
      return 'status-aman';
    },
    resetFilter() {
      this.filterUPBJJ = '';
      this.filterKategori = '';
      this.filterReorder = 'all';
      this.sortBy = 'judul';
    },
    saveStok() {
      if (this.isEditing) {
        let idx = this.stok.findIndex(i => i.kode === this.form.kode);
        if (idx !== -1) {
          this.stok.splice(idx, 1, { ...this.form });
        }
        this.isEditing = false;
      } else {
        this.stok.push({ ...this.form });
      }
      this.resetForm();
    },
    editItem(item) {
      this.isEditing = true;
      this.form = { ...item };
    },
    cancelEdit() {
      this.isEditing = false;
      this.resetForm();
    },
    resetForm() {
      this.form = { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', qty: 0, safety: 0, harga: 0, catatanHTML: '' };
    }
  }
});