# Rota feature takibi

## Bekleyen

- **Backlog ve dashboard arayüzü.** Liste yerleşimi, filtre özeti, satır içi kayıt, detaydan dönüş, toplu seçim, Board kartları, dar pencere ve günlük odak görünümü.

- **Sunumda lazer işaretçi.** İş detayında veya beyaz tahtada bir tuş basılı tutulurken imleç kısa bir iz bırakır. Ekran paylaşımında bir alanı veya akışın yönünü göstermek için kullanılabilir. Tuş bırakıldığında iz söner.

- **Öncelik düellosu.** Backlog’dan seçilen beş iş, ikişer ikişer ekrana gelir. Her turda «Hangisini önce yapardık?» sorusu yanıtlanır. Tur sonunda önerilen sıra incelenebilir ve kararsız kalınan eşleşmeler yeniden açılabilir. Backlog sırası yalnızca **Uygula** seçildiğinde güncellenir.

- **İş anlatımı için beyaz tahta.** İş detayındaki **Tahtayı aç** eylemi, işe bağlı ve çalışma alanıyla birlikte saklanan bir tahta açar. İlk sürümde her iş için tek tahta bulunur. Metin, yapışkan not, görsel, şekil ve oklar serbestçe yerleştirilebilir. Backlog işi, karar, açık soru ve görev kartları asıl kayıtlarını açar. Tahtadaki bir not, bulunduğu yerde işe bağlı bir karar, açık soru veya görev kartına dönüştürülebilir.

  Sonraki adımda serbest çizim, ekran görüntüleri üzerinde numaralı işaretler ve adlandırılabilir anlatım çerçeveleri eklenebilir. Sunum modunda ok tuşları sıradaki çerçeveye odaklanır.

- **Windows’ta hızlı yakalama penceresi.** Sistem genelinde çalışan bir klavye kısayolu, başka bir uygulamadayken küçük bir Rota penceresi açar. Kullanıcı metin, bağlantı veya dosyayı kişisel gelen kutusuna kaydeder ve daha sonra bir işe, nota veya soruya dönüştürebilir. İlk kayıtta proje veya kayıt türü seçmek gerekmez.

- **Backlog’da düzenleme sonrası işin konumunu göster.** Liste’de durum veya öncelik düzenlemesi ve Board’da öncelik düzenlemesi işi görünür alanda taşıdığında hedef kısa süre vurgulanır. Hedef ekran dışındaysa bildirimde **İşe git** eylemi sunulur.

## Tamamlanan

- **Notlar, Sorular ve Görevler sekmeleri** — 23 Kasım 2026. Zamanı gelen, Yanıt bekleyen, Planlı ve Yanıtlanan sekmeleri ile kişisel takip eylemleri kaldırılır. Notlar, Sorular ve Görevler kendi kayıtlarını gösterir. Üç sekmede aynı alttan sohbet girişi kullanılır; tür sekmeye göre seçilir, Enter ile kayıt ve Shift+Enter ile yeni satır desteklenir. Taslak metin ve iş bağlantısı sekme bazında korunur. Eski takip verileri yedek uyumluluğu için saklanır.

- **Silme onayı tercihi** — 23 Kasım 2026. Silme onayındaki Bir daha sorma seçimi yalnızca işlem onaylanınca bu cihazda saklanır. Ayarlar > Genel > Silme işlemleri bölümündeki Silmeden önce onay iste seçeneğiyle tekrar açılabilir. Tercih silme işlemlerinde ortaktır; diğer onaylar korunur.

- **Çalışma alanında tek yüzey** — 23 Kasım 2026. Bugünkü odağım, Notlar ve Takipler tek panelde gösterilir. Çalışma alanı ve Notlar başlık satırları, tür/durum filtreleri ve Notlar içindeki ekleme/arama kontrolleri kaldırılır. Yeni kayıt sağ üstteki Not düğmesinden açılır; tamamlanan kayıtlar listede kalır ve yeniden açılabilir.

- **Kaydetme hatasının ayrıntısı** — 23 Kasım 2026. Genel depolama uyarısı gerçek hata mesajını gösterir. Masaüstünde uyarı dosya yazımı onaylanınca kapanır; daha eski bir isteğin hatası yeni başarılı kaydı hata olarak göstermez.

