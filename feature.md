# Rota — İyileştirme Önerileri

Hazırlanma tarihi: 2 Kasım 2026. Toplam **40 öneri**, **8 grup**.

Bu belge mevcut kaynak kod, veri modelleri ve ürün kararları incelenerek hazırlanmış bir öneri havuzudur. Uygulama durumu aşağıda izlenir; öncelikler öneridir, teslimat taahhüdü değildir. Çalışan masaüstü ekranında görsel test ve canlı Jira sunucusunda doğrulama yapılmamıştır. Görsel kalite ve performans hedefleri uygulama sırasında ölçülmelidir.

## Uygulama durumu

| Öneri | Durum | Doğrulama |
| --- | --- | --- |
| ROTA-IDEA-010 | Uygulandı: backlog altındaki sabit saat, iş aktivitesinden hesaplanan tarihle değiştirildi. | `npm run build` geçti. |
| ROTA-IDEA-015 | Uygulandı: yeni işlerin durum başlangıcı ve sonraki geçişleri saklanıyor; Liste kolonunda, Board kartında ve eşik filtresinde durum süresi görünüyor. Eski kayıtların bilinmeyen başlangıcı tahmin edilmiyor. | Edge üzerinde yeni işin durum başlangıcının saklandığı doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-004 | Uygulandı: ortak dialog davranışı ilk alanı odaklıyor, Tab ve Shift+Tab odağını dialog içinde tutuyor, kapanınca açan düğmeye dönüyor. | Edge üzerinde açılış, ters Tab çevrimi ve Esc sonrası odak dönüşü doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-026 | Uygulandı: dashboard'daki altı özet kartı ilgili backlog listesini veya çalışma alanı görev panelini açıyor. Geciken ve atanmamış iş filtreleri görünür, temizlenebilir ve kayıtlı görünümde saklanır. | Edge üzerinde Hazır, geciken ve atanmamış filtreleri doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-025 | Uygulandı: haftalık özette proje ve hafta seçimi, iş/release kaynağına bağlantı ve proje bazlı PO notu var. Hafta hesabı yerel takvime göre düzeltilmiştir. | Edge üzerinde proje filtresi ve iş kaynağına geçiş doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-030 | Uygulandı: karar detayında iki sürüm seçilip değişen alanlar önce/sonra karşılaştırılıyor; yalnızca boşluk düzeni değişikliği işaretleniyor. | Edge üzerinde örnek kararın iki alan farkı doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-034 | Uygulandı: Jira sonuçları sayfalanıyor, alınan/toplam sayı ve son başarılı sorgu zamanı gösteriliyor; sayfa hatasında önceki sonuçlar korunuyor. | Edge üzerinde sahte Jira yanıtlarıyla iki sayfa yüklendi; `npm run build` ve host sözdizimi kontrolü geçti. Canlı Jira doğrulaması bekliyor. |
| ROTA-IDEA-036 | Uygulandı: okunamayan çalışma alanı verisi korunuyor; kopyalama, ham dosyaya aktarım ve yedekten geri yükleme ekranı gösteriliyor. Yazma hatasında kalıcı uyarı, yeniden deneme ve yedek oluşturma eylemleri var; sonraki başarı bildirimi kaydetme hatasını gizlemiyor. | Edge üzerinde bozuk JSON'un korunduğu, ham veri aktarımı, yazma hatası ve başarılı yeniden deneme doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-037 | Uygulandı: uygulama açıkken 24 saatte bir ekleriyle otomatik yedek alınır; seçilen klasörde son 7 kopya saklanır. Ayarlarda son yedek zamanı, klasör yolu ve hemen yedekleme eylemi var. Geri yükleme öncesinde ekler doğrulanır ve mevcut çalışma alanının güvenlik yedeği alınır; bu başarısızsa geri yükleme durur. | Edge üzerinde elle yedek tetikleme ve güvenlik yedeği hatasında geri yüklemenin durması doğrulandı; `npm run build` ve host sözdizimi kontrolü geçti. |
| ROTA-IDEA-038 | Uygulandı: çalışma alanı şema sürümü 4; eski sürümler aşamalı açılır, tanınmayan yeni sürümler korunur. Proje ve üye ilişkileri kalıcı ID taşır; yeniden adlandırma bağlantıları korur. Ayarlarda eksik proje, iş, bileşen, release ve sprint bağlantıları onarım raporunda görünür. | Edge üzerinde eski/ileri sürüm, eksik proje raporu, ID'den proje adı onarımı ve üye yeniden adlandırma doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-007 | Uygulandı: satır içi başlık, durum, tür ve atamada hücre düzeyinde kayıt/hata bildirimi var; boş başlık ve geçersiz atama düzenlemeyi açık tutuyor, başarılı başlık kaydı odağı düzenleme düğmesine taşıyor. | Edge üzerinde boş başlık, başarılı başlık ve geçersiz atama doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-013 | Uygulandı: Board kartında hedef durum seçimi ve odaktaki kartta Shift+Sol/Sağ kısayolu var; sürükleme dahil tüm yollar ortak taşıma işlevini kullanıyor. Bloke geçişi aynı bilgi formunu açıyor. | Edge üzerinde klavye taşıması ve seçiciden Bloke formu doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-021 | Uygulandı: üst arama backlog işi, ürün bileşeni ve ürün kararını tek sonuç listesinde arıyor; eşleşme Türkçe büyük/küçük harflere duyarlı dönüşüm kullanıyor ve sonuç kaydı açıyor. | Edge üzerinde FAST limit araması, Türkçe harf eşleşmesi ve iş kaydına geçiş doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-022 | Uygulandı: Ctrl+K arama/komut alanını açıyor; ok tuşları ve Enter ile yeni iş, görev, karar komutları ve kayıtlı görünümler çalıştırılabiliyor. | Edge üzerinde Türkçe “yeni backlog” komutuyla form açılışı doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-002 | Uygulandı: Liste dar pencerede sığmayan düşük öncelikli kolonları otomatik gizliyor ve gizlenen kolonları araç çubuğunda adlarıyla belirtiyor; pencere genişleyince kolonlar geri geliyor. | Edge üzerinde 1024×768 ve 1366×768 boyutlarında yatay kaydırma olmadığı, arama, seçim ve satır eylemlerinin erişilebilir olduğu doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-001 | Uygulandı: başlık, form, tablo ve tooltip metin rolleri ortak boyut ve satır yüksekliği değişkenlerini kullanıyor. %125 yakınlaştırma ayarlarda seçilebilir; pencere ve dialog yükseklikleri ölçeğe göre sığıyor. | Edge üzerinde 1024×768 ve 1366×768 boyutlarında %100/%125 ölçümleri, yatay kaydırmasız liste ve %125 ölçekte görünür yeni iş formu doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-011 | Kaldırıldı: WIP sınırı, aşım göstergesi ve istisna akışı kullanıcı kararıyla kaldırıldı. | 4 Kasım 2026 kullanıcı kararı; eski kayıt alanları veri kaybı olmadan korunur. |
| ROTA-IDEA-010.1 | Uygulandı: Liste satırlarının arasındaki + eylemi yalnızca ilgili iş hover/odak aldığında, son işin altındaki ise sürekli görünür. Eylem sol kolon çizgisi üzerinde açılır; kompakt başlık alanında kaydet/iptal kontrolleri girdinin yanında kalır. Kayıt ilgili satırdan sonra Task olarak eklenir, Esc ve × iptal eder. | Edge üzerinde ara/son satır görünürlüğü, sol çizgi hizası, kontrol yakınlığı ve yatay taşma olmadığı doğrulandı; `npm run build` geçti. |
| ROTA-IDEA-003 | Uygulandı: ikon eylemleri ortak SVG boyut ve çizgi diline taşındı; oluşturma, düzenleme, silme, arşivleme, geri alma ve dialog eylemleri tutarlılaştırıldı. Açıklayıcı Türkçe tooltip fareyle ve klavye odağıyla ekran sınırları içinde açılıyor. | Edge üzerinde ortak ikonlar ile klavye odağındaki tooltip ve erişilebilir açıklama ilişkisi doğrulandı; `npm run build` geçti. |

