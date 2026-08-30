import { HtmlElementInfo, DebugChallenge, QuizQuestion } from '../types';

export const HTML_ELEMENTS: HtmlElementInfo[] = [
  {
    tag: 'h1',
    name: 'Heading (Tajuk)',
    category: 'text',
    description: 'Digunakan untuk menghasilkan tajuk halaman atau seksyen dari h1 (paling utama) hingga h6 (paling kecil).',
    syntax: '<h1>Tajuk Utama</h1>\n<h2>Subtajuk</h2>',
    example: '<h1>Selamat Datang ke Kolej Komuniti</h1>\n<h2>Kursus Sijil Teknologi Maklumat</h2>\n<h3>Topik 2: Pengenalan HTML</h3>',
    outputPreview: '<h1 style="font-size: 24px; font-weight: bold; margin-bottom: 8px; color: #0284c7;">Selamat Datang ke Kolej Komuniti</h1><h2 style="font-size: 18px; font-weight: 600; margin-bottom: 6px; color: #0f172a;">Kursus Sijil Teknologi Maklumat</h2><h3 style="font-size: 15px; font-weight: 600; color: #475569;">Topik 2: Pengenalan HTML</h3>',
    explanation: 'Tag heading memberi hierarki struktur kepada dokumen. <h1> ialah tajuk peringkat tertinggi.'
  },
  {
    tag: 'p',
    name: 'Paragraph (Perenggan)',
    category: 'text',
    description: 'Digunakan untuk membina blok perenggan teks biasa pada halaman web.',
    syntax: '<p>Teks perenggan di sini.</p>',
    example: '<p>HTML merupakan bahasa asas untuk membina laman web.</p>\n<p>Pelajar semester 2 akan mempelajari elemen dan form HTML.</p>',
    outputPreview: '<p style="margin-bottom: 8px; line-height: 1.6; color: #334155;">HTML merupakan bahasa asas untuk membina laman web.</p><p style="line-height: 1.6; color: #334155;">Pelajar semester 2 akan mempelajari elemen dan form HTML.</p>',
    explanation: 'Browser secara automatik menambah sedikit ruang kosong (margin) di atas dan di bawah setiap elemen <p>.'
  },
  {
    tag: '!--',
    name: 'Comments (Komen Kod)',
    category: 'structural',
    description: 'Digunakan untuk meletakkan nota penerangan dalam kod sumber tanpa dipaparkan pada skrin browser pengguna.',
    syntax: '<!-- Ini ialah komen HTML -->',
    example: '<!-- Bahagian Header Mula -->\n<h1>Portal Pelajar STM</h1>\n<!-- Bahagian Header Tamat -->',
    outputPreview: '<div style="font-family: monospace; color: #64748b; font-style: italic; margin-bottom: 6px;">&lt;!-- Komen tidak akan dipaparkan di browser --&gt;</div><h1 style="font-size: 20px; font-weight: bold; color: #0284c7;">Portal Pelajar STM</h1>',
    explanation: 'Komen sangat berguna untuk membantu pembangun web dan rakan sepasukan memahami struktur kod.'
  },
  {
    tag: 'div',
    name: 'Div (Division / Kontena)',
    category: 'structural',
    description: 'Elemen kontena (block-level) yang digunakan untuk mengumpulkan elemen-elemen lain bagi tujuan susun atur (layout).',
    syntax: '<div>\n  <h2>Kad Maklumat</h2>\n  <p>Kandungan di dalam div.</p>\n</div>',
    example: '<div style="border: 2px solid #0284c7; padding: 12px; border-radius: 8px; background: #f0f9ff;">\n  <h3 style="color: #0369a1; margin: 0 0 6px 0;">Pengumuman STM</h3>\n  <p style="color: #334155; margin: 0;">Bengkel Web Development bermula jam 9.00 pagi esok.</p>\n</div>',
    outputPreview: '<div style="border: 2px solid #0284c7; padding: 12px; border-radius: 8px; background: #f0f9ff;"><h3 style="font-size: 16px; font-weight: bold; color: #0369a1; margin: 0 0 6px 0;">Pengumuman STM</h3><p style="color: #334155; margin: 0; font-size: 14px;">Bengkel Web Development bermula jam 9.00 pagi esok.</p></div>',
    explanation: '<div> tidak mempunyai gaya lalai khas selain menjadi blok yang mengumpulkan elemen di dalamnya.'
  },
  {
    tag: 'a',
    name: 'Links / Hyperlink (Pautan)',
    category: 'nav',
    description: 'Digunakan untuk mencipta pautan navigasi ke halaman lain atau dokumen luar menggunakan attribute href.',
    syntax: '<a href="https://example.com">Lawati Website</a>',
    example: '<a href="https://www.kolejkomuniti.edu.my" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 500;">Portal Rasmi Kolej Komuniti</a>',
    outputPreview: '<a href="#" style="color: #0284c7; text-decoration: underline; font-weight: 500;">Portal Rasmi Kolej Komuniti</a><p style="font-size: 12px; color: #64748b; margin-top: 4px;">(Klik pautan untuk navigasi)</p>',
    explanation: 'Attribute href (Hypertext Reference) menentukan URL destinasi yang akan dituju apabila pengguna klik pautan.'
  },
  {
    tag: 'img',
    name: 'Images (Imej)',
    category: 'media',
    description: 'Digunakan untuk memasukkan gambar ke dalam laman web menggunakan attribute src (sumber) dan alt (teks alternatif).',
    syntax: '<img src="logo.png" alt="Logo Kolej Komuniti">',
    example: '<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&auto=format&fit=crop&q=80" alt="Komputer Web Development" style="max-width: 100%; height: 120px; border-radius: 6px; object-fit: cover;">',
    outputPreview: '<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&auto=format&fit=crop&q=80" alt="Komputer Web Development" style="max-width: 100%; height: 120px; border-radius: 6px; object-fit: cover;"><p style="font-size: 12px; color: #64748b; margin-top: 4px;">Imej dipaparkan menggunakan src dan dilindungi teks alt.</p>',
    explanation: 'Tag <img> ialah empty tag (tiada closing tag). Attribute alt penting jika gambar gagal dimuatkan atau untuk pembaca skrin (accessibility).'
  },
  {
    tag: 'table',
    name: 'Tables (Jadual)',
    category: 'data',
    description: 'Digunakan untuk menstrukturkan data dalam bentuk baris (tr), lajur tajuk (th), dan sel data (td).',
    syntax: '<table border="1">\n  <tr>\n    <th>Nama</th>\n    <th>Kursus</th>\n  </tr>\n  <tr>\n    <td>Ali</td>\n    <td>STM</td>\n  </tr>\n</table>',
    example: '<table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">\n  <thead>\n    <tr style="background: #e0f2fe; color: #0369a1;">\n      <th style="padding: 8px; border: 1px solid #bae6fd;">Nama Pelajar</th>\n      <th style="padding: 8px; border: 1px solid #bae6fd;">Program</th>\n      <th style="padding: 8px; border: 1px solid #bae6fd;">Semester</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td style="padding: 8px; border: 1px solid #e2e8f0;">Ali Bin Ahmad</td>\n      <td style="padding: 8px; border: 1px solid #e2e8f0;">STM</td>\n      <td style="padding: 8px; border: 1px solid #e2e8f0;">2</td>\n    </tr>\n    <tr style="background: #f8fafc;">\n      <td style="padding: 8px; border: 1px solid #e2e8f0;">Siti Nurhaliza</td>\n      <td style="padding: 8px; border: 1px solid #e2e8f0;">STM</td>\n      <td style="padding: 8px; border: 1px solid #e2e8f0;">2</td>\n    </tr>\n  </tbody>\n</table>',
    outputPreview: '<table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;"><thead><tr style="background: #e0f2fe; color: #0369a1;"><th style="padding: 6px; border: 1px solid #bae6fd;">Nama Pelajar</th><th style="padding: 6px; border: 1px solid #bae6fd;">Program</th><th style="padding: 6px; border: 1px solid #bae6fd;">Semester</th></tr></thead><tbody><tr><td style="padding: 6px; border: 1px solid #e2e8f0;">Ali Bin Ahmad</td><td style="padding: 6px; border: 1px solid #e2e8f0;">STM</td><td style="padding: 6px; border: 1px solid #e2e8f0;">2</td></tr><tr style="background: #f8fafc;"><td style="padding: 6px; border: 1px solid #e2e8f0;">Siti Nurhaliza</td><td style="padding: 6px; border: 1px solid #e2e8f0;">STM</td><td style="padding: 6px; border: 1px solid #e2e8f0;">2</td></tr></tbody></table>',
    explanation: '<table> membungkus keseluruhan jadual, <tr> membina baris (table row), <th> membina sel tajuk tebal, dan <td> membina sel data biasa.'
  },
  {
    tag: 'ul',
    name: 'List (Senarai - ul & ol)',
    category: 'data',
    description: 'Digunakan untuk menyenaraikan maklumat sama ada dalam senarai tidak bernombor (ul) atau senarai bernombor (ol) dengan item list (li).',
    syntax: '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n\n<ol>\n  <li>Langkah 1</li>\n  <li>Langkah 2</li>\n</ol>',
    example: '<h4>Modul Web Development (ul):</h4>\n<ul>\n  <li>HTML5 Semantic</li>\n  <li>CSS3 Styling</li>\n  <li>JavaScript Interactivity</li>\n</ul>',
    outputPreview: '<div style="font-size: 14px;"><strong style="color: #0369a1;">Modul Web Development (ul):</strong><ul style="list-style-type: disc; padding-left: 20px; margin-top: 4px; color: #334155;"><li>HTML5 Semantic</li><li>CSS3 Styling</li><li>JavaScript Interactivity</li></ul></div>',
    explanation: '<ul> menghasilkan bullet points (bullet points), manakala <ol> menghasilkan nombor 1, 2, 3 secara automatik.'
  },
  {
    tag: 'br',
    name: 'Break (Pemisah Baris)',
    category: 'text',
    description: 'Memaksa teks selepasnya turun ke baris baharu tanpa memulakan perenggan baharu (single line break).',
    syntax: 'Baris Pertama<br>Baris Kedua',
    example: 'Kolej Komuniti Kepala Batas<br>Jalan Tun Hamdan Sheikh Tahir<br>13200 Kepala Batas, Pulau Pinang.',
    outputPreview: '<p style="line-height: 1.5; color: #334155; font-size: 14px;">Kolej Komuniti Kepala Batas<br>Jalan Tun Hamdan Sheikh Tahir<br>13200 Kepala Batas, Pulau Pinang.</p>',
    explanation: '<br> ialah empty element dan tidak memerlukan closing tag.'
  },
  {
    tag: 'header',
    name: 'Header (Kepala Halaman)',
    category: 'structural',
    description: 'Elemen semantik HTML5 yang mewakili bahagian atas halaman web atau pengenalan seksyen, biasanya mengandungi logo, tajuk, dan menu navigasi.',
    syntax: '<header>\n  <h1>Nama Kolej</h1>\n  <nav>Menu Navigasi</nav>\n</header>',
    example: '<header style="background: #0284c7; color: white; padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">\n  <h2 style="margin: 0; font-size: 16px;">Portal STM TVET</h2>\n  <span style="font-size: 12px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px;">Sesi II 2026</span>\n</header>',
    outputPreview: '<header style="background: #0284c7; color: white; padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;"><h2 style="margin: 0; font-size: 16px; font-weight: bold;">Portal STM TVET</h2><span style="font-size: 12px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px;">Sesi II 2026</span></header>',
    explanation: 'Penggunaan <header> menjadikan struktur laman web lebih bermakna (semantic) untuk SEO dan pembaca skrin.'
  },
  {
    tag: 'footer',
    name: 'Footer (Kaki Halaman)',
    category: 'structural',
    description: 'Elemen semantik HTML5 yang mewakili bahagian bawah halaman web, mengandungi maklumat hak cipta, pautan penting, atau kontak.',
    syntax: '<footer>\n  <p>&copy; 2026 Kolej Komuniti Malaysia</p>\n</footer>',
    example: '<footer style="background: #1e293b; color: #94a3b8; padding: 12px; text-align: center; border-radius: 6px; font-size: 13px;">\n  <p style="margin: 0;">&copy; 2026 Jabatan Pengajian Politeknik & Kolej Komuniti (JPPKK). Hak Cipta Terpelihara.</p>\n</footer>',
    outputPreview: '<footer style="background: #1e293b; color: #94a3b8; padding: 12px; text-align: center; border-radius: 6px; font-size: 13px;"><p style="margin: 0;">&copy; 2026 Jabatan Pengajian Politeknik & Kolej Komuniti (JPPKK). Hak Cipta Terpelihara.</p></footer>',
    explanation: '<footer> diletakkan di bahagian paling bawah dokumen atau seksyen untuk menandakan penutup maklumat.'
  }
];