- **Notlar listesinde silme** — 23 Kasım 2026. Not, Görev ve Soru satırlarında çöp kutusu simgesiyle mevcut onaylı silme akışı açılır. Not ve görev silme altı saniye içinde geri alınabilir; kayıt saklanamazsa silme uygulanmaz.

- **Tek çalışma alanı ve toplu not alma** — 23 Kasım 2026. Notlar ve Takipler, Çalışma alanı başlığı altında ortak segmentlerde gösterilir. Panel gizleme, büyütme, sürükleme ve boyutlandırma kaldırılır. Sağ üstteki Notlar listesi kaldırılır; Not eylemi mesajların geçici biriktiği pencereyi açar. Tamam ile tüm mesajlar ve gönderilmemiş son metin tek kayıt olarak kaydedilir.

- **Birleşik Notlar** — 22 Kasım 2026. Not, Görev ve Soru tek Notlar panelinde tür ve durum filtreleriyle gösterilir. Toplantı modundaki tür seçici, Enter ile kayıt ve Ctrl+Space ile tür değiştirme akışı kullanılır. Çalışma alanındaki Backlog paneli kaldırılır; eski kayıtlar, ekler, takipler ve odak bağlantıları korunur.

- **Ürün altında proje planlama** · 21 Kasım 2026. Mevcut Projeler alanı Ürünler olarak sunulur. Ürün altındaki projeler aynı Backlog kayıtlarını iş paketlerinde kullanır. Analiz, yazılım ve test tarihleri ortak kişi kapasitesi, bağımlılıklar, tatil ve izinlerle hesaplanır. İş envanteri, takvim, kapasite ve değişiklik önizlemesi hedef tarihle bitiş tahminini birlikte gösterir.

- **Windows release scripti** · 16 Kasım 2026. `npm run release`, Node.js çalışma zamanı, derlenmiş arayüz ve üretim bağımlılıklarını tek taşınabilir EXE'ye gömer; SHA-256 dosyası üretir. EXE çift tıklamayla açılır; installer ve Node.js kurulumu gerekmez, WebView2 Runtime kullanılır. Paketleme için Node.js 25.5+ gerekir. Mevcut çıktının üzerine yazılmaz, kullanıcı çalışma alanı pakete alınmaz.

- **Takipler ve yanıt bekleyenlerin birleşmesi** · 15 Kasım 2026. Ayrı **Yanıt bekleyenler** paneli kaldırıldı; içerik **Takipler** panelinde **Zamanı gelen**, **Yanıt bekleyen**, **Planlı** ve **Yanıtlanan** segmentleriyle tek akışta toplanır. Panel başlığındaki sayı, zamanı gelen takiplerle senden yanıt bekleyen konuların toplamıdır. Yanıt segmentlerinde tür filtresi, arama, yanıt verme ve yeniden açma korunur; takip segmentlerinde takip eden kişi filtresi kullanılır. Eski `responses` panel gizleme tercihi yok sayılır.

- **Çalışma alanının dosyada saklanması** · 14 Kasım 2026. Çalışma alanı WebView2 `localStorage` yerine `%APPDATA%\rota-po\workspace.json` dosyasında tutulur. Yazmalar birleştirilir ve atomik yapılır; kapanışta bekleyen değişiklik kaybolmaz. Oturum başında önceki dosya `workspace.previous.json` olarak saklanır. Mevcut `localStorage` kaydı ilk açılışta dosyaya kopyalanır ve silinmez. Dosya okunamazsa uygulama üzerine yazmaz, kurtarma akışını açar.

- **Kişisel takipler** · 14 Kasım 2026. Çalışma alanındaki görev, not ve soru satırlarında zil simgesiyle belirli bir tarih veya kayıt güncellemesi için takip başlatılır. Takip eden kişi kendi ve takım üyeleri arasından seçilir; her kişi aynı kayıtta kendi koşuluyla tek takip tutar. **Takipler** paneli zamanı gelen ve bekleyen takipleri görünme nedeni, takip eden kişi ve bağlı işiyle listeler. Kayıt açılabilir, takip 1 saat, yarın veya 1 hafta ertelenebilir, güncelleme takipleri sonraki güncellemeye bırakılabilir ve takip bitirilebilir. **Hızlı takip ekle** kayıtsız konu için başlık ve tarihle takip oluşturur; sonradan bir backlog işine bağlanabilir. Zamanı gelen takipler bir kez bildirim olarak gösterilir. Panel, Paneller menüsünden gizlenip geri getirilebilir.

