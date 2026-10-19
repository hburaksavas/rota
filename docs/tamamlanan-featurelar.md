# Rota — Tamamlanan feature'lar

### Faz 3 — PO günlük takip ve bilgi bulma

- **ROTA-PLAN-093 · Kayıtlar arası çapraz bağlantı:** İş detayında backlog işi, ürün bileşeni, release, kişisel not, açık soru ve risk bağlantıları eklenip kaldırılabilir. Bağlantılar doğrudan ilgili kaydı açar.
- **ROTA-PLAN-097 · Arşivde arama:** Arşivlenmiş backlog işleri, projeler ve release'ler ID, başlık, açıklama veya proje bilgisiyle aranabilir ve arşivden çıkarılabilir.
- **ROTA-PLAN-098 · Yinelenen işi bulma yardımcısı:** Yeni iş formu başlık/açıklama girilirken benzer açık işler gösterir; PO mevcut işi açabilir veya yeni kayda devam edebilir.
- **ROTA-PLAN-090 · Günlük PO planı:** Gün bazında backlog işleri ve kişisel görevler sıralanıp notlarla birlikte saklanabilir.
- **ROTA-PLAN-092 · Hatırlatma ve takip tarihi:** Kişisel görevler ve bloke işler için takip zamanı belirlenir; zamanı gelen kayıtlar uygulama açıkken veya yeniden başlatıldığında bildirilir.
- **ROTA-PLAN-091 · Haftalık ürün özeti:** Tamamlanan işler, yeni blokajlar, hedef tarihli işler ve release'ler haftaya göre özetlenir; PO notu kaydedilip kopyalanabilir.
- **ROTA-PLAN-099 · PO devir paketi:** Proje hedefleri, kararlar, blokajlar, riskler, sprintler, release'ler ve notlar tek belgede birleştirilir; özel devir notu kaydedilebilir, kopyalanabilir veya yazdırılabilir.

### Jira Server entegrasyonu — ilk dilim

- **ROTA-PLAN-034 · Jira Base URL ve PAT bağlantısı:** İlk kurulumda isteğe bağlı Jira Base URL alınır; aynı adres çalışma alanı ayarlarından düzenlenebilir. Adres yoksa Jira menüsü kapalı kalır. Kullanıcı Jira’da kendi hesabı için Personal Access Token (PAT) oluşturup Jira paneline kaydeder; token işletim sisteminin Electron `safeStorage` korumasıyla şifrelenir, localStorage’a ve çalışma alanı yedeklerine eklenmez. REST çağrıları Electron ana sürecinden Bearer kimlik doğrulamasıyla yapılır.
- **ROTA-PLAN-035 · Jira Agile board, backlog ve sprint kayıtları:** Erişilebilen Agile board’lar listelenir. PO seçili board’un backlog’unu, tüm board işlerini veya bir sprinti görüntüler; aktif, gelecek ve tamamlanmış sprintler seçilebilir. Her sorguda ilk 100 kayıt canlı alınır.
- **ROTA-PLAN-252 · Rota backlog işinden Jira issue oluşturma:** Jira panelinde board kapsamındaki proje ve Jira’nın oluşturulabilir issue türü seçilir. PO Rota işini seçip Jira’ya gönderilecek başlık ve açıklamayı düzenler; son onaydan sonra issue oluşturulur. Jira anahtarı Rota işine bağlanır, iş günlüğüne eklenir ve aynı işten tekrar issue açılması engellenir.
- **ROTA-PLAN-253 · Sabit sayfa çerçevesi ve içerik içi kaydırma:** Uygulama penceresinin kendisi dikey kaymaz; üst çubuk ve sayfa başlığı yerinde kalır. Sayfa gövdeleri kendi sınırlı alanında kayar. Backlog tablosu/board, açık soru listesi, envanter kartları ve Jira issue listesi ayrıca kendi iç kaydırma alanlarını kullanır.

Bu dosya, uygulamada tamamlanıp kullanılabilir hale gelen özelliklerin kaydıdır. Yeni bir ister tamamlandığında önce `bekleyen-featurelar.md` dosyasından kaldır, sonra buraya ekle.

## Ürün amacı

Rota, banka yazılımı üzerinde çalışan product owner'ın ürün backlog'unu ve kişisel takip işlerini tek bir masaüstü çalışma alanında yönetmesine yardım eder. İş bağlamı, karar notları, takip görevleri ve dosyalar birlikte tutulur; devir için kısa özet hazırlanabilir.

## Tamamlanan işlevler

### Çalışma alanı ve projeler

- İlk açılış sihirbazında örnek banka verisiyle veya boş çalışma alanıyla başlama.
- Kurum/ekip, çalışma alanı adı, kullanıcı adı ve rolünü tanımlama; kurulum akışını ayarlardan yeniden açma.
- Proje oluşturma ve ad/renk düzenleme; yan menüden projeyi açıp o projeye ait backlog'u görüntüleme.
- Projeyi arşivleme ve arşivden geri alma; arşivlenen proje normal listelerden gizlenir, backlog işleri ve envanter bileşenleri korunur.
- Projeyi onayla silme; projeye ait backlog işleri, bileşenler ve iş ekleri silinir. İşlere bağlı kişisel görev ve notlar korunur, bağlantıları kaldırılır. En az bir aktif proje bırakılır.
- Kurulum ayarları tekrar açıldığında mevcut işler, görevler ve notlar korunur. Proje adları değişirse iş bağlantıları güncellenir.

### Windows dağıtımı

