# Rota — Bekleyen feature'lar

Bu dosya, henüz tamamlanmamış tüm onaylı işleri ve değerlendirilmek üzere önerilen feature'ları tutar. Yeni ister önce bu dosyaya eklenir. Bir feature tamamlandığında buradan silinir ve `tamamlanan-featurelar.md` dosyasına taşınır. Aksi özellikle belirtilmedikçe ürün dokümantasyonu bu iki dosyada güncel tutulur.

## Sıralama

1. **Önerilen ürün fonksiyonları:** İş günlüğü, blokaj, planlama, roadmap ve release. PO onayı sonrası uygulama kapsamı olur.
2. **İleri sürüm adayları:** Entegrasyonlar, çok kullanıcılı yapı ve otomasyon.
3. **En son öncelik:** R1 — Windows dağıtım paketi.

## Ürün hedefi

PO, ürünün geçmiş kararlarını, bugün devam eden teslimatını ve gelecekteki planını yönetebilmeli. Her işin ne olduğu kadar neden yapıldığı, ürünün hangi bileşenini etkilediği, kimin üzerinde çalıştığı, ne zaman ve nasıl ilerlediği, neye takıldığı ve hangi release'e girdiği de görünür olmalı.

### Kullanıcıların yanıtlamak istediği sorular

- Üründe hangi problemler ve işler var; bunlar hangi hedefe hizmet ediyor?
- Her iş şu an hangi durumda, sıradaki adım ne ve sahibi kim?
- Kim, ne zaman, hangi bilgiyi değiştirdi veya hangi ilerleme notunu ekledi?
- İş neden bloke; hangi başka iş veya karar bekleniyor ve kim takip ediyor?
- Hangi işler hangi release'e planlandı; release tarihi, kapsamı ve hazır olma durumu nedir?
- Geçmişte ne tamamlandı ve gerçekten ne zaman yayınlandı; plan ile gerçekleşen tarih nasıl farklılaştı?
- PO'nun kişisel notu ile takımın ortak iş günlüğü arasındaki fark nedir?
- Bir ekran, batch veya rapor değişince hangi backlog işleri ve release'ler etkileniyor?

## Önerilen kayıt modeli

| Kayıt | Amaç ve temel bilgiler |
| --- | --- |
| Ürün / proje | Ürün hedefi, PO, kapsam, aktif dönem ve ürün alanları |
| Initiative / hedef | Büyük ürün sonucu; hedef, başarı ölçütü, zaman aralığı ve bağlı epikler |
| Backlog işi | Story, bug veya task; açıklama, kabul kriterleri, öncelik, durum, takım, sorumlu, tahmin ve bağlantılar |
| İş günlüğü | İşe eklenen yorum/ilerleme notu; yazar, zaman, görünürlük ve isteğe bağlı ek |
| Blokaj / bağımlılık | Beklenen iş/karar, etkilenen kayıt, takip sahibi, açılış ve çözülme bilgisi |
| Sprint / plan dönemi | Başlangıç-bitiş, hedef ve döneme alınan işler; kapasite daha sonra değerlendirilebilir |
| Release | Sürüm adı, planlanan tarih, kapsam, readiness durumu ve gerçek yayın tarihi |
| Aktivite kaydı | Alanın eski/yeni değeri, işlemi yapan kullanıcı ve zaman damgası; denetlenebilir olay geçmişi |

Kişisel not, işe bağlı takım günlüğünden ayrı olmalı. Kişisel not sahibine ait olabilir; iş günlüğü işe erişimi olan takım için ortak ve eklemeli bir akış olur.

## Önerilen fonksiyonlar

### 6. Backlog tablo deneyimi

Bu kapsam #044–#046 ve #049 ile tamamlandı; tamamlanan kayıtlar `tamamlanan-featurelar.md` dosyasına taşındı.

### 7. Sprint planlama

Bu kapsam #048 ile tamamlandı; tamamlanan kayıt `tamamlanan-featurelar.md` dosyasına taşındı.

### 1. İş geçmişi ve ilerleme günlüğü

Bu kapsam release yönetimiyle tamamlandı ve `tamamlanan-featurelar.md` dosyasına taşındı.

### 2. Atama, blokaj ve bağımlılık takibi


### 3. Ürün planlama ve roadmap

Bu kapsam tamamlandı ve `tamamlanan-featurelar.md` dosyasına taşındı.

### 4. Release ve yayın sonrası takip

Bu kapsam tamamlandı ve `tamamlanan-featurelar.md` dosyasına taşındı.

### 5. PO ve takım panoları

Bu kapsam tamamlandı ve `tamamlanan-featurelar.md` dosyasına taşındı.

## Önerilen faz sırası

### Faz 1 — PO planlama ve görünür iş günlüğü

