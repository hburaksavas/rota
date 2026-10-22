# Rota — sonraki oturumlar için proje notları

## Proje ve çalışma biçimi

- Rota, yazılım ürünleri üzerinde çalışan Product Owner'lar için Windows odaklı bir masaüstü uygulamasıdır.
- Güncel uygulama TypeScript arayüzünü WPF + WebView2 (.NET 10) masaüstü kabuğunda çalıştırır. Arayüz `src/app.ts`, stiller `src/styles.css`, native host `Rota.Desktop/` içindedir. Electron bağımlılığı ve kaynakları kaldırılmıştır.
- Ana branch `main`; GitHub uzak deposu `https://github.com/hburaksavas/rota.git`.
- Derleme: `npm run build`; Windows host derlemesi: `node scripts/run-dotnet.mjs build Rota.Desktop/Rota.Desktop.csproj`; uygulamayı başlatma: `npm start`; Windows x64 self-contained publish: `npm run build:desktop`; kabul testleri: `npm run test:acceptance`.
- Kullanıcı Türkçe konuşur; uygulama arayüzü ve kullanıcıya dönük dokümantasyon Türkçe olmalıdır.

## Ürün kararları ve arayüz tercihleri

- Uygulama yerel masaüstü deneyimi olarak geliştirilir; Outlook `.msg` sürükle-bırak akışı web kısıtları nedeniyle önemlidir.
- Arayüz kompakt, okunaklı ve modern olmalı. Büyük metin butonları yerine anlaşılır ikonlar ve tooltip'ler tercih edilir.
- Ana pencerenin tamamında sayfa kaydırması istenmez; liste ve dashboard içerikleri kendi dikey kaydırma alanlarına sahip olmalıdır. Backlog'da yatay kaydırmadan kaçınılır.
- Backlog Liste görünümünde sütun hizaları, seçim kutuları ve satır eylemleri dikkatle hizalanmalıdır. Board ve Liste davranışlarını ayrı ele al.
- Başlık, durum, tür ve atama satır içi düzenlemeleri dışarı tıklanınca otomatik kaydedilir. Açık `×` iptal simgesi düzenlemeyi iptal eder; eksik/geçersiz atama sessizce kaybolmamalıdır.
- Backlog başlığına tıklamak iş detayını açar; tür simgesi başlığın solunda yer alır. Tür seçicinin onay/iptal ikonları aynı satırda görünür olmalıdır.
- Bir işe birden fazla takım üyesi atanabilir. Üye seçimi takım bilgisini arka planda belirler. Takımlar ve üyeler çalışma alanı ayarlarından yönetilir; ayrı Takım Paneli yoktur.
- PO devir paketi kaldırıldı. Jira paneli mevcut uygulamada yer alır; canlı Jira sunucusu testleri ayrıca ele alınmalıdır.

## Feature takibi ve başlangıç verisi

- Feature'lar `docs/feature-takibi.md` içinde Markdown olarak izlenir. Yeni feature'ı Bekleyen bölümüne ekle; tamamlandığında Bekleyen'den çıkarıp Tamamlanan bölümüne taşı.
- Önceki kabul testi, tamamlanan feature ve bekleyen feature dokümanları silindi; içerikleri geri yükleme. Yeni takip dosyası temiz bir başlangıçtır.
- Rota'nın ürün planı feature kayıtlarını kaynak koddan uygulama verisine aktarma. Uygulama ilk kullanımda bankacılık alanına ait örnek/test çalışma alanı verisiyle açılır.
- Önceden kaydedilmiş kullanıcı çalışma alanını, açıkça istenmedikçe sıfırlama veya silme.
- Son tamamlanan ürün feature'ı ROTA-NEXT-001'dir; karar kayıtları `WorkspaceState.decisions` içinde yerel çalışma alanıyla birlikte saklanır.

## Değişiklikleri tamamlama

- İstenen işi mevcut kod ve ürün kararlarıyla uyumlu biçimde tamamla; build ile doğrulama yeterliyse `npm run build` kullan.
- GitHub'a push yalnızca kullanıcı istediğinde yapılır. Push öncesinde branch'i, değişiklikleri ve çalışma ağacını kontrol et.