- **ROTA-PLAN-041 · Windows x64 kurulum paketi:** Electron uygulaması, Node.js kurulumuna ihtiyaç duymayan tek NSIS setup dosyasına paketlenir. Kullanıcı hesabına kurulur, masaüstü ve Başlat menüsü kısayolları eklenir. Kurulum dosyası `release/unsigned/Rota-Setup-<version>-x64.exe` konumuna yazılır.
- **ROTA-PLAN-042 · Node.js gereksinimini kaldırma:** Paket Electron runtime'ını içerir; hedef PC'de Node.js kurulu olması gerekmez.
- Kurulum/kaldırma ve sürüm yükseltme aynı `com.rota.po` uygulama kimliğini ve `rota-po` kullanıcı verisi dizinini kullanır. Kaldırma çalışma alanı verisini silmez.
- Oluşturulan Windows setup şu an test amaçlı ve imzasızdır. Kod imzalama ve kurum güvenlik incelemesi #043 kapsamında bekliyor.

### Güncelleme zinciri ve işletim logları

- **ROTA-PLAN-039 · Hassas veri içermeyen yerel olay kaydı:** Uygulama başlangıcı, pencere açılması ve renderer kapanma nedeni loglanır. JSONL dosyası yalnızca zaman, sürüm, sabit olay adı ve izinli neden değerlerini içerir; 1 MB sınırında bir önceki log döndürülür. İş, kişi, e-posta, dosya yolu veya hata metni kaydedilmez; telemetry gönderilmez.
- **ROTA-PLAN-039 · Windows güncelleme altyapısı:** Paketlenmiş uygulama HTTPS güncelleme feed'ini denetler; sürümü indirmeden önce kullanıcı onayı ister, kurulmadan önce Windows yayıncı imzası doğrulanır ve yeniden başlatma kullanıcıya sorulur. Güncelleme URL'si ve sertifika yayıncı adı paketleme anında tanımlanır; normal/imzasız prototip paketi hiçbir feed'e bağlanmaz. Kurum sertifikası ve yayın feed'i olmadığı için uçtan uca yayın doğrulaması bekliyor.

### Backlog yönetimi

- Backlog işlerini oluşturma, görüntüleme, düzenleme ve onayla silme. Başlık, proje, tür, durum, öncelik, ürün alanı, açıklama ve kabul kriterleri düzenlenebilir.
- Liste ve pano görünümü; arama ile durum, tür, etiket, takım ve sorumlu filtreleri.
- Backlog'u Excel çalışma kitabı olarak dışa aktarma. İş alanları, atamalar, kabul kriterleri, bağımlılıklar, sprint bilgisi ve aktivite geçmişi ayrı alan/sayfalarda; iş ve aktivite eklerinin ad/boyut bilgileri ekler sayfasında tutulur. Sprintler tek takım, tarih aralığı ve iş kapsamıyla ayrı sayfada listelenir. Seçili proje kapsamındaki tüm işler alınır; eklerin ikili içeriği Excel'e gömülmez.
- **ROTA-PLAN-044 · Backlog kolonlarını düzenleme:** Kolonlar panelinden tablo alanları eklenip gizlenebilir ve görünen kolonlar yukarı/aşağı taşınarak sıralanabilir. İş başlığı sabittir. Kolonlar, önizleme ve Excel araçları aynı sağ hizalı satırdadır; bu araç satırı Liste kipinde görünür, Board’da gizlenir. Tercih cihazda saklanır. Son aktivite kolonu son olayın açıklamasını, yapan kişiyi ve geçen süreyi gösterir; aktivite geçmişi yoksa teknik güncelleme etiketi yerine “Henüz aktivite yok” yazar. Son güncelleme zamanı ayrı kolonda kalır.
- **ROTA-PLAN-045 · Kaydedilmiş backlog görünümleri:** Liste veya Board görünümündeki proje kapsamı, arama metni, durum/tür/etiket/takım/üye filtreleri, sıralama ve kolon düzeni adlandırılmış görünüm olarak saklanabilir ve tekrar uygulanabilir. Görünümler güncellenebilir, yeniden adlandırılabilir veya silinebilir. Sıralama başlık, öncelik, durum, hedef tarih veya son aktiviteye göre yapılabilir; yerel tercihler cihazda saklanır.
- **ROTA-PLAN-046 · Satır içi hızlı düzenleme:** Liste satırından başlık, durum ve atamalar doğrudan düzenlenebilir. Başlık ve durum değişiklikleri iş geçmişine kaydedilir. Bloke duruma geçişte neden, beklenen karar/iş, sonraki adım ve takip sahibi zorunludur; kaydedince backlog görünümünde kalınır. Bir işe birden fazla takım/üye satırdan eklenip kaldırılabilir; eski ve yeni atamalar geçmişe yazılır.
- Backlog işlerinde başlangıç ve hedef bitiş tarihi ile saat cinsinden tahmini efor tutulur; iş ayrıntısında görünür ve değişiklik geçmişine kaydedilir.
- **ROTA-PLAN-049 · Zengin backlog önizlemesi:** Backlog araç çubuğundaki toggle ile başlık önizlemesi açılıp kapatılır; varsayılanı açıktır ve tercih saklanır. Başlık üzerinde kısa süre bekleyince tooltip yerine zengin önizleme kartı açılır. Başlık bütünüyle satır kaydırarak, kısaltılmadan görünür. Kartta açıklama, durum, öncelik, proje/alan, takım ve üyeler, plan tarihleri, efor tahmini, bağlı bileşen kodları, etiketler, son aktivite, kabul kriteri/ek sayıları gösterilir. Kartta kalıp ayrıntılara geçilebilir veya kapatılabilir; klavye odağıyla da açılır.
- **ROTA-PLAN-048 · Sprint oluşturma:** Backlog Liste görünümünde tek tek veya görünen işlerin tümünü seçerek sprint oluştur. Sprint adı, tek takım ve başlangıç/bitiş tarihleri belirlenir; geçersiz tarih aralığı reddedilir. Seçili işler sprint'e bağlanır, yeni sprint kolonu ve her işin aktivite geçmişinde görünür. Board kipinde sprint aracı ve seçim satırı gösterilmez.
- **ROTA-PLAN-100 · Hızlı ve toplu silme:** Liste görünümünde satır başına Hızlı Sil düğmesiyle tek iş silinebilir; onay penceresi işin başlığını ve geri alınamaz olduğunu belirtir. İşaretlenen backlog işleri tek bir onayla topluca silinir ve onayda iş sayısı, başlık önizlemesi ve silinecek ek sayısı gösterilir. İş ekleri ve diyagramları kaldırılır, diğer işlerdeki bağımlılık bağlantıları temizlenip geçmişe yazılır; bağlı kişisel görev ve notlar korunarak bağlantıları kaldırılır. Board görünümünde satır silme araçları gösterilmez.
- **ROTA-PLAN-213 · Backlog satırında ayrı ikonlu eylem kolonları:** Liste görünümünde düzenle, çoğalt ve sil eylemleri ayrı kolonlarda her zaman görünür ikon düğmeleriyle sunulur. Her ikon kısa açıklamalı tooltip ve erişilebilir eylem adı taşır; Board görünümü etkilenmez.
- **ROTA-PLAN-251 · Kayıtlar için bağlama duyarlı sağ tık menüsü:** Backlog işleri, kişisel görevler ve notlar, envanter bileşenleri, projeler, roadmap hedefleri, release'ler ve takım üyeleri sağ tık menüsünden kendi bağlamına uygun eylemler sunar. Menü pencere sınırlarında görünür kalır, dışarı tıklama veya Escape ile kapanır, ok tuşlarıyla gezilebilir. Metin/form alanları ve diyagram tuvali kendi yerleşik sağ tık davranışlarını korur.
- **ROTA-PLAN-047 · Sprint dışa aktarımı:** Excel ana backlog sayfasına sprint adı eklenir; ayrıca Sprintler sayfasında takım, başlangıç/bitiş, iş sayısı ve iş ID'leri yer alır.
- İş ayrıntısında durum ve öncelik güncelleme, dosya ekleri ve devir özeti.
- Silme öncesi onay. Backlog işi silinince bağlı kişisel görevler ve notlar korunur, bağlantıları kaldırılır; işe ait ek dosyalar silinir.
- Rota'nın mevcut feature planındaki kayıtlar ayrı bir **Rota · PO çalışma alanı** projesine aktarılır. İlk aktarım tam kataloğu ekler; sonraki sürüm geçişleri yalnızca yeni tanıtılan kayıtları ekler, PO'nun sildiği eski önerileri geri getirmez. Mevcut feature durumları sürümlü güncellemelerle değişir ve çalışma alanı verisi korunur.
- Rota'nın feature'ları diğer backlog işleri gibi uygulama içinden açılıp durum/öncelik/açıklama alanları takip edilebilir. Yeni feature'lar Rota projesinde oluşturulabilir.
- Etiket filtresiyle örneğin `Öneri`, `İleri sürüm adayı` ve `Tamamlanan` kayıtları ayrı görüntülenebilir.
- Her tamamlanan geliştirme Rota ürün planında feature kaydı olarak izlenir; mevcut feature'ların durum veya etiket değişiklikleri sürümlü, tek seferlik veri güncellemeleriyle uygulama verisine taşınabilir.