| ROTA-IDEA-005 | Uygulama eklendi/tamamlandı: Yüksek kontrastta tema değişkenleri, odak, seçim ve devre dışı eylemler bütünleştirildi; yeni akışlar mevcut yüzey/renk değişkenlerini kullanır. | `npm run build` ve hedefli tarayıcı testleri; ayrıntılar doğrulama notunda. |
| ROTA-IDEA-006 | Güncellendi: Tek sütunlu iş detayı sayfa ortasında açılır; alanlar aynı panelde satır içi kaydedilir. Ayrı iş düzenleme formu kaldırıldı. | 4 Kasım 2026; panel kimliği, sekme, taslak ve hata/iptal akışları hedefli testlerle doğrulandı. |
| ROTA-IDEA-008 | Uygulama eklendi/tamamlandı: Çoklu durum/öncelik, hedef tarih aralığı, tahminsiz/geciken koşulu ve VE/VEYA ilişkisi kayıtlı görünüme eklenir; atama kapsamı ayrı tutulur. | `npm run build` ve hedefli tarayıcı testleri; ayrıntılar doğrulama notunda. |
| ROTA-IDEA-009 | Uygulama eklendi/tamamlandı: Önce/sonra ve değişen/atlanan kapsamı gösterilir; çoklu atamada ekle/değiştir/kaldır, uyumsuz release ve eksik blokaj kontrolü, geri alma vardır. | `npm run build` ve hedefli tarayıcı testleri; ayrıntılar doğrulama notunda. |
| ROTA-IDEA-012 | Kaldırıldı: Board yüzme kulvarları kullanıcı kararıyla kaldırıldı; standart durum sütunları korunur. | 4 Kasım 2026 kullanıcı kararı; eski kayıt alanları veri kaybı olmadan korunur. |
| ROTA-IDEA-014 | Kaldırıldı: Hazır/tamamlandı kontrol listeleri ve gerekçeli istisna zorunluluğu kaldırıldı. | 4 Kasım 2026 kullanıcı kararı; eski kayıt alanları veri kaybı olmadan korunur. |
| ROTA-IDEA-016 | Uygulama eklendi/tamamlandı: Ayrıntılı ve hızlı yeni kayıt taslakları ayrı saklanır; ek, atama, bileşen ve e-posta kaynağı korunur. Açık iptal taslağı temizler. | `npm run build` ve hedefli tarayıcı testleri; ayrıntılar doğrulama notunda. |
| ROTA-IDEA-017 | Uygulama eklendi/tamamlandı: Story/Bug/Task şablonları açıklama, kriter, etiket ve öncelik taşır; ayarlardan çalışma alanına özel şablon eklenir. | `npm run build` ve hedefli tarayıcı testleri; ayrıntılar doğrulama notunda. |
| ROTA-IDEA-018 | Uygulama eklendi/tamamlandı: Alan farkı önizlemesi, not/ek/ilişki taşıma, gelen bağlantıları yönlendirme, döngü denetimi, arşiv yönlendirmesi ve geri alma vardır. | `npm run build` ve ilgili hedefli Edge senaryoları geçti; masaüstü kabulü ayrıca izleniyor. |
| ROTA-IDEA-019 | Uygulama eklendi/tamamlandı: Mevcut tema uyumlu etiket/alan sözlüğü; kullanım sayısı, arama, yeniden adlandırma ve birleştirme akışları korundu. | `npm run build` ve ilgili hedefli Edge senaryoları geçti; masaüstü kabulü ayrıca izleniyor. |
| ROTA-IDEA-020 | Uygulama eklendi/tamamlandı: Başlık, liste, kontrol maddesi, kalın metin ve güvenli HTTP(S) bağlantısı desteklenir; düz metin korunur. Yeni ve düzenleme formlarında araç çubuğu vardır. | `npm run build` ve hedefli tarayıcı testleri; ayrıntılar doğrulama notunda. |
| ROTA-IDEA-023 | Kaldırıldı: Birleşik hatırlatma merkezi kaldırıldı; kişisel görev ve blokaj hatırlatmaları korunur. | 4 Kasım 2026 kullanıcı kararı; eski kayıt alanları veri kaybı olmadan korunur. |
| ROTA-IDEA-024 | Kısmen korundu: Günlük odak bütçesi kaldırıldı; kişisel süre tahmini ve sonraki güne taşıma korunur. | 4 Kasım 2026 kullanıcı kararı; eski kayıt alanları veri kaybı olmadan korunur. |
| ROTA-IDEA-027 | Kaldırıldı: Sprint kapsam değişikliği geçmişi ve kapsam gerekçesi alanları kaldırıldı; sprint planlama ve kapanış özeti korunur. | 4 Kasım 2026 kullanıcı kararı; eski kayıt alanları veri kaybı olmadan korunur. |
| ROTA-IDEA-028 | Kısmen korundu: Tahmin gerekçesi, güven düzeyi ve bunlara ait geçmiş görünümü kaldırıldı; tahmin değeri ve birim standardı korunur. | 4 Kasım 2026 kullanıcı kararı; eski kayıt alanları veri kaybı olmadan korunur. |
| ROTA-IDEA-029 | Uygulama eklendi/tamamlandı: Tema uyumlu risk formunda etki/olasılık ölçeği, aksiyon, gözden geçirme, elle seviye gerekçesi ve iş/release ilişkileri vardır; gecikenler filtrelenir. | `npm run build` ve hedefli tarayıcı testleri; ayrıntılar doğrulama notunda. |
| ROTA-IDEA-031 | Uygulama eklendi/tamamlandı: Excel sayfa/sütun eşleme, tür/öncelik/tarih/etiket alanları ve satır numaralı hata önizlemesi; yalnızca seçili geçerli satırlar alınır. | `npm run build` ve hedefli tarayıcı testleri; ayrıntılar doğrulama notunda. |
| ROTA-IDEA-032 | Uygulama eklendi/tamamlandı: Dosya özeti/sayfa/satır iziyle tekrar uyarısı; Rota ID üzerinden açık seçimle güncelleme ve tüm aktarımı geri alma vardır. | `npm run build` ve hedefli tarayıcı testleri; ayrıntılar doğrulama notunda. |
| ROTA-IDEA-033 | Uygulama eklendi/tamamlandı: E-posta önizlemesinde konu/iş anahtarı/izden aday iş önerilir; gövde ve seçili ekler mevcut işe aktarılır, kaynak ve tekrar kontrolü saklanır. | Sahte e-posta verisiyle mevcut işe ekleme doğrulandı; klasik Outlook/native sürükle-bırak kabulü bekliyor. |
| ROTA-IDEA-035 | Uygulama eklendi/tamamlandı: Mevcut Jira anahtarını bağlama, başlık/durum farkı, yön ve durum geçişi seçimi, güncellemeden önce tazelik denetimi ve işlem kaydı eklendi. | Sahte Jira yanıtıyla alan alma doğrulandı; canlı Jira yetki, geçiş ve eşzamanlılık kabulü bekliyor. |
| ROTA-IDEA-039 | Uygulama eklendi/tamamlandı: Liste 200 kayıttan sonra 60 satırlık görünür pencere çizer; Board durum başına artımlı kart yükler. Arama 120 ms geciktirilir. Referans ölçüm [doğrulama notunda](docs/feature-dogrulama.md). | `npm run build` ve hedefli tarayıcı testleri; ayrıntılar doğrulama notunda. |
| ROTA-IDEA-040 | Uygulama eklendi/tamamlandı: Yerel tanılama önizlemesi ve isteğe bağlı dışa aktarım; sürüm/ortam, kategori, zaman ve ilişkilendirme kimliği içerir. Çalışma alanı içeriği ve ham hata metni rapora girmez. | `npm run build` ve hedefli tarayıcı testleri; ayrıntılar doğrulama notunda. |

