# Rota

Rota, Product Owner'ların yazılım ürünlerinin backlog, ekip, envanter ve teslimat süreçlerini yönetmesi için Windows masaüstü uygulamasıdır. TypeScript arayüzü, .NET 10 WPF penceresindeki Microsoft Edge WebView2 üzerinde çalışır. Electron kullanılmadığından `npm install` Electron çalıştırılabilir dosyasını indirmez.

## Geliştirme ortamı

Kaynak koddan çalıştırmak için Windows bilgisayarında şunlar kurulu olmalıdır:

- **Node.js LTS ve npm** — arayüz bağımlılıklarını yüklemek ve TypeScript arayüzünü derlemek için.
- **.NET 10 SDK** — WPF masaüstü uygulamasını derlemek ve `npm start` ile çalıştırmak için. Yalnızca .NET Runtime kurulu olması yeterli değildir.
- **Microsoft Edge WebView2 Runtime** — uygulamanın arayüzünü masaüstü penceresinde göstermek için. Edge tarayıcısının kurulu olması WebView2 Runtime'ın kurulu olduğunu tek başına doğrulamaz.

Kurum bilgisayarında kurulumları IT politikasıyla yapmak gerekiyorsa IT'den Node.js LTS, .NET 10 SDK ve WebView2 Runtime kurulumunu veya kurumun onayladığı dağıtım paketlerini isteyin. Resmî indirme sayfaları: [.NET 10](https://dotnet.microsoft.com/download/dotnet/10.0) ve [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/).

Kurulumları doğrulamak için PowerShell'de çalıştırın:

```powershell
node --version
npm --version
dotnet --list-sdks
```

`dotnet --list-sdks` çıktısında `10.x` SDK sürümü görünmelidir. `dotnet` bulunamazsa veya yalnızca 10'dan eski SDK'lar listelenirse `npm start` çalışmaz.

## Kaynak koddan çalıştırma

PowerShell'i depo klasöründe açıp şu komutları çalıştırın:

```powershell
npm install
npm start
```

`npm install` npm paketlerini indirir. İlk `npm start` renderer'ı derler, .NET bağımlılıklarını NuGet üzerinden geri yükleyebilir ve WPF/WebView2 penceresini açar. Kurum ağı npm veya NuGet erişimini kısıtlıyorsa `registry.npmjs.org` ve `api.nuget.org` erişimini ya da kurum içi paket aynalarını IT ile ayarlayın.

`npm start` sistemdeki .NET SDK'sını kullanır. Geliştirici betiği ayrıca depo kökündeki `.dotnet/dotnet.exe` konumunda bir SDK varsa yedek olarak onu kullanabilir; bu klasör Git'e eklenmez ve SDK'yı kendiliğinden indirmez. Kurum bilgisayarında standart yol, .NET 10 SDK'nın sisteme kurulmasıdır.

## Windows için dağıtım paketi oluşturma

Dağıtım paketini hazırlayan bilgisayarda Node.js LTS ve .NET 10 SDK gerekir:

```powershell
npm install
npm run build:desktop
```

Self-contained x64 çıktı `Rota.Desktop/bin/Release/net10.0-windows/win-x64/publish` klasörüne yazılır. Paket .NET Runtime'ı içerir, bu nedenle hedef bilgisayara ayrıca .NET kurulması gerekmez. Hedef bilgisayarda yine de WebView2 Runtime bulunmalıdır. Kurum içi dağıtım öncesinde paket imzalama ve IT onayı gerekir.

## Veri ve özellik notları

- Çalışma alanı verileri WebView2 profilinde, ek dosyalar uygulama kullanıcı veri klasöründe yerel olarak saklanır.
- Mevcut Electron `localStorage` verileri otomatik olarak taşınmaz; eski profil değiştirilmeden kalır. Gerekirse önceki uygulamadaki yedekleme/dışa aktarma akışı kullanılmalıdır.
- Yerel host; dosya seçme, ek dosya içe aktarma/açma/önizleme/kaldırma, Outlook `.msg` / `.eml` okuma, yedekleme/geri yükleme, Excel dışa aktarma ve Jira API işlemlerini sağlar.
- Outlook sürükle-bırak davranışı kurumun klasik Outlook sürümünde doğrulanmalıdır. Jira kullanımı için Jira base URL'i ve kullanıcı tarafından oluşturulmuş bir PAT gerekir.
- Örnek başlangıç verisi test amaçlıdır; gerçek müşteri, hesap veya kart bilgisi girmeyin.

Güncel feature planı [`docs/feature-takibi.md`](docs/feature-takibi.md) dosyasındadır.
