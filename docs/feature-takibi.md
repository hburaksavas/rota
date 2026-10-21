# Rota — Ürün Gelecek Planı

Bu dosya Rota feature'larının güncel takip kaynağıdır. Önceki feature listeleri geri yüklenmemiştir; bu yol haritası temiz başlangıçtır.

## Ürün yönü

Rota, Product Owner'ın yalnızca işleri değil, bankacılık ürününün bağlamını, kararlarını, etkilerini ve teslimat güvenini yönetebildiği bir masaüstü çalışma alanı olmalı. Yeni kabiliyetler mevcut backlog, envanter, ekip, sprint ve release ekranlarını çoğaltmak yerine bu kayıtlar arasındaki karar ve kanıt bağlarını güçlendirmelidir.

## Bekleyen — Yol Haritası

### Faz 1 — Ürün bilgisini ve etkisini görünür kıl

Bu faz, ekip değişse veya aylar geçse bile ürün kararlarının ve bileşenler arasındaki etkilerin izlenebilmesini sağlar.

#### ROTA-NEXT-002 · Ürün çapında etki ve bağımlılık haritası

- **İhtiyaç:** Envanter diyagramı tek başına değişikliğin hangi akışları, batch'leri, raporları ve teslimatları etkilediğini göstermiyor.
- **Kapsam:** Ekran, servis/API, batch, rapor, iş, karar, kontrol ve release arasında türü açıklanmış bağlantılar. Bir kayıt değişirken etkilenen komşular, bağımlılık yolu ve etki gerekçesi gösterilir; etki haritası filtrelenip paylaşılabilir.
- **Başarı ölçütü:** PO seçtiği bir bileşen veya işi değişiklik kaynağı yapıp ilişkili kayıtları ve etki yolunu tek görünümde inceleyebilir.

#### ROTA-NEXT-003 · Bankacılık ürün sözlüğü ve kural kataloğu

- **İhtiyaç:** Bakiye, valör tarihi, işlem durumu, ücret, limit ve müşteri tipi gibi terimler ekranlar ve ekipler arasında farklı yorumlanabiliyor.
- **Kapsam:** İş terimi ve kural tanımı, geçerli olduğu ürün/kanal/müşteri/işlem kapsamı, istisnalar, iş sahibi, yürürlük tarihi ve sürüm geçmişi. Terimler ilgili envanter bileşeni, karar ve backlog işleriyle ilişkilendirilir.
- **Başarı ölçütü:** Bir terimin güncel tanımı, kapsamı ve değişiklik geçmişi ürün içinden bulunabilir; eskimiş tanım ve sahipsiz kural görünür olur.

#### ROTA-NEXT-011 · Envanter bileşeni karmaşıklık profili

- **İhtiyaç:** Ekran, servis/API, batch ve raporlar yalnızca tür ve açıklamayla envanterleniyor; büyüklük ve belirsizlikleri planlamada karşılaştırılamıyor.
- **Kapsam:** Bileşen türüne göre özelleştirilebilir karmaşıklık boyutları: iş kuralı sayısı/çeşidi, kanal ve kullanıcı rolleri, entegrasyon ve bağımlılıklar, veri dönüşümü, güvenlik ve düzenleyici kontrol, operasyonel çalışma biçimi ve test kapsamı. Her boyut için seviye, dayanak, bilinmeyenler ve güven düzeyi tutulur. Ağırlıklar çalışma alanında ayarlanabilir; ham profil ve hesaplanan seviye birlikte saklanır.
- **Başarı ölçütü:** PO, bileşen karmaşıklık seviyesinin hangi gözlemlere ve ağırlıklara dayandığını görebilir; eksik bilgi yanlış kesinlik üretmeden işaretlenir.

### Faz 2 — Düzenleyici ve kalite güvencesini izlenebilir yap

Bu faz, talep ve kuraldan uygulama ile doğrulama kanıtına kadar bağları kurar. İlk sürümlerde dış mevzuat sistemlerine otomatik bağlanma şart değildir.

#### ROTA-NEXT-004 · Yükümlülükten kontrol ve teslimata iz zinciri