3 Kasım 2026: Kalan 22 önerinin uygulama akışları ele alındı. Kod tamamlanması ile kabul doğrulaması ayrı izlenir; canlı/native ve kapsamlı kabul açıkları `docs/feature-takibi.md` içindedir.

Önceki oturumda: `npm run test:acceptance`, WebView2 test penceresine bağlanamadığından senaryolara başlamadan durdu.

## Değerlendirme çerçevesi

- **P1:** Günlük kullanım, veri güvenilirliği veya temel akış için önce ele alınmalı.
- **P2:** Kullanıcı verimliliğini ve planlama kalitesini artırır.
- **P3:** Temel iyileştirmelerden sonra değerlendirilebilir.
- **Efor:** Küçük / Orta / Büyük; tasarım, geliştirme ve doğrulama için göreli tahmindir.

Kayıtlı backlog görünümleri, kolon ayarları, yoğunluk seçenekleri, başlık önizlemesi, çoklu atama, toplu işlemler, klavye kısayolları, tema, yüksek kontrast, azaltılmış hareket, karar geçmişi, Excel aktarımı ve yedekleme zaten vardır. Aşağıdaki öneriler bunları genişletir. Yeni bir Takım Paneli veya PO devir paketi önerilmez. Liste ve Board ayrı davranışlar olarak tasarlanır; ana pencere yerine içerik alanları kayar, backlog listesinde yatay kaydırma oluşturulmaz. Mevcut kullanıcı verisi korunur.

İnceleme dayanakları: arayüz ve akışlar, stiller, veri modelleri, yerel host. Mevcut ROTA-NEXT kayıtları yeniden önerilmez; ilgili maddelerde tamamlayıcı ilişki belirtilir. ROTA-IDEA kimlikleri öneri takibi içindir.

## 1. Görsel düzen ve erişilebilirlik

### ROTA-IDEA-001 · Ekran genelinde okunabilir tipografi

- **İhtiyaç:** Stillerde 8–10 px boyutunda çok sayıda yardımcı metin bulunuyor; tablo yoğunluğu korunurken okunabilirlik iyileştirilmeli.
- **Öneri:** Metin rolleri için ortak boyut ve satır yüksekliği tanımla; mevcut ölçek ayarının tüm ekranlarda tutarlı çalışmasını sağla.
- **Kabul ölçütü:** %100 ve %125 ölçeklerde başlık, form, tooltip ve tablo metinleri kesilmez; ana pencere taşmaz.
- **Öncelik / efor:** P1 / Orta.

### ROTA-IDEA-002 · Dar pencereye uyarlanan araç çubukları

- **İhtiyaç:** Sabit kenar çubuğu, geniş sayfa boşlukları ve çok sayıda filtre küçük çalışma alanında içerik payını azaltıyor.
- **Öneri:** Kullanılabilir genişliğe göre ikincil eylemleri taşma menüsüne al; kolonları okunabilir bir öncelik sırasıyla sığdır ve gizlenen kolonları görünür biçimde belirt.
- **Kabul ölçütü:** 1024×768 ve 1366×768 boyutlarında arama, seçim ve temel eylemler erişilebilir; Liste görünümünde yatay kaydırma gerekmez.
- **Öncelik / efor:** P1 / Orta.

### ROTA-IDEA-003 · Tutarlı ikon ve tooltip sistemi