export const DEBUG_CHALLENGES: DebugChallenge[] = [
  {
    id: 1,
    title: 'Cabaran 1: Missing Closing Tag',
    errorType: 'Tag Tidak Ditutup',
    initialCode: '<h1>Selamat Datang ke STM21673<h1>\n<p>Belajar asas HTML di Kolej Komuniti.</p>',
    targetCriteria: (code: string) => {
      const normalized = code.replace(/\s+/g, ' ').trim();
      return /<h1>.*<\/h1>/i.test(normalized) && !/<h1>.*<h1>/i.test(normalized);
    },
    hint: 'Perhatikan tag penutup bagi heading. Tag penutup mesti ada garis condong ke depan: </h1>, bukan <h1>.',
    solution: '<h1>Selamat Datang ke STM21673</h1>\n<p>Belajar asas HTML di Kolej Komuniti.</p>',
    explanation: 'Tag HTML berpasangan memerlukan pembuka <tag> dan penutup </tag> dengan simbol slash /.'
  },
  {
    id: 2,
    title: 'Cabaran 2: Salah Attribute pada Image',
    errorType: 'Attribute Tidak Tepat',
    initialCode: '<img href="logo_kolej.png" alt="Logo Kolej Komuniti">',
    targetCriteria: (code: string) => {
      const normalized = code.toLowerCase();
      return normalized.includes('src=') && !normalized.includes('href=') && normalized.includes('<img');
    },
    hint: 'Elemen <img> menggunakan attribute src (source) untuk sumber gambar, bukan href.',
    solution: '<img src="logo_kolej.png" alt="Logo Kolej Komuniti">',
    explanation: 'Attribute src digunakan untuk menyertakan fail media luaran seperti imej, manakala href digunakan untuk pautan link <a>.'
  },
  {
    id: 3,
    title: 'Cabaran 3: Pautan Link Tidak Lengkap',
    errorType: 'Sintaks Tag <a> Rosak',
    initialCode: '<a "https://www.kolejkomuniti.edu.my">Portal Rasmi</a>',
    targetCriteria: (code: string) => {
      const normalized = code.toLowerCase();
      return normalized.includes('href=') && normalized.includes('<a ') && normalized.includes('</a>');
    },
    hint: 'Tag <a> memerlukan nama attribute "href=" sebelum alamat URL.',
    solution: '<a href="https://www.kolejkomuniti.edu.my">Portal Rasmi</a>',
    explanation: 'Untuk membina link yang berfungsi, sintaks wajib ialah <a href="URL">Teks Pautan</a>.'
  },
  {
    id: 4,
    title: 'Cabaran 4: Struktur Jadual (Table) Tidak Lengkap',
    errorType: 'Tag Row (tr) Hilang',
    initialCode: '<table>\n  <th>Nama</th>\n  <th>Kursus</th>\n  <td>Ali</td>\n  <td>STM</td>\n</table>',
    targetCriteria: (code: string) => {
      const normalized = code.toLowerCase();
      return normalized.includes('<tr>') && normalized.includes('</tr>') && normalized.includes('<th>') && normalized.includes('<td>');
    },
    hint: 'Setiap baris data dan tajuk dalam table MESTI dibungkus dalam tag <tr> (table row).',
    solution: '<table>\n  <tr>\n    <th>Nama</th>\n    <th>Kursus</th>\n  </tr>\n  <tr>\n    <td>Ali</td>\n    <td>STM</td>\n  </tr>\n</table>',
    explanation: 'Sel <th> dan <td> tidak boleh diletakkan secara langsung dalam <table> tanpa dibungkus dalam <tr>.'
  },
  {
    id: 5,
    title: 'Cabaran 5: Input Type Salah untuk Kata Laluan',
    errorType: 'Input Type Kurang Tepat',
    initialCode: '<label>Masukkan Password:</label>\n<input type="text" name="katalaluan">',
    targetCriteria: (code: string) => {
      const normalized = code.toLowerCase();
      return normalized.includes('type="password"') || normalized.includes("type='password'");
    },
    hint: 'Untuk menyembunyikan aksara kata laluan dengan simbol bintik/asterisk (*), tukar type="text" kepada type="password".',
    solution: '<label>Masukkan Password:</label>\n<input type="password" name="katalaluan">',
    explanation: '<input type="password"> secara automatik menyembunyikan input pengguna demi keselamatan.'
  }
];

