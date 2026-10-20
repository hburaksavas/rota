export interface RotaProductFeatureImport {
  id: string;
  title: string;
  type: "Story" | "Bug";
  status: "Yeni" | "Devam ediyor" | "Tamamlandı";
  priority: "Kritik" | "Yüksek" | "Orta" | "Düşük";
  area: string;
  description: string;
  labels: string[];
}

export const ROTA_PRODUCT_FEATURES: RotaProductFeatureImport[] = [
  {
    "id": "ROTA-DONE-001",
    "title": "İlk açılış sihirbazında örnek banka verisiyle veya boş çalışma alanıyla başlama.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Çalışma alanı ve projeler",
    "description": "İlk açılış sihirbazında örnek banka verisiyle veya boş çalışma alanıyla başlama.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-002",
    "title": "Kurum/ekip, çalışma alanı adı, kullanıcı adı ve rolünü tanımlama; kurulum akışını ayarlardan yeniden açma.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Çalışma alanı ve projeler",
    "description": "Kurum/ekip, çalışma alanı adı, kullanıcı adı ve rolünü tanımlama; kurulum akışını ayarlardan yeniden açma.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-003",
    "title": "Proje oluşturma ve ad/renk düzenleme; yan menüden projeyi açıp o projeye ait backlog'u görüntüleme.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Çalışma alanı ve projeler",
    "description": "Proje oluşturma ve ad/renk düzenleme; yan menüden projeyi açıp o projeye ait backlog'u görüntüleme.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-004",
    "title": "Kurulum ayarları tekrar açıldığında mevcut işler, görevler ve notlar korunur. Proje adları değişirse iş bağlantıl…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Çalışma alanı ve projeler",
    "description": "Kurulum ayarları tekrar açıldığında mevcut işler, görevler ve notlar korunur. Proje adları değişirse iş bağlantıları güncellenir.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-005",
    "title": "Backlog işlerini oluşturma, görüntüleme, düzenleme ve onayla silme. Başlık, proje, tür, durum, öncelik, ürün alan…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Backlog yönetimi",
    "description": "Backlog işlerini oluşturma, görüntüleme, düzenleme ve onayla silme. Başlık, proje, tür, durum, öncelik, ürün alanı, açıklama ve kabul kriterleri düzenlenebilir.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-006",
    "title": "Liste ve pano görünümü; arama ile durum, tür, takım ve sorumlu filtreleri.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Backlog yönetimi",
    "description": "Liste ve pano görünümü; arama ile durum, tür, takım ve sorumlu filtreleri.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-007",
    "title": "İş ayrıntısında durum ve öncelik güncelleme, dosya ekleri ve devir özeti.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Backlog yönetimi",
    "description": "İş ayrıntısında durum ve öncelik güncelleme, dosya ekleri ve devir özeti.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-008",
    "title": "Silme öncesi onay. Backlog işi silinince bağlı kişisel görevler ve notlar korunur, bağlantıları kaldırılır; işe a…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Backlog yönetimi",
    "description": "Silme öncesi onay. Backlog işi silinince bağlı kişisel görevler ve notlar korunur, bağlantıları kaldırılır; işe ait ek dosyalar silinir.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-009",
    "title": "Özel isimli takımlar oluşturma/düzenleme; üyeleri ayrı alanlardan ekleme, kaldırma ve listeleme.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Takımlar ve atama",
    "description": "Özel isimli takımlar oluşturma/düzenleme; üyeleri ayrı alanlardan ekleme, kaldırma ve listeleme.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-010",
    "title": "Backlog türü Task işini bir takıma ve o takımın bir üyesine atama.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Takımlar ve atama",
    "description": "Backlog türü **Task** işini bir takıma ve o takımın bir üyesine atama.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-011",
    "title": "Atanmış takım ve sorumluyu listede, panoda ve iş ayrıntısında görme; backlog'da bu alanlara göre filtreleme.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Takımlar ve atama",
    "description": "Atanmış takım ve sorumluyu listede, panoda ve iş ayrıntısında görme; backlog'da bu alanlara göre filtreleme.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-012",
    "title": "Takım adı değişince atamalar korunur. Üye çıkarılırsa o üyeye atanmış işler takımda sorumlusuz kalır. Takım silin…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Takımlar ve atama",
    "description": "Takım adı değişince atamalar korunur. Üye çıkarılırsa o üyeye atanmış işler takımda sorumlusuz kalır. Takım silinince atamalar kaldırılır.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-013",
    "title": "Çalışma Alanı menüsünde takım paneli; takım ve üye bazında atanmış, açık, bloke ve tamamlanmış işleri gösterme. P…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Takımlar ve atama",
    "description": "Çalışma Alanı menüsünde takım paneli; takım ve üye bazında atanmış, açık, bloke ve tamamlanmış işleri gösterme. Panelden takım oluşturma/düzenleme ve üye ekleme/çıkarma; üye çıkarılınca atamasını kaldırma.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-014",
    "title": "Story, Bug veya Task türündeki herhangi bir backlog işine birden fazla takım üyesi atama; her kişi için takım ve…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Takımlar ve atama",
    "description": "Story, Bug veya Task türündeki herhangi bir backlog işine birden fazla takım üyesi atama; her kişi için takım ve sorumluluk alanı belirtme, iş ayrıntısında ve backlog görünümlerinde atamaları gösterme.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-015",
    "title": "Projelere birden fazla takım üyesi ve isteğe bağlı katkı alanı atama; proje backlog görünümünde proje ekibini gös…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Takımlar ve atama",
    "description": "Projelere birden fazla takım üyesi ve isteğe bağlı katkı alanı atama; proje backlog görünümünde proje ekibini gösterme.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-016",
    "title": "Ekran, batch, rapor, servis/API, entegrasyon veya özel türde ürün bileşeni oluşturma, düzenleme ve pasife alma.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Ürün bileşen envanteri",
    "description": "Ekran, batch, rapor, servis/API, entegrasyon veya özel türde ürün bileşeni oluşturma, düzenleme ve pasife alma.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-017",
    "title": "Bileşen kodu benzersizdir; proje, ürün alanı, amaç, açıklama, sahip takım ve sorumlu kişi tutulabilir.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Ürün bileşen envanteri",
    "description": "Bileşen kodu benzersizdir; proje, ürün alanı, amaç, açıklama, sahip takım ve sorumlu kişi tutulabilir.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-018",
    "title": "Bileşenleri kod/ad/açıklamayla arama; türe, projeye ve aktif/pasif durumuna göre filtreleme.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Ürün bileşen envanteri",
    "description": "Bileşenleri kod/ad/açıklamayla arama; türe, projeye ve aktif/pasif durumuna göre filtreleme.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-019",
    "title": "Bileşenler arasında elle ilişkiler kurma; pasife alınan bileşen ve mevcut bağlantıları silinmez.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Ürün bileşen envanteri",
    "description": "Bileşenler arasında elle ilişkiler kurma; pasife alınan bileşen ve mevcut bağlantıları silinmez.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-020",
    "title": "Açık kaynak AntV X6 altyapılı ilişki diyagramında bileşenleri tuval üzerinde sürükleyip yerleştirme; konumları ka…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Ürün bileşen envanteri",
    "description": "Açık kaynak AntV X6 altyapılı ilişki diyagramında bileşenleri tuval üzerinde sürükleyip yerleştirme; konumları kaydetme ve mevcut ilişkileri yönlü oklarla görme.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-021",
    "title": "Bileşenlerin bağlantı noktalarını sürükleyerek yönlü ilişki kurma; yeni ilişkiye varsayılan etiket verme, oka çif…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Ürün bileşen envanteri",
    "description": "Bileşenlerin bağlantı noktalarını sürükleyerek yönlü ilişki kurma; yeni ilişkiye varsayılan etiket verme, oka çift tıklayarak etiketi değiştirme ve ilişkileri diyagram listesinden kaldırma.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-022",
    "title": "Kart görünümünde her bileşenin ilişkili bileşen kodlarını ve varsa ilişki etiketlerini gösterme.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Ürün bileşen envanteri",
    "description": "Kart görünümünde her bileşenin ilişkili bileşen kodlarını ve varsa ilişki etiketlerini gösterme.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-023",
    "title": "Bileşen ayrıntısı ilişkili hedefleri ve ok etiketlerini gösterir; diyagram ve bileşen ayrıntısı aynı envanter ili…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Ürün bileşen envanteri",
    "description": "Bileşen ayrıntısı ilişkili hedefleri ve ok etiketlerini gösterir; diyagram ve bileşen ayrıntısı aynı envanter ilişkilerini kullanır.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-024",
    "title": "Backlog işini bir veya birden fazla envanter bileşenine bağlama. Bileşen ayrıntısından iş oluşturulunca proje, ür…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Ürün bileşen envanteri",
    "description": "Backlog işini bir veya birden fazla envanter bileşenine bağlama. Bileşen ayrıntısından iş oluşturulunca proje, ürün alanı ve bileşen bağlantısı yeni işe aktarılır.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-025",
    "title": "Backlog işi oluştururken veya düzenlerken ürün bileşenlerini kod, ad, tür, proje veya ürün alanına göre arama; bi…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Ürün bileşen envanteri",
    "description": "Backlog işi oluştururken veya düzenlerken ürün bileşenlerini kod, ad, tür, proje veya ürün alanına göre arama; birden fazla bileşeni seçip seçimleri etiketler üzerinden yönetme.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-026",
    "title": "Bileşen ayrıntısında ilişkili bileşenler ve bağlı backlog işleri görülebilir; iş devri özetinde de bileşen adları…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Ürün bileşen envanteri",
    "description": "Bileşen ayrıntısında ilişkili bileşenler ve bağlı backlog işleri görülebilir; iş devri özetinde de bileşen adları yer alır.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-027",
    "title": "Backlog işine bağlı veya bağımsız kişisel görev ve not oluşturma, görüntüleme ve düzenleme.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Kişisel görevler ve notlar",
    "description": "Backlog işine bağlı veya bağımsız kişisel görev ve not oluşturma, görüntüleme ve düzenleme.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-028",
    "title": "Görevleri tamamlandı olarak işaretleme.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Kişisel görevler ve notlar",
    "description": "Görevleri tamamlandı olarak işaretleme.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-029",
    "title": "Görev/not için onayla silme; kayda ait ek dosyaların silinmesi.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Kişisel görevler ve notlar",
    "description": "Görev/not için onayla silme; kayda ait ek dosyaların silinmesi.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-030",
    "title": "Backlog işi silindiğinde ilişkili görev ve notlar kişisel alanda bağımsız kayıt olarak kalır.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Kişisel görevler ve notlar",
    "description": "Backlog işi silindiğinde ilişkili görev ve notlar kişisel alanda bağımsız kayıt olarak kalır.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-031",
    "title": "Backlog işi, görev ve nota dosya seçiciyle dosya ekleme; açık kayıt üzerine desteklenen dosyaları sürükleyip bıra…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Dosya ve devir",
    "description": "Backlog işi, görev ve nota dosya seçiciyle dosya ekleme; açık kayıt üzerine desteklenen dosyaları sürükleyip bırakma.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-032",
    "title": "Ekleri açma ve kaldırma; dosyalar bu cihazdaki uygulama veri alanında saklanır.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Dosya ve devir",
    "description": "Ekleri açma ve kaldırma; dosyalar bu cihazdaki uygulama veri alanında saklanır.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-033",
    "title": "Backlog işinin bağlamı, kabul kriterleri, durumu, önceliği, ürün alanı, projesi ve ek adlarını içeren devir özeti…",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Dosya ve devir",
    "description": "Backlog işinin bağlamı, kabul kriterleri, durumu, önceliği, ürün alanı, projesi ve ek adlarını içeren devir özetini panoya kopyalama.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-DONE-034",
    "title": "Rota ürün feature planını uygulamada takip etme",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Ürün planı",
    "description": "Mevcut tamamlanan ve bekleyen Rota feature planı ayrı bir Rota projesine aktarıldı. Feature kayıtları uygulama backlog’unda düzenlenip durumları buradan takip edilebilir.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-PLAN-001",
    "title": "İş ayrıntısı oluşturma, durum/öncelik/atama/tarih değişikliği, not, ek ve release olaylarını zaman sıralı göstersin.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "1. İş geçmişi ve ilerleme günlüğü",
    "description": "İş ayrıntısı oluşturma, durum/öncelik/atama/tarih değişikliği, not, ek ve release olaylarını zaman sıralı göstersin.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-002",
    "title": "Her işe eklemeli “İlerleme notu ekle” akışı olsun; yazar ve zaman otomatik kaydedilsin, nota ek iliştirilebilsin.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "1. İş geçmişi ve ilerleme günlüğü",
    "description": "Her işe eklemeli “İlerleme notu ekle” akışı olsun; yazar ve zaman otomatik kaydedilsin, nota ek iliştirilebilsin.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-003",
    "title": "Durum değişiminde güncelleme notu eklemek isteğe bağlı olsun. Bloke durumuna geçerken blokaj nedeni ve sonraki ad…",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "1. İş geçmişi ve ilerleme günlüğü",
    "description": "Durum değişiminde güncelleme notu eklemek isteğe bağlı olsun. Bloke durumuna geçerken blokaj nedeni ve sonraki adım istenmeli.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-004",
    "title": "Tamamlanma ile release'e çıkış ayrı olaylar olarak kaydedilsin.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "1. İş geçmişi ve ilerleme günlüğü",
    "description": "Tamamlanma ile release'e çıkış ayrı olaylar olarak kaydedilsin.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-005",
    "title": "Özel PO notu ve takımın ortak ilerleme notu arayüzde ayrıştırılsın.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "1. İş geçmişi ve ilerleme günlüğü",
    "description": "Özel PO notu ve takımın ortak ilerleme notu arayüzde ayrıştırılsın.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-006",
    "title": "Backlog işlerinde takım, sorumlu, başlama tarihi, hedef tarih ve tahmini efor izlenebilsin.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "2. Atama, blokaj ve bağımlılık takibi",
    "description": "Backlog işlerinde takım, sorumlu, başlama tarihi, hedef tarih ve tahmini efor izlenebilsin.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-007",
    "title": "Blokaj kaydında neden, beklenen karar/iş, takip sahibi, açılış tarihi ve çözülme zamanı tutulsun.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "2. Atama, blokaj ve bağımlılık takibi",
    "description": "Blokaj kaydında neden, beklenen karar/iş, takip sahibi, açılış tarihi ve çözülme zamanı tutulsun.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-008",
    "title": "Bir iş başka işi bekleyebilsin; bağımlılık uyarısı ve döngü kontrolü bulunsun.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "2. Atama, blokaj ve bağımlılık takibi",
    "description": "Bir iş başka işi bekleyebilsin; bağımlılık uyarısı ve döngü kontrolü bulunsun.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-009",
    "title": "İş kartı ve ayrıntısı son güncelleme zamanını, bekleme süresini ve gecikmeyi göstersin.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "2. Atama, blokaj ve bağımlılık takibi",
    "description": "İş kartı ve ayrıntısı son güncelleme zamanını, bekleme süresini ve gecikmeyi göstersin.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-010",
    "title": "Takım görünümüne başlama/hedef tarih, dönem ve efor filtreleri eklensin; kapasite görünürlüğü değerlendirilsin.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "2. Atama, blokaj ve bağımlılık takibi",
    "description": "Takım görünümüne başlama/hedef tarih, dönem ve efor filtreleri eklensin; kapasite görünürlüğü değerlendirilsin.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-011",
    "title": "Initiative/epic ürün hedefi, ölçülebilir başarı ölçütü ve sorumlu taşısın; işler bunlara bağlansın.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "3. Ürün planlama ve roadmap",
    "description": "Initiative/epic ürün hedefi, ölçülebilir başarı ölçütü ve sorumlu taşısın; işler bunlara bağlansın.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-012",
    "title": "Ürün aşaması ile teslimat durumu ayrı izlenebilsin. Örnek ürün aşamaları: fikirler, keşif, sırada, planlandı, tes…",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "3. Ürün planlama ve roadmap",
    "description": "Ürün aşaması ile teslimat durumu ayrı izlenebilsin. Örnek ürün aşamaları: fikirler, keşif, sırada, planlandı, teslimatta, tamamlandı.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-013",
    "title": "Backlog işi için hedef başlangıç, hedef bitiş ve planlanan dönem; aktivite geçmişinden gerçek başlangıç ve tamaml…",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "3. Ürün planlama ve roadmap",
    "description": "Backlog işi için hedef başlangıç, hedef bitiş ve planlanan dönem; aktivite geçmişinden gerçek başlangıç ve tamamlanma kaydedilsin.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-014",
    "title": "Roadmap görünümü hedefleri ve büyük işleri zaman çizgisinde göstersin; tarih değişikliği kayda girsin.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "3. Ürün planlama ve roadmap",
    "description": "Roadmap görünümü hedefleri ve büyük işleri zaman çizgisinde göstersin; tarih değişikliği kayda girsin.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-015",
    "title": "İlk aşamada karmaşık kapasite/puan hesabı yerine hafif dönem planlama ve kapsam görünürlüğü sağlansın.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "3. Ürün planlama ve roadmap",
    "description": "İlk aşamada karmaşık kapasite/puan hesabı yerine hafif dönem planlama ve kapsam görünürlüğü sağlansın.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-016",
    "title": "Release; ad/sürüm, planlanan yayın tarihi, durum, kapsam ve açıklama taşısın.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "4. Release ve yayın sonrası takip",
    "description": "Release; ad/sürüm, planlanan yayın tarihi, durum, kapsam ve açıklama taşısın.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-017",
    "title": "İşler release'lere bağlansın; kapsamda tamamlanmamış veya bloke işler uyarı versin.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "4. Release ve yayın sonrası takip",
    "description": "İşler release'lere bağlansın; kapsamda tamamlanmamış veya bloke işler uyarı versin.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-018",
    "title": "Önerilen release durumları: Planlanıyor → Hazırlanıyor → Yayına hazır → Yayınlandı / Ertelendi / İptal edildi.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "4. Release ve yayın sonrası takip",
    "description": "Önerilen release durumları: Planlanıyor → Hazırlanıyor → Yayına hazır → Yayınlandı / Ertelendi / İptal edildi.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-019",
    "title": "Planlanan tarih ve gerçek yayın tarihi ayrı tutulsun; tarih değişikliği nedeni ve yayın notu kaydedilsin.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "4. Release ve yayın sonrası takip",
    "description": "Planlanan tarih ve gerçek yayın tarihi ayrı tutulsun; tarih değişikliği nedeni ve yayın notu kaydedilsin.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-020",
    "title": "“Tamamlandı” geliştirme işinin bittiğini, “Yayınlandı” release'in çıktığını anlatsın; iki kavram tek statüye sıkı…",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "4. Release ve yayın sonrası takip",
    "description": "“Tamamlandı” geliştirme işinin bittiğini, “Yayınlandı” release'in çıktığını anlatsın; iki kavram tek statüye sıkıştırılmasın.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-021",
    "title": "Sonraki adımda yayın sonrası gözlem/geri bildirim ve hedef sonucun gerçekleşip gerçekleşmediği eklenebilir.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "4. Release ve yayın sonrası takip",
    "description": "Sonraki adımda yayın sonrası gözlem/geri bildirim ve hedef sonucun gerçekleşip gerçekleşmediği eklenebilir.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-022",
    "title": "PO görünümü: ürün hedefleri, yaklaşan release'ler, planlanan/geciken işler, uzun süredir güncellenmeyen kayıtlar…",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "5. PO ve takım panoları",
    "description": "PO görünümü: ürün hedefleri, yaklaşan release'ler, planlanan/geciken işler, uzun süredir güncellenmeyen kayıtlar ve açık blokajlar.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-023",
    "title": "Takım görünümü: dönem işleri, atamalar, devam eden işler, blokajlar ve iş yükü.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "5. PO ve takım panoları",
    "description": "Takım görünümü: dönem işleri, atamalar, devam eden işler, blokajlar ve iş yükü.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-024",
    "title": "Release görünümü: kapsam, tamamlanma oranı, açık risk/blokajlar ve planlanan/gerçekleşen tarih.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "5. PO ve takım panoları",
    "description": "Release görünümü: kapsam, tamamlanma oranı, açık risk/blokajlar ve planlanan/gerçekleşen tarih.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-025",
    "title": "Raporlar aktivite kayıtlarından tamamlanma süresi, bloke kalma süresi ve release tarih farkını türetsin; ölçüm ta…",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "5. PO ve takım panoları",
    "description": "Raporlar aktivite kayıtlarından tamamlanma süresi, bloke kalma süresi ve release tarih farkını türetsin; ölçüm tanımı kullanıcıya gösterilsin.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-026",
    "title": "Metrikler tek başına çalışan performans puanına dönüştürülmesin; her sayı neden ve iş detayına bağlansın.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "5. PO ve takım panoları",
    "description": "Metrikler tek başına çalışan performans puanına dönüştürülmesin; her sayı neden ve iş detayına bağlansın.",
    "labels": [
      "Ürün planı",
      "Öneri"
    ]
  },
  {
    "id": "ROTA-PLAN-027",
    "title": "Takım Paneli'nde takım ekleme/kaydetme akışı beklenen sonucu vermiyor; ilk düzeltme denemesi sorunu çözmedi. Yeni…",
    "type": "Bug",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Takım Paneli",
    "description": "Takım Paneli'nde takım ekleme/kaydetme akışı beklenen sonucu vermiyor; ilk düzeltme denemesi sorunu çözmedi. Yeniden incelenip doğrulanana kadar tamamlanmış sayılmasın.",
    "labels": [
      "Ürün planı",
      "Hata"
    ]
  },
  {
    "id": "ROTA-PLAN-028",
    "title": "Çalışma alanı kayıtlarını ve ekleri birlikte dışa aktar/geri yükle.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "R2 — Veri dışa aktarma ve yedekleme",
    "description": "Çalışma alanı kayıtlarını ve ekleri birlikte dışa aktar/geri yükle.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-029",
    "title": "Bozuk veya uyumsuz yedek için anlaşılır hata ver; geri yükleme öncesi mevcut veriyi koru.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "R2 — Veri dışa aktarma ve yedekleme",
    "description": "Bozuk veya uyumsuz yedek için anlaşılır hata ver; geri yükleme öncesi mevcut veriyi koru.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-030",
    "title": "Yedek biçimi ve saklama konumu kullanıcı tarafından seçilebilir olsun.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "R2 — Veri dışa aktarma ve yedekleme",
    "description": "Yedek biçimi ve saklama konumu kullanıcı tarafından seçilebilir olsun.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-031",
    "title": "Kurumdaki Outlook sürümünde e-posta sürükle-bırak verisinin Electron uygulamasına ulaşıp ulaşmadığı doğrulanmalı.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Outlook e-postasını iş/göreve dönüştürme",
    "description": "Kurumdaki Outlook sürümünde e-posta sürükle-bırak verisinin Electron uygulamasına ulaşıp ulaşmadığı doğrulanmalı.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-032",
    "title": "`.msg`/`.eml` bırakma, mail metnini başlık/açıklamaya taşıma ve özgün maili ek olarak saklama seçenekleri değerle…",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Outlook e-postasını iş/göreve dönüştürme",
    "description": "`.msg`/`.eml` bırakma, mail metnini başlık/açıklamaya taşıma ve özgün maili ek olarak saklama seçenekleri değerlendirilmeli.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-033",
    "title": "Otomatik alan çıkarımı kullanıcı onaylı, düzenlenebilir bir önizleme sunmalı.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Outlook e-postasını iş/göreve dönüştürme",
    "description": "Otomatik alan çıkarımı kullanıcı onaylı, düzenlenebilir bir önizleme sunmalı.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-034",
    "title": "Kurum Jira Server sürümü, ağ erişimi ve kimlik doğrulama yöntemi keşfedilmeli.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Jira Server entegrasyonu",
    "description": "Kurum Jira Server sürümü, ağ erişimi ve kimlik doğrulama yöntemi keşfedilmeli.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-035",
    "title": "Tek yönlü içe alma veya çift yönlü senkron, alan eşleme, çakışma, kesinti ve denetim izi tasarlanmalı.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Jira Server entegrasyonu",
    "description": "Tek yönlü içe alma veya çift yönlü senkron, alan eşleme, çakışma, kesinti ve denetim izi tasarlanmalı.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-036",
    "title": "Kullanıcı akışı, sistem bağlamı veya entegrasyon diyagramı ihtiyacı netleştirilmeli.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Diagram ve devir araçları",
    "description": "Kullanıcı akışı, sistem bağlamı veya entegrasyon diyagramı ihtiyacı netleştirilmeli.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-037",
    "title": "Genel amaçlı diyagramları backlog işi veya nota bağlama değerlendirilmeli. Envanter bileşenleri arasındaki ilişki…",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Diagram ve devir araçları",
    "description": "Genel amaçlı diyagramları backlog işi veya nota bağlama değerlendirilmeli. Envanter bileşenleri arasındaki ilişki diyagramı tamamlanan feature'larda takip edilir.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-038",
    "title": "Banka güvenlik/gizlilik incelemesi, yerel veri koruma ve güvenli silme yaklaşımı belirlenmeli.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Üretim öncesi güvenlik ve sağlamlaştırma",
    "description": "Banka güvenlik/gizlilik incelemesi, yerel veri koruma ve güvenli silme yaklaşımı belirlenmeli.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-039",
    "title": "Veri bütünlüğü, yedekleme/geri yükleme, hata kurtarma, güncelleme ve hassas veri içermeyen loglama ele alınmalı.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Üretim öncesi güvenlik ve sağlamlaştırma",
    "description": "Veri bütünlüğü, yedekleme/geri yükleme, hata kurtarma, güncelleme ve hassas veri içermeyen loglama ele alınmalı.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-040",
    "title": "Gerçek müşteri, hesap, kart veya kimlik verisi prototipe eklenmemeli.",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Üretim öncesi güvenlik ve sağlamlaştırma",
    "description": "Gerçek müşteri, hesap, kart veya kimlik verisi prototipe eklenmemeli.",
    "labels": [
      "Ürün planı",
      "İleri sürüm adayı"
    ]
  },
  {
    "id": "ROTA-PLAN-041",
    "title": "Kurulum gerektirmeden hedef kullanıcıya iletilebilen veya kurulum sihirbazı kullanan Windows paketi üret.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Düşük",
    "area": "R1 — Windows dağıtım paketi (en son öncelik)",
    "description": "Electron tabanlı Rota, Windows x64 için imzasız test NSIS kurulum paketi olarak üretilebilir. Kurulum ve Node.js runtime ayrı gerektirmez.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-PLAN-042",
    "title": "Uygulamayı hedef bilgisayarda Node.js kurmadan çalıştır.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Düşük",
    "area": "R1 — Windows dağıtım paketi (en son öncelik)",
    "description": "Paketlenmiş Rota uygulaması Windows hedef bilgisayarında ayrı Node.js kurulumu gerektirmeden çalışır.",
    "labels": [
      "Ürün planı",
      "Tamamlanan"
    ]
  },
  {
    "id": "ROTA-PLAN-043",
    "title": "Kurulum/kaldırma, uygulama verisinin korunması, sürüm yükseltme, kod imzalama ve kurum güvenlik incelemesini planla.",
    "type": "Story",
    "status": "Devam ediyor",
    "priority": "Düşük",
    "area": "R1 — Windows dağıtım paketi (en son öncelik)",
    "description": "Per-user NSIS kurulum/kaldırma ve sürüm yükseltmede yerel uygulama verisini koruma yapılandırıldı. Kod imzalama sertifikası ve kurum güvenlik incelemesi bekliyor.",
    "labels": [
      "Ürün planı",
      "En son öncelik",
      "Devam ediyor"
    ]
  },
  {
    "id": "ROTA-DONE-035",
    "title": "Backlog kayıtlarını etiketlere göre filtreleme",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Backlog yönetimi",
    "description": "Backlog listesi ve panosunda kayıtları etiketlerine göre daraltma. Rota ürün planındaki öneri ve ileri sürüm adaylarını diğer feature kayıtlarından ayırmayı kolaylaştırır.",
    "labels": ["Ürün planı", "Tamamlanan"]
  },
  {
    "id": "ROTA-DONE-036",
    "title": "Projeyi arşivleme ve kalıcı silme",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Çalışma alanı ve projeler",
    "description": "Projeyi arşivleyip verilerini koruma ve arşivden geri alma; onayla kalıcı silme sırasında proje backlog işlerini, ürün bileşenlerini ve iş eklerini kaldırma, bağlı kişisel görev/notları koruyup bağımsız bırakma.",
    "labels": ["Ürün planı", "Tamamlanan"]
  },
  {
    "id": "ROTA-DONE-037",
    "title": "Rota feature planını uygulama verisinde sürümlü takip etme",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Yüksek",
    "area": "Ürün planı ve backlog yönetimi",
    "description": "Rota'nın feature planı uygulama içinde ayrı proje backlog'u olarak izlenir. Yeni kayıtlar eksik kayıtları ekleyen sürüm kontrollü veri aktarımıyla taşınır; mevcut kayıtların durum ve etiket değişiklikleri tek seferlik güncellemelerle eşitlenir.",
    "labels": ["Ürün planı", "Tamamlanan"]
  },
  {
    "id": "ROTA-PLAN-044",
    "title": "Backlog tablosunda kullanıcıya kolon ekleme, gizleme, yeniden sıralama ve görünüm tercihini kaydetme olanağı ver.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Yüksek",
    "area": "Backlog tablo deneyimi",
    "description": "Kolonlar panelinden backlog tablosunda gösterilecek alanlar seçilir; kolonlar eklenip gizlenebilir ve yukarı/aşağı taşınarak yeniden sıralanabilir. Başlık kolonu sabittir. Tercih kullanıcı cihazında saklanır. Seçilebilir alanlar tür, ürün alanı, öncelik, durum, güncelleme zamanı, takım/sorumlu, proje, açıklama, etiketler, plan tarihleri/dönemi, efor, ürün aşaması, release, sprint, bileşenler, ek/kabul kriteri sayıları, bağımlılıklar, blokaj ve son aktivite bilgisini kapsar.",
    "labels": ["Ürün planı", "Tamamlanan"]
  },
  {
    "id": "ROTA-PLAN-045",
    "title": "Backlog için seçenekli tablo görünümleri sun ve kullanıcının görünüm tercihini sakla.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Yüksek",
    "area": "Backlog tablo deneyimi",
    "description": "Kullanıcı liste ve pano görünümünü değiştirebilir, adlandırılmış görünümler oluşturup tekrar açabilir. Görünümün proje kapsamı, arama, durum/tür/etiket/takım/üye filtreleri, sıralama ve kolon düzeni kaydedilir. Görünüm güncellenebilir, yeniden adlandırılabilir veya silinebilir. Tercihler cihazda saklanır.",
    "labels": ["Ürün planı", "Tamamlanan"]
  },
  {
    "id": "ROTA-PLAN-046",
    "title": "Backlog tablosunda başlık, statü ve atama alanları satır üzerinde hızlıca düzenlenebilsin.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Yüksek",
    "area": "Backlog tablo deneyimi",
    "description": "Kullanıcı backlog listesindeki başlığı, statüyü ve takım/üye atamalarını satır içi kontrollerle düzenleyebilir. Başlık/normal durum güncellemeleri iş geçmişine yazılır. Bloke statüsünde mevcut neden, beklenen karar, sonraki adım ve takip sahibi zorunlu formu kullanılır ve kullanıcı backlogda kalır. Çoklu takım/üye atamaları eklenip kaldırılabilir, her değişiklik öncesi ve sonrası bilgiyle aktiviteye girer.",
    "labels": ["Ürün planı", "Tamamlanan"]
  },
  {
    "id": "ROTA-PLAN-047",
    "title": "Kullanıcı backlog işlerini tüm ayrıntılarıyla Excel olarak dışa aktarabilsin.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Yüksek",
    "area": "Backlog tablo deneyimi",
    "description": "Backlog Excel çalışma kitabı olarak dışa aktarılır. İş alanları ana sayfada; takım/üye atamaları, kabul kriterleri, bağımlılıklar, sprint bilgisi, aktivite geçmişi ve ek dosyaların ad/boyut referansları ayrıntı sayfalarında yer alır. Sprintler ayrıca tek takım, başlangıç/bitiş tarihi ve iş kapsamıyla ayrı sayfada listelenir. Dışa aktarım seçili proje kapsamındaki tüm işleri içerir; görünüm filtreleri export kapsamını daraltmaz. Ek dosyaların ikili içeriği Excel'e gömülmez.",
    "labels": ["Ürün planı", "Tamamlanan"]
  },
  {
    "id": "ROTA-PLAN-048",
    "title": "Kullanıcı backlog işlerini toplu seçerek takım süreli sprint oluşturabilsin.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Yüksek",
    "area": "Backlog planlama",
    "description": "Liste görünümünde görünür backlog işleri tek tek veya topluca seçilerek sprint oluşturulur. Sprint adı, tek takım, başlangıç ve bitiş tarihi zorunludur; bitiş başlangıçtan önce olamaz. Seçilen işler sprint'e bağlanır, sprint sütununda görünür ve her işte aktivite geçmişine kaydedilir. Yeni sprintler Excel'e sprint adı, takım, tarih aralığı ve kapsam özetiyle aktarılır.",
    "labels": ["Ürün planı", "Tamamlanan"]
  },
  {
    "id": "ROTA-PLAN-049",
    "title": "Backlog iş başlığı üzerinde bekleyince ayrıntılı, etkileşimli önizleme göster.",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Yüksek",
    "area": "Backlog tablo deneyimi",
    "description": "Backlog listesindeki iş başlığı üzerinde kısa süre bekleyince tooltip yerine ayrı bir önizleme kartı açılır. Önizleme varsayılan olarak açıktır; backlog araç çubuğundaki toggle ile kapatılabilir ve kullanıcı tercihi saklanır. Kart başlığı bütünüyle satır kaydırarak gösterilir. Kart açıklama, durum, öncelik, proje/alan, takım/üye atamaları, plan tarihleri, tahmini efor, bağlı ürün bileşenleri, etiketler, son aktivite, kabul kriteri ve ek sayılarını gösterir. Kart üzerinde kalınabilir, kapatılabilir veya iş ayrıntısı açılabilir; klavye odağıyla da kullanılabilir.",
    "labels": ["Ürün planı", "Tamamlanan"]
  }
,
  {
    "id": "ROTA-PLAN-050",
    "title": "Karar günlüğü",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "PO kararları ve keşif",
    "description": "Ürün kararlarını tarih, gerekçe, alternatifler ve etkilediği işler ile kaydet.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-051",
    "title": "Toplantı çıktısı şablonları",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "PO kararları ve keşif",
    "description": "Refinement, operasyon görüşmesi ve risk değerlendirmesi için doldurulabilir not şablonları sun.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-052",
    "title": "Açık soru havuzu",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "PO kararları ve keşif",
    "description": "Henüz yanıtlanmamış iş sorularını sahibine ve beklenen yanıt tarihine bağla.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-053",
    "title": "Kabul kriteri kontrol listeleri",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "PO kararları ve keşif",
    "description": "Story, bug ve bankacılık değişikliği tipine göre tekrar kullanılabilir kriter taslakları oluştur.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-054",
    "title": "Kapsam dışı kayıtları",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "PO kararları ve keşif",
    "description": "Bir işte özellikle yapılmayacakları ve bu kararın gerekçesini tut.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-055",
    "title": "Paydaş haritası",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "PO kararları ve keşif",
    "description": "İş alanı veya bileşen başına iş birimi, operasyon, risk ve teknik temas kişilerini PO notu olarak kaydet.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-056",
    "title": "Refinement hazırlık puanı",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "PO kararları ve keşif",
    "description": "Açıklama, kriter, bileşen, bağımlılık ve açık soru alanlarından şeffaf bir hazırlık kontrolü üret.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-057",
    "title": "Alternatif çözüm karşılaştırması",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "PO kararları ve keşif",
    "description": "Bir iş için seçenekleri, etkileri ve seçilen yaklaşımın gerekçesini yan yana sakla.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-058",
    "title": "Talep kaynağı ve kanıt",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "PO kararları ve keşif",
    "description": "İş talebini şikayet, operasyon bulgusu, hedef veya mevzuat girdisine; ek veya nota bağla.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-059",
    "title": "İş yaşlandırma görünümü",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "PO kararları ve keşif",
    "description": "Backlog'da ne kadar süredir beklediğini ve son karar tarihini göster.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-060",
    "title": "Kanal etiketi",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "Bankacılık ürün kapsamı ve etki analizi",
    "description": "Mobil, internet şubesi, çağrı merkezi, şube ve ATM etkisini bileşen/iş üzerinde seç.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-061",
    "title": "Müşteri segmenti kapsamı",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "Bankacılık ürün kapsamı ve etki analizi",
    "description": "Bireysel, ticari, KOBİ veya kurumsal kapsamını kaydet.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-062",
    "title": "İşlem yaşam döngüsü haritası",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "Bankacılık ürün kapsamı ve etki analizi",
    "description": "İşlemin talep, doğrulama, onay, muhasebeleştirme ve iade adımlarını kayıtla ilişkilendir.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-063",
    "title": "Hata senaryosu kataloğu",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "Bankacılık ürün kapsamı ve etki analizi",
    "description": "Ürün alanı başına hata kodu, kullanıcı mesajı ve beklenen operasyon aksiyonunu tanımla.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-064",
    "title": "Durum geçiş tablosu",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "Bankacılık ürün kapsamı ve etki analizi",
    "description": "İşlem durumlarının izin verilen geçişlerini ve tetikleyen koşulları basit bir tabloda tut.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-065",
    "title": "Veri alanı sözlüğü",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "Bankacılık ürün kapsamı ve etki analizi",
    "description": "Bileşenlerde kullanılan kritik alanları, anlamını, formatını ve maskeleme notunu belgele.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-066",
    "title": "Arayüz sözleşme notları",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "Bankacılık ürün kapsamı ve etki analizi",
    "description": "Servis veya entegrasyon bileşenine istek/yanıt alanı ve uyumluluk notları ekle.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-067",
    "title": "Dosya formatı envanteri",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "Bankacılık ürün kapsamı ve etki analizi",
    "description": "Batch dosyalarının alan sırası, zorunlulukları ve sürüm notlarını bileşene bağla.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-068",
    "title": "Kesim saati takvimi",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "Bankacılık ürün kapsamı ve etki analizi",
    "description": "EFT/FAST gibi iş akışlarında iş günü, tatil ve gün içi kesim saati varsayımlarını yerel referans olarak tut.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-069",
    "title": "Mutabakat kontrol noktaları",
    "type": "Story",
    "status": "Yeni",
    "priority": "Yüksek",
    "area": "Bankacılık ürün kapsamı ve etki analizi",
    "description": "Rapor/batch bileşenlerinde kaynak, kontrol toplamı, tolerans ve istisna sahibini kaydet.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-070",
    "title": "Sprint hedefi",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Planlama, sprint ve teslimat",
    "description": "Sprint adına ek olarak tek cümlelik sonuç hedefi ve başarı işaretini kaydet.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-071",
    "title": "Sprint kapsam değişiklik geçmişi",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Planlama, sprint ve teslimat",
    "description": "Sprint'e iş ekleme/çıkarma olaylarını gerekçesiyle göster.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-072",
    "title": "Sprint kapanış özeti",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Planlama, sprint ve teslimat",
    "description": "Tamamlananlar, taşınan işler, bloke nedenleri ve öğrenimleri tek ekranda toparla.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-073",
    "title": "Sürükle-bırak öncelik sıralaması",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Planlama, sprint ve teslimat",
    "description": "Liste görünümünde işleri kontrollü manuel sıraya al ve tercihi kaydet.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-074",
    "title": "Toplu alan güncelleme",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Planlama, sprint ve teslimat",
    "description": "Seçili işlerin öncelik, etiket, dönem veya ürün aşamasını tek işlemde güncelle.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-075",
    "title": "Bağımlılık zaman çizgisi",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Planlama, sprint ve teslimat",
    "description": "İşler arası bekleme ilişkilerini tarihleriyle kompakt bir zaman çizelgesinde göster.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-076",
    "title": "Planlama senaryoları",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Planlama, sprint ve teslimat",
    "description": "Gerçek kayıtları değiştirmeden farklı sprint kapsamlarını taslak olarak karşılaştır.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-077",
    "title": "Efor değişim geçmişi",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Planlama, sprint ve teslimat",
    "description": "Tahminin ne zaman ve hangi notla değiştiğini iş geçmişinde izle.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-078",
    "title": "Hazır iş havuzu",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Planlama, sprint ve teslimat",
    "description": "Belirli takım için kriterleri tamamlanmış ve bloke olmayan işleri ayrı görünümde filtrele.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-079",
    "title": "Sprint kapasite notu",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Planlama, sprint ve teslimat",
    "description": "Takımın izin, nöbet veya destek yükü gibi PO tarafından girilen kapasite notlarını sprintte sakla.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-080",
    "title": "Release go/no-go listesi",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Release, risk ve operasyon hazırlığı",
    "description": "Yayın öncesi onay, izleme, geri alma ve iletişim maddelerini kontrol et.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-081",
    "title": "Geri alma planı",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Release, risk ve operasyon hazırlığı",
    "description": "Release başına geri dönüş adımlarını, karar sahibini ve tetikleyicileri kaydet.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-082",
    "title": "Yayın iletişim taslağı",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Release, risk ve operasyon hazırlığı",
    "description": "İç paydaş duyurusu ve operasyon bilgilendirmesi için release notlarından taslak oluştur.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-083",
    "title": "Operasyon hazırlık kontrolü",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Release, risk ve operasyon hazırlığı",
    "description": "Destek ekibi, çağrı merkezi ve mutabakat ekipleri için etkilenecek süreçleri işaretle.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-084",
    "title": "Risk kaydı",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Release, risk ve operasyon hazırlığı",
    "description": "Etki, olasılık, azaltım adımı, sahibi ve gözden geçirme tarihini ürün/işe bağla.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-085",
    "title": "Varsayım ve doğrulama",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Release, risk ve operasyon hazırlığı",
    "description": "Ürün varsayımlarını kanıt, doğrulama yöntemi ve son tarihle takip et.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-086",
    "title": "Test kanıtı bağlantıları",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Release, risk ve operasyon hazırlığı",
    "description": "Kabul kriterlerini manuel test notu, senaryo adı veya yerel dosya ekiyle ilişkilendir.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-087",
    "title": "UAT geri bildirim defteri",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Release, risk ve operasyon hazırlığı",
    "description": "Kullanıcı testi bulgularını iş, önem, karar ve tekrar test durumu ile kaydet.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-088",
    "title": "Gözlem penceresi",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Release, risk ve operasyon hazırlığı",
    "description": "Yayın sonrası ilk günler için kontrol edilecek göstergeleri ve sorumluyu release'te listele.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-089",
    "title": "Release sonrası değerlendirme",
    "type": "Story",
    "status": "Yeni",
    "priority": "Orta",
    "area": "Release, risk ve operasyon hazırlığı",
    "description": "Beklenen ve gerçekleşen sonucu, sürprizleri ve takip işlerini yapılandırılmış kayda al.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-090",
    "title": "Günlük PO planı",
    "type": "Story",
    "status": "Yeni",
    "priority": "Düşük",
    "area": "Kişisel akış, görünürlük ve çalışma kolaylığı",
    "description": "Bugün odaklanılacak işleri, görüşmeleri ve beklenen kararları tek kişisel listede topla.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-091",
    "title": "Haftalık ürün özeti",
    "type": "Story",
    "status": "Yeni",
    "priority": "Düşük",
    "area": "Kişisel akış, görünürlük ve çalışma kolaylığı",
    "description": "Son hafta tamamlananlar, yeni blokajlar ve yaklaşan tarihlerden düzenlenebilir özet çıkar.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-092",
    "title": "Hatırlatma ve takip tarihi",
    "type": "Story",
    "status": "Yeni",
    "priority": "Düşük",
    "area": "Kişisel akış, görünürlük ve çalışma kolaylığı",
    "description": "Kişisel görev ve blokajlara yerel bildirim veya açılışta hatırlatma zamanı ekle.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-093",
    "title": "Kayıtlar arası çapraz bağlantı",
    "type": "Story",
    "status": "Yeni",
    "priority": "Düşük",
    "area": "Kişisel akış, görünürlük ve çalışma kolaylığı",
    "description": "İş, bileşen, release, karar notu ve risk arasında hızlı ilişki oluştur.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-094",
    "title": "Şablonla iş oluşturma",
    "type": "Story",
    "status": "Yeni",
    "priority": "Düşük",
    "area": "Kişisel akış, görünürlük ve çalışma kolaylığı",
    "description": "Sık tekrarlanan EFT, limit değişikliği veya rapor talebi için alanları hazır iş şablonları kullan.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-095",
    "title": "Favoriler ve sabitlenmiş kayıtlar",
    "type": "Story",
    "status": "Yeni",
    "priority": "Düşük",
    "area": "Kişisel akış, görünürlük ve çalışma kolaylığı",
    "description": "Sık açılan proje, iş, bileşen ve release'leri kısayol olarak sabitle.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-096",
    "title": "Kişisel çalışma alanı yedek profilleri",
    "type": "Story",
    "status": "Yeni",
    "priority": "Düşük",
    "area": "Kişisel akış, görünürlük ve çalışma kolaylığı",
    "description": "Ayrı ürün portföyleri için yedeklenebilir görünüm ve filtre tercihleri oluştur.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-097",
    "title": "Arşivde arama",
    "type": "Story",
    "status": "Yeni",
    "priority": "Düşük",
    "area": "Kişisel akış, görünürlük ve çalışma kolaylığı",
    "description": "Arşivlenmiş işleri, projeleri ve release'leri ana backlog'u kirletmeden sorgula.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-098",
    "title": "Yinelenen işi bulma yardımcısı",
    "type": "Story",
    "status": "Yeni",
    "priority": "Düşük",
    "area": "Kişisel akış, görünürlük ve çalışma kolaylığı",
    "description": "Başlık, açıklama, alan ve bileşen benzerliğine göre olası tekrarları kaydetmeden önce göster.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-099",
    "title": "PO devir paketi",
    "type": "Story",
    "status": "Yeni",
    "priority": "Düşük",
    "area": "Kişisel akış, görünürlük ve çalışma kolaylığı",
    "description": "Seçili ürün için hedefler, açık kararlar, blokajlar, sprint ve release durumlarından yazdırılabilir devir özeti hazırla.",
    "labels": ["Ürün planı", "Öneri", "İleri faz öncesi"]
  },
  {
    "id": "ROTA-PLAN-100",
    "title": "Backlog tablosunda hızlı ve toplu silme",
    "type": "Story",
    "status": "Tamamlandı",
    "priority": "Orta",
    "area": "Backlog yönetimi",
    "description": "Liste görünümünde her satırdan Hızlı Sil ile tek işi, seçim kutularıyla birden fazla işi tek onayla kalıcı olarak sil. İş ekleri ve diyagramları temizlenir, bağımlılık bağlantıları güncellenir; ilişkili kişisel görevler ve notlar korunarak bağlantıları kaldırılır.",
    "labels": ["Ürün planı", "Tamamlanan"]
  }
];

