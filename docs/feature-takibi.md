# Feature takibi

## Bekleyen

- **ROTA-IDEA-033 — Native Outlook kabulü:** `.msg/.eml` ayrıştırma, klasik Outlook sanal dosya sürükle-bırak, ek seçimi ve tekrar kontrolü gerçek masaüstü penceresinde doğrulanmalı. Mevcut işe ekleme hedefli testte geçti.
- **ROTA-IDEA-035 — Canlı Jira kabulü:** Bağlama, yazma yetkisi, geçiş ekranı zorunlu alanları, güncelleme çatışması ve belirsiz ağ hatasında yeniden okuma gerçek Jira sunucusunda doğrulanmalı. Başlık alma sahte yanıtla geçti. Jira okuma ile yazma arasındaki sunucu yarışı atomik kilitleme sağlamaz.

- **Masaüstü regresyon kabulü:** Hedefli Edge testlerinin dışında gerçek WebView2 penceresinde uzun süreli kullanım, klavye/odak ve gerçek kullanıcı verisiyle kabul turu ayrıca yapılmalı.

## Tamamlanan

- **Toolbar sonrası tekrarlanan oluşturma eylemleri (4 Kasım 2026):** Genel çalışma alanı ve Backlog başlığındaki Yeni iş oluştur butonları, Backlog altındaki eski hızlı ekleme/Form satırı ve tekrarlanan saklama açıklaması kaldırıldı. Ana ekrandaki Tüm görevler/Tüm notlar bağlantıları ve Görev/Not panellerindeki yinelenen ekleme butonları kaldırıldı; oluşturma ortak toolbar üzerinden yapılır. Sorular panelinin tek ekleme erişimi, kayda özel eylemler ve satır konumuna ekleme korunur. Kabul testi girişleri toolbar akışına uyarlandı.

- **Kapalı menü grubunda boş vurgu kutusu (4 Kasım 2026):** Seçili öğenin bulunduğu grup kapatılınca kayan vurgu gizlenir; grup yeniden açıldığında seçili satıra döner. %75, %100 ve %125 oranlarında kapatma/açma regresyonu eklendi.

- **Toolbar üzerinden açık soru takibi (4 Kasım 2026):** Açık sorular sol menüden kaldırıldı; ortak toolbar'da açık soru sayacı ve aranabilir soru paneli eklendi. Açık/tümü/yanıtlandı filtreleri, soru ekleme/düzenleme, yanıtlama, yeniden açma, silme, gecikme göstergesi ve ilişkili işe erişim aynı panelde çalışır. Kayıtlar korunur; işlemler mevcut sayfa, proje ve arama kapsamını değiştirmez. Tema ve dar pencere uyumu, kayıt döngüsü ve veri korunumu hedefli testle doğrulandı.

- **Yakınlaştırmada sol menü vurgusu (4 Kasım 2026):** Kayan seçim vurgusunun konumu ve boyutu CSS yakınlaştırması hesaba katılarak hesaplanır; yakınlaştırma değiştiğinde yeniden hizalanır. Mevcut animasyon ve tema korunur. %50, %75, %90, %100, %110, %125, %150 ve %200 oranlarında Backlog/Yol haritası geçişlerinde satırla vurgu arasındaki fark 1 pikselin altında doğrulanır.

- **Masaüstü kapanış düzeltmesi (4 Kasım 2026):** Son pencere kapatıldığında native olay döngüsü durdurulur, uygulamanın pencere/WebView/bağlam kaynakları bırakılır ve yerel HTTP sunucusu bağlantılarıyla birlikte kapatılır. Zorla süreç sonlandırma kullanılmaz. İzole WebView2 testi doğal süreç çıkışını, native kaynakların bırakılmasını ve portun tekrar kullanılmasını doğrular.

- **Çalışma alanı araç çubuğu (4 Kasım 2026):** Kişisel alan ekranı ve menü bağlantısı kaldırıldı. Ortak üst şeritte iş/görev/not oluşturma, aranabilir görev/not panelleri, görev tamamlama ve nottan görev oluşturma erişimi var. Hover/odak için kayan vurgu, ikon ve panel açılış animasyonları azaltılmış hareket tercihine uyar. Kayıtlar ve ilişkileri korunur; görev/not kaydı mevcut ekranı, proje ve filtre kapsamını değiştirmez. Açık/koyu tema, 1024×768 %125 ölçek, panel katman sırası, klavye ve kayıt akışları doğrulandı.