export const PREDICT_QUESTIONS = [
  {
    id: 1,
    question: 'Apakah hasil paparan (output) kod HTML di bawah pada skrin browser?',
    code: '<h1>STM21673</h1>\n<p>Belajar HTML<br>di makmal komputer.</p>',
    options: [
      { id: 'A', text: 'Semua teks dipaparkan dalam satu baris panjang.' },
      { id: 'B', text: 'Tajuk besar "STM21673", diikuti perenggan di mana "di makmal komputer." turun ke baris baharu kerana tag <br>.' },
      { id: 'C', text: 'Perkataan <br> akan muncul sebagai teks biasa di skrin.' },
      { id: 'D', text: 'Teks "STM21673" dan teks "Belajar HTML" digabungkan tanpa jarak.' }
    ],
    correctId: 'B',
    explanation: '<h1> memaparkan tajuk tebal dan besar. Tag <br> memaksa teks "di makmal komputer." turun ke baris seterusnya dalam perenggan yang sama.'
  },
  {
    id: 2,
    question: 'Berdasarkan kod senarai berikut, bagaimanakah browser akan memaparkan item senarai?',
    code: '<ol>\n  <li>Buka Browser</li>\n  <li>Taip URL</li>\n  <li>Tekan Enter</li>\n</ol>',
    options: [
      { id: 'A', text: 'Senarai bernombor: 1. Buka Browser, 2. Taip URL, 3. Tekan Enter.' },
      { id: 'B', text: 'Senarai bullet point bulatan hitam (•).' },
      { id: 'C', text: 'Tiga perkataan di dalam kotak jadual.' },
      { id: 'D', text: 'Teks mendatar tanpa sebarang simbol penanda.' }
    ],
    correctId: 'A',
    explanation: 'Tag <ol> (Ordered List) menghasilkan senarai berurutan bernombor automatik (1, 2, 3...).'
  },
  {
    id: 3,
    question: 'Jika fail imej "banner.jpg" tidak dijumpai dalam folder, apakah yang akan dipaparkan?',
    code: '<img src="banner.jpg" alt="Pemandangan Kampus Kolej Komuniti">',
    options: [
      { id: 'A', text: 'Skrin browser akan crash atau menjadi putih kosong.' },
      { id: 'B', text: 'Ikon broken image bersama teks alternatif "Pemandangan Kampus Kolej Komuniti".' },
      { id: 'C', text: 'Browser akan memuat turun gambar lain dari internet secara automatik.' },
      { id: 'D', text: 'Kotak mesej amaran pop-up akan keluar.' }
    ],
    correctId: 'B',
    explanation: 'Attribute alt (alternative text) berfungsi memaparkan penerangan teks apabila fail imej rosak atau tidak wujud.'
  },
  {
    id: 4,
    question: 'Berapakah jumlah baris (row) dan jumlah lajur (column) bagi jadual HTML ini?',
    code: '<table border="1">\n  <tr>\n    <th>Kod</th>\n    <th>Kursus</th>\n  </tr>\n  <tr>\n    <td>STM21673</td>\n    <td>Web Development</td>\n  </tr>\n  <tr>\n    <td>STM21563</td>\n    <td>Database System</td>\n  </tr>\n</table>',
    options: [
      { id: 'A', text: '2 Baris, 3 Lajur' },
      { id: 'B', text: '3 Baris, 2 Lajur' },
      { id: 'C', text: '6 Baris, 1 Lajur' },
      { id: 'D', text: '3 Baris, 6 Lajur' }
    ],
    correctId: 'B',
    explanation: 'Terdapat 3 tag <tr> (bermakna 3 baris: 1 header row + 2 data rows) dan setiap baris mempunyai 2 sel (2 lajur).'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: 'mcq',
    question: 'Apakah maksud singkatan bagi HTML?',
    options: [
      'HyperText Markup Language',
      'HighText Machine Language',
      'HyperTool Modern Language',
      'Home Tool Markup Language'
    ],
    correctIndex: 0,
    explanation: 'HTML bermaksud HyperText Markup Language, bahasa penanda standard untuk membina dokumen web.'
  },
  {
    id: 2,
    type: 'identify',
    question: 'Tag manakah yang digunakan untuk menentukan tajuk yang muncul pada tab browser?',
    options: [
      '<header>',
      '<h1>',
      '<title>',
      '<head>'
    ],
    correctIndex: 2,
    explanation: 'Tag <title> terletak di dalam <head> dan menentukan tajuk halaman pada tab pelayar web.'
  },
  {
    id: 3,
    type: 'tf',
    question: 'Kandungan visual laman web yang dilihat oleh pengguna mestilah diletakkan di dalam tag <body>.',
    options: [
      'Benar (True)',
      'Palsu (False)'
    ],
    correctIndex: 0,
    explanation: 'Benar. Semua elemen visual seperti teks, imej, butang, dan jadual diletakkan dalam tag <body>.'
  },
  {
    id: 4,
    type: 'error',
    question: 'Antara berikut, yang manakah penulisan tag imej yang BETUL dalam HTML?',
    options: [
      '<image href="logo.png" alt="Logo">',
      '<img src="logo.png" alt="Logo">',
      '<img link="logo.png"></img>',
      '<picture file="logo.png">'
    ],
    correctIndex: 1,
    explanation: 'Sintaks standard bagi imej ialah <img src="URL" alt="Penerangan">.'
  },
  {
    id: 5,
    type: 'mcq',
    question: 'Apakah perbezaan utama antara elemen <ul> dan <ol>?',
    options: [
      '<ul> menggunakan nombor manakala <ol> menggunakan bullet points.',
      '<ul> menghasilkan bullet points (tidak berurutan), manakala <ol> bernombor automatik.',
      '<ul> untuk imej dan <ol> untuk teks.',
      'Tiada sebarang perbezaan antara keduanya.'
    ],
    correctIndex: 1,
    explanation: '<ul> (Unordered List) menghasilkan bullet, <ol> (Ordered List) menghasilkan nombor berurutan 1, 2, 3.'
  },
  {
    id: 6,
    type: 'identify',
    question: 'Form element manakah yang membolehkan pengguna memilih HANYA SATU pilihan daripada sekumpulan pilihan?',
    options: [
      '<input type="checkbox">',
      '<input type="radio">',
      '<textarea>',
      '<input type="text">'
    ],
    correctIndex: 1,
    explanation: 'Radio button (<input type="radio">) digunakan untuk pilihan eksklusif tunggal (contoh: Jantina Lelaki / Perempuan).'
  },
  {
    id: 7,
    type: 'predict',
    question: 'Apakah attribute pada tag <a> yang menentukan alamat destinasi pautan?',
    options: [
      'src',
      'link',
      'href',
      'target_url'
    ],
    correctIndex: 2,
    explanation: 'Attribute href (Hypertext Reference) mengandungi alamat laman web destinasi bagi tag <a>.'
  },
  {
    id: 8,
    type: 'mcq',
    question: 'Mengapakah kaedah POST lebih selamat berbanding GET semasa menghantar data kata laluan (password)?',
    options: [
      'POST menyulitkan (encrypt) data secara automatik.',
      'POST tidak memaparkan data sensitif secara terbuka pada ruangan URL pelayar.',
      'POST menghantar data lebih laju daripada GET.',
      'POST tidak memerlukan borang HTML.'
    ],
    correctIndex: 1,
    explanation: 'GET memaparkan parameter data terus di ruangan URL (query string), manakala POST menghantar data di dalam HTTP request body.'
  },
  {
    id: 9,
    type: 'identify',
    question: 'Tag manakah yang betul untuk membina menu pilihan drop-down (combo box) dalam borang?',
    options: [
      '<dropdown>',
      '<listbox>',
      '<select>',
      '<combo>'
    ],
    correctIndex: 2,
    explanation: '<select> bersama tag <option> digunakan untuk membina menu drop-down / combo box.'
  },
  {
    id: 10,
    type: 'error',
    question: 'Tag manakah yang merupakan baris bagi jadual (table row)?',
    options: [
      '<td>',
      '<th>',
      '<tr>',
      '<table-row>'
    ],
    correctIndex: 2,
    explanation: '<tr> bermaksud Table Row (baris jadual), manakala <th> ialah table header dan <td> ialah table data.'
  }
];