- **İhtiyaç:** Arayüzde farklı karakter ve simge kullanımları eylemlerin görsel tutarlılığını azaltabilir.
- **Öneri:** Ortak ikon boyutları ve eylem stilleri kullan; ikon butonlarına açıklayıcı Türkçe erişilebilir ad ve klavyeyle de açılan tooltip ekle.
- **Kabul ölçütü:** Oluşturma, düzenleme, silme, arşivleme ve geri alma aynı ikon dilini kullanır; ikonun anlamı odakla öğrenilebilir.
- **Öncelik / efor:** P2 / Orta.

### ROTA-IDEA-004 · Dialog ve açılır menülerde odak standardı

- **İhtiyaç:** Çok sayıda farklı form ve açılır seçici bulunduğu için klavye davranışı ortak bir sözleşmeye ihtiyaç duyuyor.
- **Öneri:** İlk odak, dialog içinde odak dolaşımı, kapanışta önceki elemana dönüş ve Esc davranışını ortaklaştır; satır içi × iptal davranışını koru.
- **Kabul ölçütü:** İş, karar, ayar ve Excel dialogları yalnızca klavyeyle tamamlanabilir; odak arka planda kaybolmaz.
- **Öncelik / efor:** P1 / Orta.

### ROTA-IDEA-005 · Tema ve durum göstergelerinde kontrast bütünlüğü

- **İhtiyaç:** Tema ve yüksek kontrast ayarları mevcut; tüm bileşenlerde aynı okunabilirliği sağlamak ayrı bir kalite çalışması gerektiriyor.
- **Öneri:** Renkleri ortak tasarım değişkenlerine taşı; durum, hata ve seçim işaretlerini metin veya simgeyle destekle.
- **Kabul ölçütü:** Açık, koyu ve yüksek kontrast temalarında seçili satır, hata, odak ve devre dışı eylem ayırt edilir; durum anlamı yalnızca renge bağlı kalmaz.
- **Öncelik / efor:** P2 / Orta.

## 2. Backlog Liste deneyimi

### ROTA-IDEA-006 · Liste içinde sabit detay paneli

- **İhtiyaç:** Birden fazla işi sırayla incelerken açılan detay ekranları liste bağlamını bölebilir; mevcut başlık önizlemesi sınırlı bir özet sağlar.
- **Öneri:** Başlığa tıklayınca isteğe bağlı yan detay paneli aç; dar pencerede mevcut dialogu kullan. Filtre, seçim ve kaydırma konumunu koru.
- **Kabul ölçütü:** Kullanıcı detaylar arasında ilerleyip listeye döndüğünde aynı satır ve filtre bağlamında kalır.
- **Öncelik / efor:** P2 / Orta.

### ROTA-IDEA-007 · Satır içi kaydetme durumunun görünür olması

- **İhtiyaç:** Dışarı tıklayınca kaydetme hızlıdır; kullanıcının işlemin tamamlandığını veya neden başarısız olduğunu anlaması gerekir.
- **Öneri:** Düzenlenen hücrede kaydedildi/hata geri bildirimi göster; geçersiz atamayı açıklamasıyla açık tut ve × ile iptali koru.
- **Kabul ölçütü:** Boş başlık veya geçersiz üye sessizce kaybolmaz; başarılı kayıt hücre odağını gereksiz yere sıfırlamaz.
- **Öncelik / efor:** P1 / Orta.

### ROTA-IDEA-008 · Gelişmiş birleşik filtreler

- **İhtiyaç:** Mevcut filtreler ve kayıtlı görünümler, birden fazla alternatif koşulu ifade ederken genişletilebilir.
- **Öneri:** Çoklu durum/öncelik seçimi, tarih aralığı, atanmamış iş, tahminsiz iş ve VE/VEYA koşul grupları ekle; kayıtlı görünümde sakla.
- **Kabul ölçütü:** “Bloke veya gecikmiş, bana atanmış, tamamlanmamış işler” tek görünümde kaydedilip tekrar açılabilir.
- **Öncelik / efor:** P2 / Büyük.

### ROTA-IDEA-009 · Toplu işlem etki önizlemesi

- **İhtiyaç:** Toplu durum, atama, proje ve release işlemleri zaten var; kapsam büyüdükçe değişiklik etkisi daha açık gösterilmeli.
- **Öneri:** İşlem öncesinde değişecek kayıt sayısını, eski/yeni değerleri ve uyumsuz kayıtları göster; çoklu atamada ekle/değiştir/kaldır ayrımını açıklaştır.
- **Kabul ölçütü:** Proje veya release değişiminde uygun olmayan kayıtlar gerekçesiyle görünür; sonuç başarılı ve atlanan kayıtları ayırır, geri alma sunar.
- **Öncelik / efor:** P1 / Orta.

### ROTA-IDEA-010 · Gerçek son güncelleme bilgisi

- **İhtiyaç:** Backlog alt bilgisinde “Son güncelleme: bugün 10:42” sabit metin olarak üretiliyor; gerçek veri tazeliğini temsil etmiyor.
- **Öneri:** Başarılı kayıt zamanını gerçek zaman damgasıyla tut; göreli gösterim ve tam tarih tooltip'i üret. Eski kayıtlarda bilinmeyen zamanı açıkça belirt.
- **Kabul ölçütü:** Yeni kayıt sonrası zaman güncellenir, yeniden açılışta korunur; herhangi bir değişiklik yapılmadan güncelmiş gibi görünmez.
- **Öncelik / efor:** P1 / Küçük.

### ROTA-IDEA-010.1 · Backlog Listesi Inline Task Ekleme

- **İhtiyaç:** Backlog listesinde kullanıcı iki task arasına veya son taskın hemen sonrasına yeni kayıt eklemeyi backlog listesinde görünen + ikonu ile yapabilmeli, backlog listesi buna uygun düzenlenmeli.
- **Öneri:** Backlog dışında bulunan alt taraftaki hızlı ekle + form butonları kaldırılır, doğrudan tablo içinde modern bir tasarım ile yeni task tabloya satır ekler gibi eklenir.
- **Kabul ölçütü:** Kullanıcı yeni kaydı backlog listesi üzerinde gezinirken hızlıca ekleyebilmeli.
- **Öncelik / efor:** P1 / Küçük.

## 3. Board ve iş akışı

### ROTA-IDEA-011 · Board sütunlarına WIP sınırı

> **4 Kasım 2026 ürün kararı:** Kaldırıldı: WIP sınırı, aşım göstergesi ve istisna akışı kullanıcı kararıyla kaldırıldı. Aşağıdaki öneri tarihsel kayıttır.

