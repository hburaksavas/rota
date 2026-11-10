# Rota

Rota, Product Owner'ların yazılım ürünlerinin backlog, ekip, envanter ve teslimat süreçlerini yönetmesi için Windows masaüstü uygulamasıdır. TypeScript arayüzü Node.js tarafından başlatılan yerel bir WebView2 penceresinde çalışır. Electron veya .NET SDK kullanmaz.

## Geliştirme ortamı

Kaynak koddan çalıştırmak için Windows bilgisayarında şunlar kurulu olmalıdır:

- **Node.js 24 veya üzeri ve npm** — arayüzü derlemek ve yerel pencereyi başlatmak için. Node.js zaten kuruluysa ek bir SDK gerekmez.
- **Microsoft Edge WebView2 Runtime** — yerel pencerenin arayüz motoru. Windows 11'de genellikle hazırdır; Windows 10'da kurum imajına göre ayrıca bulunması gerekebilir.

Uygulama Electron indirmez ve .NET SDK kurulumu istemez. Kurum bilgisayarında yalnızca Node.js/npm ve WebView2 Runtime bulunmalıdır.

Kurulumları doğrulamak için PowerShell'de çalıştırın:

```powershell
node --version
npm --version
```

Node.js sürümü 24 veya üzeri olmalıdır.

## Kaynak koddan çalıştırma

PowerShell'i depo klasöründe açıp şu komutları çalıştırın:

```powershell
npm install
npm start
```

`npm install` arayüz ve yerel pencere bağımlılıklarını indirir. `npm start` hazır arayüz derlemesini kullanarak Node.js ile WebView2 penceresini açar. Derleme eksikse veya kaynak kod değişmişse arayüzü önce derler. Electron veya .NET SDK gerekmez. Kurum ağı npm erişimini kısıtlıyorsa `registry.npmjs.org` veya kurum içi npm aynasına erişim gerekir.

## Backlog'u Excel'den içe aktarma

Backlog'un **Liste** görünümünde **Tablo işlemleri → Excel'den içe aktar** yolunu kullanın. Dosya `.xlsx` biçiminde olmalı; yalnızca ilk çalışma sayfası okunur. Önerilen şablon ilk satırda `Başlık` ve isteğe bağlı `Açıklama` sütunlarını içerir:

| Başlık | Açıklama |
| --- | --- |
| Günlük EFT limit kontrolü | Kurumsal müşteriler için günlük EFT limitinin işlem öncesinde doğrulanması. |
| Hesap ekstresi raporu | Kullanıcının tarih aralığı seçerek hesap ekstresini indirebilmesi. |

Sütun adları büyük/küçük harfe duyarsızdır. `Başlık` yerine `Title`, `Summary`, `Task`, `İş` veya `Issue`; `Açıklama` yerine `Description`, `Detay` veya `Details` de kullanılabilir. Başlık sütunu yoksa başlıklar ilk sütundan, açıklamalar ikinci sütundan okunur. Başlığı boş satırlar atlanır; diğer sütunlar içe aktarımda kullanılmaz.

Dosya en fazla 20 MB, içe aktarım ise en fazla 500 iş olabilir. Başlık en fazla 120 karakterdir; açıklama 4.000 karaktere kadar alınır. Önizlemede hedef projeyi ve oluşturulacak iş türünü seçebilirsiniz. Her iş **Yeni** durumda, **Orta** öncelikte ve **Genel** alanında oluşturulur.


## PO çalışma araçları

- Üst araç çubuğundaki **Toplantı** ile oturum açın. Satırları görev, soru veya karar olarak işaretleyip ilgili backlog işini seçin. **Kayıtları oluştur**, bekleyen satırları bir kez dönüştürür; kararlar mevcut karar ekranında tamamlanabilecek taslaklar olarak kaydedilir. Oturumlar ve eklenmiş satırlar yeniden açılışta korunur.
- İş detayındaki **Konuşma** sekmesinde not bırakın veya **PO’dan yanıt bekle** ile açıklama, örnek, teyit ya da karar talebi kaydedin. **Bana düşenler**, bu beklentileri ve mevcut kullanıcıya/PO’ya atanmış açık soruları gösterir. Yanıtlar ilgili işin konuşma geçmişine yansır; yeniden açılan beklentilerde önceki yanıtlar korunur.
- Konuşma geçmişi, işe bağlı notları, soruları, yanıtları, kararları ve ilerleme notlarını tarih sırasıyla bir araya getirir. Tarihi bulunmayan eski notlar ayrıca belirtilir.
- İş detayının sağ üstündeki **Yan yana çalış** ikonuyla mevcut işi solda tutup sağda not veya o ürünün iş kuralını açın. Her iki tarafta düzenleme yapılabilir; sağdaki değişiklikler otomatik kaydedilir. + ikonu işe bağlı not veya ürüne bağlı kural oluşturur.