export const COMMON_MISTAKES = [
  {
    id: 1,
    title: '1. Terlupa Menutup Tag (Missing Closing Tag)',
    problem: 'Memulakan tag berpasangan seperti <h1> atau <p> tetapi terlupa meletakkan penutup </tag>.',
    wrongCode: '<h1>Selamat Datang ke Kolej Komuniti\n<p>Ini teks perenggan saya.',
    correctCode: '<h1>Selamat Datang ke Kolej Komuniti</h1>\n<p>Ini teks perenggan saya.</p>',
    tip: 'Sentiasa taip kedua-dua tag pembuka dan penutup terlebih dahulu sebelum mengisi kandungan di tengah.'
  },
  {
    id: 2,
    title: '2. Salah Guna Attribute: href vs src',
    problem: 'Menggunakan href pada imej atau menggunakan src pada pautan link.',
    wrongCode: '<!-- SALAH -->\n<img href="foto.jpg">\n<a src="about.html">Tentang Kami</a>',
    correctCode: '<!-- BETUL -->\n<img src="foto.jpg" alt="Foto">\n<a href="about.html">Tentang Kami</a>',
    tip: 'Ingat formula: src = Source (sumber fail luaran seperti gambar), href = Hypertext Reference (alamat pautan navigation).'
  },
  {
    id: 3,
    title: '3. Tidak Meletakkan Tag <tr> dalam Jadual',
    problem: 'Memasukkan sel <th> atau <td> terus ke dalam <table> tanpa membungkusnya dalam baris <tr>.',
    wrongCode: '<!-- SALAH -->\n<table>\n  <td>Ali</td>\n  <td>STM</td>\n</table>',
    correctCode: '<!-- BETUL -->\n<table>\n  <tr>\n    <td>Ali</td>\n    <td>STM</td>\n  </tr>\n</table>',
    tip: 'Struktur jadual mestilah hierarki: Table → Row (tr) → Data Cells (td/th).'
  },
  {
    id: 4,
    title: '4. Menulis Teks Kandungan di Luar Tag <body>',
    problem: 'Meletakkan perenggan atau tajuk terus di bawah tag <head> atau di luar <html>.',
    wrongCode: '<head>\n  <h1>Tajuk Halaman</h1>\n</head>',
    correctCode: '<head>\n  <title>Tajuk Browser Tab</title>\n</head>\n<body>\n  <h1>Tajuk Halaman</h1>\n</body>',
    tip: '<head> hanya untuk maklumat meta dokumen (seperti <title>), manakala SEMUA visual dipaparkan dalam <body>.'
  },
  {
    id: 5,
    title: '5. Menggunakan <input type="text"> untuk Password',
    problem: 'Menggunakan teks biasa menyebabkan kata laluan pengguna kelihatan jelas kepada orang di sekeliling.',
    wrongCode: '<label>Password:</label>\n<input type="text" name="pwd">',
    correctCode: '<label>Password:</label>\n<input type="password" name="pwd">',
    tip: 'Gunakan type="password" agar pelayar menyamarkan input teks sebagai bintik keselamatan (masking).'
  },
  {
    id: 6,
    title: '6. Lupa Meletakkan Attribute name pada Radio Button Kumpulan',
    problem: 'Jika attribute name berbeza, pengguna boleh memilih semua pilihan radio sekaligus!',
    wrongCode: '<input type="radio" name="pilihanA"> Lelaki\n<input type="radio" name="pilihanB"> Perempuan',
    correctCode: '<input type="radio" name="jantina" value="L"> Lelaki\n<input type="radio" name="jantina" value="P"> Perempuan',
    tip: 'Semua radio button dalam satu soalan/kategori MESTI berkongsi nilai attribute name yang sama (contoh: name="jantina").'
  }
];

