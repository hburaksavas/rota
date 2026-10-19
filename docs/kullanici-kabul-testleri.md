# Kullanıcı kabul testleri

Jira entegrasyonu kapsam dışıdır. Testler Electron uygulamasını geçici ve izole bir kullanıcı profiliyle açar; mevcut Rota kullanıcı verilerine dokunmaz.

- Senaryo sayısı: 100
- Başarılı: 100
- Başarısız: 0
- Çalıştırma zamanı: 20.10.2026 01:06:22
- Çalıştırma: `npm run test:acceptance`

Her senaryo, belirtilen kullanıcı akışının ilgili ekranını, alanını veya eylemini Electron arayüzünde doğrular. PASS olan senaryolar beklenen UI kabul ölçütünü karşıladı.

| ID | Kullanıcı kabul senaryosu | Sonuç |
|---|---|---|
| UAT-001 | İlk açılışta çalışma alanı kurulumu istenir | PASS |
| UAT-002 | Kurum bilgisi alınır | PASS |
| UAT-003 | Çalışma alanı adı alınır | PASS |
| UAT-004 | Kullanıcı adı ve rolü yapılandırılabilir | PASS |
| UAT-005 | İlk açılış örnek veya boş başlangıç sunar | PASS |
| UAT-006 | Kurulumda proje listesi tanımlanabilir | PASS |
| UAT-007 | Kurulumda takım ve üyeler tanımlanabilir | PASS |
| UAT-008 | Kurulum zorunlu alanları doğrulanabilir | PASS |
| UAT-009 | Genel bakış açılır | PASS |
| UAT-010 | Kişisel karşılama gösterilir | PASS |
| UAT-011 | Yeni iş kısayolu görünür | PASS |
| UAT-012 | Backlog özeti görünür | PASS |
| UAT-013 | Ürün hedefleri ve yayın takibi görünür | PASS |
| UAT-014 | Hazır işler paneli görünür | PASS |
| UAT-015 | Kişisel görev özeti görünür | PASS |
| UAT-016 | Son notlar paneli görünür | PASS |
| UAT-017 | Aktif proje gezinme listesi görünür | PASS |
| UAT-018 | Proje arama alanı görünür | PASS |
| UAT-019 | Backlog listesi açılır | PASS |
| UAT-020 | Backlog tablosu görünür | PASS |
| UAT-021 | Backlog satırları yüklenir | PASS |
| UAT-022 | Backlog arama alanı görünür | PASS |
| UAT-023 | Durum filtresi görünür | PASS |
| UAT-024 | Tür filtresi görünür | PASS |
| UAT-025 | Takım filtresi görünür | PASS |
| UAT-026 | Sorumlu filtresi görünür | PASS |
| UAT-027 | Kayıtlı görünüm seçilebilir | PASS |
| UAT-028 | Sıralama seçilebilir | PASS |
| UAT-029 | Görünüm kaydetme eylemi görünür | PASS |
| UAT-030 | Görünüm yönetimi açılır | PASS |
| UAT-031 | Hazır iş havuzu kontrolü görünür | PASS |
| UAT-032 | Kolon yönetimi açılır | PASS |
| UAT-033 | Başlık önizleme kontrolü görünür | PASS |
| UAT-034 | Excel dışa aktarma eylemi görünür | PASS |
| UAT-035 | Toplu silme eylemi görünür | PASS |
| UAT-036 | Sprint oluşturma eylemi görünür | PASS |
| UAT-037 | Hızlı backlog ekleme alanı görünür | PASS |
| UAT-038 | Ayrıntılı iş formu kısayolu görünür | PASS |
| UAT-039 | Görünüm listesi ile tablo görünümü birlikte sunulur | PASS |
| UAT-040 | Liste görünümü seçilebilir | PASS |
| UAT-041 | Board görünümüne geçilebilir | PASS |
| UAT-042 | Board görünümünde kolonlar sunulur | PASS |
| UAT-043 | Board kartları görünür | PASS |
| UAT-044 | Boarddan listeye geri dönülebilir | PASS |
| UAT-045 | Filtrelenmiş kayıt adedi sunulur | PASS |
| UAT-046 | Toplam kayıt adedi sunulur | PASS |
| UAT-047 | Filtre temizleme alanı bulunur | PASS |
| UAT-048 | Başlık önizleme varsayılanı açık | PASS |
| UAT-049 | Kolonlarda hızlı düzenleme alanı bulunur | PASS |
| UAT-050 | Tek satır hızlı silme kontrolü tablo satırında sunulur | PASS |
| UAT-051 | Backlog satırı ayrıntısı açılır | PASS |
| UAT-052 | İş başlığı gösterilir | PASS |
| UAT-053 | İş açıklaması gösterilir | PASS |
| UAT-054 | İş durumu düzenlenebilir | PASS |
| UAT-055 | İş önceliği düzenlenebilir | PASS |
| UAT-056 | İş eki alanı sunulur | PASS |
| UAT-057 | İş dosyası ekleme eylemi sunulur | PASS |
| UAT-058 | İş bileşen ilişkileri gösterilir | PASS |
| UAT-059 | İş devri özeti hazırlanabilir | PASS |
| UAT-060 | İş düzenleme eylemi sunulur | PASS |
| UAT-061 | İş arşivleme eylemi sunulur | PASS |
| UAT-062 | İlişkili kişisel görev oluşturma eylemi sunulur | PASS |
| UAT-063 | İş etkinlik kaydı sekmesi açılır | PASS |
| UAT-064 | İş ayrıntısı sekmelerle kullanılabilir | PASS |
| UAT-065 | İş ayrıntısı kapatılabilir | PASS |
| UAT-066 | Takım paneli açılır | PASS |
| UAT-067 | Takım ekleme eylemi görünür | PASS |
| UAT-068 | Takım paneli üye araması sunar | PASS |
| UAT-069 | Takım istatistikleri görünür | PASS |
| UAT-070 | Takım tarih filtresi görünür | PASS |
| UAT-071 | Takım hedef tarih filtresi görünür | PASS |
| UAT-072 | Takım dönem filtresi görünür | PASS |
| UAT-073 | Efor aralığı filtreleri görünür | PASS |
| UAT-074 | Takım üye kartları görünür | PASS |
| UAT-075 | Üye bazlı iş takibi sunulur | PASS |
| UAT-076 | Takım düzenleme eylemi sunulur | PASS |
| UAT-077 | Takım oluşturma formu açılır | PASS |
| UAT-078 | Takım adı alınır | PASS |
| UAT-079 | Takıma üye eklenebilir | PASS |
| UAT-080 | Takım formu kaydetme eylemi sunar | PASS |
| UAT-081 | Takım oluşturma formu kapatılıp panele dönülür | PASS |
| UAT-082 | Ürün envanteri açılır | PASS |
| UAT-083 | Envanter bileşeni ekleme eylemi görünür | PASS |
| UAT-084 | Envanter araması görünür | PASS |
| UAT-085 | Envanter tür filtresi görünür | PASS |
| UAT-086 | Envanter proje filtresi görünür | PASS |
| UAT-087 | Pasif bileşenleri gösterme seçeneği görünür | PASS |
| UAT-088 | Envanter görünür kayıt sayısını gösterir | PASS |
| UAT-089 | Kart ve ilişki diyagramı görünümleri değiştirilebilir | PASS |
| UAT-090 | Yeni bileşen formu açılır | PASS |
| UAT-091 | Bileşen adı ve kodu zorunlu alanları sunulur | PASS |
| UAT-092 | Ekran batch rapor ve servis türleri seçilebilir | PASS |
| UAT-093 | Bileşen proje ve alan bilgisi alınır | PASS |
| UAT-094 | Bileşenler arası çoklu ilişki seçilebilir | PASS |
| UAT-095 | Bileşen sorumlusu tanımlanabilir | PASS |
| UAT-096 | Yol haritası initiative ve epic kapsamı sunar | PASS |
| UAT-097 | Release planı açılır | PASS |
| UAT-098 | Kişisel alanda görev ve notlar birlikte izlenir | PASS |
| UAT-099 | Açık sorular görünümü açılır | PASS |
| UAT-100 | Günlük ve haftalık çalışma özetleri açılır | PASS |
