import { ArrowLeftRight, FileText, Scale, Workflow } from "lucide-react";

// Peta situs: tiga jenis rekening, masing-masing dengan empat sub-halaman.
export const topicIcons = {
  regulasi: Scale,
  operasional: Workflow,
  perubahan: ArrowLeftRight,
  format: FileText,
};

export const sections = {
  giro: {
    id: "giro",
    label: "Rekening Giro",
    short: "Giro",
    code: "RPL",
    reg: "PMK-182/PMK.05/2017",
    tagline: "Rekening Lainnya (RPL) milik satker",
    pages: [
      {
        id: "regulasi",
        title: "Regulasi Rekening",
        desc: "Dasar hukum rekening, termasuk PMK-182/PMK.05/2017 dan penjelasannya.",
      },
      {
        id: "operasional",
        title: "Operasional Rekening",
        desc: "Cara pembukaan, pengoperasian, pelaporan, hingga penutupan rekening.",
      },
      {
        id: "perubahan",
        title: "Perubahan Rekening",
        desc: "Cara mengubah data rekening, mengubah bank pembuka, hingga akibat mutasi pejabat.",
      },
      {
        id: "format",
        title: "Format Dokumen",
        desc: "Format dokumen yang tersedia, termasuk format PMK dan Non-PMK.",
      },
    ],
  },
  virtual: {
    id: "virtual",
    label: "Rekening Virtual",
    short: "Virtual",
    code: "BPG/BPP",
    reg: "PMK-183/PMK.05/2019",
    tagline: "Rekening Pengeluaran (BPG) dan Pengeluaran Pembantu (BPP)",
    pages: [
      {
        id: "regulasi",
        title: "Regulasi Rekening",
        desc: "Dasar hukum rekening virtual, termasuk PMK-183/PMK.05/2019 dan penjelasannya.",
      },
      {
        id: "operasional",
        title: "Operasional Rekening",
        desc: "Cara pembukaan, pengoperasian, penihilan saldo, hingga pelaporan.",
      },
      {
        id: "perubahan",
        title: "Perubahan Rekening",
        desc: "Cara mengubah bank mitra, hingga akibat mutasi pejabat.",
      },
      {
        id: "format",
        title: "Format Dokumen",
        desc: "Format dokumen yang tersedia, termasuk format PMK dan Non-PMK.",
      },
    ],
  },
  kkp: {
    id: "kkp",
    label: "Kartu Kredit Pemerintah",
    short: "KKP",
    code: "KKP",
    reg: "PMK-196/PMK.05/2018 jo. PMK-97/PMK.05/2021",
    cardReg: "PMK-196/2018 jo. PMK-97/2021",
    tagline: "KKP Belanja Operasional dan Perjalanan Dinas",
    pages: [
      {
        id: "regulasi",
        title: "Regulasi KKP",
        desc: "Dasar hukum KKP, termasuk PMK-196/PMK.05/2018 jo. PMK-97/PMK.05/2021 dan penjelasannya.",
      },
      {
        id: "operasional",
        title: "Operasional KKP",
        desc: "Cara pengajuan kartu, transaksi & pembayaran, penggantian UP, hingga pelaporan.",
      },
      {
        id: "perubahan",
        title: "Perubahan KKP",
        desc: "Cara mengganti pemegang kartu atau Admin KKP, menaikkan limit, hingga menangani kartu hilang/rusak.",
      },
      {
        id: "format",
        title: "Format Dokumen",
        desc: "Format dokumen yang tersedia untuk pengelolaan KKP.",
      },
    ],
  },
};

export const sectionList = [sections.giro, sections.virtual, sections.kkp];

export const jdih = {
  pmk182: "https://jdih.kemenkeu.go.id/dok/182-pmk-05-2017",
  pmk183: "https://jdih.kemenkeu.go.id/dok/183-pmk-05-2019",
  pmk196: "https://jdih.kemenkeu.go.id/dok/196-pmk-05-2018",
  pmk97: "https://jdih.kemenkeu.go.id/dok/97-pmk-05-2021",
};

export const DISCLAIMER =
  "Khusus internal DJP. Mengacu PMK yang berlaku umum, dengan penyesuaian praktik teknis internal yang tidak berlaku di instansi lain.";