export const INDUSTRY_TIPS = [
  {
    id: 1,
    icon: 'code',
    title: 'Indentation & Kebersihan Kod',
    content: 'Walaupun browser boleh membaca HTML yang rapat tanpa jarak, penggunaan ruang tab (indentation) 2 atau 4 ruang memudahkan anda dan pensyarah menyemak struktur kod bertingkat.'
  },
  {
    id: 2,
    icon: 'file',
    title: 'Penamaan Fail yang Standard',
    content: 'Gunakan huruf kecil semua (lowercase), elakkan ruang kosong (gunakan tanda sengkang seperti tentang-kami.html), dan pastikan fail utama dinamakan index.html.'
  },
  {
    id: 3,
    icon: 'eye',
    title: 'Sentiasa Gunakan alt pada Imej',
    content: 'Attribute alt bukan sahaja membantu jika sambungan internet perlahan, malah merupakan piawaian wajib untuk pembaca skrin (screen reader) bagi golongan OKU penglihatan.'
  },
  {
    id: 4,
    icon: 'layout',
    title: 'Gunakan Elemen Semantik HTML5',
    content: 'Gunakan elemen bermakna seperti <header>, <footer>, dan <nav> berbanding sekadar menggunakan <div> kosong untuk memudahkan enjin carian Google mengindeks laman web anda.'
  }
];