- **Çalışma alanında panel görünürlüğü** · 11 Kasım 2026. Odak, Yanıt bekleyenler, Görevlerim, Notlarım, Sorularım ve Backlog işleri başlıklarından gizlenebilir. Üstteki Paneller menüsünden tek tek geri getirilebilir veya tümü gösterilebilir. Tercihler çalışma alanıyla saklanır; kayıtlar ve panel yerleşimleri korunur.

- **Kayıtları doğrudan düzenleme** · 11 Kasım 2026. Görev ve notlar önizleme adımı olmadan düzenleme formunda açılır. Sorular da doğrudan düzenlenir. Ekler, not diyagramları, kopyalama ve silme aynı ekrandadır; Vazgeç pencereyi kapatır.

- **Genel kullanıma uygun arayüz dili** · 11 Kasım 2026. Role özel ifadeler kaldırıldı; çalışma alanı, yanıt talepleri, görünürlük ve varsayılan profil metinleri genel kullanıma uyarlandı. Yanıt bekleyenler boş durumundaki yönlendirme cümlesi kaldırıldı.

- **Çalışma alanında yanıt bekleyenler** · 11 Kasım 2026. Bana düşenler menüsü ve ayrı ekranı kaldırıldı. Yanıt talepleri ve kullanıcıya atanmış sorular, Bugünkü odağım altında kendi kaydırma alanı olan panelde gösterilir. Bekleyen/yanıtlanan, arama, tür filtresi, yanıt verme ve yeniden açma desteklenir.

- **Toplantı kapanışını biçimli kopyalama** · 11 Kasım 2026. Özet; notlar, kararlar, sorular, görevler ve ertelenen gündemleri kapsar. Kayıtların güncel ayrıntıları, sorumlu ve tarih alanları HTML başlıkları ve listeleriyle kopyalanır; düz metin karşılığı da panoya eklenir.

- **Aranabilir seçim alanları** · 11 Kasım 2026. Mevcut ve yeni tekli veya çoklu seçim alanları açıldığında seçenekler yazıyla filtrelenebilir. Arama Türkçe karakterleri destekler ve klavyeyle kullanılabilir.

- **Toplantı gündemi ve kapanış takibi** · 11 Kasım 2026. Gündem maddeleri sıralanabilir, görüşüldü veya ertelendi olarak işaretlenebilir. Madde başına karar, soru ve görev sayıları gösterilir. Kapanış kartından kayıtlar açılabilir, görev sorumlusu ve hedef tarihi ile soru sahibi düzenlenebilir.

- **Toplantıyı bitirme ve silme** · 11 Kasım 2026. Toplantıyı bitirince süre kaydedilir ve kapanış kartı açılır. Toplantı silindiğinde oluşturduğu kayıtlar kendi listelerinde kalır.

- **Tek toplantı sahnesi** · 11 Kasım 2026. Üst çubuktaki Toplantı düğmesi sahneyi açar. Genel kayıtlar bağımsız tutulabilir ve birden fazla Backlog işi sağ panelden gündeme sürüklenebilir. Geçmiş toplantılar başlık, gündem ve mesaj içeriğiyle aranabilir.

- **Çalışma alanında büyük listeler** · 11 Kasım 2026. Not, soru, görev ve Backlog panelleri görünen satırları ve yakınındaki kayıtları çizer. Arama ve sayaçlar tüm listeyi kapsar.

- **Daha hızlı uygulama açılışı** · 11 Kasım 2026. Hazır derleme güncelse uygulama doğrudan açılır. Excel, e-posta ve diyagram kitaplıkları ilgili özellik kullanıldığında yüklenir.

- **Tema geçişi ve koyu form alanları** · 10 Kasım 2026. Tema 150 ms’de yumuşakça değişir. Azaltılmış hareket tercihinde doğrudan uygulanır. Koyu temada form alanları ana yüzey rengini kullanır ve etiketler bulundukları yüzeyle bütünleşir.

- **Yan menü düğmesi** · 10 Kasım 2026. Açma ve kapatma düğmesi dikey ayırıcıya oturur. Ok, menünün durumuna göre yön değiştirir ve fareyle üzerine gelindiğinde hareket yönünü gösterir.