Tek kullanıcılı yerel kullanımda işe bağlı not/ilerleme günlüğü, blokaj/bağımlılık, hedef tarih, hafif roadmap ve release kaydı eklenmeli. Yazar yalnızca mevcut çalışma alanı kullanıcısını temsil etmeli; takım üyeleri adına işlem yapılmış gibi gösterilmemeli.

### Faz 2 — Gerçek takım çalışması ve izlenebilirlik

- Takım üyeleri kendi hesaplarıyla giriş yapmalı; kurumsal kimlik, rol ve proje erişimi tanımlanmalı.
- Her yorum, alan değişikliği ve atama gerçek kullanıcı kimliğine bağlanmalı.
- Sunucu/API, cihazlar arası senkronizasyon, eşzamanlı düzenleme, çevrimdışı davranış, çakışma çözümü, denetim kaydı ve bildirimler tasarlanmalı.
- Bu faz olmadan “takımda kim ne yaptı?” sorusuna güvenilir çok kullanıcılı cevap üretilemez. Mevcut yerel takım isimleri yalnızca atama etiketidir.

### Faz 3 — Ürün görünürlüğü ve ölçüm

Initiative/epic hiyerarşisi, roadmap, release sağlığı ve geçmiş/gelecek raporları eklenmeli. Ölçüm tanımları PO ve takımla netleştirilmeli.

### Faz 4 — Entegrasyonlar ve otomasyon

Jira Server, Outlook'tan kayıt oluşturma ve diagram/devir araçları; ihtiyaç ve kurum teknik koşulları doğrulandıktan sonra ele alınmalı.

## Önerilen kabul ölçütleri

- Bir işin durum, sorumlu, öncelik, hedef tarih ve release değişiklikleri kim/ne zaman bilgisiyle geçmişte görülür.
- İşe yeni not eklenir ve aktivite akışına girer; kişisel notlar ayrı kalır.
- Bloke işte neden, takip sahibi ve sonraki adım görünür; açık/çözülmüş zamanı izlenir.
- PO işi initiative/epic ve dönemle ilişkilendirebilir; planlanan ve gerçekleşen tarihleri ayırt eder.
- Release kapsamı, açık blokajlar ve yayın zamanı tek görünümde takip edilir; yayın zamanı tamamlanma zamanından ayrıdır.
- Çok kullanıcılı fazda kullanıcı yalnızca kendi kimliğiyle yaptığı değişikliklere atfedilir ve yetkisiz kullanıcı aktivite geçmişini değiştiremez.

## PO kararı bekleyen noktalar

1. Backlog **Task** ile kişisel takip görevi ayrı mı kalmalı? **Öneri:** Evet; backlog Task teslimat işidir, kişisel görev PO'nun kendi takibidir.
2. Bir iş birden çok release'e bağlanmalı mı? **Öneri:** İlk aşamada tek ana release; release değişim geçmişi korunsun.
3. Ortak takım notlarını kimler görmeli? **Öneri:** Projeye erişen üyeler; özel PO notu ayrı.
4. Gerçek takım geçmişi için kurum içi kimlik/API ve barındırma modeli ne olacak? Bu karar Faz 3 öncesi gerekir.
5. İlk roadmap hiyerarşisi Initiative → Epic → Story/Task/Bug yeterli mi? **Öneri:** İlk aşamada bu seviyelerle sınırlı kal.

## İleri sürüm adayları — henüz onaylı değil

## İleri fazdan önce değerlendirilebilecek 50 fikir

Bu liste ürün keşif havuzudur; fikirler henüz onaylanmış veya taahhüt edilmiş kapsam değildir. Öneriler Rota backlog'una `Öneri` etiketiyle alınmıştır ve PO önceliklendirmesine göre sıraya konabilir.

### PO kararları ve keşif

1. **Karar günlüğü:** Ürün kararlarını tarih, gerekçe, alternatifler ve etkilediği işler ile kaydet.
2. **Toplantı çıktısı şablonları:** Refinement, operasyon görüşmesi ve risk değerlendirmesi için doldurulabilir not şablonları sun.
3. **Açık soru havuzu:** Henüz yanıtlanmamış iş sorularını sahibine ve beklenen yanıt tarihine bağla.
4. **Kabul kriteri kontrol listeleri:** Story, bug ve bankacılık değişikliği tipine göre tekrar kullanılabilir kriter taslakları oluştur.
5. **Kapsam dışı kayıtları:** Bir işte özellikle yapılmayacakları ve bu kararın gerekçesini tut.
6. **Paydaş haritası:** İş alanı veya bileşen başına iş birimi, operasyon, risk ve teknik temas kişilerini PO notu olarak kaydet.
7. **Refinement hazırlık puanı:** Açıklama, kriter, bileşen, bağımlılık ve açık soru alanlarından şeffaf bir hazırlık kontrolü üret.
8. **Alternatif çözüm karşılaştırması:** Bir iş için seçenekleri, etkileri ve seçilen yaklaşımın gerekçesini yan yana sakla.
9. **Talep kaynağı ve kanıt:** İş talebini şikayet, operasyon bulgusu, hedef veya mevzuat girdisine; ek veya nota bağla.
10. **İş yaşlandırma görünümü:** Backlog'da ne kadar süredir beklediğini ve son karar tarihini göster.