Bu akışların testleri `npm run test:po` ile çalıştırılır; testler ayrı tarayıcı profili kullanır ve kullanıcı çalışma alanını değiştirmez.

## Veri ve özellik notları

- Çalışma alanı verileri WebView2 profilinde, ek dosyalar uygulama kullanıcı veri klasöründe yerel olarak saklanır. Kullanıcı profili `%APPDATA%\\rota-po` altındadır.
- Uygulama arayüzü sabit `http://127.0.0.1:41739` kaynağında sunulur; bu sabit adres, WebView2 `localStorage` verilerinin yeniden başlatmalarda aynı kalmasını sağlar. Önceki Electron veya dosya adresli WebView2 sürümündeki veriler yeni kaynağa otomatik taşınmaz; eski profil silinmez. Gerekirse eski sürümden yedek alıp yeni sürümde geri yükleyin.
- Node.js host; dosya seçme, ek dosya içe aktarma/açma/önizleme/kaldırma, Outlook `.msg` / `.eml` okuma, yedekleme/geri yükleme, Excel dışa aktarma ve Jira API işlemlerini sağlar. Jira PAT Windows kimlik bilgisi deposunda tutulur.
- Outlook sürükle-bırak davranışı kurumun klasik Outlook sürümünde doğrulanmalıdır. Jira kullanımı için Jira base URL'i ve kullanıcı tarafından oluşturulmuş bir PAT gerekir.
- Örnek başlangıç verisi test amaçlıdır; gerçek müşteri, hesap veya kart bilgisi girmeyin.

Güncel feature planı [`docs/feature-takibi.md`](docs/feature-takibi.md) dosyasındadır.

## Favspace eklentisi

Sol menüde **Favspace** üzerinden kaynak bağlantıları ekleyin; koleksiyon, etiket, not, proje ve ilgili backlog işi belirleyin. Kaynakları arayabilir, proje veya koleksiyonla filtreleyebilir ve sabitleyebilirsiniz. Seçilen kaynağın detayından düzenleme, silme ve varsayılan tarayıcıda açma yapılır. Notlar, backlog, görevler ve diğer içerik kayıtlarındaki HTTP/HTTPS bağlantıları ve dosya ekleri otomatik görünür. Kaynak kayıtlar kopyalanmaz; değişiklikler Favspace yeniden açıldığında yansır. Otomatik kaynaklar sabitlenebilir; düzenleme ve silme asıl kayıtta yapılır. Veriler çalışma alanı yedeklerine dahildir. Bu sürüm Rota içinde yerleşik bir modüldür; harici Favspace hesabına bağlanmaz.

Doğrulama: `npm run build` ve `node tests/feature/favspace.mjs` (ayrı tarayıcı profili).

Favspace açıkken Windows Explorer’dan bir veya birden fazla dosya sürükleyin: kaynak çekmecesi açılır; bıraktığınız dosyalar **kısayol** olarak eklenir. Dosya içeriği kopyalanmaz, uzantı veya dosya boyutu sınırı uygulanmaz (tek seferde en fazla 100 dosya). Aynı dosya tekrar eklenmez. **Dosyayı aç** orijinal konumu açar; kısayolu kaldırmak orijinal dosyayı silmez. Dosya taşınır/silinirse yeniden ekleyin. Yedeklerde dosyanın kendisi yerine konumu saklanır. Çekmece Esc ile kapatılır, hareketi azaltma tercihi desteklenir.

Yerel sürükle-bırak WebViewJS 0.6.0 ile WebView2 içerik alanının native olaylarını kullanır. Bu güncellemeden sonra `npm install` çalıştırıp uygulamayı tamamen yeniden başlatın. Explorer’dan bırakılan dosyaların tam konumu yerel host üzerinden alınır; HTML File nesnesinden yol çıkarılmaz. Native yönlendirme testi: `node tests/desktop/native-file-drop.mjs`.

Favspace’te dosya kartına çift tıklayarak veya kart odaktayken Enter’a basarak dosyayı doğrudan açabilirsiniz. Tek tıklama detayları gösterir; bu davranış hem dosya kısayollarında hem kayıtlardan gelen dosya eklerinde çalışır.