- **İhtiyaç:** Durum panosu işleri taşıyor; aynı anda başlanan iş yükünü sınırlayan görünür bir sınır eklenebilir.
- **Öneri:** Takım ve durum bazında devam eden iş sınırı tanımla; aşımı sütun başlığında göster ve gerekçeli istisnaya izin ver.
- **Kabul ölçütü:** Sınır aşan taşıma öncesinde uyarı görünür; mevcut işler silinmez veya gizlenmez.
- **Öncelik / efor:** P2 / Orta.

### ROTA-IDEA-012 · Board yüzme kulvarları

> **4 Kasım 2026 ürün kararı:** Kaldırıldı: Board yüzme kulvarları kullanıcı kararıyla kaldırıldı; standart durum sütunları korunur. Aşağıdaki öneri tarihsel kayıttır.

- **İhtiyaç:** Durum sütunları tek başına proje veya takım kümelerini okumayı zorlaştırabilir.
- **Öneri:** Takım, proje, sprint veya önceliğe göre seçilebilir kulvarlar ekle; çoklu atamada işin bir kez sayıldığı ve diğer takımlarla ilişkisinin gösterildiği bir kural kullan.
- **Kabul ölçütü:** Kulvar değişince filtre korunur; kart toplamları aynı işi birden fazla saymaz.
- **Öncelik / efor:** P2 / Büyük.

### ROTA-IDEA-013 · Sürüklemeden kart taşıma

- **İhtiyaç:** Board'da sürükleme ana etkileşimlerden biri; klavye ve hassas fare kullanımı için eşdeğer bir yol gerekir.
- **Öneri:** Kart menüsünden hedef durum seçimi ve klavye akışı sun; mevcut blokaj bilgi formunu her taşıma yönteminde kullan.
- **Kabul ölçütü:** Kart yalnızca klavyeyle taşınabilir; “Bloke” için gerekli alanlar sürükleme ve menü akışında aynı şekilde doğrulanır.
- **Öncelik / efor:** P1 / Orta.

### ROTA-IDEA-014 · Hazır ve tamamlandı kontrol listeleri

> **4 Kasım 2026 ürün kararı:** Kaldırıldı: Hazır/tamamlandı kontrol listeleri ve gerekçeli istisna zorunluluğu kaldırıldı. Aşağıdaki öneri tarihsel kayıttır.

- **İhtiyaç:** Durum değişimi, işin analize veya teslimata gerçekten hazır olduğunu tek başına garanti etmez.
- **Öneri:** İş türüne göre ayarlanabilir hazırlık/tamamlanma kontrolleri sun; eksikleri göster, yetkili süreç varsaymadan gerekçeli istisna kaydet.
- **Kabul ölçütü:** Kabul kriteri veya zorunlu alanı eksik iş “Hazır” yapılırken eksikler ve devam gerekçesi geçmişte görülebilir.
- **Öncelik / efor:** P2 / Büyük. ROTA-NEXT-006 senaryo çalışmasını tamamlar; onun yerine geçmez.

### ROTA-IDEA-015 · Durumda bekleme süresi ve yaşlanma

- **İhtiyaç:** Mevcut bekleme ve gecikme göstergeleri, her durumdaki süreyi açıklayan geçmişle zenginleştirilebilir.
- **Öneri:** Durum giriş/çıkış zamanlarını sakla; Liste'de kolon, Board'da kart göstergesi ve eşik filtresi sun. Eski kayıtlardaki eksik geçmişi tahmin edilmiş veriyle doldurma.
- **Kabul ölçütü:** Kullanıcı analizde yedi günden fazla bekleyen işleri bulur ve sürenin hangi geçişlerden hesaplandığını görür.
- **Öncelik / efor:** P2 / Orta.

## 4. İş oluşturma ve bilgi kalitesi

### ROTA-IDEA-016 · Form taslağı kurtarma

- **İhtiyaç:** Yeni iş ve uzun açıklama formlarındaki tamamlanmamış içerik, beklenmedik kapanışta kaybolabilir.
- **Öneri:** Form taslaklarını asıl kayıttan ayrı sakla; yeniden açılışta kurtarma veya silme seçeneği sun. Taslağa bağlı eklerin yaşam döngüsünü koru.
- **Kabul ölçütü:** Kaydedilmemiş iş formu uygulama yeniden açıldığında geri getirilebilir; açık iptal edilen taslak kendiliğinden geri dönmez.
- **Öncelik / efor:** P1 / Büyük.

### ROTA-IDEA-017 · İş türüne göre tam kayıt şablonları

- **İhtiyaç:** Kabul kriteri şablonları mevcut; açıklama, etiket ve varsayılan alanlar için de tekrar eden girişler var.
- **Öneri:** Bug, Story ve Task için açıklama bölümleri, kriterler, etiketler ve varsayılan öncelik içeren çalışma alanı şablonları ekle.
- **Kabul ölçütü:** Bug şablonu adımlar, beklenen/gerçek sonuç ve ortam alanlarını doldurulabilir biçimde getirir; kullanıcı değerleri değiştirebilir.
- **Öncelik / efor:** P2 / Orta.

### ROTA-IDEA-018 · Mevcut benzer iş uyarısından birleştirmeye geçiş

- **İhtiyaç:** Yeni işte benzer kayıt adayları zaten aranıyor; yinelenen kayıtlar oluştuktan sonra güvenli birleştirme de gerekli olabilir.
- **Öneri:** Kullanıcının seçtiği ana kayda not, ek ve ilişkileri önizlemeyle taşı; diğer kaydı yönlendirme bilgisiyle arşivle.
- **Kabul ölçütü:** Birleştirme öncesi alan farkları görünür; gelen bağımlılık bağlantıları korunur, kendi kendine bağlantı oluşmaz ve işlem geri alınabilir.
- **Öncelik / efor:** P2 / Büyük.

### ROTA-IDEA-019 · Etiket ve alan sözlüğü yönetimi

- **İhtiyaç:** Serbest metin etiket ve ürün alanları zamanla farklı yazımlarla çoğalabilir.
- **Öneri:** Çalışma alanı ayarlarında kullanım sayısı, yeniden adlandırma ve birleştirme sun; mevcut kayıt ve filtreleri birlikte güncelle.
- **Kabul ölçütü:** İki etiket birleştirildiğinde bağlı işler ve kayıtlı görünümler çalışır; işlem öncesi etkilenen sayılar gösterilir.
- **Öncelik / efor:** P2 / Orta.