### İş geçmişi, ilerleme notları ve blokaj güncellemeleri

- **ROTA-PLAN-001 · İş geçmişi:** İş oluşturma, alan/atama/tarih değişikliği, ilerleme notları ve dosya ekleri zaman sıralı geçmişte tutulur. Release kapsamına giriş/çıkış ve yayın olayı da ilgili iş geçmişine eklenir.
- **ROTA-PLAN-004 · Tamamlanma ve yayın ayrımı:** İşin Tamamlandı olması ile bağlı release'in Yayınlandı olması ayrı olaylardır; her birinin zamanı ve release değişiklikleri izlenebilir.
- Backlog işinin oluşturulması, alan düzenlemeleri, atama, durum/öncelik değişikliği ve ek ekleme/kaldırma olayları iş geçmişinde yazar ve zamanla gösterilir.
- İşe eklemeli ilerleme notu yazılır; yazar ve zaman otomatik kaydedilir. Not takımla paylaşılabilir veya PO'ya özel tutulabilir, dosya eklenebilir. Kişisel nottan ayrıdır.
- Durum değişikliğine isteğe bağlı güncelleme notu eklenebilir. İş bloke edilirken neden ve sonraki adım zorunludur; bloke işte gösterilir, blokaj açılışı ve çözülmesi geçmişe girer.
- Bloke iş için beklenen karar/iş ve takip sahibi de tutulur; açılış ve çözülme zamanları kaydedilir.
- İşte başlangıç/hedef bitiş tarihi ve tahmini efor saati tutulur. Düzenleme geçmişi bu değişiklikleri de gösterir; ters tarih aralığı kaydedilemez.
- İş başka backlog işlerine bağımlı olabilir. Bekleyen işler uyarılır; döngü oluşturacak bağımlılık engellenir, silinen işin bağımlılık bağlantısı temizlenir.
- Son aktivite zamanı kart ve ayrıntıda görünür; açık blokaj süresi ve hedef tarihi geçen işin gecikme günü hesaplanır.
- Planlanan dönem işte saklanır. Takım panelinde başlangıç/hedef tarih, dönem ve tahmini efora göre filtre yapılır; takım ve üye bazında tahmini saat toplamı görünür. Bu toplamlar kapasite taahhüdü değildir.
- Geçmiş, bu özelliklerin kullanılmaya başlandığı andan itibaren oluşur; eski işler için bilinmeyen geçmiş olaylar uydurulmaz. Release kapsamı ve yayın olayları iş geçmişinde görünür.

### E-posta ile kayıt oluşturma

