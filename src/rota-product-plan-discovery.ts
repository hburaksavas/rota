import type { RotaProductFeatureImport } from "./rota-product-plan";

// New product-discovery proposals focused on unmet banking product, customer,
// regulatory, financial-correctness, and operational-resilience needs.
const ROTA_PRODUCT_DISCOVERY_CATALOG = [
  "ROTA-PLAN-201|Müşteri yolculuğunda kopan adımlar|Müşteri sonucu ve deneyim|Ürün akışında müşterinin durmak, tekrar denemek veya başka kanala geçmek zorunda kaldığı adımlar; neden, etki ve ürün sahibine bağlanır.",
  "ROTA-PLAN-202|Şikayet temasını ürün adımına bağlama|Müşteri sonucu ve deneyim|Anonimleştirilmiş şikayet temaları etkilenen işlem adımına ve ilgili ürün kararına bağlanır; tekil müşteri verisi saklanmaz.",
  "ROTA-PLAN-203|Müşteri etkisi kapsam aralığı|Müşteri sonucu ve deneyim|Değişiklikten etkilenebilecek müşteri yolculukları, kanallar ve yaklaşık işlem sıklığı aralıkla kaydedilir; etki tahmininin dayanağı görünür olur.",
  "ROTA-PLAN-204|Ürün hizmet sözü kartı|Müşteri sonucu ve deneyim|Bir ürün işlemi için müşteriye vaat edilen tamamlanma süresi, kullanılabilirlik koşulu ve istisnalar açıklanır; tasarım kararları bu söze göre kontrol edilir.",
  "ROTA-PLAN-205|Kanallar arası davranış farkı haritası|Müşteri sonucu ve deneyim|Aynı ürün işleminin mobil, internet şubesi, şube ve çağrı merkezindeki anlamlı davranış farkları ve gerekçeleri tek yerde karşılaştırılır.",
  "ROTA-PLAN-206|Erişilebilirlik engeli ve sahip takibi|Müşteri sonucu ve deneyim|Etkilenen ekran veya işlem, karşılaşılan erişilebilirlik engeli, alternatif yol ve çözüm sahibi kaydedilir; engel kapanana kadar görünür kalır.",
  "ROTA-PLAN-207|Başarısız işlemden toparlanma yolu|Müşteri sonucu ve deneyim|Başarısız, yarım kalmış veya yanlış alıcıya yönelmiş işlemde müşterinin güvenli biçimde nasıl devam edeceği ya da geri döneceği adım adım tanımlanır.",
  "ROTA-PLAN-208|İşlem durumu ve müşteri iletişimi haritası|Müşteri sonucu ve deneyim|İşlem durumlarının hangisinde müşteriye bildirim gönderileceği, hangi bilginin verileceği ve tekrar bildirimlerin nasıl önleneceği belirlenir.",
  "ROTA-PLAN-209|Dijital işlemden insan desteğine bağlam devri|Müşteri sonucu ve deneyim|Müşteri dijital akıştan şube veya çağrı merkezine geçtiğinde tekrar anlatması gereken adımlar ve güvenli biçimde aktarılması gereken bağlam tanımlanır.",
  "ROTA-PLAN-210|Dolandırıcılık şüphesinde müşteri koruma yolu|Müşteri sonucu ve deneyim|Şüpheli ödeme anında uyarı, işlemi durdurma, güvenli doğrulama ve olay sonrası destek adımları birlikte tasarlanır; gereksiz engelleme ile koruma dengesi incelenir.",
  "ROTA-PLAN-211|Düzenleyici yükümlülük tarih çizelgesi|Düzenleyici yükümlülük ve müşteri koruması|Yayımlanmış yükümlülüğün yürürlük, geçiş ve sona erme tarihleri ile ürünün sorumlu sahibi takip edilir; yaklaşan tarihlerin etkisi erkenden görünür.",
  "ROTA-PLAN-212|Kuralın ürün kapsamına uygulanma matrisi|Düzenleyici yükümlülük ve müşteri koruması|Bir kuralın hangi ürün, kanal, müşteri tipi ve işlem türlerine uygulanıp uygulanmadığı gerekçesiyle kaydedilir.",
  "ROTA-PLAN-213|Mevzuat sürümleri arasındaki farklar|Düzenleyici yükümlülük ve müşteri koruması|İki yayımlanmış kural sürümü arasındaki değişen yükümlülükler işaretlenir ve etkilenen ürün alanlarının incelemesi izlenir.",
  "ROTA-PLAN-214|Yükümlülükten kontrole iz zinciri|Düzenleyici yükümlülük ve müşteri koruması|Her ürün kontrolü dayandığı yükümlülüğe, uygulandığı bileşene ve doğrulama kanıtına bağlanır; eksik halka inceleme için görünür olur.",
  "ROTA-PLAN-215|Kontrol kanıtı güncellik takibi|Düzenleyici yükümlülük ve müşteri koruması|Bir kontrolün kanıtı hangi sürüm ve tarihte doğrulandığıyla tutulur; ürün veya kural değiştiğinde eski kanıtın yeniden incelenmesi istenir.",
  "ROTA-PLAN-216|İstisna bitişi ve telafi kontrolü|Düzenleyici yükümlülük ve müşteri koruması|Onaylı ürün istisnasına gerekçe, kapsam, telafi kontrolü ve bitiş tarihi eklenir; süresi dolmuş istisnalar açık risk olarak kalır.",
  "ROTA-PLAN-217|Müşteri sözleşmesi ve açıklama sürümleri|Düzenleyici yükümlülük ve müşteri koruması|Ürün koşulları, ücret açıklamaları ve müşteri bilgilendirme metinleri yürürlük tarihleriyle sürümlenir ve etkilenen akışlara bağlanır.",
  "ROTA-PLAN-218|Düzenleyici rapor tanımı ve sahibi|Düzenleyici yükümlülük ve müşteri koruması|Rapor göstergesinin iş tanımı, veri sahibi, kesim zamanı ve hesaplama sürümü kaydedilir; tanım değişince tüketen raporlar gözden geçirilir.",
  "ROTA-PLAN-219|Düzenleyici talep yanıt paketi|Düzenleyici yükümlülük ve müşteri koruması|Belirli bir denetim veya bilgi talebi için kapsam, sorumlu, son tarih ve kanıt referansları tek bir izlenebilir çalışma paketinde toplanır.",
  "ROTA-PLAN-220|Müşteriye adil davranış senaryoları|Düzenleyici yükümlülük ve müşteri koruması|Ücret, ret, gecikme ve itiraz senaryoları müşteri aleyhine sürpriz veya orantısız sonuç açısından gözden geçirilir; kararın gerekçesi kaydedilir.",
  "ROTA-PLAN-221|Muhasebe ve valör tarihi davranışı|Finansal doğruluk ve işlem kuralları|İşlem tarihi, muhasebeleşme tarihi ve valör tarihinin hangi koşullarda ayrıştığı ürün örnekleriyle belgelenir; ekran ve rapor davranışı aynı kurala bağlanır.",
  "ROTA-PLAN-222|Bakiye türü gösterim kuralları|Finansal doğruluk ve işlem kuralları|Defter bakiyesi, kullanılabilir bakiye, bloke tutar ve bekleyen işlem toplamının hangi ekranda nasıl anlatılacağı netleştirilir.",
  "ROTA-PLAN-223|Ücret ve vergi bileşeni açıklaması|Finansal doğruluk ve işlem kuralları|İşlem toplamını oluşturan ücret, vergi ve muafiyet bileşenleri hesaplama dayanağıyla tarif edilir; müşteriye gösterilen toplamla tutarlılık incelenir.",
  "ROTA-PLAN-224|Para birimi hassasiyet matrisi|Finansal doğruluk ve işlem kuralları|Para birimi ve işlem türü başına ondalık hassasiyet, yuvarlama yöntemi ve ara hesap davranışı kaydedilir; farklı kanallardaki farklar yakalanır.",
  "ROTA-PLAN-225|İade ve itiraz sonuç yolları|Finansal doğruluk ve işlem kuralları|İade, iptal ve harcama itirazının birbirinden farklı sonuçları, durumları ve muhasebe etkileri ortak bir işlem haritasında ayrıştırılır.",
  "ROTA-PLAN-226|İşlem tekrar güvenliği sözleşmesi|Finansal doğruluk ve işlem kuralları|Her kritik işlem için tekrar isteğinin yeni işlem mi yoksa güvenli tekrar mı sayılacağı, anahtar ömrü ve istemci davranışı tanımlanır.",
  "ROTA-PLAN-227|Mükerrer işlemi önleme değişmezleri|Finansal doğruluk ve işlem kuralları|Para hareketinde asla bozulmaması gereken tekillik ve tutar kuralları ürün diliyle yazılır, ilişkili servis ve doğrulama noktalarına bağlanır.",
  "ROTA-PLAN-228|Belirsiz zaman aşımı sonuç yolu|Finansal doğruluk ve işlem kuralları|İstek zaman aşımına uğrayıp işlem sonucu henüz bilinmiyorsa müşterinin tekrar göndermesi, beklemesi veya destek alması için güvenli yol tanımlanır.",
  "ROTA-PLAN-229|Batch yeniden çalıştırma güvenlik matrisi|Finansal doğruluk ve işlem kuralları|Batch adımlarının hangi koşulda yeniden çalıştırılabileceği, tekrar üretim riski ve mutabakat sonrası kontrolü işleme göre kayıt altına alınır.",
  "ROTA-PLAN-230|Mutabakat farkı neden kataloğu|Finansal doğruluk ve işlem kuralları|Sık görülen farklar zamanlama, veri kesiti, dönüşüm veya gerçek işlem hatası gibi nedenlerle sınıflanır ve doğru inceleme sahibine yönlendirilir.",
  "ROTA-PLAN-231|Sistemler arası iş günü ve saat eşlemesi|Finansal doğruluk ve işlem kuralları|İşlem, muhasebe, batch ve rapor sistemlerinin iş günü sınırı ile zaman dilimi varsayımları karşılaştırılır; tarih kaymasına yol açan farklar belirlenir.",
  "ROTA-PLAN-232|Kısmi işlem kabul politikası|Finansal doğruluk ve işlem kuralları|Toplu veya bölünebilir işlemde bazı kalemler başarılı, bazıları başarısız olduğunda ürünün tamamla, geri al veya kullanıcıya seçim sun davranışı belirlenir.",
  "ROTA-PLAN-233|Bekleyen ve kesinleşen kayıt görünürlüğü|Finansal doğruluk ve işlem kuralları|Bekleyen hareketin, kesinleşen kaydın ve hesap hareketi görünümünün geçiş anındaki ilişkisi tanımlanır; kaybolma veya çift görünme önlenir.",
  "ROTA-PLAN-234|Otomatik talimat iptal sınırları|Finansal doğruluk ve işlem kuralları|Düzenli ödeme veya ileri tarihli talimatın hangi aşamaya kadar iptal edilebildiği ve sonrasında hangi itiraz yolunun kaldığı açıklanır.",
  "ROTA-PLAN-235|Faiz ve komisyon zaman kuralları|Finansal doğruluk ve işlem kuralları|Faiz veya komisyonun hangi olayla başladığı, durduğu ve hangi gün bazını kullandığı ürün örnekleriyle kayıt edilir.",
  "ROTA-PLAN-236|Kanal bazında kısıtlı hizmet modu|Operasyon dayanıklılığı ve hizmet sürekliliği|Bir servis kısmen kullanılamadığında hangi işlemlerin hangi kanalda duracağı, devam edeceği veya güvenli alternatif sunacağı önceden belirlenir.",
  "ROTA-PLAN-237|Kesintide müşteri durum bilgilendirme koşulları|Operasyon dayanıklılığı ve hizmet sürekliliği|Kesinti sırasında müşteriye hangi işlem durumu bilgisinin hangi koşulda verileceği belirlenir; belirsiz veya çelişkili mesajlar önlenir.",
  "ROTA-PLAN-240|Operasyon kuyruğu sinyalinden ürün aksiyonu|Operasyon dayanıklılığı ve hizmet sürekliliği|İşlem kuyruğu veya manuel inceleme birikimi belirlenen eşiği aşınca ilgili ürün sahibine bağlamlı inceleme kaydı açma önerisi oluşturulur.",
  "ROTA-PLAN-241|Kurtarma tatbikatı öğrenimleri|Operasyon dayanıklılığı ve hizmet sürekliliği|Kesinti veya kurtarma tatbikatı sonrasında bulunamayan karar, geciken adım ve başarısız varsayım kaydedilip ürün davranışına bağlanır.",
  "ROTA-PLAN-242|Bakım penceresinde izinli işlemler|Operasyon dayanıklılığı ve hizmet sürekliliği|Planlı bakım süresince devam edebilecek, ertelenecek veya reddedilecek işlemler kanal ve müşteri etkisiyle listelenir.",
  "ROTA-PLAN-244|Tedarikçi taahhüt ve kanıt süresi|Operasyon dayanıklılığı ve hizmet sürekliliği|Dış hizmetin sözleşme yenileme, güvenlik kanıtı veya sertifika geçerlilik tarihleri etkilenen ürün fonksiyonlarıyla ilişkilendirilir.",
  "ROTA-PLAN-245|İşlem durumunun sistemlere yayılma hedefi|Operasyon dayanıklılığı ve hizmet sürekliliği|Ödeme veya hesap olayının kanal, bildirim, muhasebe ve rapora ne kadar sürede yansımasının beklendiği ayrı ayrı tanımlanır; gecikmenin sahibi bulunur.",
  "ROTA-PLAN-246|Destek ekibinin ürün çözüm boşlukları|Operasyon dayanıklılığı ve hizmet sürekliliği|Çağrı merkezi ve operasyon ekibinin çözmek için başka ekibe aktarmak zorunda kaldığı vaka nedenleri anonim biçimde izlenir ve ürün iyileştirmesine dönüşür.",
  "ROTA-PLAN-247|Ürün alanı devir bilgi kontrolü|Ürün bilgisi ve süreklilik|Ürün alanı sahibi değişirken kritik kararlar, istisnalar, açık uyum konuları ve operasyon gerçekleri yeni sahibin doğruladığı bir devir kaydında toplanır.",
  "ROTA-PLAN-248|Veri dönüşümü kaynak-hedef izi|Ürün bilgisi ve süreklilik|Bir taşıma veya dönüşümde kaynak alan, hedef alan, dönüşüm kuralı, istisna ve doğrulama sahibi belgelenir; yalnızca şema adı değil iş anlamı korunur.",
  "ROTA-PLAN-249|Pazara göre ürün davranış varyantları|Ürün bilgisi ve süreklilik|Farklı ülke, tüzel yapı veya para piyasalarında değişen ürün kuralları ortak temel davranıştan ayrıştırılır; her varyantın sahibi ve nedeni görünür olur.",
  "ROTA-PLAN-250|Ürün bilgisinin güncellik sorumlusu|Ürün bilgisi ve süreklilik|Kritik ürün kuralı, işlem akışı veya operasyon varsayımına doğrulama sahibi ve gözden geçirme tarihi atanır; eskimiş bilgi sessizce doğru kabul edilmez."
];

export const ROTA_PRODUCT_DISCOVERY_ADDITIONS: RotaProductFeatureImport[] = ROTA_PRODUCT_DISCOVERY_CATALOG.map((row) => {
  const [id, title, area, description] = row.split("|");
  return { id, title, type: "Story", status: "Yeni", priority: "Düşük", area, description, labels: ["Ürün planı", "Öneri", "İleri sürüm adayı"] };
});