### ROTA-IDEA-020 · Açıklama ve notlarda yapılandırılmış düzenleme

- **İhtiyaç:** Uzun serbest metinler karar, analiz ve toplantı notlarının taranmasını zorlaştırabilir.
- **Öneri:** Başlık, liste, bağlantı ve kontrol listesi destekleyen sade bir editör ekle; mevcut düz metni kayıpsız aç ve içerik gösterimini güvenli tut.
- **Kabul ölçütü:** Eski açıklamalar bozulmadan görüntülenir; biçimlendirme dışa aktarmada anlaşılır kalır ve yapıştırılan çalıştırılabilir içerik yürütülmez.
- **Öncelik / efor:** P3 / Büyük.

## 5. Arama ve kişisel çalışma

### ROTA-IDEA-021 · Kayıt türleri arasında birleşik arama

- **İhtiyaç:** Backlog arama kapsamları ve ayrı arşiv araması var; tüm bilgi türlerini birlikte bulmak için ortak sonuç görünümü yararlı olur.
- **Öneri:** İş, karar, bileşen, not, soru ve release sonuçlarını tür ve proje filtresiyle grupla; arşiv kapsamını açık bir seçenek yap.
- **Kabul ölçütü:** “FAST limit” sorgusu ilgili karar, iş ve bileşeni tek yerde getirir; Türkçe büyük/küçük harf eşleşmesi tutarlıdır.
- **Öncelik / efor:** P2 / Büyük.

### ROTA-IDEA-022 · Aramadan eyleme geçiren komut paleti

- **İhtiyaç:** Ctrl K şu anda global aramaya erişim sağlıyor; sık eylemleri de aynı klavye akışında toplamak mümkün.
- **Öneri:** Arama yanında yeni iş oluşturma, ekran değiştirme, kayıtlı görünüm açma ve son kayda dönme komutları sun.
- **Kabul ölçütü:** Kullanıcı fare kullanmadan kayıtlı bir görünümü açıp yeni iş formuna geçebilir; komutlar Türkçe aranır.
- **Öncelik / efor:** P3 / Orta. Birleşik arama arayüzünü kullanır ancak ayrı bir eylem kabiliyetidir.

### ROTA-IDEA-023 · Kalıcı takip ve hatırlatma merkezi

> **4 Kasım 2026 ürün kararı:** Kaldırıldı: Birleşik hatırlatma merkezi kaldırıldı; kişisel görev ve blokaj hatırlatmaları korunur. Aşağıdaki öneri tarihsel kayıttır.

- **İhtiyaç:** Kişisel görev ve blokaj hatırlatmaları mevcut; geçici bildirimin ardından bekleyen takipleri ortak bir yerde görmek yararlıdır.
- **Öneri:** Görev, blokaj, açık soru ve karar gözden geçirme hatırlatmalarını ertele/okundu/tamamlandı durumlarıyla birleştir.
- **Kabul ölçütü:** Aynı olay tekrar tekrar bildirilmez; uygulama kapalıyken geçen hatırlatmalar sonraki açılışta yakalanır ve kaydına gidilebilir.
- **Öncelik / efor:** P2 / Orta. İlk kapsam uygulama açıkken ve açılışta kontroldür.

### ROTA-IDEA-024 · Günlük plana tahmini süre ve odak bütçesi

> **4 Kasım 2026 ürün kararı:** Kısmen korundu: Günlük odak bütçesi kaldırıldı; kişisel süre tahmini ve sonraki güne taşıma korunur. Aşağıdaki öneri tarihsel kayıttır.

- **İhtiyaç:** Günlük plan sıralı iş ve görev listesi sunuyor; günün kullanılabilir zamanıyla uyumu açık değil.
- **Öneri:** Plan girdilerine kişisel süre tahmini, güne odak bütçesi ve sonraki güne taşıma ekle; takım efor tahmininden ayrı tut.
- **Kabul ölçütü:** Bütçeyi aşan gün görünür olur; taşınan iş asıl backlog kaydını kopyalamaz ve geçmiş planı korur.
- **Öncelik / efor:** P2 / Orta.

### ROTA-IDEA-025 · Haftalık özetten kaynağa erişim

- **İhtiyaç:** Haftalık özetin dayanakları açık olduğunda PO rapordaki ifadeyi daha kolay doğrular.
- **Öneri:** Tarih aralığı ve proje seçimi, her özet kaleminden kaynak işe/karara bağlantı ve otomatik veri ile kişisel yorum ayrımı ekle.
- **Kabul ölçütü:** Kullanıcı özetteki tamamlanan iş veya blokajın kaydına ulaşır; tarih aralığı değiştiğinde sayılar aynı kuralla yeniden hesaplanır.
- **Öncelik / efor:** P2 / Orta.

## 6. Planlama, dashboard ve ürün bağlamı

### ROTA-IDEA-026 · Dashboard göstergelerinden filtreli listeye geçiş

- **İhtiyaç:** Özet sayılar, bunları oluşturan işlere hızlı geçişle daha kullanışlı hale gelir.
- **Öneri:** Hazır, bloke, gecikmiş ve atanmamış iş göstergelerini ilgili kapsamı açan bağlantılara dönüştür; hesaplama açıklaması ekle.
- **Kabul ölçütü:** Dashboard kartındaki sayı ile açılan listenin sonucu aynı proje ve arşiv kapsamını kullanır.
- **Öncelik / efor:** P1 / Küçük.

### ROTA-IDEA-027 · Sprint kapsam değişikliği geçmişi

> **4 Kasım 2026 ürün kararı:** Kaldırıldı: Sprint kapsam değişikliği geçmişi ve kapsam gerekçesi alanları kaldırıldı; sprint planlama ve kapanış özeti korunur. Aşağıdaki öneri tarihsel kayıttır.

- **İhtiyaç:** Sprint kapanış özeti ve devreden işler var; sprint içinde eklenen/çıkarılan kapsamın etkisi ayrıca izlenebilir.
- **Öneri:** Başlangıç kapsamını sakla; eklenen/çıkarılan iş, tarih ve gerekçeyi göster. Kayıt adedi ve tahmini eforu ayrı ölçülerde sun.
- **Kabul ölçütü:** Sprint sonunda başlangıç kapsamı, sonradan eklenenler ve tamamlananlar ayrı görülebilir; kapanış kaydı sonraki düzenlemelerle değişmez.
- **Öncelik / efor:** P2 / Orta. ROTA-NEXT-008 kapasite senaryolarına veri sağlar.