- **İhtiyaç:** Bir düzenleyici veya kurum içi yükümlülüğün hangi ürün kuralı, bileşen, backlog işi ve doğrulama kanıtıyla karşılandığı dağınık kalıyor.
- **Kapsam:** Kaynak referansı ve yürürlük tarihi; yükümlülük; ürün yorumu; kontrol; sorumlu; etkilenen bileşenler ve işler; doğrulama kanıtı. Eksik bağlantılar ve gözden geçirme tarihi geçen kayıtlar uyarı olarak görünür.
- **Başarı ölçütü:** Bir yükümlülükten ilgili release'e ve kanıta kadar iz zinciri kurulabilir, eksik halkalar filtrelenebilir ve denetim için dışa aktarılabilir.

#### ROTA-NEXT-005 · Değişiklik etki incelemesi ve onay akışı

- **İhtiyaç:** Ürün kuralı veya bileşen değiştiğinde uyum, operasyon, güvenlik ve kanallar üzerindeki etkiler ancak geç aşamada fark edilebiliyor.
- **Kapsam:** Değişiklik kaydı; etkilenen kapsam ve müşteriler; etki analizi; inceleme grupları; görüş, karar ve koşullar; onay/ret/açıklama durumu. İnceleme sonucu ilgili karara, işe ve release'e bağlanır.
- **Başarı ölçütü:** PO değişikliği teslimata almadan önce gerekli incelemeleri ve açık onayları tek ekrandan görebilir.

#### ROTA-NEXT-006 · Yapılandırılmış kabul senaryoları ve kanıt kapsamı

- **İhtiyaç:** Serbest metin kabul kriterleri test edilebilir örneklere ve doğrulama kanıtına dönüşürken kayboluyor.
- **Kapsam:** Verilen/When/Then adımları, beklenen sonuç, varyant ve istisnalar; senaryoyu iş, kural, kontrol ve bileşene bağlama; manuel doğrulama sonucu, sürüm, doğrulayan kişi ve dosya/ekran görüntüsü kanıtı. İlk aşamada test otomasyonu çalıştırıcısı gerekmez.
- **Başarı ölçütü:** Release kapsamındaki ilgili kontrollerin hangi senaryolarla ve hangi kanıtla doğrulandığı; kapsanmayanların neler olduğu gösterilebilir.

### Faz 3 — Teslimat güvenini ve kapasiteyi planla

Bu faz, sprint ve release planlarını gerçek bağımlılık, risk ve takım kapasitesiyle ilişkilendirir.

#### ROTA-NEXT-007 · Release hazırlık dosyası ve kontrollü geçiş kapısı

- **İhtiyaç:** Release kararı; tamamlanma, test, kontrol, onay, operasyon hazırlığı ve geri dönüş planı bilgileri bir araya getirilmeden verilebiliyor.
- **Kapsam:** Release kapsamı ve sürüm; dahil işler; bağımlılıklar; açık risk/blokaj; test ve kontrol kanıtı; iş birimi/operasyon onayı; dağıtım ve geri alma adımları; karar sahibi. Tamamlanmamış zorunlu kontroller release'i engellemek yerine sebebi görünür, açıklanabilir bir hazır olma durumu üretir.
- **Başarı ölçütü:** Release toplantısı için güncel kapsam, açık noktalar, kanıtlar ve karar özeti tek dosyada hazırlanabilir.

#### ROTA-NEXT-008 · Takımlar arası kapasite ve senaryo tahmini

- **İhtiyaç:** Birden fazla takımın bağlı olduğu işlerde sprint kapsamı ve hedef tarih, takım kapasitesi ve bağımlılık gecikmeleri hesaba katılmadan planlanabiliyor.
- **Kapsam:** Takım bazında dönem kapasitesi, izin/ayrılmış kapasite, sprint yükü, tahmin güveni ve bağımlı işler. PO alternatif kapsam veya gecikme senaryolarını deneyerek hedef tarih ve etkilenen release değişimini karşılaştırır. Kişi performans puanı üretmez.
- **Başarı ölçütü:** PO kapsam değişikliğinin takım yükünü ve release hedefini nasıl etkilediğini senaryoları kaydetmeden önce karşılaştırabilir.

#### ROTA-NEXT-012 · Envanter karmaşıklığına dayalı proje eforlama paneli