// New catalog entries are imported additively for existing workspaces. Keep them
// separate from the original catalog so a plan version bump never restores records
// that a PO intentionally deleted from their local Rota backlog.
import { ROTA_PRODUCT_FEATURE_ADDITIONS as ROTA_PRODUCT_UX_ADDITIONS } from "./rota-product-plan-ux";
import { ROTA_PRODUCT_DISCOVERY_ADDITIONS } from "./rota-product-plan-discovery";

export const ROTA_PRODUCT_FEATURE_ADDITIONS: RotaProductFeatureImport[] = [
  ...ROTA_PRODUCT_UX_ADDITIONS,
  ...ROTA_PRODUCT_DISCOVERY_ADDITIONS,
  {
    id: "ROTA-PLAN-213",
    title: "Backlog satırında ayrı ikonlu eylem kolonları",
    type: "Story",
    status: "Tamamlandı",
    priority: "Orta",
    area: "Backlog yönetimi",
    description: "Liste görünümünde düzenle, çoğalt ve sil eylemleri ayrı kolonlarda her zaman görünür ikon düğmeleriyle sunulur. Her ikon kısa açıklamalı tooltip ve erişilebilir eylem adı taşır.",
    labels: ["Ürün planı", "Tamamlanan"]
  },
  {
    id: "ROTA-PLAN-251",
    title: "Kayıtlar için bağlama duyarlı sağ tık menüsü",
    type: "Story",
    status: "Tamamlandı",
    priority: "Orta",
    area: "Genel kullanım ve gezinme",
    description: "Backlog işi, kişisel görev ve not, ürün bileşeni, proje, roadmap hedefi, release ve takım üyesinde bağlama uygun açma, düzenleme, çoğaltma, durum değiştirme, dönüştürme, arşivleme ve silme eylemlerini sağ tık menüsünden sun. Form alanlarında ve diyagram tuvalinde yerleşik menüyü koru; klavye ile menüyü kapatmayı ve gezmeyi destekle.",
    labels: ["Ürün planı", "Tamamlanan"]
  },
  {
    id: "ROTA-PLAN-252",
    title: "Rota backlog işinden seçili Jira Agile board için issue oluşturma",
    type: "Story",
    status: "Tamamlandı",
    priority: "Orta",
    area: "Jira Server entegrasyonu",
    description: "PO, Jira panelinde erişebildiği Agile board’u ve board kapsamındaki Jira projesini seçerek Rota backlog işinden Jira issue oluşturabilir. Issue türleri proje oluşturma metadata’sından listelenir; başlık ve açıklama Jira’ya gönderilmeden önce düzenlenebilir. Oluşan Jira issue key Rota işine bağlanır ve aktiviteye yazılır; tekrar oluşturma engellenir.",
    labels: ["Ürün planı", "Tamamlanan"]
  },
  {
    id: "ROTA-PLAN-253",
    title: "Sayfa çerçevesi sabit kalmalı, uzun listeler ve dashboard içerikleri kendi alanında kaymalı",
    type: "Story",
    status: "Tamamlandı",
    priority: "Orta",
    area: "Görünüm ve kullanım kolaylığı",
    description: "Masaüstü penceresinde ana içerik dikey kaymamalı. Üst başlık ve sayfa adı sabit kalırken uzun liste, dashboard ve sayfa gövdesi kendine ait sınırlı kaydırma alanında hareket etmeli. Backlog tablosu ve board mevcut kendi iç kaydırmasını kullanmalı; soru, envanter ve Jira tabloları kendi listelerinde kayabilmeli. Uzun sol navigasyon da bağımsız kaydırılmalı.",
    labels: ["Ürün planı", "Tamamlanan"]
  },
  {
    id: "ROTA-PLAN-254",
    title: "Backlog görünüm tercihlerini açılır menüde toplama",
    type: "Story",
    status: "Tamamlandı",
    priority: "Orta",
    area: "Backlog yönetimi",
    description: "Backlog listesindeki satır yoğunluğu, ikincil bilgi, başlık kaydırma, kolon yönetimi ve başlık önizleme kontrolleri varsayılan olarak kapalı bir Görünüm seçenekleri menüsünde toplanır; kullanıcı tercihini gerektiğinde açıp değiştirir.",
    labels: ["Ürün planı", "Tamamlanan"]
  },
  {
    id: "ROTA-PLAN-255",
    title: "Tamamlanan işleri backlogda varsayılan gizleme",
    type: "Story",
    status: "Tamamlandı",
    priority: "Orta",
    area: "Backlog yönetimi",
    description: "Backlog listesi tamamlanan işleri varsayılan olarak gizler. Tamamlananları göster seçeneğiyle dahil etmek veya durum filtresinden Tamamlandı seçmek mümkündür; görünüm tercihi kaydedilmiş filtrelerde korunur.",
    labels: ["Ürün planı", "Tamamlanan"]
  },
  {
    id: "ROTA-PLAN-256",
    title: "Backlog tablo işlemlerini alt menüye taşıma",
    type: "Story",
    status: "Tamamlandı",
    priority: "Orta",
    area: "Backlog yönetimi",
    description: "Excel dışa aktarma, seçili işlerden sprint oluşturma ve seçili işleri silme eylemleri Liste görünümünde tablonun altındaki Tablo işlemleri menüsünde yer alır.",
    labels: ["Ürün planı", "Tamamlanan"]
  },
  {
    id: "ROTA-PLAN-257",
    title: "Backlog filtre ve araç çubuğunu sadeleştirme",
    type: "Story",
    status: "Tamamlandı",
    priority: "Orta",
    area: "Backlog yönetimi",
    description: "Backlog ekranında arama birincil ve geniş alan olarak sunulur; durum, tür, etiket, takım, sorumlu, arama kapsamı ve tamamlanan işleri gösterme seçenekleri sayaç rozetli filtre panelinde gruplanır. Liste/Board geçişi, kaydedilmiş görünümler ve görünüm ayarları ayrı ve kompakt araç alanlarında tutulur.",
    labels: ["Ürün planı", "Tamamlanan"]
  },
  {
    id: "ROTA-PLAN-258",
    title: "Backlog tablo araçlarını bütünleşik üst şeritte ve özeti alt bilgide sunma",
    type: "Story",
    status: "Tamamlandı",
    priority: "Orta",
    area: "Backlog yönetimi",
    description: "Liste/Board ve Görüntüle ve devamı kontrolleri ile Tablo işlemleri menüsü tablonun üst kenarına bağlı bir araç şeridinde sunulur. Görünüm menüsünde geçerli/kaydedilmiş görünüm seçimi ve tablo tercihleri yer alır. İş adedi ile hazır/bloke durum özeti tablo altında bağlı alt bilgi olarak görünür.",
    labels: ["Ürün planı", "Tamamlanan"]
  },
  {
    id: "ROTA-PLAN-259",
    title: "Rota uygulama simgesi",
    type: "Story",
    status: "Tamamlandı",
    priority: "Orta",
    area: "Genel kullanım ve gezinme",
    description: "Rota'nın rota ve ilerleme temasını taşıyan özel simgesi çok çözünürlüklü Windows ICO biçiminde üretildi. Masaüstü penceresinde ve Windows kurulum paketinde aynı simge kullanılır.",
    labels: ["Ürün planı", "Tamamlanan"]
  }
];