### ROTA-IDEA-028 · Tahmin değişikliklerinin gerekçesi ve güveni

> **4 Kasım 2026 ürün kararı:** Kısmen korundu: Tahmin gerekçesi, güven düzeyi ve bunlara ait geçmiş görünümü kaldırıldı; tahmin değeri ve birim standardı korunur. Aşağıdaki öneri tarihsel kayıttır.

- **İhtiyaç:** İşte tek bir estimate değeri bulunuyor; değişimin sebebi ve belirsizliği planlamada kaybolabilir.
- **Öneri:** Çalışma alanında tahmin birimini belirle; eski/yeni değer, gerekçe ve güven düzeyini sakla. Farklı birimleri toplamaya izin verme.
- **Kabul ölçütü:** Kullanıcı bir işin tahmin değişimini inceleyebilir; toplamlarda kullanılan birim ve tahminsiz iş sayısı görünür.
- **Öncelik / efor:** P2 / Orta. ROTA-NEXT-012 proje eforlama panelini tekrar etmez.

### ROTA-IDEA-029 · Risklerin ölçülebilir izlenmesi

- **İhtiyaç:** Risk modelinde açıklama, sahip ve durum var; etki, olasılık ve takip tarihi alanları bulunmuyor.
- **Öneri:** Etki/olasılık ölçeği, azaltma aksiyonu ve gözden geçirme tarihi ekle; iş ve release bağlantılarını görünür yap.
- **Kabul ölçütü:** Geciken risk aksiyonları filtrelenir; hesaplanan risk seviyesi kullanılan ölçeği açıklar ve elle verilen gerekçe korunur.
- **Öncelik / efor:** P2 / Orta. ROTA-NEXT-007 release hazırlık görünümünü besler.

### ROTA-IDEA-030 · Karar sürümlerinin fark görünümü

- **İhtiyaç:** Karar geçmişi ve eski içerikte arama zaten var; iki sürümü karşılaştırmak değişiklikleri okumayı hızlandırır.
- **Öneri:** Bağlam, seçenek, gerekçe, sahip, tarih ve ilişkilerde eklenen/çıkarılan değerleri yan yana veya satır farkıyla göster.
- **Kabul ölçütü:** Kullanıcı iki sürüm seçip değişen alanları görebilir; yalnızca biçim değişikliği ile içerik değişikliği ayırt edilir.
- **Öncelik / efor:** P2 / Orta. Tamamlanmış ROTA-NEXT-001'in devamıdır.

## 7. Excel, Outlook ve Jira akışları

### ROTA-IDEA-031 · Excel sütun eşleme ve satır doğrulama

- **İhtiyaç:** İçe aktarma ilk sayfanın başlık/açıklama alanlarını okuyor ve ilk altı satırı önizliyor; farklı tablolar için kapsam sınırlı.
- **Öneri:** Sayfa seçimi, sütun eşleme, tür/öncelik/tarih/etiket alanları ve satır bazlı hata önizlemesi ekle; mevcut minimal akışı hızlı seçenek olarak koru.
- **Kabul ölçütü:** Geçersiz tarih veya boş başlık satırı numarasıyla gösterilir; kullanıcı geçerli satırları seçerek içe aktarabilir.
- **Öncelik / efor:** P2 / Büyük. ROTA-NEXT-013'ün genişletilmesidir.

### ROTA-IDEA-032 · Excel aktarımında yineleme ve güncelleme kontrolü

- **İhtiyaç:** Mevcut onay akışı satırları yeni iş olarak ekliyor; aynı dosyanın yeniden alınması yinelenen işler üretebilir.
- **Öneri:** Rota iş ID'siyle güncelleme, dosya/satır iziyle tekrar uyarısı ve ekle/güncelle/atla önizlemesi sun; yalnızca başlık benzerliğine göre otomatik birleştirme yapma.
- **Kabul ölçütü:** Aynı dosya tekrar seçilince beklenen değişiklikler görünür; kullanıcı onaylamadan mevcut işler güncellenmez ve aktarım topluca geri alınabilir.
- **Öncelik / efor:** P1 / Büyük. Sütun eşleme ile birlikte geliştirilmesi önerilir.

### ROTA-IDEA-033 · Outlook e-postasından mevcut kayda yönlendirme

- **İhtiyaç:** E-posta ayrıştırma, ek seçimi ve parmak izi desteği var; benzer yazışmayı mevcut işe ekleme akışı daha yönlendirici olabilir.
- **Öneri:** Konu, iş anahtarı ve mevcut e-posta iziyle aday kayıt öner; yeni iş/not/görev açma veya mevcut kayda ekleme seçtir.
- **Kabul ölçütü:** Kullanıcı .msg/.eml içeriğini seçtiği kayda ekler; gövde ve ekler önizlenir, yinelenen e-posta uyarılır ve kaynak bilgisi korunur.
- **Öncelik / efor:** P2 / Büyük. Klasik Outlook sürükle-bırak akışı native host üzerinde ayrıca doğrulanmalıdır.

### ROTA-IDEA-034 · Jira sonuçlarında sayfalama ve tazelik

- **İhtiyaç:** Jira ekranı ilk 100 kaydı gösterdiğini belirtiyor; büyük board'larda eksik kapsamla karar verilebilir.
- **Öneri:** Sonraki sayfayı yükleme, sunucu destekliyorsa toplam kayıt sayısı, son başarılı sorgu zamanı ve açık hata/yeniden dene durumu ekle.
- **Kabul ölçütü:** 100'den fazla kayıtlı bir board'da kalan sonuçlar alınabilir; eksik yükleme tam liste gibi sunulmaz ve hata mevcut sonuçları kaybettirmez.
- **Öncelik / efor:** P1 / Orta. Canlı Jira doğrulaması gerekir.

### ROTA-IDEA-035 · Bağlı Jira işi için fark ve kontrollü güncelleme

- **İhtiyaç:** Rota işinden Jira kaydı oluşturma ve anahtar bağlama var; sonradan değişen başlık/durum bilgisi için karşılaştırma yararlıdır.
- **Öneri:** Bağlı işin güncel Jira değerlerini getir; alan bazında farkı göster, yön ve durum eşlemesini kullanıcı seçsin. İlk kapsam mevcut Jira kaydıyla bağlantı kurmayı da içersin.
- **Kabul ölçütü:** Eşzamanlı değişiklikte veri sessizce ezilmez; aktarılan alanlar ve yön kaydedilir, başarısız istek yeniden oluşturma ile mükerrer issue üretmez.
- **Öncelik / efor:** P2 / Büyük. Durum eşleme, Jira yetkileri ve canlı sunucu testi gerekir.