- **Pencere boyutuna uyumlu çalışma alanı** · 10 Kasım 2026. Üst çubuk ve ana içerik aynı kenar boşluğunu kullanır. Kişisel çalışma alanında panel aralıkları sabit kalır ve sütun sayısı kullanılabilir alana göre değişir. Backlog ve diğer ana menüler çalışma alanının genişliğini kullanır. Genel bakışta varsayılan yükseklikteki paneller kalan dikey alana yayılır.

- **Backlog’da sürükleyerek sil** · 6 Kasım 2026. Liste veya Board’da iş sürüklenirken Backlog’un sağ kenarında, dikey ortada çöp kutusu görünür. Kutunun üzerine bırakılan iş silinir ve altı saniye boyunca **Geri al** gösterilir.

- **Toplantı sohbetinde gönderme animasyonu** · 6 Kasım 2026. Kaydedilen not, görev, açık soru ve karar görünür hedefe 180 ms’de kayar ve yeni satır vurgulanır. Azaltılmış hareket ayarında yalnızca vurgu gösterilir. Hedef ekran dışındaysa kaydırma konumu korunur ve kayıt bildirimi gösterilir.

- **Bugünkü odağa ekleme animasyonu** · 6 Kasım 2026. İğnelenen kaydın küçük bir kopyası görünür hedefe 200 ms’de kayar. Azaltılmış hareket ayarında kayıt kısa süre vurgulanır. Hedef ekran dışındaysa kaydırma konumu korunur ve ekleme bildirimi gösterilir.

- **Backlog taşıma animasyonu** · 6 Kasım 2026. Liste sıralamasında yer değiştiren satırlar kayar ve taşınan satır vurgulanır. Board’da yeni sütunda görünen kart, sürükle-bırak veya klavyeyle durum değişikliği sonrasında kısa bir hareket ve vurgu alır. Azaltılmış hareket ayarında yalnızca vurgu gösterilir.

- **Backlog ve dashboard arayüzü** · 6 Kasım 2026. Liste dar pencerelerde ikincil sütunları gizler. Filtreler, sonuç sayısı ve toplu işlemler listenin üstünde görünür. Satır içi kayıtta başarı veya hata hücrede gösterilir. İş önizlemesi ayrı bir eylemdir ve detay kapanınca odak listeye döner. Board’da hedef sütun vurgulanır. Dashboard’da bugünkü görevler ile bloke ve geciken işler öne çıkar.

- **Hafta perdesi** · 6 Kasım 2026. Yol haritasının altındaki şerit, haftaya denk gelen planlanan başlangıç ve hedef tarihlerini vurgular. Haftayı seçince vurgu sabitlenir ve ilgili işler açılabilir bir listede görünür.

- **Kayıt yığını** · 6 Kasım 2026. İş detayının **Ekler** sekmesinde e-postalar, dosyalar ve notlar tarihleriyle tek kartta toplanır. İlişkisi kayıtlı e-posta ekleri ilgili iletinin altında gösterilir.

- **Masanın kenarı** · 6 Kasım 2026. İş detayları uygulama oturumu boyunca sağ kenara iğnelenebilir. İğnelenen iş, son açık bölüm ve kaydırma konumuyla yeniden açılır.

- **Toplantı kapanış kartı** · 6 Kasım 2026. Toplantı sahnesinde oturum boyunca kaydedilen kararlar, açık sorular ve görevler gündem sırasına göre gruplanır. **Özeti kopyala** tüm çıktıyı tek seferde biçimli HTML ve düz metin olarak panoya yazar.

- **Kaydı biçimli kopyala** · 5 Kasım 2026. İş, kişisel görev, karar, açık soru ve not ekranlarındaki kopyalama simgesi, kaydı başlıkları ve ilgili alanlarıyla birlikte biçimli HTML ve düz metin olarak panoya yazar.

- **Toplantı sohbet kutusu** · 5 Kasım 2026. Animasyonlu kayıt türü seçici, simgeli gönderme ve iş numarasıyla kompakt gündem geçişi.

- **Toplantı sahnesinde hızlı kayıt** · 5 Kasım 2026. Karar, açık soru, görev ve not tek satırdan Enter ile gündemdeki işe bağlanır.

- **Toplantı sahnesi** · 5 Kasım 2026. Backlog’da seçilen işler gündeme alınır. İşler klavyeyle gezilebilir, kararlar ve açık sorular doğrudan gündemdeki işe bağlanabilir.