- **İhtiyaç:** Proje eforu bileşen kapsamı, bağımlılık ve belirsizlikler görünmeden tek bir toplam tahmin olarak verilebiliyor.
- **Kapsam:** Proje envanterini ve ilişkili işleri kapsama alma; ROTA-NEXT-011 karmaşıklık profillerinden bileşen bazlı efor aralığı çıkarma; entegrasyon, test, güvenlik/uyum, veri dönüşümü ve operasyonel hazırlık paylarını ayrı gösterme. Panel, varsayılan yöntemi, faktör ağırlıklarını ve ekip verimlilik varsayımlarını açıklar; düşük/temel/yüksek senaryoları, güven düzeyini, hariç tutulan kapsamı ve PO düzeltmelerinin gerekçesini kaydeder. Farklı hesaplama yöntemleri yan yana karşılaştırılabilir; kesin teslim tarihi vaadi üretmez.
- **Bağımlılıklar:** Envanter karmaşıklık profilleri (ROTA-NEXT-011), ürün çapında bağımlılık haritası (ROTA-NEXT-002) ve takım kapasitesi (ROTA-NEXT-008).
- **Başarı ölçütü:** PO proje toplamını bileşen ve efor kalemi düzeyinde açıklayabilir; yöntem veya kapsam değişince önceki tahminle farkı ve değişim gerekçesini görebilir.

### Faz 4 — Ürün sonuçlarını öğrenme döngüsüne bağla

Bu faz, üretim ve müşteri sinyallerini kontrollü biçimde ürün kararlarına geri taşır.

#### ROTA-NEXT-009 · Üretim olayı ve operasyon sinyalinden ürün aksiyonu

- **İhtiyaç:** Tekrarlayan üretim sorunları ve operasyon yükü ayrı olay kayıtlarında kalıyor, ürün iyileştirmesine veya öncelik kararına dönüşmüyor.
- **Kapsam:** Anonimleştirilmiş olay özeti, etkilenen ürün akışı/bileşen, etki seviyesi, tekrar sıklığı, geçici çözüm, kök neden/öğrenim, operasyon sahibi ve bağlantılı işler. Olay, benzer olaylarla kümelenebilir ve backlog adayı üretebilir.
- **Başarı ölçütü:** Tekrarlayan olaylardan etkilenen bileşenleri ve açılan ürün aksiyonlarını izlemek; kişi veya müşteri bazında hassas veri tutmadan mümkün olur.

#### ROTA-NEXT-010 · Ürün sonucu, ölçüm ve deney takibi

- **İhtiyaç:** İşler tamamlanıyor ancak değişikliğin müşteri veya iş sonucu üzerindeki etkisi, başlangıç değeri ve ölçüm sahibi belirlenmiyor.
- **Kapsam:** Sonuç hedefi, hipotez, gösterge tanımı, başlangıç/hedef değer, ölçüm kaynağı ve sahibi, değerlendirme tarihi; değişiklik öncesi/sonrası gözlem; deney veya kontrollü aşamalı yayına bağlantı. Veriler toplulaştırılmış tutulur, hassas müşteri verisi Rota'ya kopyalanmaz.
- **Başarı ölçütü:** Release sonrası PO hedefin ölçülüp ölçülmediğini, gözlenen farkı ve sonraki ürün kararını aynı kayıtta değerlendirebilir.

## Öncelik ve bağımlılık sırası

1. **002–003, 011:** Sistem etkisi, ortak iş dili ve bileşen karmaşıklığı için bilgi temeli.
2. **004–006:** Yükümlülük, inceleme ve doğrulama kanıtı arasında izlenebilirlik.
3. **007–008, 012:** Bu bağları release hazırlığına, kapasite senaryolarına ve bileşen temelli efor tahminine taşıma.
4. **009–010:** Operasyon ve ürün sonucu sinyalleriyle geliştirme önceliklerini besleme.

Plan faz sırasını gösterir; tarih taahhüdü değildir. Bir feature tamamlanınca Bekleyen'den çıkarılıp aşağıdaki Tamamlanan bölümüne kısa tamamlanma notuyla taşınır.

## Tamamlanan

#### ROTA-NEXT-001 · Ürün karar kaydı ve karar geçmişi

- **Tamamlandı:** 21 Ekim 2026.
- **Teslimat:** Karar, bağlam, değerlendirilen seçenekler, gerekçe, sahip, karar tarihi ve gözden geçirme tarihini kaydetme; kararı backlog işi, ürün bileşeni, proje ve release'e bağlama; düzenleme sürümlerini saklama ve eski içerikte arama; yeni kararla eskisini geçersiz kılma ve karar zincirini gösterme. Gözden geçirme tarihi geçen kararlar durum filtresinde görünür.
- **Doğrulama:** Karar akışı için 6 yeni kabul senaryosu ve kurulum dahil toplam 14 odaklı kabul senaryosu geçti.