## 8. Veri dayanıklılığı ve masaüstü performansı

### ROTA-IDEA-036 · Yerel kaydetme hatası ve kurtarma ekranı

- **İhtiyaç:** save() çalışma alanını doğrudan localStorage'a yazıyor; açılışta okuma hatası örnek veriye düşüyor. Kullanıcı kaydının durumu daha açık yönetilmeli.
- **Öneri:** Yazma hatalarını yakala; kaydedilmemiş değişiklikleri belirt ve yeniden dene/dışa aktar sun. Bozuk veri açılışında özgün içeriği koruyup kurtarma ekranı göster; otomatik örnek veriyle üzerine yazma.
- **Kabul ölçütü:** Depolama yazma hatasında başarı mesajı verilmez; bozuk kayıt kullanıcı onayı olmadan değiştirilmez ve kurtarma için dışa alınabilir.
- **Öncelik / efor:** P1 / Büyük.

### ROTA-IDEA-037 · Otomatik yedekleme ve geri yükleme provası

- **İhtiyaç:** Manuel yedek/geri yükleme mevcut; düzenli ve geri açılabilir kopya üretimi kullanıcıya bağlı.
- **Öneri:** Yerel host üzerinden seçilen klasöre zamanlı yedek, saklama sayısı ve son başarılı yedek göstergesi ekle; geri yüklemeden önce kayıt/ek bütünlüğünü denetle ve güvenlik kopyası al.
- **Kabul ölçütü:** Uygulama açıkken planlı yedek üretilir; eksik ek veya bozuk yedek açıkça raporlanır, başarısız geri yükleme mevcut çalışma alanını değiştirmez.
- **Öncelik / efor:** P1 / Büyük. Uygulama kapalıyken zamanlama ayrı kapsamdır.

### ROTA-IDEA-038 · Sürümlü veri şeması ve bağlantı bütünlüğü

- **İhtiyaç:** Model büyüdükçe eski kayıtlar, ad üzerinden proje ilişkileri ve silinen hedeflere bağlantılar daha dikkatli taşınmalı.
- **Öneri:** Şema sürümü ve aşamalı veri dönüşümleri ekle; proje/üye ilişkilerini kalıcı ID'lerle yönet, boşa düşen referansları onarım raporunda göster. Görünüm tercihlerini de taşınabilir yedek kapsamına al.
- **Kabul ölçütü:** Eski yedek örnekleri kayıpsız açılır; proje/üye yeniden adlandırması ilişkileri koparmaz, dönüşüm hatasında özgün veri korunur.
- **Öncelik / efor:** P1 / Büyük. 036 ve 037 ile birlikte veri temelini oluşturur.

### ROTA-IDEA-039 · Büyük listelerde sanallaştırma ve artımlı çizim

- **İhtiyaç:** Liste ve birçok ekran HTML'i yeniden üretiyor; binlerce işte tepki süresi ve odak korunumu ölçülmeli.
- **Öneri:** Önce referans veriyle ölç; ihtiyaç doğrulanınca Liste ve Board için ayrı sanallaştırma uygula, filtre aramasını gecikmeli çalıştır ve yalnızca değişen bölümü güncelle.
- **Kabul ölçütü:** 5.000 işlik testte referans cihaz ve başlangıç ölçümü belgelenir; filtre sonrası görünür sonuç hedefi 300 ms altında olur, seçim/odak/satır içi düzenleme korunur.
- **Öncelik / efor:** P2 / Büyük. Süre hedefi doğrulanacak ürün hedefidir, mevcut performans iddiası değildir.

### ROTA-IDEA-040 · Masaüstü tanılama ve işlem geçmişi

- **İhtiyaç:** Dosya, WebView2 ve Jira hatalarını yalnızca kısa mesajlardan incelemek destek sürecini zorlaştırabilir.
- **Öneri:** Uygulama/host sürümü, WebView2 bilgisi, son işlem hataları ve ilişkilendirme kimliği içeren yerel tanılama ekranı sun; kullanıcı seçerse maskelenmiş rapor dışa aktarsın.
- **Kabul ölçütü:** Bir ek içe aktarma hatası rapordan bulunabilir; PAT, e-posta gövdesi, ek içeriği ve hassas çalışma alanı verileri rapora alınmaz; dışa aktarma öncesi içerik görülebilir.
- **Öncelik / efor:** P2 / Orta.

## Önerilen uygulama sırası

| Aşama | Öneriler | Beklenen kazanım |
| --- | --- | --- |
| 1 — Veri güvenilirliği | 036, 038, 037 | Kaydetme, veri dönüşümü ve yedekten dönüşün güvenilir olması |
| 2 — Günlük kullanım | 010, 026, 007, 004, 013 | Doğru geri bildirim, hızlı erişim ve klavye akışı |
| 3 — Görsel düzen | 001, 002, 003, 005, 006 | Daha okunabilir ve pencereye uyumlu arayüz |
| 4 — Kontrollü toplu çalışma | 009, 031, 032, 034 | Excel, Jira ve toplu işlemlerde görünür kapsam |
| 5 — Bilgi ve planlama | 016, 017, 018, 019, 027, 028, 029, 030 | Daha kaliteli kayıtlar ve açıklanabilir planlar |
| 6 — Genişletilmiş verimlilik | 008, 011, 012, 014, 015, 020, 021, 022, 023, 024, 025, 033, 035, 039, 040 | Arama, akış yönetimi ve ölçeklenebilirlik |

P1 maddeler kendi aşamaları içinde önce ele alınmalıdır. 016 taslak kurtarma için veri temeli; 032 için 031 sütun eşleme; 035 için 034 Jira okuma ve hata yönetimi önce tamamlanmalıdır. 039 performans çalışması ölçümle gerekçelendirilir. Diğer maddeler kullanıcı geri bildirimiyle bağımsız seçilebilir.

## Başarıyı değerlendirme

İlk uygulama öncesinde örnek bir kullanıcı akışında iş oluşturma, filtreyle kayıt bulma, satır içi düzenleme ve Excel içe aktarma süreleri ölçülmelidir. Sonraki değerlendirmede aynı veri ve cihaz kullanılmalı; süreyle birlikte hatalı işlem, kaybolan taslak, eksik sonuç ve kurtarılabilen kayıt sayıları karşılaştırılmalıdır. Kabul ölçütleri karşılanmadan öneriler tamamlandı sayılmaz.