- **İşler arası içerik geçişi (4 Kasım 2026):** Önceki/sonraki geçişinde aynı panel ve arka plan düğümleri korunur. Yalnızca başlık/içerik 220 ms yönlü kayma ve solma animasyonu yapar. Sekme, açılır grup durumu ve gezinme odağı korunur; ilk/son kayıt sınırları ve hızlı ardışık geçişler denetlendi. Geçersiz inline alan geçişi engeller; geçerli alan geçişten önce kaydedilir. Azaltılmış hareket tercihinde içerik animasyonu kapalıdır.

- **Kompakt iş detay grupları ve tema (4 Kasım 2026):** Özellikler, Takım ve sorumlular, Planlama ve ürün varsayılan kapalı gruplardır; yalnızca Özet sekmesinde görünür. Gruptaki alanların satır içi düzenlemesi ve açık/kapalı durumu kayıtta korunur. Alt eylemler erişilebilir ad/tooltip taşıyan ikonlara indirildi; dosya saklama açıklaması kaldırıldı. Aktivite vurgusu, not formu, ek kartları, ilişki kartları ve sınırlar tema değişkenlerine bağlandı. Dört sekmenin koyu tema görüntüleri incelendi; hedefli testler geçti.

- **Board ekran yüksekliği (4 Kasım 2026):** Sabit liste yüksekliği sınırı kaldırıldı. Sütunlar pencerenin kalan yüksekliğini doldurur; kartlar kendi sütununda kayar, başlık ve daha fazla kart eylemi görünür kalır. 1366×768 ve 1366×1080 boyutlarında büyüme ve taşma kontrolleri geçti.

- **Merkezde satır içi iş detayı (4 Kasım 2026):** İş detayı aynı tek sütunlu tasarımla sayfa ortasında açılır. Ayrı iş düzenleme formu ve paneldeki Düzenle düğmeleri kaldırıldı. Başlık, tür, proje, açıklama, kriterler, etiketler, atamalar, planlama, ürün ilişkileri ve blokaj bilgileri yerinde düzenlenir. Durum/öncelik, ek ve not güncellemeleri mevcut panel düğümünü korur; sekme ve not taslağı sıfırlanmaz. Dışarı tıklama/Enter kaydeder, ×/Esc iptal eder; geçersiz değer ve kayıt hatası alanı açık tutar.

- **Tek iş detay düzeni (4 Kasım 2026):** Başlığa tıklanınca açılan iş detayı tek sütunlu düzene sabitlendi; sonraki merkezde satır içi düzenleme kaydıyla geliştirildi. Görünüm değiştirme düğmesi ve eski tercihe bağlı alternatif yerleşim kaldırıldı; sekmeler, düzenleme ve önceki/sonraki geçişleri korunur.

- **Sekiz özelliğin kaldırılması (4 Kasım 2026):** Board kulvarları, WIP sınırı/istisnaları, Hazır/tamamlandı kontrol listeleri, tahmin güveni, tahmin gerekçesi, sprint kapsam geçmişi, günlük odak bütçesi ve birleşik hatırlatma merkezi kaldırıldı. Eski kayıt/yedek alanları korunur. Standart Board, durum ve tahmin düzenleme, sprint kapanış özeti, günlük süre/taşıma ve kişisel görev/blokaj hatırlatmaları devam eder.

- **Kalan önerilerin uygulama turu (3 Kasım 2026, tarihsel):** 005, 006, 008, 009, 012, 014, 016, 017, 018, 019, 020, 023, 024, 027, 028, 029, 031, 032, 033, 035, 039 ve 040 için mevcut altyapı tamamlandı veya genişletildi; açık kapsam/kabul maddeleri yukarıda tutulur. Ayrıntılı uygulama durumu kökteki `feature.md` tablosundadır.
- **Hedefli doğrulama altyapısı:** `npm run test:features`, kullanıcı çalışma alanından bağımsız geçici Edge oturumunda çalışır. Kaynak derlemesi, güvenli metin, Excel, taslak, detay, tema, risk, Jira/e-posta sahte akışları ve büyük liste davranışı denetlenir.
