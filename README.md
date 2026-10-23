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

`npm install` arayüz ve yerel pencere bağımlılıklarını indirir. `npm start` arayüzü derler ve Node.js ile WebView2 penceresini açar; Electron veya .NET SDK indirmez. Kurum ağı npm erişimini kısıtlıyorsa `registry.npmjs.org` veya kurum içi npm aynasına erişim gerekir.

## Backlog'u Excel'den içe aktarma

Backlog'un **Liste** görünümünde **Tablo işlemleri → Excel'den içe aktar** yolunu kullanın. Dosya `.xlsx` biçiminde olmalı; yalnızca ilk çalışma sayfası okunur. Önerilen şablon ilk satırda `Başlık` ve isteğe bağlı `Açıklama` sütunlarını içerir:

| Başlık | Açıklama |
| --- | --- |
| Günlük EFT limit kontrolü | Kurumsal müşteriler için günlük EFT limitinin işlem öncesinde doğrulanması. |
| Hesap ekstresi raporu | Kullanıcının tarih aralığı seçerek hesap ekstresini indirebilmesi. |

Sütun adları büyük/küçük harfe duyarsızdır. `Başlık` yerine `Title`, `Summary`, `Task`, `İş` veya `Issue`; `Açıklama` yerine `Description`, `Detay` veya `Details` de kullanılabilir. Başlık sütunu yoksa başlıklar ilk sütundan, açıklamalar ikinci sütundan okunur. Başlığı boş satırlar atlanır; diğer sütunlar içe aktarımda kullanılmaz.

Dosya en fazla 20 MB, içe aktarım ise en fazla 500 iş olabilir. Başlık en fazla 120 karakterdir; açıklama 4.000 karaktere kadar alınır. Önizlemede hedef projeyi ve oluşturulacak iş türünü seçebilirsiniz. Her iş **Yeni** durumda, **Orta** öncelikte ve **Genel** alanında oluşturulur.


## Veri ve özellik notları

- Çalışma alanı verileri WebView2 profilinde, ek dosyalar uygulama kullanıcı veri klasöründe yerel olarak saklanır. Kullanıcı profili `%APPDATA%\\rota-po` altındadır.
- Uygulama arayüzü sabit `http://127.0.0.1:41739` kaynağında sunulur; bu sabit adres, WebView2 `localStorage` verilerinin yeniden başlatmalarda aynı kalmasını sağlar. Önceki Electron veya dosya adresli WebView2 sürümündeki veriler yeni kaynağa otomatik taşınmaz; eski profil silinmez. Gerekirse eski sürümden yedek alıp yeni sürümde geri yükleyin.
- Node.js host; dosya seçme, ek dosya içe aktarma/açma/önizleme/kaldırma, Outlook `.msg` / `.eml` okuma, yedekleme/geri yükleme, Excel dışa aktarma ve Jira API işlemlerini sağlar. Jira PAT Windows kimlik bilgisi deposunda tutulur.
- Outlook sürükle-bırak davranışı kurumun klasik Outlook sürümünde doğrulanmalıdır. Jira kullanımı için Jira base URL'i ve kullanıcı tarafından oluşturulmuş bir PAT gerekir.
- Örnek başlangıç verisi test amaçlıdır; gerçek müşteri, hesap veya kart bilgisi girmeyin.

Güncel feature planı [`docs/feature-takibi.md`](docs/feature-takibi.md) dosyasındadır.