### Bankacılık ürün kapsamı ve etki analizi

11. **Kanal etiketi:** Mobil, internet şubesi, çağrı merkezi, şube ve ATM etkisini bileşen/iş üzerinde seç.
12. **Müşteri segmenti kapsamı:** Bireysel, ticari, KOBİ veya kurumsal kapsamını kaydet.
13. **İşlem yaşam döngüsü haritası:** İşlemin talep, doğrulama, onay, muhasebeleştirme ve iade adımlarını kayıtla ilişkilendir.
14. **Hata senaryosu kataloğu:** Ürün alanı başına hata kodu, kullanıcı mesajı ve beklenen operasyon aksiyonunu tanımla.
15. **Durum geçiş tablosu:** İşlem durumlarının izin verilen geçişlerini ve tetikleyen koşulları basit bir tabloda tut.
16. **Veri alanı sözlüğü:** Bileşenlerde kullanılan kritik alanları, anlamını, formatını ve maskeleme notunu belgele.
17. **Arayüz sözleşme notları:** Servis veya entegrasyon bileşenine istek/yanıt alanı ve uyumluluk notları ekle.
18. **Dosya formatı envanteri:** Batch dosyalarının alan sırası, zorunlulukları ve sürüm notlarını bileşene bağla.
19. **Kesim saati takvimi:** EFT/FAST gibi iş akışlarında iş günü, tatil ve gün içi kesim saati varsayımlarını yerel referans olarak tut.
20. **Mutabakat kontrol noktaları:** Rapor/batch bileşenlerinde kaynak, kontrol toplamı, tolerans ve istisna sahibini kaydet.

### Planlama, sprint ve teslimat

21. **Sprint hedefi:** Sprint adına ek olarak tek cümlelik sonuç hedefi ve başarı işaretini kaydet.
22. **Sprint kapsam değişiklik geçmişi:** Sprint'e iş ekleme/çıkarma olaylarını gerekçesiyle göster.
23. **Sprint kapanış özeti:** Tamamlananlar, taşınan işler, bloke nedenleri ve öğrenimleri tek ekranda toparla.
24. **Sürükle-bırak öncelik sıralaması:** Liste görünümünde işleri kontrollü manuel sıraya al ve tercihi kaydet.
25. **Toplu alan güncelleme:** Seçili işlerin öncelik, etiket, dönem veya ürün aşamasını tek işlemde güncelle.
26. **Bağımlılık zaman çizgisi:** İşler arası bekleme ilişkilerini tarihleriyle kompakt bir zaman çizelgesinde göster.
27. **Planlama senaryoları:** Gerçek kayıtları değiştirmeden farklı sprint kapsamlarını taslak olarak karşılaştır.
28. **Efor değişim geçmişi:** Tahminin ne zaman ve hangi notla değiştiğini iş geçmişinde izle.
29. **Hazır iş havuzu:** Belirli takım için kriterleri tamamlanmış ve bloke olmayan işleri ayrı görünümde filtrele.
30. **Sprint kapasite notu:** Takımın izin, nöbet veya destek yükü gibi PO tarafından girilen kapasite notlarını sprintte sakla.

### Release, risk ve operasyon hazırlığı

31. **Release go/no-go listesi:** Yayın öncesi onay, izleme, geri alma ve iletişim maddelerini kontrol et.
32. **Geri alma planı:** Release başına geri dönüş adımlarını, karar sahibini ve tetikleyicileri kaydet.
33. **Yayın iletişim taslağı:** İç paydaş duyurusu ve operasyon bilgilendirmesi için release notlarından taslak oluştur.
34. **Operasyon hazırlık kontrolü:** Destek ekibi, çağrı merkezi ve mutabakat ekipleri için etkilenecek süreçleri işaretle.
35. **Risk kaydı:** Etki, olasılık, azaltım adımı, sahibi ve gözden geçirme tarihini ürün/işe bağla.
36. **Varsayım ve doğrulama:** Ürün varsayımlarını kanıt, doğrulama yöntemi ve son tarihle takip et.
37. **Test kanıtı bağlantıları:** Kabul kriterlerini manuel test notu, senaryo adı veya yerel dosya ekiyle ilişkilendir.
38. **UAT geri bildirim defteri:** Kullanıcı testi bulgularını iş, önem, karar ve tekrar test durumu ile kaydet.
39. **Gözlem penceresi:** Yayın sonrası ilk günler için kontrol edilecek göstergeleri ve sorumluyu release'te listele.
40. **Release sonrası değerlendirme:** Beklenen ve gerçekleşen sonucu, sürprizleri ve takip işlerini yapılandırılmış kayda al.