- `.msg` ve `.eml` dosyası backlog ekranına bırakıldığında konu, gönderen, alıcı, tarih ve düz metin gövde yeni kayıt formuna aktarılır. Özgün e-posta dosyası ek olarak saklanır; e-postanın HTML içeriği çalıştırılmaz veya gösterilmez.
- Taslak otomatik kaydedilmez. Kullanıcı başlık ve açıklamayı düzenleyebilir, backlog işi / kişisel görev / not türünü seçebilir ve Kaydet ile oluşturmayı onaylar.
- Kurumda kullanılan Klasik Outlook'ta e-posta sürüklemesinin `.msg` dosyası verdiği kullanıcı tarafından doğrulandı; doğrudan sürükleme içe aktarma akışı kullanılabilir.

### İş ve not devir diyagramları

- Backlog işi ve kişisel not ayrıntısından bağımsız devir diyagramı ekleme ve yeniden açma. Kutular akış adımlarını veya sistemleri, oklar ilişkileri gösterir; konumlar ve ok etiketleri düzenlenebilir ve otomatik saklanır.
- Bağlantılar eklenip kaldırılabilir, adımlar düzenlenip silinebilir. Sahip backlog işi veya not silinince bağlı diyagramları da kaldırılır.
- Envanter bileşenleri arasındaki ayrı ilişki diyagramı ürün envanterinde tutulur.

### Güvenlik ve prototip veri sınırları

