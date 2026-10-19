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

### Sonraki faz — Entegrasyonlar ve otomasyon

Jira Server ve çok kullanıcılı çalışma; ihtiyaç ve kurum teknik koşulları doğrulandıktan sonra ele alınmalı.

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

## Güncel roadmap

**Kaynak:** Rota çalışma alanındaki backlog, 19 Ekim 2026 tarihinde okundu ve uygulama teslimleriyle eşitlendi. 202 plan kaydının 198’i tamamlandı, 2’si yeni, 2’si devam ediyor. Bu belge yalnızca Rota’da hâlâ bulunan bekleyen işleri gösterir; Rota’dan silinen öneriler yeniden eklenmedi. Tarih ve kapasite bilgisi olmadığı için fazlar takvim taahhüdü değil, önerilen sıralamadır.

### Faz 1 — Tamamlandı: PO kararlarını ve backlog hazırlığını güçlendir

**ROTA-PLAN-052, 053 ve 059** tamamlandı. Açık sorular sahibi/tarihi ve iş bağlantısıyla izleniyor; kabul kriterleri şablondan uygulanıp yeniden kullanılabiliyor; backlog bekleme süresi ve son karar tarihine göre sıralanabiliyor. Ayrıntılar `tamamlanan-featurelar.md` içinde.

### Faz 2 — Tamamlandı: Sprint kapsamını planla ve sonuçlandır

**ROTA-PLAN-072, 073, 075 ve 078** tamamlandı. Backlog listesi manuel sıralanabiliyor, bağımlılıklar tarihli zaman çizgisinde görünüyor, hazır iş havuzu kriterleri tamamlanmış ve bloke olmayan işleri ayırıyor; tamamlanan sprintler için sonuç ve öğrenim özeti saklanıyor. Ayrıntılar `tamamlanan-featurelar.md` içinde.

### Faz 3 — Tamamlandı: PO’nun günlük takip ve bilgi bulma akışı

**ROTA-PLAN-090, 091, 092, 093, 097, 098 ve 099** tamamlandı. Kayıtlar arasında çapraz bağlantılar, arşiv araması, yeni işte benzer kayıt uyarısı, tarih bazlı PO planı, takip hatırlatmaları, haftalık ürün özeti ve proje devir paketi uygulamaya eklendi. Ayrıntılar `tamamlanan-featurelar.md` içinde.

### Sonraki faz — Jira Server entegrasyonu

- **ROTA-PLAN-034 · Jira Server teknik keşfi:** Kurum sürümü, ağ erişimi ve kimlik doğrulama yöntemini öğren.
- **ROTA-PLAN-035 · Senkronizasyon tasarımı:** Tek/çift yön, alan eşleme, çakışma ve denetim izini tasarla.

İki madde Rota’da **İleri sürüm adayı** etiketinde. Önce entegrasyon koşulları keşfedilecek; Jira mevcut sürüm kapsamına alınmıyor.

### Paralel hazırlık ve en son dağıtım

- **ROTA-PLAN-039 · Devam ediyor:** Güvenlik, yedekleme ve güncelleme altyapısının kurumsal HTTPS feed’i ve kod imzalama sertifikasıyla uçtan uca doğrulanması. Sertifika/feed sağlanana kadar dış bağımlılık açık kalır.
- **ROTA-PLAN-043 · Devam ediyor · En son öncelik:** Windows kurulumunun kurum sertifikasıyla imzalanması ve güvenlik incelemesi. **ROTA-PLAN-039** için gereken yayın altyapısı netleştikten sonra tamamlanır.

## Rota’daki güncel açık kayıtlar

| Kayıt | Durum | Öncelik / takip |
| --- | --- | --- |
| ROTA-PLAN-034, ROTA-PLAN-035 | Yeni | Orta · Jira Server sonraki faz |
| ROTA-PLAN-039 | Devam ediyor | Orta · Sertifika ve update feed bağımlılığı |
| ROTA-PLAN-043 | Devam ediyor | Düşük · En son öncelik |

Rota dışındaki eski öneri havuzları bu güncel listede tutulmuyor. Yeniden gündeme alınmaları için Rota backlog’una tekrar eklenmeleri gerekir.
