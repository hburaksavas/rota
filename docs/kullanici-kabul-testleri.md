# Kullanıcı kabul testleri

Testler Electron uygulamasını geçici ve izole bir kullanıcı profiliyle açar; mevcut Rota kullanıcı verilerine dokunmaz. Canlı Jira sunucusu entegrasyonu kapsam dışıdır; Jira kapalıyken kullanıcı akışı doğrulanır.

- Senaryo sayısı: 350
- Başarılı: 350
- Başarısız: 0
- Çalıştırma zamanı: 21.10.2026 01:53:25
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
| UAT-028 | Kolon başlığı tıklaması sıralama yönünü değiştirir | PASS |
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
| UAT-047 | Tablo araçları üstte, durum özeti altta yer alır | PASS |
| UAT-048 | Tamamlananlar varsayılan olarak gizlidir | PASS |
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
| UAT-101 | Yeni karmaşık kabul testi 001 · Backlog işi türü yeni kaydı alanlarıyla kaydeder (Story) | PASS |
| UAT-102 | Yeni karmaşık kabul testi 002 · Backlog işi türü yeni kaydı alanlarıyla kaydeder (Bug) | PASS |
| UAT-103 | Yeni karmaşık kabul testi 003 · Backlog işi türü yeni kaydı alanlarıyla kaydeder (Task) | PASS |
| UAT-104 | Yeni karmaşık kabul testi 004 · Kişisel görev türü yeni kaydı alanlarıyla kaydeder (Kişisel görev) | PASS |
| UAT-105 | Yeni karmaşık kabul testi 005 · Not türü yeni kaydı alanlarıyla kaydeder (Not) | PASS |
| UAT-106 | Yeni karmaşık kabul testi 006 · Hızlı ekleme Enter ve buton akışında kalıcıdır 1 | PASS |
| UAT-107 | Yeni karmaşık kabul testi 007 · Hızlı ekleme Enter ve buton akışında kalıcıdır 2 | PASS |
| UAT-108 | Yeni karmaşık kabul testi 008 · Hızlı ekleme Enter ve buton akışında kalıcıdır 3 | PASS |
| UAT-109 | Yeni karmaşık kabul testi 009 · Hızlı ekleme Enter ve buton akışında kalıcıdır 4 | PASS |
| UAT-110 | Yeni karmaşık kabul testi 010 · Hızlı ekleme Enter ve buton akışında kalıcıdır 5 | PASS |
| UAT-111 | Yeni karmaşık kabul testi 011 · Hızlı ekleme Enter ve buton akışında kalıcıdır 6 | PASS |
| UAT-112 | Yeni karmaşık kabul testi 012 · Hızlı ekleme Enter ve buton akışında kalıcıdır 7 | PASS |
| UAT-113 | Yeni karmaşık kabul testi 013 · Hızlı ekleme Enter ve buton akışında kalıcıdır 8 | PASS |
| UAT-114 | Yeni karmaşık kabul testi 014 · Hızlı ekleme Enter ve buton akışında kalıcıdır 9 | PASS |
| UAT-115 | Yeni karmaşık kabul testi 015 · Hızlı ekleme Enter ve buton akışında kalıcıdır 10 | PASS |
| UAT-116 | Yeni karmaşık kabul testi 016 · Başlık ve açıklama araması güncellenir ve temizlenir 1 | PASS |
| UAT-117 | Yeni karmaşık kabul testi 017 · Başlık ve açıklama araması güncellenir ve temizlenir 2 | PASS |
| UAT-118 | Yeni karmaşık kabul testi 018 · Başlık ve açıklama araması güncellenir ve temizlenir 3 | PASS |
| UAT-119 | Yeni karmaşık kabul testi 019 · Başlık ve açıklama araması güncellenir ve temizlenir 4 | PASS |
| UAT-120 | Yeni karmaşık kabul testi 020 · Başlık ve açıklama araması güncellenir ve temizlenir 5 | PASS |
| UAT-121 | Yeni karmaşık kabul testi 021 · Başlık ve açıklama araması güncellenir ve temizlenir 6 | PASS |
| UAT-122 | Yeni karmaşık kabul testi 022 · Başlık ve açıklama araması güncellenir ve temizlenir 7 | PASS |
| UAT-123 | Yeni karmaşık kabul testi 023 · Başlık ve açıklama araması güncellenir ve temizlenir 8 | PASS |
| UAT-124 | Yeni karmaşık kabul testi 024 · Backlog filtresi seçimi ve temizleme (#status-filter · Bloke) | PASS |
| UAT-125 | Yeni karmaşık kabul testi 025 · Backlog filtresi seçimi ve temizleme (#status-filter · Hazır) | PASS |
| UAT-126 | Yeni karmaşık kabul testi 026 · Backlog filtresi seçimi ve temizleme (#type-filter · Bug) | PASS |
| UAT-127 | Yeni karmaşık kabul testi 027 · Backlog filtresi seçimi ve temizleme (#type-filter · Story) | PASS |
| UAT-128 | Yeni karmaşık kabul testi 028 · Backlog filtresi seçimi ve temizleme (#team-filter · Tüm takımlar) | PASS |
| UAT-129 | Yeni karmaşık kabul testi 029 · Backlog filtresi seçimi ve temizleme (#assignee-filter · Tüm sorumlular) | PASS |
| UAT-130 | Yeni karmaşık kabul testi 030 · Tablo üzerinden durum hızlı düzenlemesi 1 | PASS |
| UAT-131 | Yeni karmaşık kabul testi 031 · Tablo üzerinden durum hızlı düzenlemesi 2 | PASS |
| UAT-132 | Yeni karmaşık kabul testi 032 · Tablo üzerinden durum hızlı düzenlemesi 3 | PASS |
| UAT-133 | Yeni karmaşık kabul testi 033 · Tablo üzerinden durum hızlı düzenlemesi 4 | PASS |
| UAT-134 | Yeni karmaşık kabul testi 034 · Tablo üzerinden atama hızlı düzenlemesi 1 | PASS |
| UAT-135 | Yeni karmaşık kabul testi 035 · Tablo üzerinden atama hızlı düzenlemesi 2 | PASS |
| UAT-136 | Yeni karmaşık kabul testi 036 · Tablo üzerinden atama hızlı düzenlemesi 3 | PASS |
| UAT-137 | Yeni karmaşık kabul testi 037 · Tablo üzerinden atama hızlı düzenlemesi 4 | PASS |
| UAT-138 | Yeni karmaşık kabul testi 038 · Tablo görünüm ayarı kullanıcı tercihine uygulanır 1 | PASS |
| UAT-139 | Yeni karmaşık kabul testi 039 · Tablo görünüm ayarı kullanıcı tercihine uygulanır 2 | PASS |
| UAT-140 | Yeni karmaşık kabul testi 040 · Tablo görünüm ayarı kullanıcı tercihine uygulanır 3 | PASS |
| UAT-141 | Yeni karmaşık kabul testi 041 · Tablo görünüm ayarı kullanıcı tercihine uygulanır 4 | PASS |
| UAT-142 | Yeni karmaşık kabul testi 042 · Tablo görünüm ayarı kullanıcı tercihine uygulanır 5 | PASS |
| UAT-143 | Yeni karmaşık kabul testi 043 · Tablo görünüm ayarı kullanıcı tercihine uygulanır 6 | PASS |
| UAT-144 | Yeni karmaşık kabul testi 044 · Özel kolon görünümü uygulanır 1 | PASS |
| UAT-145 | Yeni karmaşık kabul testi 045 · Özel kolon görünümü uygulanır 2 | PASS |
| UAT-146 | Yeni karmaşık kabul testi 046 · Özel kolon görünümü uygulanır 3 | PASS |
| UAT-147 | Yeni karmaşık kabul testi 047 · Özel kolon görünümü uygulanır 4 | PASS |
| UAT-148 | Yeni karmaşık kabul testi 048 · Özel kolon görünümü uygulanır 5 | PASS |
| UAT-149 | Yeni karmaşık kabul testi 049 · Kayıtlı görünüm kaydetme ve görünüm yöneticisi 1 | PASS |
| UAT-150 | Yeni karmaşık kabul testi 050 · Kayıtlı görünüm kaydetme ve görünüm yöneticisi 2 | PASS |
| UAT-151 | Yeni karmaşık kabul testi 051 · Kayıtlı görünüm kaydetme ve görünüm yöneticisi 3 | PASS |
| UAT-152 | Yeni karmaşık kabul testi 052 · Kayıtlı görünüm kaydetme ve görünüm yöneticisi 4 | PASS |
| UAT-153 | Yeni karmaşık kabul testi 053 · Kayıtlı görünüm kaydetme ve görünüm yöneticisi 5 | PASS |
| UAT-154 | Yeni karmaşık kabul testi 054 · İş ayrıntısında sekme geçişi, aktivite ve düzenleme erişimi 1 | PASS |
| UAT-155 | Yeni karmaşık kabul testi 055 · İş ayrıntısında sekme geçişi, aktivite ve düzenleme erişimi 2 | PASS |
| UAT-156 | Yeni karmaşık kabul testi 056 · İş ayrıntısında sekme geçişi, aktivite ve düzenleme erişimi 3 | PASS |
| UAT-157 | Yeni karmaşık kabul testi 057 · İş ayrıntısında sekme geçişi, aktivite ve düzenleme erişimi 4 | PASS |
| UAT-158 | Yeni karmaşık kabul testi 058 · İş ayrıntısında sekme geçişi, aktivite ve düzenleme erişimi 5 | PASS |
| UAT-159 | Yeni karmaşık kabul testi 059 · İş ayrıntısında sekme geçişi, aktivite ve düzenleme erişimi 6 | PASS |
| UAT-160 | Yeni karmaşık kabul testi 060 · İş ayrıntısında sekme geçişi, aktivite ve düzenleme erişimi 7 | PASS |
| UAT-161 | Yeni karmaşık kabul testi 061 · İş ayrıntısında sekme geçişi, aktivite ve düzenleme erişimi 8 | PASS |
| UAT-162 | Yeni karmaşık kabul testi 062 · Blokaj iş akışı neden, sonraki adım ve aktiviteyle tamamlanır 1 | PASS |
| UAT-163 | Yeni karmaşık kabul testi 063 · Blokaj iş akışı neden, sonraki adım ve aktiviteyle tamamlanır 2 | PASS |
| UAT-164 | Yeni karmaşık kabul testi 064 · Blokaj iş akışı neden, sonraki adım ve aktiviteyle tamamlanır 3 | PASS |
| UAT-165 | Yeni karmaşık kabul testi 065 · Blokaj iş akışı neden, sonraki adım ve aktiviteyle tamamlanır 4 | PASS |
| UAT-166 | Yeni karmaşık kabul testi 066 · Blokaj iş akışı neden, sonraki adım ve aktiviteyle tamamlanır 5 | PASS |
| UAT-167 | Yeni karmaşık kabul testi 067 · Toplu seçimden tek takımlı sprint oluşturma ve kapsam kontrolü 1 | PASS |
| UAT-168 | Yeni karmaşık kabul testi 068 · Toplu seçimden tek takımlı sprint oluşturma ve kapsam kontrolü 2 | PASS |
| UAT-169 | Yeni karmaşık kabul testi 069 · Toplu seçimden tek takımlı sprint oluşturma ve kapsam kontrolü 3 | PASS |
| UAT-170 | Yeni karmaşık kabul testi 070 · Toplu seçimden tek takımlı sprint oluşturma ve kapsam kontrolü 4 | PASS |
| UAT-171 | Yeni karmaşık kabul testi 071 · Toplu seçimden tek takımlı sprint oluşturma ve kapsam kontrolü 5 | PASS |
| UAT-172 | Yeni karmaşık kabul testi 072 · Takım oluşturma, üyeleri düzenleme ve panel güncellemesi 1 | PASS |
| UAT-173 | Yeni karmaşık kabul testi 073 · Takım oluşturma, üyeleri düzenleme ve panel güncellemesi 2 | PASS |
| UAT-174 | Yeni karmaşık kabul testi 074 · Takım oluşturma, üyeleri düzenleme ve panel güncellemesi 3 | PASS |
| UAT-175 | Yeni karmaşık kabul testi 075 · Takım oluşturma, üyeleri düzenleme ve panel güncellemesi 4 | PASS |
| UAT-176 | Yeni karmaşık kabul testi 076 · Takım oluşturma, üyeleri düzenleme ve panel güncellemesi 5 | PASS |
| UAT-177 | Yeni karmaşık kabul testi 077 · Takım üyesi araması ve planlama filtresi 1 | PASS |
| UAT-178 | Yeni karmaşık kabul testi 078 · Takım üyesi araması ve planlama filtresi 2 | PASS |
| UAT-179 | Yeni karmaşık kabul testi 079 · Takım üyesi araması ve planlama filtresi 3 | PASS |
| UAT-180 | Yeni karmaşık kabul testi 080 · Takım üyesi araması ve planlama filtresi 4 | PASS |
| UAT-181 | Yeni karmaşık kabul testi 081 · Takım üyesi araması ve planlama filtresi 5 | PASS |
| UAT-182 | Yeni karmaşık kabul testi 082 · Envanter bileşeni uçtan uca oluşturma ve düzenleme 1 | PASS |
| UAT-183 | Yeni karmaşık kabul testi 083 · Envanter bileşeni uçtan uca oluşturma ve düzenleme 2 | PASS |
| UAT-184 | Yeni karmaşık kabul testi 084 · Envanter bileşeni uçtan uca oluşturma ve düzenleme 3 | PASS |
| UAT-185 | Yeni karmaşık kabul testi 085 · Envanter bileşeni uçtan uca oluşturma ve düzenleme 4 | PASS |
| UAT-186 | Yeni karmaşık kabul testi 086 · Envanter bileşeni uçtan uca oluşturma ve düzenleme 5 | PASS |
| UAT-187 | Yeni karmaşık kabul testi 087 · Envanter arama, filtre ve kart diyagramı geçişi 1 | PASS |
| UAT-188 | Yeni karmaşık kabul testi 088 · Envanter arama, filtre ve kart diyagramı geçişi 2 | PASS |
| UAT-189 | Yeni karmaşık kabul testi 089 · Envanter arama, filtre ve kart diyagramı geçişi 3 | PASS |
| UAT-190 | Yeni karmaşık kabul testi 090 · Envanter arama, filtre ve kart diyagramı geçişi 4 | PASS |
| UAT-191 | Yeni karmaşık kabul testi 091 · Envanter arama, filtre ve kart diyagramı geçişi 5 | PASS |
| UAT-192 | Yeni karmaşık kabul testi 092 · Initiative oluşturma hedef ve ölçütleriyle kaydedilir 1 | PASS |
| UAT-193 | Yeni karmaşık kabul testi 093 · Initiative oluşturma hedef ve ölçütleriyle kaydedilir 2 | PASS |
| UAT-194 | Yeni karmaşık kabul testi 094 · Initiative oluşturma hedef ve ölçütleriyle kaydedilir 3 | PASS |
| UAT-195 | Yeni karmaşık kabul testi 095 · Initiative oluşturma hedef ve ölçütleriyle kaydedilir 4 | PASS |
| UAT-196 | Yeni karmaşık kabul testi 096 · Initiative oluşturma hedef ve ölçütleriyle kaydedilir 5 | PASS |
| UAT-197 | Yeni karmaşık kabul testi 097 · Release planı kaydetme, kapsam ve yayın hazırlığı 1 | PASS |
| UAT-198 | Yeni karmaşık kabul testi 098 · Release planı kaydetme, kapsam ve yayın hazırlığı 2 | PASS |
| UAT-199 | Yeni karmaşık kabul testi 099 · Release planı kaydetme, kapsam ve yayın hazırlığı 3 | PASS |
| UAT-200 | Yeni karmaşık kabul testi 100 · Release planı kaydetme, kapsam ve yayın hazırlığı 4 | PASS |
| UAT-201 | Yeni karmaşık kabul testi 101 · Release planı kaydetme, kapsam ve yayın hazırlığı 5 | PASS |
| UAT-202 | Yeni karmaşık kabul testi 102 · Açık soru oluşturma, yanıtlayıp yeniden açma 1 | PASS |
| UAT-203 | Yeni karmaşık kabul testi 103 · Açık soru oluşturma, yanıtlayıp yeniden açma 2 | PASS |
| UAT-204 | Yeni karmaşık kabul testi 104 · Açık soru oluşturma, yanıtlayıp yeniden açma 3 | PASS |
| UAT-205 | Yeni karmaşık kabul testi 105 · Açık soru oluşturma, yanıtlayıp yeniden açma 4 | PASS |
| UAT-206 | Yeni karmaşık kabul testi 106 · Açık soru oluşturma, yanıtlayıp yeniden açma 5 | PASS |
| UAT-207 | Yeni karmaşık kabul testi 107 · Günlük PO planı notunu tarih bazlı saklar 1 | PASS |
| UAT-208 | Yeni karmaşık kabul testi 108 · Günlük PO planı notunu tarih bazlı saklar 2 | PASS |
| UAT-209 | Yeni karmaşık kabul testi 109 · Günlük PO planı notunu tarih bazlı saklar 3 | PASS |
| UAT-210 | Yeni karmaşık kabul testi 110 · Günlük PO planı notunu tarih bazlı saklar 4 | PASS |
| UAT-211 | Yeni karmaşık kabul testi 111 · Günlük PO planı notunu tarih bazlı saklar 5 | PASS |
| UAT-212 | Yeni karmaşık kabul testi 112 · Haftalık özet PO değerlendirmesini kaydeder 1 | PASS |
| UAT-213 | Yeni karmaşık kabul testi 113 · Haftalık özet PO değerlendirmesini kaydeder 2 | PASS |
| UAT-214 | Yeni karmaşık kabul testi 114 · Haftalık özet PO değerlendirmesini kaydeder 3 | PASS |
| UAT-215 | Yeni karmaşık kabul testi 115 · Haftalık özet PO değerlendirmesini kaydeder 4 | PASS |
| UAT-216 | Yeni karmaşık kabul testi 116 · Haftalık özet PO değerlendirmesini kaydeder 5 | PASS |
| UAT-217 | Yeni karmaşık kabul testi 117 · PO devir paketi proje ve özel bağlamı yansıtır 1 | PASS |
| UAT-218 | Yeni karmaşık kabul testi 118 · PO devir paketi proje ve özel bağlamı yansıtır 2 | PASS |
| UAT-219 | Yeni karmaşık kabul testi 119 · PO devir paketi proje ve özel bağlamı yansıtır 3 | PASS |
| UAT-220 | Yeni karmaşık kabul testi 120 · PO devir paketi proje ve özel bağlamı yansıtır 4 | PASS |
| UAT-221 | Yeni karmaşık kabul testi 121 · PO devir paketi proje ve özel bağlamı yansıtır 5 | PASS |
| UAT-222 | Yeni karmaşık kabul testi 122 · Kişisel görev işaretleme, düzenleme ve backlog ilişkisi 1 | PASS |
| UAT-223 | Yeni karmaşık kabul testi 123 · Kişisel görev işaretleme, düzenleme ve backlog ilişkisi 2 | PASS |
| UAT-224 | Yeni karmaşık kabul testi 124 · Kişisel görev işaretleme, düzenleme ve backlog ilişkisi 3 | PASS |
| UAT-225 | Yeni karmaşık kabul testi 125 · Kişisel görev işaretleme, düzenleme ve backlog ilişkisi 4 | PASS |
| UAT-226 | Yeni karmaşık kabul testi 126 · Kişisel görev işaretleme, düzenleme ve backlog ilişkisi 5 | PASS |
| UAT-227 | Yeni karmaşık kabul testi 127 · Kişisel not oluşturma, düzenleme ve göreve dönüştürme 1 | PASS |
| UAT-228 | Yeni karmaşık kabul testi 128 · Kişisel not oluşturma, düzenleme ve göreve dönüştürme 2 | PASS |
| UAT-229 | Yeni karmaşık kabul testi 129 · Kişisel not oluşturma, düzenleme ve göreve dönüştürme 3 | PASS |
| UAT-230 | Yeni karmaşık kabul testi 130 · Kişisel not oluşturma, düzenleme ve göreve dönüştürme 4 | PASS |
| UAT-231 | Yeni karmaşık kabul testi 131 · Kişisel not oluşturma, düzenleme ve göreve dönüştürme 5 | PASS |
| UAT-232 | Yeni karmaşık kabul testi 132 · Global arama sonuçtan ilgili işe gider 1 | PASS |
| UAT-233 | Yeni karmaşık kabul testi 133 · Global arama sonuçtan ilgili işe gider 2 | PASS |
| UAT-234 | Yeni karmaşık kabul testi 134 · Global arama sonuçtan ilgili işe gider 3 | PASS |
| UAT-235 | Yeni karmaşık kabul testi 135 · Global arama sonuçtan ilgili işe gider 4 | PASS |
| UAT-236 | Yeni karmaşık kabul testi 136 · Global arama sonuçtan ilgili işe gider 5 | PASS |
| UAT-237 | Yeni karmaşık kabul testi 137 · Çalışma alanı tercihleri tema ve okunabilirlik ayarlarını uygular 1 | PASS |
| UAT-238 | Yeni karmaşık kabul testi 138 · Çalışma alanı tercihleri tema ve okunabilirlik ayarlarını uygular 2 | PASS |
| UAT-239 | Yeni karmaşık kabul testi 139 · Çalışma alanı tercihleri tema ve okunabilirlik ayarlarını uygular 3 | PASS |
| UAT-240 | Yeni karmaşık kabul testi 140 · Çalışma alanı tercihleri tema ve okunabilirlik ayarlarını uygular 4 | PASS |
| UAT-241 | Yeni karmaşık kabul testi 141 · Çalışma alanı tercihleri tema ve okunabilirlik ayarlarını uygular 5 | PASS |
| UAT-242 | Yeni karmaşık kabul testi 142 · Jira adresi yokken entegrasyon kapalı ve ayarlara yönlendiriyor 1 | PASS |
| UAT-243 | Yeni karmaşık kabul testi 143 · Jira adresi yokken entegrasyon kapalı ve ayarlara yönlendiriyor 2 | PASS |
| UAT-244 | Yeni karmaşık kabul testi 144 · Jira adresi yokken entegrasyon kapalı ve ayarlara yönlendiriyor 3 | PASS |
| UAT-245 | Yeni karmaşık kabul testi 145 · Jira adresi yokken entegrasyon kapalı ve ayarlara yönlendiriyor 4 | PASS |
| UAT-246 | Yeni karmaşık kabul testi 146 · Jira adresi yokken entegrasyon kapalı ve ayarlara yönlendiriyor 5 | PASS |
| UAT-247 | Yeni karmaşık kabul testi 147 · Uygulama yeniden çiziminde kayıtlar ve menü katmanı korunur 1 | PASS |
| UAT-248 | Yeni karmaşık kabul testi 148 · Uygulama yeniden çiziminde kayıtlar ve menü katmanı korunur 2 | PASS |
| UAT-249 | Yeni karmaşık kabul testi 149 · Uygulama yeniden çiziminde kayıtlar ve menü katmanı korunur 3 | PASS |
| UAT-250 | Yeni karmaşık kabul testi 150 · Uygulama yeniden çiziminde kayıtlar ve menü katmanı korunur 4 | PASS |
| UAT-251 | Kapsamı genişletilmiş kabul senaryosu 001 · Seçim kolonu İş kolonunun solunda, tüm görünür işleri seçip temizler 1 | PASS |
| UAT-252 | Kapsamı genişletilmiş kabul senaryosu 002 · Seçim kolonu İş kolonunun solunda, tüm görünür işleri seçip temizler 2 | PASS |
| UAT-253 | Kapsamı genişletilmiş kabul senaryosu 003 · Seçim kolonu İş kolonunun solunda, tüm görünür işleri seçip temizler 3 | PASS |
| UAT-254 | Kapsamı genişletilmiş kabul senaryosu 004 · Seçim kolonu İş kolonunun solunda, tüm görünür işleri seçip temizler 4 | PASS |
| UAT-255 | Kapsamı genişletilmiş kabul senaryosu 005 · Seçim kolonu İş kolonunun solunda, tüm görünür işleri seçip temizler 5 | PASS |
| UAT-256 | Kapsamı genişletilmiş kabul senaryosu 006 · Seçim kolonu İş kolonunun solunda, tüm görünür işleri seçip temizler 6 | PASS |
| UAT-257 | Kapsamı genişletilmiş kabul senaryosu 007 · Seçim kolonu İş kolonunun solunda, tüm görünür işleri seçip temizler 7 | PASS |
| UAT-258 | Kapsamı genişletilmiş kabul senaryosu 008 · Seçim kolonu İş kolonunun solunda, tüm görünür işleri seçip temizler 8 | PASS |
| UAT-259 | Kapsamı genişletilmiş kabul senaryosu 009 · Seçim kolonu İş kolonunun solunda, tüm görünür işleri seçip temizler 9 | PASS |
| UAT-260 | Kapsamı genişletilmiş kabul senaryosu 010 · Seçim kolonu İş kolonunun solunda, tüm görünür işleri seçip temizler 10 | PASS |
| UAT-261 | Kapsamı genişletilmiş kabul senaryosu 011 · Tek satır seçimi ayrıntı penceresini açmadan toplu eylemi etkinleştirir 1 | PASS |
| UAT-262 | Kapsamı genişletilmiş kabul senaryosu 012 · Tek satır seçimi ayrıntı penceresini açmadan toplu eylemi etkinleştirir 2 | PASS |
| UAT-263 | Kapsamı genişletilmiş kabul senaryosu 013 · Tek satır seçimi ayrıntı penceresini açmadan toplu eylemi etkinleştirir 3 | PASS |
| UAT-264 | Kapsamı genişletilmiş kabul senaryosu 014 · Tek satır seçimi ayrıntı penceresini açmadan toplu eylemi etkinleştirir 4 | PASS |
| UAT-265 | Kapsamı genişletilmiş kabul senaryosu 015 · Tek satır seçimi ayrıntı penceresini açmadan toplu eylemi etkinleştirir 5 | PASS |
| UAT-266 | Kapsamı genişletilmiş kabul senaryosu 016 · Tek satır seçimi ayrıntı penceresini açmadan toplu eylemi etkinleştirir 6 | PASS |
| UAT-267 | Kapsamı genişletilmiş kabul senaryosu 017 · Tek satır seçimi ayrıntı penceresini açmadan toplu eylemi etkinleştirir 7 | PASS |
| UAT-268 | Kapsamı genişletilmiş kabul senaryosu 018 · Tek satır seçimi ayrıntı penceresini açmadan toplu eylemi etkinleştirir 8 | PASS |
| UAT-269 | Kapsamı genişletilmiş kabul senaryosu 019 · Tek satır seçimi ayrıntı penceresini açmadan toplu eylemi etkinleştirir 9 | PASS |
| UAT-270 | Kapsamı genişletilmiş kabul senaryosu 020 · Tek satır seçimi ayrıntı penceresini açmadan toplu eylemi etkinleştirir 10 | PASS |
| UAT-271 | Kapsamı genişletilmiş kabul senaryosu 021 · Yeni backlog işi formundaki ek kayda bağlanır 1 | PASS |
| UAT-272 | Kapsamı genişletilmiş kabul senaryosu 022 · Yeni backlog işi formundaki ek kayda bağlanır 2 | PASS |
| UAT-273 | Kapsamı genişletilmiş kabul senaryosu 023 · Yeni backlog işi formundaki ek kayda bağlanır 3 | PASS |
| UAT-274 | Kapsamı genişletilmiş kabul senaryosu 024 · Yeni backlog işi formundaki ek kayda bağlanır 4 | PASS |
| UAT-275 | Kapsamı genişletilmiş kabul senaryosu 025 · Yeni backlog işi formundaki ek kayda bağlanır 5 | PASS |
| UAT-276 | Kapsamı genişletilmiş kabul senaryosu 026 · Yeni backlog işi formundaki ek kayda bağlanır 6 | PASS |
| UAT-277 | Kapsamı genişletilmiş kabul senaryosu 027 · Yeni backlog işi formundaki ek kayda bağlanır 7 | PASS |
| UAT-278 | Kapsamı genişletilmiş kabul senaryosu 028 · Yeni backlog işi formundaki ek kayda bağlanır 8 | PASS |
| UAT-279 | Kapsamı genişletilmiş kabul senaryosu 029 · Yeni backlog işi formundaki ek kayda bağlanır 9 | PASS |
| UAT-280 | Kapsamı genişletilmiş kabul senaryosu 030 · Yeni backlog işi formundaki ek kayda bağlanır 10 | PASS |
| UAT-281 | Kapsamı genişletilmiş kabul senaryosu 031 · Yeni backlog işi formundaki ek kayda bağlanır 11 | PASS |
| UAT-282 | Kapsamı genişletilmiş kabul senaryosu 032 · Yeni backlog işi formundaki ek kayda bağlanır 12 | PASS |
| UAT-283 | Kapsamı genişletilmiş kabul senaryosu 033 · Yeni backlog işi formundaki ek kayda bağlanır 13 | PASS |
| UAT-284 | Kapsamı genişletilmiş kabul senaryosu 034 · Yeni backlog işi formundaki ek kayda bağlanır 14 | PASS |
| UAT-285 | Kapsamı genişletilmiş kabul senaryosu 035 · Yeni backlog işi formundaki ek kayda bağlanır 15 | PASS |
| UAT-286 | Kapsamı genişletilmiş kabul senaryosu 036 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 1 | PASS |
| UAT-287 | Kapsamı genişletilmiş kabul senaryosu 037 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 2 | PASS |
| UAT-288 | Kapsamı genişletilmiş kabul senaryosu 038 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 3 | PASS |
| UAT-289 | Kapsamı genişletilmiş kabul senaryosu 039 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 4 | PASS |
| UAT-290 | Kapsamı genişletilmiş kabul senaryosu 040 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 5 | PASS |
| UAT-291 | Kapsamı genişletilmiş kabul senaryosu 041 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 6 | PASS |
| UAT-292 | Kapsamı genişletilmiş kabul senaryosu 042 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 7 | PASS |
| UAT-293 | Kapsamı genişletilmiş kabul senaryosu 043 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 8 | PASS |
| UAT-294 | Kapsamı genişletilmiş kabul senaryosu 044 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 9 | PASS |
| UAT-295 | Kapsamı genişletilmiş kabul senaryosu 045 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 10 | PASS |
| UAT-296 | Kapsamı genişletilmiş kabul senaryosu 046 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 11 | PASS |
| UAT-297 | Kapsamı genişletilmiş kabul senaryosu 047 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 12 | PASS |
| UAT-298 | Kapsamı genişletilmiş kabul senaryosu 048 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 13 | PASS |
| UAT-299 | Kapsamı genişletilmiş kabul senaryosu 049 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 14 | PASS |
| UAT-300 | Kapsamı genişletilmiş kabul senaryosu 050 · İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir 15 | PASS |
| UAT-301 | Kapsamı genişletilmiş kabul senaryosu 051 · İlerleme notuna ek ve görünürlük bilgisi kaydedilir 1 | PASS |
| UAT-302 | Kapsamı genişletilmiş kabul senaryosu 052 · İlerleme notuna ek ve görünürlük bilgisi kaydedilir 2 | PASS |
| UAT-303 | Kapsamı genişletilmiş kabul senaryosu 053 · İlerleme notuna ek ve görünürlük bilgisi kaydedilir 3 | PASS |
| UAT-304 | Kapsamı genişletilmiş kabul senaryosu 054 · İlerleme notuna ek ve görünürlük bilgisi kaydedilir 4 | PASS |
| UAT-305 | Kapsamı genişletilmiş kabul senaryosu 055 · İlerleme notuna ek ve görünürlük bilgisi kaydedilir 5 | PASS |
| UAT-306 | Kapsamı genişletilmiş kabul senaryosu 056 · İlerleme notuna ek ve görünürlük bilgisi kaydedilir 6 | PASS |
| UAT-307 | Kapsamı genişletilmiş kabul senaryosu 057 · İlerleme notuna ek ve görünürlük bilgisi kaydedilir 7 | PASS |
| UAT-308 | Kapsamı genişletilmiş kabul senaryosu 058 · İlerleme notuna ek ve görünürlük bilgisi kaydedilir 8 | PASS |
| UAT-309 | Kapsamı genişletilmiş kabul senaryosu 059 · İlerleme notuna ek ve görünürlük bilgisi kaydedilir 9 | PASS |
| UAT-310 | Kapsamı genişletilmiş kabul senaryosu 060 · İlerleme notuna ek ve görünürlük bilgisi kaydedilir 10 | PASS |
| UAT-311 | Kapsamı genişletilmiş kabul senaryosu 061 · Kişisel görev oluşturulurken dosya eki aynı kayda bağlanır (1) | PASS |
| UAT-312 | Kapsamı genişletilmiş kabul senaryosu 062 · Kişisel görev oluşturulurken dosya eki aynı kayda bağlanır (2) | PASS |
| UAT-313 | Kapsamı genişletilmiş kabul senaryosu 063 · Kişisel görev oluşturulurken dosya eki aynı kayda bağlanır (3) | PASS |
| UAT-314 | Kapsamı genişletilmiş kabul senaryosu 064 · Kişisel görev oluşturulurken dosya eki aynı kayda bağlanır (4) | PASS |
| UAT-315 | Kapsamı genişletilmiş kabul senaryosu 065 · Kişisel görev oluşturulurken dosya eki aynı kayda bağlanır (5) | PASS |
| UAT-316 | Kapsamı genişletilmiş kabul senaryosu 066 · Kişisel görev oluşturulurken dosya eki aynı kayda bağlanır (6) | PASS |
| UAT-317 | Kapsamı genişletilmiş kabul senaryosu 067 · Kişisel görev oluşturulurken dosya eki aynı kayda bağlanır (7) | PASS |
| UAT-318 | Kapsamı genişletilmiş kabul senaryosu 068 · Not oluşturulurken dosya eki aynı kayda bağlanır (1) | PASS |
| UAT-319 | Kapsamı genişletilmiş kabul senaryosu 069 · Not oluşturulurken dosya eki aynı kayda bağlanır (2) | PASS |
| UAT-320 | Kapsamı genişletilmiş kabul senaryosu 070 · Not oluşturulurken dosya eki aynı kayda bağlanır (3) | PASS |
| UAT-321 | Kapsamı genişletilmiş kabul senaryosu 071 · Not oluşturulurken dosya eki aynı kayda bağlanır (4) | PASS |
| UAT-322 | Kapsamı genişletilmiş kabul senaryosu 072 · Not oluşturulurken dosya eki aynı kayda bağlanır (5) | PASS |
| UAT-323 | Kapsamı genişletilmiş kabul senaryosu 073 · Not oluşturulurken dosya eki aynı kayda bağlanır (6) | PASS |
| UAT-324 | Kapsamı genişletilmiş kabul senaryosu 074 · Not oluşturulurken dosya eki aynı kayda bağlanır (7) | PASS |
| UAT-325 | Kapsamı genişletilmiş kabul senaryosu 075 · Görev bağlam menüsü açılır, klavyeyle kapatılır (1) | PASS |
| UAT-326 | Kapsamı genişletilmiş kabul senaryosu 076 · Görev bağlam menüsü açılır, klavyeyle kapatılır (2) | PASS |
| UAT-327 | Kapsamı genişletilmiş kabul senaryosu 077 · Görev bağlam menüsü açılır, klavyeyle kapatılır (3) | PASS |
| UAT-328 | Kapsamı genişletilmiş kabul senaryosu 078 · Not bağlam menüsü açılır, klavyeyle kapatılır (1) | PASS |
| UAT-329 | Kapsamı genişletilmiş kabul senaryosu 079 · Not bağlam menüsü açılır, klavyeyle kapatılır (2) | PASS |
| UAT-330 | Kapsamı genişletilmiş kabul senaryosu 080 · Not bağlam menüsü açılır, klavyeyle kapatılır (3) | PASS |
| UAT-331 | Kapsamı genişletilmiş kabul senaryosu 081 · Bileşen bağlam menüsü açılır, klavyeyle kapatılır (1) | PASS |
| UAT-332 | Kapsamı genişletilmiş kabul senaryosu 082 · Bileşen bağlam menüsü açılır, klavyeyle kapatılır (2) | PASS |
| UAT-333 | Kapsamı genişletilmiş kabul senaryosu 083 · Proje bağlam menüsü açılır, klavyeyle kapatılır (1) | PASS |
| UAT-334 | Kapsamı genişletilmiş kabul senaryosu 084 · Proje bağlam menüsü açılır, klavyeyle kapatılır (2) | PASS |
| UAT-335 | Kapsamı genişletilmiş kabul senaryosu 085 · Proje bağlam menüsü açılır, klavyeyle kapatılır (3) | PASS |
| UAT-336 | Kapsamı genişletilmiş kabul senaryosu 086 · Envanter ilişki diyagramı araçları görünür ve çalışır 1 | PASS |
| UAT-337 | Kapsamı genişletilmiş kabul senaryosu 087 · Envanter ilişki diyagramı araçları görünür ve çalışır 2 | PASS |
| UAT-338 | Kapsamı genişletilmiş kabul senaryosu 088 · Envanter ilişki diyagramı araçları görünür ve çalışır 3 | PASS |
| UAT-339 | Kapsamı genişletilmiş kabul senaryosu 089 · Envanter ilişki diyagramı araçları görünür ve çalışır 4 | PASS |
| UAT-340 | Kapsamı genişletilmiş kabul senaryosu 090 · Envanter ilişki diyagramı araçları görünür ve çalışır 5 | PASS |
| UAT-341 | Kapsamı genişletilmiş kabul senaryosu 091 · Envanter ilişki diyagramı araçları görünür ve çalışır 6 | PASS |
| UAT-342 | Kapsamı genişletilmiş kabul senaryosu 092 · Envanter ilişki diyagramı araçları görünür ve çalışır 7 | PASS |
| UAT-343 | Kapsamı genişletilmiş kabul senaryosu 093 · Envanter ilişki diyagramı araçları görünür ve çalışır 8 | PASS |
| UAT-344 | Kapsamı genişletilmiş kabul senaryosu 094 · Envanter ilişki diyagramı araçları görünür ve çalışır 9 | PASS |
| UAT-345 | Kapsamı genişletilmiş kabul senaryosu 095 · Envanter ilişki diyagramı araçları görünür ve çalışır 10 | PASS |
| UAT-346 | Kapsamı genişletilmiş kabul senaryosu 096 · Yedekleme ayarları biçim ve geri yükleme seçeneklerini sunar 1 | PASS |
| UAT-347 | Kapsamı genişletilmiş kabul senaryosu 097 · Yedekleme ayarları biçim ve geri yükleme seçeneklerini sunar 2 | PASS |
| UAT-348 | Kapsamı genişletilmiş kabul senaryosu 098 · Yedekleme ayarları biçim ve geri yükleme seçeneklerini sunar 3 | PASS |
| UAT-349 | Kapsamı genişletilmiş kabul senaryosu 099 · Yedekleme ayarları biçim ve geri yükleme seçeneklerini sunar 4 | PASS |
| UAT-350 | Kapsamı genişletilmiş kabul senaryosu 100 · Yedekleme ayarları biçim ve geri yükleme seçeneklerini sunar 5 | PASS |