### Kişisel akış, görünürlük ve çalışma kolaylığı

41. **Günlük PO planı:** Bugün odaklanılacak işleri, görüşmeleri ve beklenen kararları tek kişisel listede topla.
42. **Haftalık ürün özeti:** Son hafta tamamlananlar, yeni blokajlar ve yaklaşan tarihlerden düzenlenebilir özet çıkar.
43. **Hatırlatma ve takip tarihi:** Kişisel görev ve blokajlara yerel bildirim veya açılışta hatırlatma zamanı ekle.
44. **Kayıtlar arası çapraz bağlantı:** İş, bileşen, release, karar notu ve risk arasında hızlı ilişki oluştur.
45. **Şablonla iş oluşturma:** Sık tekrarlanan EFT, limit değişikliği veya rapor talebi için alanları hazır iş şablonları kullan.
46. **Favoriler ve sabitlenmiş kayıtlar:** Sık açılan proje, iş, bileşen ve release'leri kısayol olarak sabitle.
47. **Kişisel çalışma alanı yedek profilleri:** Ayrı ürün portföyleri için yedeklenebilir görünüm ve filtre tercihleri oluştur.
48. **Arşivde arama:** Arşivlenmiş işleri, projeleri ve release'leri ana backlog'u kirletmeden sorgula.
49. **Yinelenen işi bulma yardımcısı:** Başlık, açıklama, alan ve bileşen benzerliğine göre olası tekrarları kaydetmeden önce göster.
50. **PO devir paketi:** Seçili ürün için hedefler, açık kararlar, blokajlar, sprint ve release durumlarından yazdırılabilir devir özeti hazırla.

### Jira Server entegrasyonu

**Durum:** Ertelendi; ilk sürümde yok.

- Kurum Jira Server sürümü, ağ erişimi ve kimlik doğrulama yöntemi keşfedilmeli.
- Tek yönlü içe alma veya çift yönlü senkron, alan eşleme, çakışma, kesinti ve denetim izi tasarlanmalı.

### Üretim öncesi güvenlik ve sağlamlaştırma

**Durum:** Kod altyapısı hazır; kurumsal imza ve yayın ortamı ile uçtan uca doğrulama bekliyor.

- **ROTA-PLAN-039 · Devam ediyor:** Paketlenmiş uygulamada HTTPS feed kontrolü, kullanıcı onaylı indirme/yeniden başlatma ve Windows Authenticode yayıncı doğrulaması için altyapı eklendi. Normal/imzasız paket güncelleme feed'ine bağlanmaz. Uçtan uca yayın için `ROTA_UPDATE_URL`, sertifikayla aynı `ROTA_PUBLISHER_NAME` ve kurum kod imzalama sertifikası gerekir. Sertifika dosyası `WIN_CSC_LINK`/`CSC_LINK` ile veya Windows sertifika deposu `ROTA_CERTIFICATE_SUBJECT_NAME`/`ROTA_CERTIFICATE_SHA1` ile seçilebilir; parola kaynak koduna konmamalı. Hassas veri içermeyen yerel loglar, yedekleme, bütünlük kontrolü ve hatalı geri yüklemede mevcut veriyi koruma tamamlandı.

### R1 — Windows dağıtım paketi (en son öncelik)

**Durum:** Kısmen tamamlandı · **Öncelik:** En son

- **ROTA-PLAN-043 · Devam ediyor:** Per-user kurulum/kaldırma ve yükseltmede çalışma alanı verisinin korunması yapılandırıldı. Test paketi imzasız; kurumun kod imzalama sertifikası ve güvenlik incelemesi gerekiyor.

### Yeni iyileştirme havuzu — ROTA-PLAN-101–200

PO incelemesi için oluşturulan 100 mevcut akış iyileştirme önerisinden henüz tamamlanmayanlar burada tutulur. Tamamlananlar `tamamlanan-featurelar.md` dosyasına taşınır. Odak; hızlı iş/görev girişi, Outlook bırakma akışı, backlog liste ve düzenleme deneyimi, arama/görünümler, iş ayrıntıları, takım/proje gezinmesi, sprint/release planlama, bileşen/diyagram kullanımı, görünüm/erişilebilirlik ve dosya ekleridir. Bekleyen maddeler fikir havuzudur ve Rota içinde Yeni durumunda, Düşük öncelikte ve Öneri etiketiyle tutulur.