- Prototip için veri politikası: gerçek müşteri, hesap, kart veya kimlik verisi kullanılmaz. Örnek proje, işlem, iş ve kullanıcı bilgileri sentetiktir.
- Yerel hassas içerik için üretim kararı: çalışma alanı ve ekler şifreli kasada tutulmalı; Windows'ta anahtar koruması işletim sisteminin DPAPI sağlayıcısına dayanmalı. Electron'un [safeStorage asenkron API'si](https://www.electronjs.org/docs/latest/api/safe-storage) işletim sistemi anahtar sağlayıcılarını ve anahtar döndürmeyi destekler. Şifreli kasaya geçmeden önce uygulama güvenlik incelemesinden geçirilmelidir.
- Güvenli silme yaklaşımı şifreli verinin anahtarını kaldırmayı ve kullanıcı yedeklerinin yaşam döngüsünü kapsar; disk/SSD üzerinde uygulama seviyesinde dosya silme adımı adli geri getirilemezlik garantisi vermez.
- Bu tasarım kararı mevcut prototipte şifrelemenin uygulandığı anlamına gelmez. Bugünkü sürüm yerel `localStorage` ve dosya eklerini kullanır; gerçek hassas banka verisi için uygun değildir. Uygulama güncelleme zinciri ve hassas veri içermeyen loglama üretim öncesi #039 kapsamında sürüyor.

### Ürün planlama ve roadmap

- Initiative ve Epic oluşturma/düzenleme/silme; initiative için ürün hedefi, ölçülebilir başarı ölçütü, sorumlu ve zaman aralığı belirleme; epic'i initiative'e bağlama.
- Backlog işini bir initiative veya epic'e bağlama; hedef kartlarından bağlı işleri görüp backlog işinin ayrıntısına açma.
- Teslimat durumu ile ürün aşamasını ayrı izleme. Ürün aşamaları fikirler, keşif, sırada, planlandı, teslimatta ve tamamlandı olarak yol haritasında ve iş detayında görünür.
- İş için hedef başlangıç/bitiş ve planlanan dönem; durum akışından gerçek başlangıç ve tamamlanma zamanı tutma. Planlanan ve gerçekleşen tarihler ayrı gösterilir.
- Yol haritası hedefleri ve epikleri altı aylık zaman çizgisinde gösterir. Hedef tarih aralığı değişiklikleri eski/yeni aralık, kullanıcı ve zaman ile kaydedilir.
- Hafif dönem planlama: işlere dönem ve tahmini efor verme; takım panelinde dönem/efor kapsamını filtreleme ve görme. Karmaşık kapasite puanı veya taahhüdü üretilmez.

### Release ve yayın sonrası takip

- Proje bazında release oluşturma, düzenleme ve silme; ad/sürüm, açıklama, planlanan tarih ve durum tutma. Durumlar Planlanıyor, Hazırlanıyor, Yayına hazır, Yayınlandı, Ertelendi ve İptal edildi.
- Backlog işini aynı projedeki bir release'e bağlama; kapsamı release ekranından düzenleme. Kapsam kartında tamamlanma yüzdesi, tamamlanmamış ve bloke işler görünür.
- Planlanan yayın tarihi ve gerçek yayın tarihi ayrıdır; release Yayınlandı durumuna alınırken gerçek tarih zorunludur. Plan tarihi değişikliği nedeni istenir ve eski/yeni tarih, yapan ve zaman kaydedilir.
- Yayın notu ve yayın sonrası hedef sonucu/gözlem release kaydında tutulur.
- Backlog işinin Tamamlandı zamanı ile release'in Yayınlandı olayı ayrıdır. Yayına çıkış, kapsam bağlantısı ve kapsamdan çıkarma ilgili işlerin aktivite akışına kaydedilir.

### PO, takım ve release panoları; akış metrikleri

- PO genel bakışında ürün hedefleri, yaklaşan release'ler, geciken işler, 7 günden uzun süredir güncellenmeyen işler ve açık blokajlar aktif projelerden hesaplanır.
- Takım paneli dönem, tarih ve tahmini efor filtreleriyle ekip/üye kapsamını; atamaları, devam eden işleri ve blokajları gösterir.
- Release planı ekranı kapsam işlerini, tamamlanma oranını, açık blokajları ve planlanan/gerçek yayın tarihlerini gösterir.
- Genel bakış, mevcut geçmiş verisi yeterliyse işe başlama-tamamlama süresi, blokajda geçen süre ve release tarih farkını örneklem büyüklüğüyle hesaplar. Geçmişi olmayan kayıtlar için değer uydurulmaz.
- Her metrik açıklamasıyla ve örnek iş/release bağlantılarıyla gösterilir. Kişi bazlı sıralama veya performans puanı oluşturulmaz.
- Takım panelindeki takım oluştur/düzenle formu kaydedilince kapanır; dashboard ve takım sayacı yenilenir.

### Takımlar ve atama

- Özel isimli takımlar oluşturma/düzenleme; üyeleri ayrı alanlardan ekleme, kaldırma ve listeleme.
- Backlog türü **Task** işini bir takıma ve o takımın bir üyesine atama.
- Atanmış takım ve sorumluyu listede, panoda ve iş ayrıntısında görme; backlog'da bu alanlara göre filtreleme.
- Takım adı değişince atamalar korunur. Üye çıkarılırsa o üyeye atanmış işler takımda sorumlusuz kalır. Takım silinince atamalar kaldırılır.
- Çalışma Alanı menüsünde takım paneli; takım ve üye bazında atanmış, açık, bloke ve tamamlanmış işleri gösterme. Panelden takım oluşturma/düzenleme ve üye ekleme/çıkarma; üye çıkarılınca atamasını kaldırma.
- Story, Bug veya Task türündeki herhangi bir backlog işine birden fazla takım üyesi atama; her kişi için takım ve sorumluluk alanı belirtme, iş ayrıntısında ve backlog görünümlerinde atamaları gösterme.
- Projelere birden fazla takım üyesi ve isteğe bağlı katkı alanı atama; proje backlog görünümünde proje ekibini gösterme.

### Ürün bileşen envanteri

- Ekran, batch, rapor, servis/API, entegrasyon veya özel türde ürün bileşeni oluşturma, düzenleme ve pasife alma.
- Bileşen kodu benzersizdir; proje, ürün alanı, amaç, açıklama, sahip takım ve sorumlu kişi tutulabilir.
- Bileşenleri kod/ad/açıklamayla arama; türe, projeye ve aktif/pasif durumuna göre filtreleme.
- Bileşenler arasında elle ilişkiler kurma; pasife alınan bileşen ve mevcut bağlantıları silinmez.
- Açık kaynak AntV X6 altyapılı ilişki diyagramında bileşenleri tuval üzerinde sürükleyip yerleştirme; konumları kaydetme ve mevcut ilişkileri yönlü oklarla görme.
- Bileşenlerin bağlantı noktalarını sürükleyerek yönlü ilişki kurma; yeni ilişkiye varsayılan etiket verme, oka çift tıklayarak etiketi değiştirme ve ilişkileri diyagram listesinden kaldırma.
- Kart görünümünde her bileşenin ilişkili bileşen kodlarını ve varsa ilişki etiketlerini gösterme.
- Bileşen ayrıntısı ilişkili hedefleri ve ok etiketlerini gösterir; diyagram ve bileşen ayrıntısı aynı envanter ilişkilerini kullanır.
- Backlog işini bir veya birden fazla envanter bileşenine bağlama. Bileşen ayrıntısından iş oluşturulunca proje, ürün alanı ve bileşen bağlantısı yeni işe aktarılır.
- Backlog işi oluştururken veya düzenlerken ürün bileşenlerini kod, ad, tür, proje veya ürün alanına göre arama; birden fazla bileşeni seçip seçimleri etiketler üzerinden yönetme.
- Bileşen ayrıntısında ilişkili bileşenler ve bağlı backlog işleri görülebilir; iş devri özetinde de bileşen adları yer alır.

### Kişisel görevler ve notlar

- Backlog işine bağlı veya bağımsız kişisel görev ve not oluşturma, görüntüleme ve düzenleme.
- Görevleri tamamlandı olarak işaretleme.
- Görev/not için onayla silme; kayda ait ek dosyaların silinmesi.
- Backlog işi silindiğinde ilişkili görev ve notlar kişisel alanda bağımsız kayıt olarak kalır.

### Dosya ve devir

- Backlog işi, görev ve nota dosya seçiciyle dosya ekleme; açık kayıt üzerine desteklenen dosyaları sürükleyip bırakma.
- Ekleri açma ve kaldırma; dosyalar bu cihazdaki uygulama veri alanında saklanır.
- Backlog işinin bağlamı, kabul kriterleri, durumu, önceliği, ürün alanı, projesi ve ek adlarını içeren devir özetini panoya kopyalama.

### Çalışma alanı yedekleme ve geri yükleme

- Tüm çalışma alanı kayıtlarını ve ilişkili dosya eklerini tek yedek dosyasına aktar; kaydetme penceresinden dosya adını ve konumunu seç.
- Sıkıştırılmış `.rota` yedeği veya `.json` biçimi seçilebilir. Yedek ekleri içerir ve her ekin boyutu ile SHA-256 özeti doğrulanır.
- Geri yüklemede dosyanın biçimi, çalışma alanı şeması, ek listesi ve ek içerik özeti doğrulanır. Bozuk, eksik eki olan veya uyumsuz dosya mevcut veriyi değiştirmez.
- Doğrulanmış yedek geçici alana hazırlanır; kullanıcı onayıyla mevcut çalışma alanının yerini alır. İşlem başarısız olursa mevcut yerel kayıt geri konur.


### Mevcut akış iyileştirmeleri — ROTA-PLAN-101–200

Uygulandı ve Rota içindeki ürün planında Tamamlandı durumuna taşındı:

- **ROTA-PLAN-101**
- **ROTA-PLAN-102**
- **ROTA-PLAN-103**
- **ROTA-PLAN-104**
- **ROTA-PLAN-105**
- **ROTA-PLAN-106**
- **ROTA-PLAN-107**
- **ROTA-PLAN-108**
- **ROTA-PLAN-109**
- **ROTA-PLAN-110**
- **ROTA-PLAN-111**
- **ROTA-PLAN-112**
- **ROTA-PLAN-113**
- **ROTA-PLAN-114**
- **ROTA-PLAN-116**
- **ROTA-PLAN-117**
- **ROTA-PLAN-118**
- **ROTA-PLAN-119**
- **ROTA-PLAN-120**
- **ROTA-PLAN-121**
- **ROTA-PLAN-122**
- **ROTA-PLAN-123**
- **ROTA-PLAN-124**
- **ROTA-PLAN-125**
- **ROTA-PLAN-127**
- **ROTA-PLAN-129**
- **ROTA-PLAN-130**
- **ROTA-PLAN-131**
- **ROTA-PLAN-132**
- **ROTA-PLAN-141**
- **ROTA-PLAN-143**
- **ROTA-PLAN-194**
- **ROTA-PLAN-198**

- **ROTA-PLAN-126 · Kolonları sürükle bırakla sıralama** — Kolonlar panelinde etkin kolonlar sürüklenerek sıralanır; klavye için yukarı/aşağı eylemleri korunur.
- **ROTA-PLAN-142 · Arama kapsamı seçimi** — Backlog araması tüm alanlarda veya başlık, açıklama, iş ID’si, etiket ve bileşen alanlarından seçilende yapılır.
- **ROTA-PLAN-144 · Etkin filtreleri rozet gösterme** — Etkin backlog arama ve filtreleri tek tek kaldırılabilen rozetlerde listelenir.
- **ROTA-PLAN-145 · Filtre sonuç sayısını anlık gösterme** — Eşleşen iş sayısı proje backlog toplamıyla beraber görünür.

Bu grup hızlı kayıt, Outlook e-posta kaynağını izleme, backlog görünüm/kolon ayarları, toplu durum/atama, arama yardımları ve klavye erişimini kapsar. 

- **ROTA-PLAN-147 · Kaydedilmiş görünümü çoğaltma** — Yönetim penceresinden mevcut görünümün ayarları korunarak kopyası alınır.
- **ROTA-PLAN-148 · Sık kullanılan görünümleri sabitleme** — Sabitlenen görünümler seçim listesinin başında gösterilir.
- **ROTA-PLAN-149 · Görünüm değişikliklerini kaydetme uyarısı** — Aktif görünümde değişiklik varsa güncelleme eylemi bunu belirtir.

### Backlog kararları ve sprint akışı

- **ROTA-PLAN-052 · Açık soru havuzu:** Sorular yanıt sahibi, beklenen yanıt tarihi ve isteğe bağlı backlog işiyle kaydedilir; gecikenler belirginleşir, yanıt notu eklenebilir ve soru yeniden açılabilir.
- **ROTA-PLAN-053 · Kabul kriteri şablonları:** Story, bug ve bankacılık değişikliği için hazır kriterler yeni iş ve düzenleme formlarından uygulanabilir. Kullanıcı kendi kriterlerini adlandırıp tekrar kullanılabilir şablon olarak saklayabilir.
- **ROTA-PLAN-059 · İş yaşlandırma görünümü:** Backlog bekleme süresine göre sıralanır; son aktiviteden geçen süre ve son karar tarihi görünür. Tarihçesi olmayan kayıtta süre bilinmiyor gösterilir.
- **ROTA-PLAN-073 · Manuel backlog sıralaması:** Liste görünümünde varsayılan sıra seçiliyken işler sürükle-bırakla yeniden sıralanır; sıralama çalışma alanında korunur.
- **ROTA-PLAN-075 · Bağımlılık zaman çizgisi:** İş detayında bağımlı işler ve mevcut iş; durum, başlangıç ve hedef tarih bilgileriyle zaman çizgisinde gösterilir.
- **ROTA-PLAN-078 · Hazır iş havuzu:** Tamamlanmamış, bloke olmayan, kabul kriteri bulunan ve açık bağımlılığı olmayan işler filtrelenir. Takım filtresiyle havuz daraltılabilir.
- **ROTA-PLAN-072 · Sprint kapanış özeti:** Tamamlanan, açık/taşınan ve bloke işler özetlenir; PO öğrenim ve takip notlarını sprintte saklayabilir.

## Tamamlanmış MVP kabul kapsamı

- Özet, backlog ve kişisel alan arasında geçiş.
- Backlog arama/filtreleme, liste/pano görünümü ve kayıt ayrıntıları.
- Takım ve üye tanımı, Task ataması ve atama filtreleri.
- Kişisel görev/not takibi ve backlog işiyle ilişkilendirme.
- İlk açılış kurulumu, proje yönetimi ve yerel veri saklama.

### ROTA-PLAN-101–200 iyileştirmeleri

- **ROTA-PLAN-115 · E-posta eklerini seçerek alma:** Outlook `.msg` ve `.eml` bırakıldığında ekler listelenir; kullanıcı içe aktarılacakları seçer. Özgün e-posta dosyası ayrıca kayıtta kalır.
- **ROTA-PLAN-128 · Tablo satırında ikincil bilgi seçimi:** Satır altı bilgi iş ID'si, son güncelleme, atama özeti veya kapalı olarak seçilebilir; tercih cihazda saklanır.
- **ROTA-PLAN-133 · Seçili işlere toplu etiket ekleme:** Seçili işlere etiket eklenir, `-etiket` yazımıyla kaldırılır; geri al desteği bulunur.
- **ROTA-PLAN-134 · Seçili işleri projeye taşıma:** Seçili işler başka projeye taşınır; geçersiz sprint/release bağları temizlenir ve işlem geri alınabilir.
- **ROTA-PLAN-135 · Seçili işleri sprintten çıkarma:** Sprint bağlantısı topluca kaldırılır, her işin geçmişi güncellenir ve işlem geri alınabilir.
- **ROTA-PLAN-136 · Satır içi düzenlemeyi Enter ile kaydetme:** Başlık Enter ile kaydedilir, Escape düzenlemeyi iptal eder.
- **ROTA-PLAN-137 · Satır içi kaydetme durumunu gösterme:** Başlık, durum ve atama düzenlemeleri sonuçta satır yenilemesi ve bildirimle kullanıcıya yansıtılır.
- **ROTA-PLAN-138 · Son tablo değişikliğini geri alma:** Toplu durum, atama, etiket, proje ve sprint değişiklikleri kısa süreli geri alınabilir.
- **ROTA-PLAN-139 · Satır eylemleri menüsü:** Düzenle, çoğalt ve sil eylemleri tek satır menüsünde yer alır.
- **ROTA-PLAN-140 · Backlog satırından işi çoğaltma:** Yeni ID ve temiz geçmişle taslak açılır; seçili iş içeriği ve dosyaları taşınır.
- **ROTA-PLAN-146 · Son kullanılan filtreleri önerme:** Son beş arama/filtre bileşimi saklanır ve yeniden uygulanabilir.
- **ROTA-PLAN-150 · Çoklu kolona göre sıralama:** Birincil ve ikincil sıralama kaydedilmiş backlog görünümüne dahil edilir.
- **ROTA-PLAN-153 · İş ayrıntısında sabit eylem alanı:** İş ayrıntısının Düzenle, Sil ve devir eylemleri kaydırma sırasında erişilebilir kalır.
- **ROTA-PLAN-154 · İş formunda alan içi yardım:** Yeni backlog işindeki başlık alanı kısa ve eylem odaklı yazım örneği verir.
- **ROTA-PLAN-156 · İş açıklamasında yazım alanını genişletme:** Yeni iş ve düzenleme formlarındaki metin alanları içerik yazılırken otomatik büyür.
- **ROTA-PLAN-158 · İş geçmişinde olay türü filtreleri:** Aktivite geçmişi tüm hareketler, ilerleme notu, alan değişikliği, dosya eki veya release türüne göre süzülebilir.
- **ROTA-PLAN-185 · Diyagramı otomatik hizalama:** Envanter ve devir diyagramı düğümleri otomatik ızgaraya yerleştirilebilir.
- **ROTA-PLAN-186 · Diyagramda yakınlaştırma ve kadraja sığdırma:** Diyagramlar Ctrl+tekerlekle yakınlaştırılabilir ve Tümünü sığdır ile kadraja alınabilir.
- **ROTA-PLAN-189 · Diyagram değişiklik durumunu gösterme:** Diyagram araç çubuğu otomatik kaydı belirtir; düğüm, konum ve ilişki değişiklikleri anında saklanır.
- **ROTA-PLAN-161 · Takım panelinde üye adına göre arama:** Üye arama kutusu takım panelindeki kişi kartlarını ada göre filtreler.
- **ROTA-PLAN-162 · Üye kartından atanmış işlere geçiş:** İşlerini gör eylemi seçilen üyeye ve takıma atanmış backlog işleri açar.
- **ROTA-PLAN-163 · Takım ve üye filtresini kolay temizleme:** Takım paneli tarih ve efor filtreleri tek eylemle sıfırlanabilir.
- **ROTA-PLAN-155 · İş formunda eksik alanlara atlama:** Zorunlu alan doğrulaması ilk eksik başlık veya tarih alanına odaklanır; geçersiz tarih aralığında kayıt durdurulur.
- **ROTA-PLAN-166 · İş atamalarında takım/kişi gruplama:** İş ayrıntısı ve düzenleme ekranları çoklu atamaları takım, üye ve sorumluluk alanıyla birlikte gösterir.
- **ROTA-PLAN-170 · Takım panelinde açık işleri öne çıkarma:** Takım ve üye kartlarında açık, bloke ve tamamlanmış iş sayıları görünür.
- **ROTA-PLAN-181 · Envanter bileşenlerinde hızlı arama:** Bileşen kodu, adı, alanı ve amacı aranabilir; proje ve tür filtreleri bulunur.
- **ROTA-PLAN-190 · Diyagramdan bileşen kartını açma:** İlişki diyagramı düğümüne çift tıklama ilgili envanter bileşenini açar.
- **ROTA-PLAN-171 · Sprint şablonunu tekrar kullanma:** Yeni sprint son sprintin takımını ve uygun süresini önerir.
- **ROTA-PLAN-174 · Sprint tarihlerini kolay seçme:** Bir, iki, üç veya dört haftalık süre kısayolu bitiş tarihini otomatik hesaplar.
- **ROTA-PLAN-177 · Sprint planında kapsam uyarıları:** Sprint oluşturucusu bloke işleri ve tamamlanmamış bağımlılıkları önceden belirtir.
- **ROTA-PLAN-168 · Yan menüyü daraltma:** Yan menü ikon görünümüne daraltılıp geri genişletilir; tercih cihazda saklanır.
- **ROTA-PLAN-192 · Arayüz yazı boyutu ayarı:** Çalışma alanı ayarından küçük, standart, büyük veya çok büyük ölçek seçilebilir ve saklanır.
- **ROTA-PLAN-193 · Yüksek kontrast renk seçeneği:** Yüksek kontrast metin ve odak görünümünü güçlendirir.
- **ROTA-PLAN-195 · Animasyonları azaltma tercihi:** Hareket azaltma geçişleri neredeyse anında tamamlar ve tercih cihazda kalır.
- **ROTA-PLAN-196 · Kayıtlı görünüm ve kolon düzenini sıfırlama:** Backlog görünüm ayarları iş verilerine dokunmadan varsayılana döndürülebilir.
- **ROTA-PLAN-164 · Atama seçiminde üye arama:** Takım seçimi üye seçeneklerini daraltır; standart seçim alanında klavyeyle isim araması yapılabilir.
- **ROTA-PLAN-182 · Bileşen kartında ilişkili işlere geçiş:** Bileşen ayrıntısındaki bağlı backlog işleri tek seçimle açılabilir.
- **ROTA-PLAN-183 · Bileşen ilişkisini karttan düzenleme:** Bileşen ayrıntısından düzenlemeye geçerek ilişkili bileşenler çoklu seçilebilir.
- **ROTA-PLAN-197 · Son açılan işlere hızlı dönüş:** Son sekiz backlog işi araç çubuğundan başlık ve ID ile yeniden açılabilir.
- **ROTA-PLAN-151 · İş ayrıntısını yan panelde açma:** Backlog listesinden açılan iş ayrıntısı ekranın yanında tam boy panelde görünür; liste bağlamı korunur.
- **ROTA-PLAN-179 · Release kapsamına backlogdan iş ekleme:** Seçili backlog işleri aynı projedeki release'e doğrudan tablodan eklenip çıkarılabilir; geri al desteği vardır.
- **ROTA-PLAN-165 · Atama seçiminde son kişiler:** Hızlı iş oluşturucusu son kullanılan takım üyesini listenin başında önerir.
- **ROTA-PLAN-159 · Son değişen iş alanını vurgulama:** İş geçmişindeki en yeni hareket hafif vurgu alır.
- **ROTA-PLAN-160 · İş ayrıntısı bağlantılarını toplama:** Bileşen, bağımlılık, roadmap, release, sprint ve kişisel görev bağlantıları tek ilişkiler bölümünde gösterilir.
- **ROTA-PLAN-152 · Ayrıntı panelinde sekmeli bölümler:** İş ayrıntısı özet, aktivite, ekler ve ilişkiler sekmelerine ayrılır.
- **ROTA-PLAN-167 · Proje listesini arama ve sabitleme:** Yan menüde projeler aranabilir; sabitlenen projeler listenin başında gösterilir.
- **ROTA-PLAN-172 · Sprint oluşturucuda iş arama:** Sprint oluşturucu seçilmiş işleri başlık, ID, durum veya atama bilgisine göre süzer.
- **ROTA-PLAN-173 · Sprint kapsamını sürükleyerek düzenleme:** Seçilen işler sprint oluşturulurken sürüklenerek sıralanır; sıra iş kaydında korunur.
- **ROTA-PLAN-169 · Proje değiştirirken filtre bağlamını koruma:** Projeler arasında geçerken PO mevcut arama metnini koruyabilir veya temizleyebilir.
- **ROTA-PLAN-180 · Release takviminde kapsam özeti:** Release kartları planlanan/gerçek tarihi, tamamlanma oranı ve bloke/açık iş sayısını gösterir.
- **ROTA-PLAN-187 · Diyagramda ilişkili bileşeni hızlı bulma:** Envanter araması ve proje/tür filtreleri diyagram düğümlerini de daraltır.
- **ROTA-PLAN-175 · Sprint detayında ilerleme göstergesi:** Sprint özet kartları tamamlanma, bloke iş sayısı ve oran çubuğu gösterir.
- **ROTA-PLAN-178 · Sprint listesinde hızlı filtreler:** Sprint özetinde tümü, aktif, yaklaşan ve tamamlanan sprintler filtrelenir.
- **ROTA-PLAN-157 · İş eklerini ayrıntıdan önizleme:** PNG, JPEG, GIF, WebP ve PDF dosyaları iş ayrıntısında önizlenir; diğer dosyalar masaüstü uygulamasında açılır.
- **ROTA-PLAN-191 · Açık/koyu sistem teması:** Açık, koyu veya işletim sistemi temasına göre çalışan görünüm seçilebilir. Koyu tema envanter, release, takım, sprint ve backlog ekranlarında; formlarda, menülerde, etiketlerde ve önizlemelerde tutarlı koyu yüzey ve okunabilir metin renkleri kullanır.
- **ROTA-PLAN-199 · Silme ve arşivleme sonrası geri al:** Backlog işi, görev, not silme ve proje arşivleme altı saniye içinde geri alınabilir; dosya ekleri bekleme süresi sonunda temizlenir.
- **ROTA-PLAN-176 · Sprint bitiminde kalan işleri seçme:** Tamamlanan sprintin açık işleri Backlog'a çıkarılabilir veya başka sprintlere taşınabilir; her kayda aktivite eklenir.
- **ROTA-PLAN-184 · Diyagramda geri al ve yinele:** İş devir diyagramında 50 adıma kadar değişiklik geçmişi geri alınabilir ve yeniden uygulanabilir.
- **ROTA-PLAN-188 · Diyagram oku etiketini doğrudan düzenleme:** Ok etiketine çift tıklayıp yeni değeri gir; değişiklik doğrudan kaydedilir.
- **ROTA-PLAN-200 · Dosya eklerinde sürükle bırak ilerlemesi:** Dosya ekleri içe aktarılırken dosya adları ve aktarım durumu görünür; aktarım hatasında aynı dosyalar yeniden denenebilir.
- **ROTA-PLAN-201 · İş ayrıntısı sekmeleri arasında tekerlekle gezinme:** Sekme çubuğunun üzerindeyken fare tekerleğiyle önceki veya sonraki sekmeye geçilir; panelin geri kalanındaki dikey kaydırma korunur.

## Mevcut sürümün sınırları

- Uygulama Electron + TypeScript ile tek kullanıcılı ve yerel çalışan bir masaüstü prototipidir.
- Takım ve üye adları atama etiketidir; üyeler ayrı kullanıcı hesabı değildir. Uygulama gerçek bir takımın kimin ne yaptığını veya değişikliği kimin gerçekleştirdiğini henüz takip etmez.
- Outlook e-postasının gövdesinden otomatik iş/görev çıkarımı; Jira’ya kayıt yazma ve çift yönlü senkronizasyon henüz yoktur.
- Yedek dosyası çalışma alanı verisini ve ekleri içerir; yedek kullanıcı tarafından seçilen konuma yazılır ve dosya ayrıca korunmalıdır.
- Prototipe gerçek müşteri, hesap, kart veya kimlik verisi eklemeyin.



