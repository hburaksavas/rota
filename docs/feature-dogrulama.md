# Feature doğrulaması

## 4 Kasım 2026 — Ortak çalışma alanı araç çubuğu

Kişisel alan menüsünün kaldırılması ve beş ortak araç düğmesi kontrol edildi. Hızlı ve ayrıntılı formdan görev/not ekleme sonrası ekran, proje ve arama kapsamı aynı kalır. Eski görev/not kimliklerinin korunması; arama, görev tamamlama ve tamamlananları gösterme, kayıt açılışı, nottan görev oluşturma, Escape ile kapatma/odağın araç çubuğuna dönmesi ve ok tuşlarıyla gezinme test edildi.

Açık/koyu ve 1024×768 %125 ekran görüntüleri incelendi. Kayıt panelinin backlog başlıklarının arkasında kalmaması hit-test ile doğrulandı. `npm run build`, `npm run test:features` ve `git diff --check` geçti. Mevcut kullanıcı çalışma alanı sıfırlanmadı.

## 4 Kasım 2026 — Önceki/sonraki içerik animasyonu

Hedefli testte ileri/geri ve hızlı ardışık geçişler sırasında panel ile arka planın aynı DOM düğümleri kaldığı ve panel açılış animasyonunun tekrarlanmadığı doğrulandı. İçerikte ileri/geri için farklı animasyon adları, azaltılmış hareket tercihinde `none`, ilk kayıt sınırı, tek gezinme çubuğu, klavye odağı ve seçili sekme kontrol edildi. Boş başlık geçişi durdurur; geçerli başlık yeni işe geçmeden kaydedilir.

## 4 Kasım 2026 — Kompakt gruplar ve koyu tema

Üç bilgi grubunun kapalı başlaması, yalnızca Özet sekmesinde görünmesi ve gruplar açıldığında alanların kayıt/iptal/validasyon akışlarının çalışması hedefli testlerle kontrol edildi. Alt eylemlerde metin ve gereksiz açıklama bulunmaması, erişilebilir ikonların korunması denetlendi. Özet, Aktivite, Ekler ve İlişkiler ekran görüntüleri koyu temada incelendi; son aktivite vurgusu dahil açık renkli yüzeyler giderildi. Kayıttan sonra silinen düğmeye ait tooltip'in ekranda kalması da düzeltildi.

## 4 Kasım 2026 — Merkezde satır içi iş detayı

Hedefli Edge testleri panelin yatay merkezini, başlık/açıklama/alan/etiket/durum/öncelik/tahmin kayıtlarını, atama doğrulamasını, bağımlılık/ilişki seçimini, ek ve not güncellemelerini denetler. Güncellemeler boyunca aynı `.detail-modal` DOM düğümü açık kalır; aktif sekme ve yazılmakta olan not korunur. Boş başlık, geçersiz üye ve depolama hatası alanı açık tutar. × ile iptal önceki değeri korur. Eski düzenleme girişleri aynı iş detayını açar; ayrı iş düzenleme formu üretilmez.

## 4 Kasım 2026 — Sekiz özelliğin kaldırılması

`npm run test:features` kaldırılan arayüzlerin görünmediğini, eski WIP ve kontrol ayarlarının geçişleri engellemediğini, tahminin gerekçesiz düzenlenebildiğini ve eski kayıt alanlarının kaydetme sonrasında korunduğunu denetler. Günlük süre/taşıma, standart Board, tema ve diğer mevcut akışların kontrolleri korunur. Birleşik merkez kaldırıldı; kişisel görev/blokaj hatırlatmaları kendi zaman ve tekrar alanlarını kullanır.

## 3 Kasım 2026 — Önceki uygulama turu (tarihsel)

3 Kasım 2026. Kullanıcı çalışma alanı değiştirilmeden, ayrı headless Edge oturumunda çalışıldı.

## Komutlar

- `npm run build`
- `node --check scripts/start-node-webview.mjs`
- `npm run test:features`
- `git diff --check`

Hedefli test gerçek arayüz kaynaklarını esbuild ile derler; masaüstü köprüsünü sahte yanıtlarla sağlar. Excel aktarımındaki boş başlık/geçersiz tarih/tekrar, taslak kurtarma ve açık iptal, geniş/dar detay paneli, açık/koyu/yüksek kontrast, risk formu, güvenli metin, tanılama, Jira'dan başlık alma, mevcut işe e-posta ekleme, sprint kapsam çıkışı, gerekçeli durum istisnası, atamayı değiştir/kaldır, şablon etiketleri ve bildirim tekrarsızlığı ile tahmin değişikliği geçmişi, sözlük yeniden adlandırma, günlük bütçe/taşıma, birleştirme/geri alma, dört Board kulvarında tekil kart kimlikleri ve Jira 204 yanıtı kapsanır. Canlı Jira yazma ve Outlook ayrıştırması bu test tarafından doğrulanmaz.

1024×768 ve 1366×768 boyutlarında %125 ölçekte yeni iş, kontrol listesi, risk ve tanılama dialoglarının pencere sınırlarına sığması test edildi. Hızlı formdan ayrıntılı forma taslak aktarımı, sanal listede seçim korunumu ve Board üzerinde 40/80 kartlık artımlı yükleme de doğrulandı.

Açık ve koyu Excel dialog ekran görüntüleri görsel olarak incelendi. Yeni yüzeyler mevcut tema değişkenlerini, form kontrollerini ve içerik kaydırmasını kullanır. Tüm ekranlarda görsel regresyon iddiası yoktur.

## 5.000 iş referans ölçümü

| Ortam / ölçü | Değer |
| --- | --- |
| İşlemci | Intel Core i7-12700, 20 mantıksal işlemci |
| Sistem | Windows x64, 10.0.26300 |
| Çalıştırıcı | Node.js 25.8.0, headless Edge 156 |
| Pencere | 1366 × 768 |
| Veri | Aynı örnekten üretilen 5.000 Yeni durumlu iş |
| Önce | Filtre çizimi yaklaşık 7.399 ms, 5.000 DOM iş satırı |
| Sonra | Tekrarlanan yerel koşularda yaklaşık 39–52 ms, 60 DOM iş satırı |
| Denetim | Filtre çizimi <300 ms; son satıra kaydırınca PERF-4999 erişilebilir |

Süre `updateBacklogRows()` çağrısı içindir; 120 ms arama gecikmesini, başlatmayı, tüm ekranı yeniden kurmayı veya fiziksel WebView2 görüntüleme süresini temsil etmez. Eşik donanıma bağlıdır. Board bağımsız olarak durum başına 40 kartlık artımlı yükleme kullanır; Liste'nin satır yüksekliği ölçümünü paylaşmaz.

## Sınırlar

Kabulü açık maddeler `feature-takibi.md` dosyasındadır. Mevcut native kabul paketi bu turda çalıştırılmadı; eski kayıtta WebView2 bağlantı sorunu bildirilmişti. Kullanıcı verisi sıfırlanmadı ve GitHub'a push yapılmadı.
# Masaüstü kapanışı — 4 Kasım 2026

`npm run test:shutdown`: İzole geçici profilde gerçek WebViewJS/WebView2 penceresi açılır ve native pencere kapatma çağrısı yapılır. Host sürecinin zorla sonlandırılmadan çıkması, pencere/WebView/bağlam nesnelerinin dispose edilmesi ve HTTP portunun yeniden dinlenebilmesi denetlenir. Test iki ayrı açılış/kapanış yapar; kullanıcı çalışma alanını değiştirmez. `npm run build` geçti.