export interface RotaProductFeatureUpdate {
  key: string;
  id: string;
  title?: string;
  area?: string;
  status?: WorkItem["status"];
  addLabels?: string[];
  removeLabels?: string[];
  description?: string;
}

// Add one uniquely keyed entry when an existing Rota feature changes state.
export const ROTA_PRODUCT_FEATURE_UPDATES: RotaProductFeatureUpdate[] = [
  {
    key: "2026-10-20-backlog-column-click-sorting-150",
    id: "ROTA-PLAN-150",
    title: "Backlog kolon başlıklarına tıklayarak sıralama.",
    area: "Backlog yönetimi",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Backlog listesindeki görünür kolonların başlıklarına tıklayarak o alana göre artan veya azalan sıralama yapılır. Aynı başlığa tekrar tıklanınca yön değişir; aktif kolon ve yön okla gösterilir. Sıralama dropdown'ları kaldırılmıştır. Kayıtlı backlog görünümleri sıralama kolonunu ve yönünü saklar."
  },
  {
    key: "2026-10-20-backlog-activity-column-meaning-044",
    id: "ROTA-PLAN-044",
    title: "Son aktivite kolonu olayın ne olduğunu göstermeli.",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"],
    description: "Backlog tablosunun Son aktivite kolonunda son olayın açıklaması, yapan kişi ve geçen süre birlikte gösterilir. Geçmiş kaydı olmayan işte teknik güncelleme metni yerine 'Henüz aktivite yok' görünür; son güncelleme zamanı ayrı Güncellendi kolonunda kalır."
  },
  {
    key: "2026-10-20-detail-tab-wheel-201",
    id: "ROTA-PLAN-201",
    title: "İş ayrıntısı sekmeleri fare tekerleğiyle değiştirilebilmeli.",
    area: "Görünüm ve erişilebilirlik",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"],
    description: "İş ayrıntısının Özet, Aktivite, Ekler ve İlişkiler sekme çubuğu üzerindeyken fare tekerleği yukarı/aşağı çevrilerek önceki veya sonraki sekmeye geçilir. Dikey içerik kaydırması sekme çubuğunun dışında değişmeden çalışır."
  },
  {
    key: "2026-10-21-backlog-table-menu-layering-258",
    id: "ROTA-PLAN-258",
    title: "Backlog tablo araçları ve özet yerleşimi",
    area: "Backlog yönetimi",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Tablo üstündeki gereksiz 'Görüntüle ve devamı' etiketi kaldırıldı. Görünüm ve Tablo işlemleri açılır menüleri, tablonun sticky kolon başlıklarının ve satırlarının üzerinde kalacak şekilde ayrı bir üst katmana alındı; menü zeminleri opaklaştırıldı. Görünüm menüsünde kaydedilmiş/geçerli görünüm seçimi korunur, tablo özeti tablonun altında kalır."
  },
  {
    key: "2026-10-20-jira-first-slice-034",
    id: "ROTA-PLAN-034",
    title: "Jira Server bağlantısı Base URL ve kullanıcı PAT’i ile yapılandırılmalı.",
    area: "Jira Server entegrasyonu",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"],
    description: "İlk kurulum ve çalışma alanı ayarlarında Jira Base URL yapılandırılır; URL yoksa Jira paneli devre dışı kalır. Kullanıcı Jira’da kendi hesabı için Personal Access Token (PAT) üretip Rota’ya kaydeder. Token Electron ana sürecinde OS safeStorage ile şifrelenir ve REST isteklerinde Bearer olarak kullanılır; localStorage ve yedek dosyalarına yazılmaz."
  },
  {
    key: "2026-10-20-jira-first-slice-035",
    id: "ROTA-PLAN-035",
    title: "Seçili Jira Agile board’un backlog, board ve sprint kayıtları listelenmeli.",
    area: "Jira Server entegrasyonu",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"],
    description: "Jira paneli kullanıcının erişebildiği Agile board’ları listeler. Seçilen board’un backlog, tüm board işleri veya seçili sprint kapsamı Agile REST API üzerinden en fazla 100 kayıtla canlı görüntülenebilir. Sprint kataloğu aktif, gelecek ve tamamlanmış sprintleri içerir. Jira kayıtlarını okuma akışı değiştirmez."
  },
  {
    key: "2026-10-20-jira-rota-issue-create-252",
    id: "ROTA-PLAN-252",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"],
    description: "Jira panelinde seçili Agile board’un proje kapsamından proje seçilir, o projenin oluşturulabilir issue türleri Jira create metadata’sından yüklenir. Kullanıcı Rota backlog işini seçer, gönderim öncesi özet onayı verir ve düzenlenebilir başlık/açıklamayla issue oluşturur. Başarılı Jira key’i Rota işine kalıcı bağlanır ve aktivite günlüğüne yazılır; aynı Rota işi için ikinci oluşturma engellenir."
  },
  {
    key: "2026-10-20-contained-page-scroll-253",
    id: "ROTA-PLAN-253",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"]
  },
  {
    key: "2026-10-19-phase-1-2-052",
    id: "ROTA-PLAN-052",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"],
    description: "Açık sorular çalışma alanına ayrı bir görünüm olarak eklendi. Soru; yanıt sahibi, beklenen tarih ve isteğe bağlı backlog işiyle kaydedilir; gecikenler vurgulanır, yanıt notu girilebilir ve kapatılan soru yeniden açılabilir."
  },
  {
    key: "2026-10-19-phase-1-2-053",
    id: "ROTA-PLAN-053",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"],
    description: "Story, bug ve bankacılık değişiklikleri için yeniden kullanılabilir kabul kriteri şablonları; yeni iş ve düzenleme formlarında uygulanabilir. Kullanıcı girdiği kriterleri adlandırıp kendi şablonlarına kaydedebilir."
  },
  {
    key: "2026-10-19-phase-1-2-059",
    id: "ROTA-PLAN-059",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"],
    description: "Backlog listesinde bekleme süresine göre sıralama; her satır son aktiviteden geçen gün sayısını ve son karar tarihini gösterir. Tarihçesi olmayan eski kayıtlar için süre uydurulmaz ve bilinmiyor gösterilir."
  },
  {
    key: "2026-10-19-phase-1-2-073",
    id: "ROTA-PLAN-073",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"],
    description: "Backlog Liste görünümünde varsayılan sıra seçiliyken satırlar sürükle-bırak ile yeniden sıralanabilir. Sıra çalışma alanında saklanır; arama ve filtreler içinde görünen kayıtların pozisyonları korunur."
  },
  {
    key: "2026-10-19-phase-1-2-075",
    id: "ROTA-PLAN-075",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"],
    description: "İş detayındaki bağımlılıklar dikey zaman çizgisinde sıralanır; her bağımlılık ve mevcut iş için durum, başlangıç ve hedef tarih görünür. Tamamlanan ve bekleyen işler görsel olarak ayrılır."
  },
  {
    key: "2026-10-19-phase-1-2-078",
    id: "ROTA-PLAN-078",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"],
    description: "Backlog Liste görünümünde Hazır iş havuzu; tamamlanmamış, bloke olmayan, en az bir kabul kriteri içeren ve tamamlanmamış bağımlılığı bulunmayan işleri ayırır. Mevcut takım filtresiyle belirli takım kapsamına indirilebilir."
  },
  {
    key: "2026-10-19-phase-1-2-072",
    id: "ROTA-PLAN-072",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı"],
    addLabels: ["Tamamlanan"],
    description: "Tamamlanan sprint kartındaki kapanış özeti; tamamlanan, açık/taşınan ve bloke iş sayılarını ve iş başlıklarını toplar. PO öğrenimleri ve takip notlarını kaydedebilir; bunlar sprint kaydında korunur."
  },
  {
    key: "2026-10-21-member-search-auto-team-assignment-164",
    id: "ROTA-PLAN-164",
    status: "Tamamlandı",
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı", "İleri faz öncesi", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "İş oluşturma/düzenleme, proje ekibi ve backlog satır içi atamalarında kullanıcı tek bir aranabilir üye alanından kişiyi seçer. Üyenin bağlı olduğu takım arka planda otomatik belirlenip saklanır; atama akışında takım seçimi gösterilmez. Sorumluluk alanı ve çoklu kişi ataması korunur."
  },
  ...[
    ["ROTA-PLAN-101", "Kullanıcı her ekrandaki hızlı kayıt düğmesiyle iş, kişisel görev veya not başlatabilir."],
    ["ROTA-PLAN-102", "Ctrl+Shift+N hızlı kayıt penceresini açar; kayıt türü klavyeyle seçilebilir."],
    ["ROTA-PLAN-103", "Başlık tek başına yeterlidir; açıklama ve diğer alanlar daha sonra tamamlanabilir."],
    ["ROTA-PLAN-104", "Hızlı kayıt penceresi Kaydet ve yenisini aç ile seri kayıt girişini destekler."],
    ["ROTA-PLAN-105", "Hızlı oluşturucu etkin projeyi varsayılan olarak seçer ve proje değiştirilebilir."],
    ["ROTA-PLAN-106", "Hızlı oluşturucu son atamayı önerir; atama zorunlu değildir."],
    ["ROTA-PLAN-107", "Hızlı backlog kaydında Story, Bug ve Task seçilebilir."],
    ["ROTA-PLAN-108", "Backlog listesinin altındaki satır içi girişten Story oluşturulabilir."],
    ["ROTA-PLAN-109", "İş ayrıntısındaki Takip görevi oluştur eylemi ilgili backlog işini göreve bağlar."],
    ["ROTA-PLAN-110", "Notu göreve dönüştür eylemi içerik ve iş bağlantısını korur; kaynak not kimliği saklanır."],
    ["ROTA-PLAN-111", "Outlook bırakma penceresi kaydetmeden önce ayrıştırılmış ileti alanlarını gösterir."],
    ["ROTA-PLAN-112", "Outlook bırakma akışında backlog işi, kişisel görev ve not türleri seçilebilir."],
    ["ROTA-PLAN-113", "E-posta konusu kayıt başlığı olarak gelir ve kaydetmeden önce düzenlenebilir."],
    ["ROTA-PLAN-114", "İçe aktarılan e-posta gövdesinden yaygın yanıt zinciri başlangıçları ayıklanır; özgün .msg eki saklanır."],
    ["ROTA-PLAN-116", "Son e-posta kayıt türü ve proje tercihi sonraki Outlook bırakmalarında önerilir."],
    ["ROTA-PLAN-117", "Boş veya yalnızca imzadan oluşan e-posta gövdesi kayıt öncesinde uyarı verir."],
    ["ROTA-PLAN-118", "E-postadan üretilen backlog işi, kişisel görev ve not kaynak e-posta rozetini ve özgün dosyayı açma eylemini gösterir."],
    ["ROTA-PLAN-119", "Aynı ileti özeti daha önce kaydedilmişse tekrar bırakma uyarısı gösterilir."],
    ["ROTA-PLAN-120", "Outlook .msg/.eml sürüklenirken bırakma alanı vurgulanır; desteklenmeyen tür uyarılır."],
    ["ROTA-PLAN-121", "Backlog satır yoğunluğu kompakt, standart veya rahat seçilebilir ve cihazda saklanır."],
    ["ROTA-PLAN-122", "Uzun listede backlog tablo başlığı sabit kalır."],
    ["ROTA-PLAN-123", "Yatay kaydırmada seçim ve iş başlığı kolonu sabit kalır."],
    ["ROTA-PLAN-124", "Kolon genişlikleri sürükleyerek ayarlanıp cihazda saklanır."],
    ["ROTA-PLAN-125", "Kolonları sığdır eylemi görünür içeriğe göre genişlik hesaplar."],
    ["ROTA-PLAN-126", "Kolonlar panelinde etkin kolonlar sürüklenerek sıralanabilir; yukarı/aşağı kontrolleri klavye alternatifi olarak kalır."],
    ["ROTA-PLAN-127", "Backlog başlıkları tek satır veya çok satır görüntülenebilir; tercih saklanır."],
    ["ROTA-PLAN-129", "Liste/Board geçişi geçerli arama, filtre ve proje bağlamını korur."],
    ["ROTA-PLAN-130", "Filtre sonucu boşsa etkin filtreler temizlenebilir."],
    ["ROTA-PLAN-131", "Seçili backlog işlerinin durumu topluca değiştirilir ve her işte aktivite kaydı oluşur."],
    ["ROTA-PLAN-132", "Seçili backlog işlerine birden fazla takım/üye topluca atanabilir."],
    ["ROTA-PLAN-141", "Backlog arama eşleşmeleri başlıkta ve arama kapsamındaki alanlarda vurgulanır."],
    ["ROTA-PLAN-142", "Backlog arama kapsamı tüm alanlar, başlık, açıklama, iş ID’si, etiket veya bileşen olarak seçilebilir."],
    ["ROTA-PLAN-143", "Arama ve backlog filtreleri tek eylemle sıfırlanabilir."],
    ["ROTA-PLAN-144", "Etkin backlog arama ve filtreleri kaldırılabilir rozetler olarak gösterilir."],
    ["ROTA-PLAN-145", "Backlog özetinde filtreyle eşleşen iş sayısı ve proje toplamı birlikte gösterilir."],
    ["ROTA-PLAN-147", "Görünümleri yönet penceresinden kayıtlı backlog görünümü kopyalanabilir; kopya mevcut filtre ve kolon ayarlarını korur."],
    ["ROTA-PLAN-148", "Kayıtlı backlog görünümleri sabitlenebilir ve sabit olanlar seçim listesinin başında görünür."],
    ["ROTA-PLAN-149", "Aktif kayıtlı görünümün filtre, kolon, sıralama veya liste/board durumu değişince güncelleme eylemi değişiklik olduğunu belirtir."],
    ["ROTA-PLAN-115", "Outlook .msg/.eml bırakma akışında e-posta eki listelenir ve kullanıcı kayda aktarılacak ekleri seçebilir; özgün e-posta da ek olarak korunur."],
    ["ROTA-PLAN-128", "Backlog satırlarının ikincil bilgisinde iş ID'si, son güncelleme, atama özeti veya kapalı seçeneği cihazda saklanır."],
    ["ROTA-PLAN-133", "Seçili işlere toplu etiket eklenebilir veya -etiket yazımıyla mevcut etiket kaldırılabilir; diğer etiketler korunur."],
    ["ROTA-PLAN-134", "Seçili backlog işleri topluca başka projeye taşınır; proje kapsamı dışında kalacak release ve sprint bağlantıları temizlenir."],
    ["ROTA-PLAN-135", "Seçili işler sprintlerinden topluca çıkarılır ve her iş için aktivite kaydı eklenir."],
    ["ROTA-PLAN-136", "Backlog başlık hücresinde Enter düzenlemeyi kaydeder, Escape iptal eder."],
    ["ROTA-PLAN-137", "Satır içi başlık, durum ve atama kaydında kullanıcıya anında sonuç bildirimi verilir."],
    ["ROTA-PLAN-138", "Desteklenen toplu durum, atama, etiket, proje ve sprint değişiklikleri kısa süreli Geri al eylemiyle geri yüklenebilir."],
    ["ROTA-PLAN-139", "Backlog satırındaki üç nokta menüsü düzenle, çoğalt ve sil eylemlerini bir araya getirir."],
    ["ROTA-PLAN-140", "Bir backlog işi yeni ID ve boş geçmişle taslak olarak çoğaltılabilir; seçili içerik ve ekler korunur."],
    ["ROTA-PLAN-146", "Son kullanılan beş backlog arama ve filtre bileşimi saklanır ve tek seçimle yeniden uygulanabilir."],
    ["ROTA-PLAN-153", "İş ayrıntısı panelinin altındaki eylem şeridi uzun içerik kaydırılırken görünür kalır."],
    ["ROTA-PLAN-154", "Yeni backlog işi formundaki başlık alanı kısa ve eylem odaklı yazım örneği gösterir."],
    ["ROTA-PLAN-156", "Yeni iş ve iş düzenleme formundaki açıklama ve kriter metin alanları yazıldıkça içerik yüksekliğine uyum sağlar."],
    ["ROTA-PLAN-158", "İş geçmişi tüm hareketler, ilerleme notları, alan değişiklikleri, dosya ekleri veya release hareketlerine göre süzülebilir."],
    ["ROTA-PLAN-185", "Ürün bileşenleri ve iş devir diyagramlarında düğümler üç sütunlu okunabilir bir düzene otomatik yerleştirilebilir."],
    ["ROTA-PLAN-186", "Ürün bileşenleri ve iş devir diyagramları Ctrl+tekerlek ile yakınlaştırılır ve Tümünü sığdır eylemiyle kadraja alınır."],
    ["ROTA-PLAN-189", "Diyagram editörleri düzenlemelerin otomatik kaydedildiğini belirtir; düğüm konumu ve ilişki güncellemeleri anında çalışma alanına yazılır."],
    ["ROTA-PLAN-161", "Takım panelinin üye arama alanı kişi kartlarını adlarına göre filtreler."],
    ["ROTA-PLAN-162", "Üye kartındaki İşlerini gör eylemi backlog'u ilgili takım ve üyeye göre filtreleyip açar."],
    ["ROTA-PLAN-163", "Takım paneli iş yükü filtreleri Filtreleri temizle eylemiyle tek seferde sıfırlanır."],
    ["ROTA-PLAN-155", "Zorunlu alan doğrulamasında tarayıcı ilk eksik alana odaklanır; başlık ve tarih aralığı doğrulamaları kaydı engeller."],
    ["ROTA-PLAN-166", "İş ayrıntısı ve düzenleme formları birden fazla atamayı üye, takım ve sorumluluk alanıyla ayrı satırlarda gösterir."],
    ["ROTA-PLAN-170", "Takım panosu takım ve üye kartlarında açık, bloke ve tamamlanmış iş sayılarını birlikte gösterir."],
    ["ROTA-PLAN-181", "Envanterde kod, ad, alan ve amaç aranır; tür ve proje filtreleriyle sonuçlar daraltılır."],
    ["ROTA-PLAN-190", "Envanter ilişki diyagramındaki bileşen düğümüne çift tıklama o bileşenin ayrıntı kartını açar."],
    ["ROTA-PLAN-171", "Yeni sprint oluşturucusu son sprintin takımını ve bilinen 1/2/3/4 haftalık süresini başlangıç şablonu olarak önerir."],
    ["ROTA-PLAN-174", "Sprint oluşturucusunda 1, 2, 3 veya 4 haftalık süre kısayolu bitiş tarihini başlangıç tarihine göre hesaplar."],
    ["ROTA-PLAN-177", "Sprint oluşturucusu seçilen kapsamda bloke veya tamamlanmamış bağımlılığı bulunan işleri uyarı olarak özetler."],
    ["ROTA-PLAN-168", "Yan menü daraltılıp genişletilebilir; tercih bu cihazda saklanır ve ikon gezinmesi görünür kalır."],
    ["ROTA-PLAN-192", "Çalışma alanı ayarlarında yazı ölçeği seçilebilir; tercih yeniden açılışlarda korunur."],
    ["ROTA-PLAN-193", "Yüksek kontrast seçeneği metin ve durum etiketlerinin kontrastını ve odak göstergesini artırır."],
    ["ROTA-PLAN-195", "Animasyonları azalt tercihi hareketli geçişleri kapatır ve cihazda saklanır."],
    ["ROTA-PLAN-196", "Çalışma alanı ayarları backlog kolon, görünüm ve tablo tercihlerini iş verisini etkilemeden varsayılana döndürür."],
    ["ROTA-PLAN-164", "Kullanıcı yeni veya mevcut atamada tek aranabilir üye alanından kişiyi seçer. Üyenin takımı arka planda otomatik belirlenip saklanır; takım seçimi atama akışında gösterilmez."],
    ["ROTA-PLAN-182", "Envanter bileşen ayrıntısındaki bağlı backlog işleri listesinden ilişkili iş doğrudan açılabilir."],
    ["ROTA-PLAN-183", "Bileşen ayrıntısından düzenlemeye geçilip birden fazla ilişkili bileşen seçilebilir veya bağlantı kaldırılabilir."],
    ["ROTA-PLAN-197", "Son açılan sekiz backlog işi ID ve başlıkla tutulur; backlog araç çubuğundan hızlıca yeniden açılabilir."],
    ["ROTA-PLAN-151", "Backlog listesinden açılan iş ayrıntısı, mevcut liste bağlamını koruyarak ekranın yanında tam boy panel olarak gösterilir."],
    ["ROTA-PLAN-179", "Backlog'da seçilen işler aynı projeye ait bir release kapsamına topluca eklenebilir veya release'den çıkarılabilir."],
    ["ROTA-PLAN-165", "Hızlı iş oluşturucuda son kullanılan üye atama seçeneğin başında önerilir; kullanıcı değiştirebilir."],
    ["ROTA-PLAN-159", "İş geçmişindeki en yeni hareket, diğer hareketlerden hafif görsel vurgu alarak son güncellemeyi bulmayı kolaylaştırır."],
    ["ROTA-PLAN-160", "İş ayrıntısında ilişkili bileşen, bağımlılık, roadmap, release, sprint ve kişisel görev kayıtları tek bir bağlantı bölümünde listelenir."],
    ["ROTA-PLAN-152", "İş ayrıntısında özet, aktivite, ekler ve ilişkiler sekmeleriyle ilgili içerik hızlıca filtrelenir."],
    ["ROTA-PLAN-167", "Proje menüsünde proje adına göre arama ve projeleri sabitleyip üste taşıma bulunur."],
    ["ROTA-PLAN-172", "Sprint oluşturucusunda seçilen işlerin ID, başlık, durum ve atamasına göre anlık arama yapılır."],
    ["ROTA-PLAN-173", "Sprint oluşturucu kapsamındaki seçili işler sürüklenerek sıralanır; sıra sprint işlerinde saklanır."],
    ["ROTA-PLAN-169", "Proje değiştirirken kullanıcı mevcut arama metnini korumayı seçebilir; diğer filtre bağlamı proje geçişinde korunur."],
    ["ROTA-PLAN-180", "Release kartları planlanan ve gerçek yayın tarihini, kapsam tamamlanma oranını ve açık/engelli iş sayısını birlikte gösterir."],
    ["ROTA-PLAN-187", "Envanter kodu ve adına göre arama ile proje/tür filtreleri diyagram görünümünde de kullanılabilir."],
    ["ROTA-PLAN-175", "Backlog içinde sprint kartları tamamlanan ve bloke iş sayılarını ve tamamlanma oranını çubukla gösterir."],
    ["ROTA-PLAN-178", "Backlog sprint özetinde sprintler tümü, aktif, yaklaşan ve tamamlanan gruplarına göre filtrelenir."],
    ["ROTA-PLAN-157", "İş ekleri ayrıntı panelinde PNG, JPEG, GIF, WebP veya PDF ise uygulama içi önizleme açılır; desteklenmeyen dosyalar masaüstü varsayılan uygulamasında açılır."],
    ["ROTA-PLAN-191", "Kullanıcı sistem temasını izleyen, açık veya koyu temayı seçebilir; tema tüm çalışma alanına uygulanır."],
    ["ROTA-PLAN-199", "Backlog işi, görev, not veya projeyi silme ya da projeyi arşivleme sonrası altı saniyelik Geri al eylemi kaydı ve eklerini geri yükler."],
    ["ROTA-PLAN-176", "Tamamlanmış sprintin kalan işleri kapanış panelinden backlog'a çıkarılabilir veya başka sprintlere taşınabilir."],
    ["ROTA-PLAN-184", "İş devir diyagramında geri al ve yinele kontrolleri düzenleme geçmişindeki son 50 yerel durumu yönetir."],
    ["ROTA-PLAN-188", "Envanter diyagramındaki ilişki etiketine çift tıklayıp doğrudan kısa düzenleme penceresinde değiştirebilirsin; yeni etiket hemen kaydedilir."],
    ["ROTA-PLAN-194", "Kısayol rehberi uygulama içinden açılır ve hızlı kayıt, arama ve düzenleme kısayollarını gösterir."],
    ["ROTA-PLAN-198", "Hızlı kayıt penceresi açıldığında başlık alanı otomatik odaklanır."],
    ["ROTA-PLAN-200", "Dosya sürükleyip bırakıldığında aktarım sürerken dosya adları ve belirsiz ilerleme göstergesi görünür; hata durumunda aynı dosyalar yeniden denenebilir."]
  ].map(([id, description]) => ({
    key: `2026-10-18-ux-${id.toLowerCase()}-implemented`, id,
    status: "Tamamlandı" as const,
    removeLabels: ["Öneri", "İleri sürüm adayı", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description
  })),
  {
    key: "2026-10-18-activity-history-core",
    id: "ROTA-PLAN-001",
    status: "Devam ediyor",
    addLabels: ["Devam ediyor"],
    description: "İş ayrıntısında zaman sıralı aktivite geçmişi başlatıldı. Oluşturma, alan düzenleme, atama, durum/öncelik ve ek değişiklikleri yazar ve zamanla kaydediliyor. Başlama/hedef tarih ve release olayları ilgili planlama/release feature'ları geldikçe eklenecek."
  },
  {
    key: "2026-10-18-progress-notes-core",
    id: "ROTA-PLAN-002",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "İşe eklemeli ilerleme notları eklenebilir. Yazar ve zaman otomatik kaydedilir; görünürlük Takımla paylaş veya Yalnızca PO olarak seçilir; nota dosya eklenebilir. Mevcut kişisel notlardan ayrı tutulur."
  },
  {
    key: "2026-10-18-blocker-reason-and-next-step",
    id: "ROTA-PLAN-003",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Durum değişikliğine isteğe bağlı güncelleme notu eklenebilir. Bloke durumuna geçerken neden ve sonraki adım zorunlu sorulur, iş ayrıntısında gösterilir ve açılış/çözülme olayı kaydedilir. Takip sahibi ve daha ayrıntılı blokaj yönetimi 007 kapsamında sürer."
  },
  {
    key: "2026-10-18-completion-release-events",
    id: "ROTA-PLAN-004",
    status: "Devam ediyor",
    addLabels: ["Devam ediyor"],
    description: "İşin Tamamlandı durumuna geçişi aktivite geçmişinde zamanla kaydediliyor. Release kaydı ve yayın olayı henüz yok; ayrı tutulması release feature'ları uygulanırken tamamlanacak."
  },
  {
    key: "2026-10-18-note-visibility",
    id: "ROTA-PLAN-005",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "İlerleme notu görünürlüğü Takımla paylaş veya Yalnızca PO olarak seçilebilir. PO'nun kişisel notlarından ayrı, işe bağlı eklemeli geçmiş olarak tutulur; ROTA-PLAN-002 ile birlikte tamamlandı."
  },
  {
    key: "2026-10-18-date-change-activity",
    id: "ROTA-PLAN-001",
    status: "Devam ediyor",
    addLabels: ["Devam ediyor"],
    description: "İş geçmişi oluşturma, alan düzenleme, atama, durum/öncelik, başlangıç/hedef tarih, tahmini efor ve ek değişikliklerini yazar/zamanla kaydediyor. Release olayları ayrı release yönetimiyle eklenecek. Eski olaylar geriye dönük uydurulmaz."
  },
  {
    key: "2026-10-18-planning-fields",
    id: "ROTA-PLAN-006",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "İşlerde mevcut takım/sorumlu atamasına ek olarak başlangıç tarihi, hedef bitiş tarihi ve tahmini efor saat olarak kaydedilir; yeni iş ve düzenleme formlarında değiştirilir, detayda gösterilir ve değişiklikler aktivite geçmişine girer."
  },
  {
    key: "2026-10-18-blocker-tracking-details",
    id: "ROTA-PLAN-007",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Blokaj neden, beklenen karar/iş, sonraki adım, takip sahibi ve açılış/çözülme zamanıyla saklanır. İş Bloke durumuna geçerken gerekli alanlar istenir ve iş ayrıntısında gösterilir."
  },
  {
    key: "2026-10-18-work-dependencies-cycle-control",
    id: "ROTA-PLAN-008",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Bir iş başka backlog işlerini bekleyebilir. Bağımlı işler detayda listelenir; tamamlanmamış bağımlılıklar kart ve ayrıntıda uyarı verir; kendi üstünde döngü oluşturacak seçim kaydedilmez. Bağımlılık işi silinince referansı temizlenir."
  },
  {
    key: "2026-10-18-last-activity-wait-and-overdue",
    id: "ROTA-PLAN-009",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "İş listesi ve ayrıntısı son aktivitenin ne kadar önce olduğunu, bloke işte blokaj süresini, hedef tarihi geçen işlerde kaç gün gecikme olduğunu gösterir."
  },
  {
    key: "2026-10-18-team-plan-filters-and-effort",
    id: "ROTA-PLAN-010",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Takım panelindeki işleri başlangıç tarihi, hedef bitiş, planlanan dönem ve tahmini efor aralıklarıyla filtrele. Takım/üye iş yükünde tahmini efor saatleri görünür; bu değer kapasite taahhüdü değil planlama göstergesidir."
  },
  {
    key: "2026-10-18-plan-period-history",
    id: "ROTA-PLAN-001",
    status: "Devam ediyor",
    addLabels: ["Devam ediyor"],
    description: "İş geçmişi oluşturma, alan düzenleme, atama, durum/öncelik, başlangıç/hedef tarih, planlanan dönem, tahmini efor ve ek değişikliklerini yazar/zamanla kaydediyor. Release olayları ayrı release yönetimiyle eklenecek; eski olaylar geriye dönük uydurulmaz."
  },
  {
    key: "2026-10-18-roadmap-initiative-epic-goals",
    id: "ROTA-PLAN-011",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Yol haritasında Initiative ve Epic oluşturma/düzenleme/silme; initiative için sahip, ölçülebilir hedef ve başarı ölçütü; epic için parent initiative seçimi. Backlog işleri initiative/epic hedeflerine bağlanır."
  },
  {
    key: "2026-10-18-product-stage-separated-from-delivery",
    id: "ROTA-PLAN-012",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Ürün aşaması (Fikirler, Keşif, Sırada, Planlandı, Teslimatta, Tamamlandı) teslimat durumundan ayrı saklanır ve backlog/yol haritası görünümünde gösterilir."
  },
  {
    key: "2026-10-18-actual-and-planned-delivery-dates",
    id: "ROTA-PLAN-013",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "İşlerde planlanan başlangıç, hedef bitiş ve dönem ile gerçek başlangıç ve tamamlanma zamanı ayrı kaydedilir. Gerçek başlangıç Devam ediyor durumuna ilk geçişte, tamamlanma Tamamlandı durumuna geçişte aktivite geçmişine yazılır."
  },
  {
    key: "2026-10-18-roadmap-timeline-and-date-history",
    id: "ROTA-PLAN-014",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Yol haritası hedef ve epic'leri altı aylık zaman çizgisinde gösterir. Initiative/epic tarih değişiklikleri önceki aralık, yeni aralık, yapan ve zaman bilgisiyle saklanır."
  },
  {
    key: "2026-10-18-lightweight-period-planning",
    id: "ROTA-PLAN-015",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "İşler için planlanan dönem ve tahmini efor ile hafif kapsam görünürlüğü sunulur; takım panelinde dönem ve efor filtreleri bulunur. Karmaşık kapasite/puan hesabı yapılmaz."
  },
  {
    key: "2026-10-18-release-activity-history",
    id: "ROTA-PLAN-001",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "İş aktivite geçmişi; oluşturma, alan/atama/tarih/efor/dönem, durum, dosya ve ilerleme notlarının yanında release kapsamına ekleme/çıkarma, release değişimi ve yayın olaylarını da zaman ve kullanıcıyla kaydeder."
  },
  {
    key: "2026-10-18-release-vs-completion-events",
    id: "ROTA-PLAN-004",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Backlog işinin Tamamlandı zamanı ile bağlı release'in Yayınlandı zamanı farklı olaylardır. Release yayımlandığında kapsamdaki her işin aktivite geçmişine yayın adı, tarihi ve notu eklenir."
  },
  {
    key: "2026-10-18-release-records-and-statuses",
    id: "ROTA-PLAN-016",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Release planı ekranında proje bazında ad/sürüm, planlanan tarih, durum ve açıklama taşıyan release oluşturulur, düzenlenir ve silinir. Durumlar Planlanıyor, Hazırlanıyor, Yayına hazır, Yayınlandı, Ertelendi ve İptal edildi."
  },
  {
    key: "2026-10-18-release-scope-and-readiness",
    id: "ROTA-PLAN-017",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Backlog işleri aynı projedeki tek bir release kapsamına bağlanır. Release görünümü kapsam ilerlemesini, tamamlanmamış ve bloke işleri uyarıyla gösterir; kapsam ekleme/çıkarma iş geçmişine yazılır."
  },
  {
    key: "2026-10-18-release-status-flow",
    id: "ROTA-PLAN-018",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Release durumları Planlanıyor, Hazırlanıyor, Yayına hazır, Yayınlandı, Ertelendi ve İptal edildi olarak yönetilir. Yayında gerçek tarih zorunludur; açık kalan kapsam ayrıca uyarılır."
  },
  {
    key: "2026-10-18-release-date-change-and-notes",
    id: "ROTA-PLAN-019",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Planlanan yayın tarihi gerçek yayın tarihinden ayrıdır. Plan tarihi değişince neden zorunlu alınır ve eski/yeni tarih, kullanıcı, zaman ile kaydedilir; yayın notu saklanır."
  },
  {
    key: "2026-10-18-completion-and-release-distinction",
    id: "ROTA-PLAN-020",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Tamamlandı backlog işinin geliştirme aşamasının bitişidir. Yayınlandı ayrı release durumudur ve gerçek yayın zamanı release kaydında tutulur."
  },
  {
    key: "2026-10-18-release-outcome-follow-up",
    id: "ROTA-PLAN-021",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Release kaydında yayın sonrası hedef sonucu ve gözlem notu saklanıp release detayında gösterilir. Hedef ölçüt sonucu PO tarafından güncellenebilir."
  },
  {
    key: "2026-10-18-po-workspace-dashboard",
    id: "ROTA-PLAN-022",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "PO genel bakışı aktif ürün hedeflerini, yaklaşan release'leri, geciken işleri, 7 günden uzun süredir güncellenmeyen kayıtları ve açık blokajları proje kapsamıyla gösterir. Eski sabit örnek trend grafiği kaldırıldı; kartlar gerçek çalışma alanı verisinden hesaplanır."
  },
  {
    key: "2026-10-18-team-dashboard-filters",
    id: "ROTA-PLAN-023",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Takım panelinde dönem, başlangıç/hedef tarih ve tahmini eforla filtrelenmiş işler; atamalar, ilerleyen işler, blokajlar ve üye başına kapsam gösterilir."
  },
  {
    key: "2026-10-18-release-readiness-dashboard",
    id: "ROTA-PLAN-024",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Release planı ekranı kapsam işlerini, tamamlanma oranını, blokaj/tamamlanmamış iş uyarılarını ve planlanan/gerçekleşen tarihi gösterir."
  },
  {
    key: "2026-10-18-history-derived-flow-metrics",
    id: "ROTA-PLAN-025",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Genel bakış, aktivite/tarih kayıtları yeterli olan işlerde başlama-tamamlama ve blokaj çözülme sürelerini; yayınlarda planlanan-gerçekleşen tarih farkını örnek sayısıyla gösterir."
  },
  {
    key: "2026-10-18-metrics-context-no-individual-scores",
    id: "ROTA-PLAN-026",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Metrikler kişi bazında performans puanı veya sıralama üretmez. Tanım ve örneklem sınırı gösterilir; her ölçümün dayandığı iş veya release kaydına gidilebilir."
  },
  {
    key: "2026-10-18-team-create-modal-refresh",
    id: "ROTA-PLAN-027",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Takım panelindeki takım oluştur/düzenle formu kaydedilince açık modal kapanır, dashboard güncel takımlarla yenilenir ve sol menü sayacı güncellenir."
  },
  {
    key: "2026-10-18-full-workspace-backup",
    id: "ROTA-PLAN-028",
    status: "Tamamlandı",
    removeLabels: ["İleri sürüm adayı", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Kullanıcı çalışma alanını ve uygulamadaki tüm ekleri tek bir seçtiği dosya konumuna aktarabilir. Geri yükleme aşamalı işlenir ve ek dosya içerikleri bütünlük özetiyle doğrulanır."
  },
  {
    key: "2026-10-18-backup-validation-and-preservation",
    id: "ROTA-PLAN-029",
    status: "Tamamlandı",
    removeLabels: ["İleri sürüm adayı", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Uyumsuz/bozuk yedek ve eksik/değiştirilmiş ekler açık hata verir. Dosya, veri ve ekler doğrulanıp hazırlanmadan mevcut çalışma alanı değiştirilmez; onaylanmış geri yükleme başarısız olursa yerel veriye geri dönülür."
  },
  {
    key: "2026-10-18-user-selectable-backup-format-and-location",
    id: "ROTA-PLAN-030",
    status: "Tamamlandı",
    removeLabels: ["İleri sürüm adayı", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Yedek biçimi .rota sıkıştırılmış yedek veya .json olarak seçilir. Dosya kaydetme penceresinden isim ve konum; geri yükleme penceresinden kaynak dosya seçilir."
  },
  {
    key: "2026-10-18-backlog-excel-export-details",
    id: "ROTA-PLAN-047",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Excel çalışma kitabında backlog iş alanları, atamalar, kabul kriterleri, bağımlılıklar, aktivite geçmişi ve ek dosya ad/boyut referansları ayrı sayfalarda dışa aktarılır. Dışa aktarım seçili proje kapsamındaki tüm işleri alır; filtreleri dikkate almaz. Eklerin ikili içeriği çalışma kitabına eklenmez."
  },
  {
    key: "2026-10-18-outlook-drop-validation-progress",
    id: "ROTA-PLAN-031",
    status: "Devam ediyor",
    removeLabels: ["Öneri"],
    addLabels: ["Devam ediyor"],
    description: "Electron'a dosya olarak ulaşan .msg/.eml öğeleri alınabiliyor; kurumdaki Outlook sürümünün sürükle-bırak sırasında Electron'a bir dosya verdiği bu çalışma ortamında doğrulanamadı. Dosya payload doğrulaması tamamlanmalı."
  },
  {
    key: "2026-10-18-outlook-email-to-record",
    id: "ROTA-PLAN-032",
    status: "Tamamlandı",
    removeLabels: ["İleri sürüm adayı", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: ".msg ve .eml dosyaları sürüklenerek içe alınabilir. Konu başlığa, gönderen/alıcı/tarih ve düz metin gövde açıklamaya aktarılır; özgün e-posta dosyası kaydın eki olarak saklanır. Outlook içindeki ekler özgün iletinin içinde korunur."
  },
  {
    key: "2026-10-18-outlook-editable-record-preview",
    id: "ROTA-PLAN-033",
    status: "Tamamlandı",
    removeLabels: ["İleri sürüm adayı", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "E-posta aktarımı kaydı otomatik kaydetmez; başlık ve açıklama düzenlenebilen yeni kayıt formu açılır. Kullanıcı backlog işi, kişisel görev veya not türünü seçip içeriği gözden geçirdikten sonra Kaydet ile oluşturur. E-posta HTML'i çalıştırılmaz veya gösterilmez."
  },
  {
    key: "2026-10-18-classic-outlook-msg-drop-confirmed",
    id: "ROTA-PLAN-031",
    status: "Tamamlandı",
    removeLabels: ["İleri sürüm adayı", "Devam ediyor", "Öneri"],
    addLabels: ["Tamamlanan"],
    description: "Kullanıcı kurumda Klasik Outlook kullandığını ve e-postayı sürükleyince .msg dosyasının geldiğini doğruladı. Rota bu .msg dosyasını okuyup kullanıcı onayına sunulan iş/görev/not taslağına çevirir; özgün .msg kaydın eki olarak korunur."
  },
  {
    key: "2026-10-18-work-and-note-handover-diagrams",
    id: "ROTA-PLAN-036",
    status: "Tamamlandı",
    removeLabels: ["İleri sürüm adayı", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "İş ve kişisel not ayrıntısından devir diyagramı eklenebilir. Akış/system context için kutular, oklar, okunabilir ilişki etiketleri ve düzenlenebilir konumlar çalışma alanında saklanır."
  },
  {
    key: "2026-10-18-work-diagram-ownership",
    id: "ROTA-PLAN-037",
    status: "Tamamlandı",
    removeLabels: ["İleri sürüm adayı", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Genel amaçlı devir diyagramı bir backlog işine veya kişisel nota bağlanır; kayıt ayrıntısından açılıp düzenlenir, öğeler ve ilişkiler kalıcı saklanır. Sahip kayıt silinirse bağlı diyagramları temizlenir."
  },
  {
    key: "2026-10-18-local-data-security-and-erasure-design",
    id: "ROTA-PLAN-038",
    status: "Tamamlandı",
    removeLabels: ["İleri sürüm adayı", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan", "Üretim öncesi kontrol"],
    description: "Üretim güvenlik yaklaşımı belirlendi: banka müşteri/hesap/kart/kimlik verisi prototipe girmez; gerçek hassas yerel içerik için uygulama profili DPAPI/işletim sistemi anahtarıyla korunan şifreli veri kasasına geçirilmeden ürün güvenlik incelemesinden geçmez. Ekler ayrı dosya olarak aynı kapsamda şifrelenir; güvenli silme için anahtar yok etme ve yedeklerin yaşam döngüsü tasarlanır. Şu anki prototip localStorage ve dosya eklerini şifrelemediği için gerçek hassas veri kabul etmez."
  },
  {
    key: "2026-10-18-synthetic-prototype-data-policy",
    id: "ROTA-PLAN-040",
    status: "Tamamlandı",
    removeLabels: ["İleri sürüm adayı", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Örnek banka projeleri/işleri ve kişi adları sentetiktir; prototipte gerçek müşteri, hesap, kart veya kimlik verisi kullanılmaz. Arayüz ve kullanıcı dokümantasyonunda da bu sınır belirtilir."
  },
  {
    key: "2026-10-18-production-update-and-redacted-logging-plan",
    id: "ROTA-PLAN-039",
    status: "Devam ediyor",
    removeLabels: ["Öneri"],
    addLabels: ["Devam ediyor"],
    description: "Çalışma alanı yedeği, SHA-256 ek bütünlüğü, uyumsuz yedek doğrulaması, geçici staging ve hata durumunda eski veriyi koruma tamamlandı. Hassas veri içermeyen işletim logları ve güvenilir yazılım güncelleme zinciri Windows dağıtım feature'larıyla birlikte tamamlanmalı. Uygulamada telemetry/console logging yok; hata iletileri kullanıcıya gösterilir."
  },
  {
    key: "2026-10-18-backlog-item-rich-hover-preview",
    id: "ROTA-PLAN-049",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Backlog iş başlığında 260 ms bekleyince tooltip yerine ayrı bir zengin önizleme kartı açılır. Açıklama, durum, öncelik, proje/alan, takım/üye atamaları, plan tarihleri, efor, bağlı bileşenler, etiketler, son aktivite, kabul kriteri/ek sayıları görünür. Kartta bekleme, kapatma ve ayrıntıya geçiş desteklenir; başlığa klavye odağı verilince de açılır."
  },
  {
    key: "2026-10-18-backlog-preview-toggle-and-full-title",
    id: "ROTA-PLAN-049",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Backlog araç çubuğundaki toggle ile başlık önizlemesi açılıp kapatılır; varsayılanı açıktır ve kullanıcı tercihi cihazda saklanır. Önizleme kartı açıklama, durum, öncelik, proje/alan, atama, plan, efor, bileşen, etiket ve aktivite bilgilerini gösterir; iş başlığı satır kaydırarak bütünüyle görünür ve kesilmez."
  },
  {
    key: "2026-10-18-configurable-backlog-columns",
    id: "ROTA-PLAN-044",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Kolonlar panelinden backlog tablosunda gösterilecek alanlar seçilir; kolonlar eklenip gizlenebilir ve yukarı/aşağı taşınarak yeniden sıralanabilir. Başlık kolonu sabittir. Kullanıcı tercihi cihazda saklanır. Tür, ürün alanı, öncelik, durum, güncelleme zamanı, takım/sorumlu, proje, açıklama, etiket, plan tarihi/dönemi, efor, ürün aşaması, release, bileşen, ek/kabul kriteri sayısı, bağımlılık, blokaj ve son aktivite kolonları desteklenir."
  },
  {
    key: "2026-10-18-backlog-saved-views-filters-sort-columns",
    id: "ROTA-PLAN-045",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Backlog Liste ve Board kipleri desteklenir. Kullanıcı adlandırılmış görünümler kaydedip seçebilir; her görünüm proje kapsamını, arama metnini, durum/tür/etiket/takım/üye filtrelerini, sıralama seçimini ve kolon düzenini saklar. Kayıtlı görünüm güncellenebilir, yeniden adlandırılabilir veya silinebilir. Görünüm tercihleri yerel olarak saklanır."
  },
  {
    key: "2026-10-18-backlog-inline-title-status-assignments",
    id: "ROTA-PLAN-046",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Backlog listesindeki iş başlığı, durum ve atamalar satır içinden düzenlenir. Başlık ve durum değişiklikleri aktivite geçmişine kaydedilir. Bloke durumu için gerekli blokaj bilgileri zorunlu alınır, kaydedilince kullanıcı backlogda kalır. Çoklu takım/üye atamaları satır içinden eklenebilir veya kaldırılabilir; geçmişte eski/yeni atamalar açıklanır."
  },
  {
    key: "2026-10-18-backlog-list-tools-placement",
    id: "ROTA-PLAN-044",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Kolonlar panelinden tablo alanları eklenip gizlenebilir ve görünen kolonlar yeniden sıralanabilir. Kolonlar, başlık önizlemesi ve Excel'e aktar araçları aynı, sağa dayalı ikinci araç satırında yer alır; bu satır ve Kolonlar aracı yalnızca Liste kipinde gösterilir, Board kipinde gizlenir. Tercihler cihazda saklanır."
  },
  {
    key: "2026-10-18-backlog-sprint-planning",
    id: "ROTA-PLAN-048",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Liste görünümünde görünür backlog işleri tek tek veya topluca seçilerek sprint oluşturulur. Sprint adı, tek takım, başlangıç ve bitiş tarihi zorunludur; tarih aralığı doğrulanır. Seçilen işler sprint'e bağlanır, sprint kolonu ve iş geçmişinde görünür. Sprint bilgisi ve kapsamı Excel dışa aktarımına dahil edilir."
  },
  {
    key: "2026-10-18-sprint-aware-backlog-export",
    id: "ROTA-PLAN-047",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Excel çalışma kitabı backlog işlerinin sprint alanını ve takım, başlangıç/bitiş tarihi, kapsam adedi ile iş ID'lerini içeren Sprintler sayfasını da dışa aktarır."
  },
  {
    key: "2026-10-18-backlog-sprint-column",
    id: "ROTA-PLAN-044",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Kolonlar panelinden backlog tablosunda gösterilecek alanlar seçilir; kolonlar eklenip gizlenebilir ve yeniden sıralanabilir. Başlık kolonu sabittir ve tercihler cihazda saklanır. Kolon kataloğunda tür, alan, öncelik, durum, güncelleme, atama, proje, açıklama, etiket, plan tarihleri/dönemi, efor, ürün aşaması, release, sprint, bileşenler, ek/kabul kriteri sayıları, bağımlılık, blokaj ve son aktivite bulunur. Sprint kolonu yeni çalışma alanlarında varsayılan görünümde açıktır."
  },
  {
    key: "2026-10-18-work-history-release-event-completion-correction",
    id: "ROTA-PLAN-001",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Backlog işinin oluşturulması, durum/öncelik/atama/tarih değişikliği, ilerleme notu ve dosya ekleri zaman sıralı iş geçmişinde tutulur. Tamamlanma ile release'e çıkış ayrı olaylardır; release kapsamına ekleme/çıkarma ve gerçek yayın olayı ilgili iş geçmişine kaydedilir."
  },
  {
    key: "2026-10-18-progress-notes-status-reconciliation",
    id: "ROTA-PLAN-002",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "İşe eklemeli ilerleme notu eklenebilir; yazar ve zaman otomatik kaydedilir. Not, takımla paylaşılabilir veya PO'ya özel tutulabilir ve dosya eki alabilir."
  },
  {
    key: "2026-10-18-blocker-status-update-reconciliation",
    id: "ROTA-PLAN-003",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Durum değişikliğine not eklenebilir. Bloke durumuna geçerken neden, beklenen karar/iş, sonraki adım ve takip sahibi zorunludur; iş geçmişinde blokaj açılışı/çözülmesi kaydedilir."
  },
  {
    key: "2026-10-18-windows-nsis-installer",
    id: "ROTA-PLAN-041",
    status: "Tamamlandı",
    removeLabels: ["En son öncelik", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Windows x64 için Electron runtime'ını içeren per-user NSIS kurulum paketi üretilebilir. Paket kullanıcıya tek setup dosyası olarak verilebilir; ek Node.js kurulumu gerekmez."
  },
  {
    key: "2026-10-18-windows-package-runtime-included",
    id: "ROTA-PLAN-042",
    status: "Tamamlandı",
    removeLabels: ["En son öncelik", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Paketlenmiş Rota uygulaması Node.js runtime'ını içerir ve hedef Windows bilgisayarında ayrı Node.js kurulumu olmadan açılır."
  },
  {
    key: "2026-10-18-windows-data-preservation-and-review-progress",
    id: "ROTA-PLAN-043",
    status: "Devam ediyor",
    removeLabels: ["Öneri"],
    addLabels: ["En son öncelik", "Devam ediyor"],
    description: "Per-user NSIS kurulum/kaldırma ve sürüm yükseltmede yerel çalışma alanı verisini koruma yapılandırıldı. Oluşturulan test paketi imzasızdır; kurum kod imzalama sertifikasıyla imzalama ve kurum güvenlik incelemesi bekliyor."
  },
  {
    key: "2026-10-18-bounded-data-free-operational-logs",
    id: "ROTA-PLAN-039",
    status: "Devam ediyor",
    removeLabels: ["Öneri"],
    addLabels: ["İleri sürüm adayı", "Devam ediyor"],
    description: "Yerel işletim logları yalnızca zaman, uygulama sürümü, sabit olay adı ve izinli renderer kapanma nedenini yazar. Log 1 MB ile sınırlıdır ve bir önceki log döndürülür; iş, kişi, e-posta, dosya yolu, hata mesajı veya çalışma alanı içeriği loglanmaz. İmzalı uygulama güncelleme zinciri sertifika ve kurum yayın adresi beklediğinden ayrıca sürüyor."
  },
  {
    key: "2026-10-18-signed-windows-update-pipeline",
    id: "ROTA-PLAN-039",
    status: "Devam ediyor",
    removeLabels: ["Öneri"],
    addLabels: ["Devam ediyor"],
    description: "Paketlenmiş Windows uygulamasına güvenli güncelleme akışı eklendi: yalnızca HTTPS feed, paketleme sırasında sabitlenen Authenticode yayıncı adı, varsayılan otomatik indirme yerine kullanıcı onayı ve imza doğrulaması. Akış ancak kurumun kod imzalama sertifikası/yayıncı adı ve HTTPS yayın feed'i sağlanınca paketlenip uçtan uca doğrulanabilir."
  },
  {
    key: "2026-10-19-discovery-210-fraud-protection-journey",
    id: "ROTA-PLAN-210",
    title: "Dolandırıcılık şüphesinde müşteri koruma yolu",
    area: "Müşteri sonucu ve deneyim",
    description: "Şüpheli ödeme anında uyarı, işlemi durdurma, güvenli doğrulama ve olay sonrası destek adımları birlikte tasarlanır; gereksiz engelleme ile koruma dengesi incelenir."
  },
  {
    key: "2026-10-19-phase-1-2-191",
    id: "ROTA-PLAN-191",
    status: "Tamamlandı",
    removeLabels: ["Öneri", "İleri sürüm adayı", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Açık/koyu/sistem tema seçimi korunurken koyu tema tüm ekran yüzeylerine uygulandı: envanter, release, takım, sprint ve backlog alanları; formlar, menüler, etiketler ve önizlemeler aynı paletle okunabilir."
  }
  , ...[
    ["ROTA-PLAN-093", "Kayıtlar arası çapraz bağlantı", "İş detayından backlog işi, ürün bileşeni, release, kişisel karar notu, açık soru ve risk kayıtlarına doğrudan ilişki eklenebilir; bağlantılar iş detayında açılır ve kaldırılır."],
    ["ROTA-PLAN-097", "Arşivde arama", "Arşivlenmiş backlog işleri, projeler ve release'ler; ID, başlık, açıklama ve proje bilgisi üzerinden aranır, sonuçlar arşivden çıkarılabilir."],
    ["ROTA-PLAN-098", "Yinelenen işi bulma yardımcısı", "Yeni backlog işi formunda başlık ve açıklama yazılırken benzer mevcut işler gösterilir; adaydan mevcut işi açmak veya yeni işi sürdürmek mümkündür."],
    ["ROTA-PLAN-090", "Günlük PO planı", "Tarihe göre günlük odak planında backlog işleri ve kişisel görevler sıralanabilir; plan notu cihazda saklanır."],
    ["ROTA-PLAN-092", "Hatırlatma ve takip tarihi", "Kişisel göreve hatırlatma zamanı, bloke işe takip zamanı eklenir. Vakti gelen ve henüz bildirilmemiş takipler uygulama açıldığında ve açıkken bildirimle sunulur."],
    ["ROTA-PLAN-091", "Haftalık ürün özeti", "Seçilen hafta için tamamlanan işler, yeni blokajlar, hedef tarihli işler ve release'ler özetlenir; PO değerlendirmesi kaydedilip metin kopyalanabilir."],
    ["ROTA-PLAN-099", "PO devir paketi", "Proje hedefleri, açık kararlar, blokajlar, riskler, sprintler, release'ler ve ürün notları bir devir özetinde toplanır; PO notu saklanabilir, kopyalanabilir veya yazdırılabilir."]
  ].map(([id, title, description]) => ({
    key: "2026-10-19-phase-3-" + id.slice(-3), id, title, status: "Tamamlandı" as const,
    removeLabels: ["Yeni", "Öneri", "İleri sürüm adayı", "İleri faz öncesi"], addLabels: ["Tamamlanan"], description
  })),
  {
    key: "2026-10-21-compact-inline-assignment-and-type-icons",
    id: "ROTA-PLAN-046",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Backlog hızlı düzenleme kompakt ikonlarla çalışır: sorumlu arama ve atama dar bir satır içi panelden yapılır, ekleme tik ikonu ile onaylanır, atamalar kişi adıyla listelenip küçük kaldırma ikonu ile silinir. Takım adı backlog kolonunda gösterilmez; takım üye seçimine göre arka planda belirlenir. Story, Bug ve Task ayrı tabloda tür kolonu olmadan başlık solundaki türe özgü ikonlarla görünür; tür açıklaması tablo kaydırma alanı dışında sabit katmanda gösterilir, fare ve klavye odağıyla açılır."
  },
  {
    key: "2026-10-21-backlog-type-icon-only-and-no-row-tooltip",
    id: "ROTA-PLAN-044",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Backlog kolon seçicisinden Tür alanı çıkarıldı; iş türü yalnızca başlık solundaki Story/Bug/Task ikonuyla ayırt edilir. Elle sıralama sürükleme davranışı korunur ancak satır üzerinde rahatsız eden tarayıcı tooltip'i gösterilmez."
  },
  {
    key: "2026-10-21-question-answer-in-app-dialog",
    id: "ROTA-PLAN-052",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Açık sorunun yanıtı uygulama içi form penceresinde girilir ve boş yanıt kabul edilmez. Kaydedince yanıt metni ve zamanı saklanır, durum Yanıtlandı olur ve kullanıcı yanıtlanan sorular listesine alınır. Yeniden açma işlemi de Açık filtresine geçip soruyu görünür tutar."
  },
  {
    key: "2026-10-21-daily-plan-focus-layout",
    id: "ROTA-PLAN-090",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Günlük plan; seçili tarih ve Bugün kısayolu, planlanan/tamamlanan/açık sayaçları, sıradaki işleri ve ayrı gün notu panelini tek ekranda sunar. Backlog işi ve kişisel görev eklenebilir, görev tamamlanabilir, kayıtlar küçük yukarı/aşağı kontrolleriyle sıralanıp plandan çıkarılabilir. Günlük not seçilen tarihe göre kaydedilir."
  },
  {
    key: "2026-10-21-backlog-selection-column",
    id: "ROTA-PLAN-100",
    status: "Tamamlandı",
    removeLabels: ["Kullanıcı isteği", "Öneri", "Devam ediyor"],
    addLabels: ["Tamamlanan"],
    description: "Backlog Liste görünümünde ayrı seçim kolonu İş kolonunun solunda yer alır. Başlıktaki checkbox filtrelerle görünür durumdaki tüm işleri seçer; her satırdaki checkbox tek işi seçer. Seçimler sprint oluşturma ve toplu silme işlemlerinde kullanılabilir."
  }
];

// Removed feature-plan records must not be restored into an existing Rota workspace.
export const ROTA_PRODUCT_FEATURE_REMOVALS = ["ROTA-PLAN-238", "ROTA-PLAN-239", "ROTA-PLAN-243"];

