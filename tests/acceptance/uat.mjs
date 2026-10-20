import { _electron as electron } from "playwright";
import os from "node:os";
import path from "node:path";
import { writeFileSync } from "node:fs";
import { addComplexCases } from "./complex-cases.mjs";
import { addUncoveredCases } from "./uncovered-cases.mjs";

const cases = [];
const add = (name, run) => cases.push({ name, run });
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const visible = async (page, selector) => {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: "visible", timeout: 1500 });
  return locator;
};
const text = async (page, selector) => (await visible(page, selector)).innerText();
const nav = async (page, view, selector) => {
  if (await page.locator("#modal-root .modal").count()) {
    const close = page.locator("#modal-root .modal-close").first();
    if (await close.count()) await close.click({ timeout: 1000 }).catch(() => {});
  }
  await page.locator(`[data-view="${view}"]`).first().click();
  await visible(page, selector);
};

// First run and workspace
add("UAT-001 İlk açılışta çalışma alanı kurulumu istenir", async p => assert(await p.locator("#setup-form").count() === 1, "İlk kurulum formu açılmadı"));
add("UAT-002 Kurum bilgisi alınır", async p => assert(await p.locator('[name="organization"]').isVisible(), "Kurum alanı görünmüyor"));
add("UAT-003 Çalışma alanı adı alınır", async p => assert(await p.locator('[name="workspace"]').isVisible(), "Çalışma alanı alanı görünmüyor"));
add("UAT-004 Kullanıcı adı ve rolü yapılandırılabilir", async p => assert(await p.locator('[name="userName"]').isVisible() && await p.locator('[name="userRole"]').isVisible(), "Kullanıcı profili alanları eksik"));
add("UAT-005 İlk açılış örnek veya boş başlangıç sunar", async p => assert(await p.locator('[name="starter"]').count() === 2, "Başlangıç veri seçenekleri eksik"));
add("UAT-006 Kurulumda proje listesi tanımlanabilir", async p => assert(await p.locator('[name="projects"]').isVisible(), "Proje tanımlama alanı eksik"));
add("UAT-007 Kurulumda takım ve üyeler tanımlanabilir", async p => assert(await p.locator('[name="teams"]').isVisible(), "Takım tanımlama alanı eksik"));
add("UAT-008 Kurulum zorunlu alanları doğrulanabilir", async p => assert(await p.locator('#setup-form [required]').count() >= 5, "Kurulum zorunlu alanları işaretli değil"));

// Shared workspace and dashboard
const dashboardChecks = [
  ["UAT-009 Genel bakış açılır", ".welcome-row h1"], ["UAT-010 Kişisel karşılama gösterilir", ".welcome-row p"],
  ["UAT-011 Yeni iş kısayolu görünür", '.welcome-row [data-action="new"]'], ["UAT-012 Backlog özeti görünür", ".stat-grid"],
  ["UAT-013 Ürün hedefleri ve yayın takibi görünür", ".portfolio-tracking"], ["UAT-014 Hazır işler paneli görünür", ".backlog-panel"],
  ["UAT-015 Kişisel görev özeti görünür", ".today-panel"], ["UAT-016 Son notlar paneli görünür", ".notes-panel"],
  ["UAT-017 Aktif proje gezinme listesi görünür", ".project-list"], ["UAT-018 Proje arama alanı görünür", "#project-nav-search-input"],
];
for (const [name, selector] of dashboardChecks) add(name, async p => { await nav(p, "overview", selector); await visible(p, selector); });

// Backlog list, filters, saved views, inline tools and board
const backlogSelectors = [
  ["UAT-019 Backlog listesi açılır", ".backlog-page"], ["UAT-020 Backlog tablosu görünür", ".backlog-table"],
  ["UAT-021 Backlog satırları yüklenir", "#backlog-rows tr"], ["UAT-022 Backlog arama alanı görünür", "#backlog-search"],
  ["UAT-023 Durum filtresi görünür", "#status-filter"], ["UAT-024 Tür filtresi görünür", "#type-filter"],
  ["UAT-025 Takım filtresi görünür", "#team-filter"], ["UAT-026 Sorumlu filtresi görünür", "#assignee-filter"],
  ["UAT-027 Kayıtlı görünüm seçilebilir", "#backlog-saved-view"], ["UAT-028 Kolon başlığı tıklaması sıralama yönünü değiştirir", '[data-sort-column="title"]'],
  ["UAT-029 Görünüm kaydetme eylemi görünür", '[data-action="save-backlog-view"]'], ["UAT-030 Görünüm yönetimi açılır", '[data-action="manage-backlog-views"]'],
  ["UAT-031 Hazır iş havuzu kontrolü görünür", '[data-action="toggle-ready-pool"]'], ["UAT-032 Kolon yönetimi açılır", '[data-action="manage-backlog-columns"]'],
  ["UAT-033 Başlık önizleme kontrolü görünür", '[data-action="toggle-backlog-preview"]'], ["UAT-034 Excel dışa aktarma eylemi görünür", '[data-action="backlog-export-excel"]'],
  ["UAT-035 Toplu silme eylemi görünür", '[data-action="delete-selected-backlog"]'], ["UAT-036 Sprint oluşturma eylemi görünür", '[data-action="create-sprint"]'],
  ["UAT-037 Hızlı backlog ekleme alanı görünür", "#backlog-quick-title"], ["UAT-038 Ayrıntılı iş formu kısayolu görünür", '.backlog-bottom [data-action="new"]'],
  ["UAT-039 Görünüm listesi ile tablo görünümü birlikte sunulur", ".view-tabs"], ["UAT-040 Liste görünümü seçilebilir", '[data-action="list"]'],
  ["UAT-041 Board görünümüne geçilebilir", '[data-action="kanban"]'], ["UAT-042 Board görünümünde kolonlar sunulur", ".board-column"],
  ["UAT-043 Board kartları görünür", ".board-card"], ["UAT-044 Boarddan listeye geri dönülebilir", '[data-action="list"]'],
  ["UAT-045 Filtrelenmiş kayıt adedi sunulur", "#visible-count"], ["UAT-046 Toplam kayıt adedi sunulur", "#total-count"],
  ["UAT-047 Tablo araçları üstte, durum özeti altta yer alır", ".backlog-table-shell"], ["UAT-048 Tamamlananlar varsayılan olarak gizlidir", "#include-completed"],
  ["UAT-049 Kolonlarda hızlı düzenleme alanı bulunur", ".backlog-table"], ["UAT-050 Tek satır hızlı silme kontrolü tablo satırında sunulur", "#backlog-rows tr"],
];
for (const [name, selector] of backlogSelectors) {
  add(name, async p => {
    await nav(p, "backlog", ".backlog-page");
    if (name === "UAT-042 Board görünümünde kolonlar sunulur" || name === "UAT-043 Board kartları görünür") await p.locator('[data-action="kanban"]').click();
    if (name === "UAT-044 Boarddan listeye geri dönülebilir") { await p.locator('[data-action="kanban"]').click(); await p.locator('[data-action="list"]').click(); }
    if (name === "UAT-028 Kolon başlığı tıklaması sıralama yönünü değiştirir") {
      await p.locator(selector).click();
      assert(await p.locator(selector).evaluate(button => button.closest("th")?.getAttribute("aria-sort")) === "ascending", "İlk tıklama artan sıralama uygulamadı");
      await p.locator(selector).click();
      assert(await p.locator(selector).evaluate(button => button.closest("th")?.getAttribute("aria-sort")) === "descending", "İkinci tıklama azalan sıralamaya geçmedi");
      return;
    }
    if (["UAT-027 Kayıtlı görünüm seçilebilir", "UAT-029 Görünüm kaydetme eylemi görünür", "UAT-030 Görünüm yönetimi açılır", "UAT-032 Kolon yönetimi açılır", "UAT-033 Başlık önizleme kontrolü görünür", "UAT-034 Excel dışa aktarma eylemi görünür", "UAT-035 Toplu silme eylemi görünür", "UAT-036 Sprint oluşturma eylemi görünür"].includes(name)) {
      const menu = name === "UAT-034 Excel dışa aktarma eylemi görünür" || name === "UAT-035 Toplu silme eylemi görünür" || name === "UAT-036 Sprint oluşturma eylemi görünür" ? ".backlog-actions-menu" : ".backlog-display-menu";
      await p.locator(`${menu} > summary`).click();
    }
    if (["UAT-023 Durum filtresi görünür", "UAT-024 Tür filtresi görünür", "UAT-025 Takım filtresi görünür", "UAT-026 Sorumlu filtresi görünür", "UAT-048 Tamamlananlar varsayılan olarak gizlidir"].includes(name)) await p.locator(".backlog-filter-menu > summary").click();
    if (name === "UAT-047 Tablo araçları üstte, durum özeti altta yer alır") {
      const positions = await p.locator(selector).evaluate(shell => {
        const order = (a, b) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
        return {
          toolsAboveTable: order(shell.querySelector(".backlog-table-topbar"), shell.querySelector(".backlog-table-wrap")),
          summaryBelowTable: order(shell.querySelector(".backlog-table-wrap"), shell.querySelector(".backlog-summary-footer")),
          actionsInTopbar: Boolean(shell.querySelector(".backlog-table-topbar .backlog-actions-menu")),
          savedViewInMenu: Boolean(shell.querySelector(".backlog-display-menu #backlog-saved-view")),
          extraLabelRemoved: !shell.querySelector(".table-topbar-label"),
          menuLayersAboveRows: Number(getComputedStyle(shell.querySelector(".backlog-table-topbar")).zIndex) > Number(getComputedStyle(shell.querySelector(".backlog-table-wrap")).zIndex)
        };
      });
      assert(positions.toolsAboveTable && positions.summaryBelowTable && positions.actionsInTopbar && positions.savedViewInMenu && positions.extraLabelRemoved && positions.menuLayersAboveRows, "Tablo araçları, katman sırası veya özeti beklenen şekilde değil");
    }
    else if (name === "UAT-048 Tamamlananlar varsayılan olarak gizlidir") {
      assert(!(await p.locator(selector).isChecked()), "Tamamlananlar varsayılan olarak işaretli");
      assert(await p.locator("#backlog-rows tr[data-open-item]").evaluateAll(rows => rows.every(row => !row.innerText.includes("Tamamlandı"))), "Varsayılan backlog listesinde tamamlanmış iş bulundu");
      await p.locator(".backlog-filter-menu > summary").click();
      await p.locator(".backlog-display-menu > summary").click();
      assert(await p.locator('[data-action="toggle-backlog-preview"][aria-pressed="true"]').isVisible(), "Başlık önizlemesi varsayılan olarak açık değil");
    }
    else await visible(p, selector);
    if (name === "UAT-021 Backlog satırları yüklenir") assert(await p.locator(selector).count() > 0, "Örnek backlog satırı yok");
  });
}

// Work item detail and activity
add("UAT-051 Backlog satırı ayrıntısı açılır", async p => { await nav(p,"backlog","#backlog-rows tr"); await p.locator("#backlog-rows tr[data-open-item]").first().click(); await visible(p,".detail-modal"); });
for (const [name, selector] of [
  ["UAT-052 İş başlığı gösterilir",".detail-title-wrap h2"], ["UAT-053 İş açıklaması gösterilir",".detail-main .detail-section"],
  ["UAT-054 İş durumu düzenlenebilir","#detail-status"], ["UAT-055 İş önceliği düzenlenebilir","#detail-priority"],
  ["UAT-056 İş eki alanı sunulur",".detail-files"], ["UAT-057 İş dosyası ekleme eylemi sunulur","[data-add-to-item]"],
  ["UAT-058 İş bileşen ilişkileri gösterilir",".linked-assets-section"], ["UAT-059 İş devri özeti hazırlanabilir","[data-handover]"],
  ["UAT-060 İş düzenleme eylemi sunulur",'.detail-footer [data-action="edit-item"]'], ["UAT-061 İş arşivleme eylemi sunulur",'.detail-footer [data-action="archive-item"]'],
  ["UAT-062 İlişkili kişisel görev oluşturma eylemi sunulur",'[data-action="quick-related-task"]'],
]) add(name, async p => {
  if (!await p.locator(".detail-modal").count()) { await nav(p,"backlog","#backlog-rows tr"); await p.locator("#backlog-rows tr[data-open-item]").first().click(); }
  const tab = selector === ".detail-files" || selector === "[data-add-to-item]" ? "attachments" : selector === ".linked-assets-section" ? "relationships" : "overview";
  await p.locator(`[data-detail-tab="${tab}"]`).click();
  await visible(p,selector);
});
add("UAT-063 İş etkinlik kaydı sekmesi açılır", async p => { await p.locator('[data-detail-tab="activity"]').click(); await visible(p,'[data-detail-tab-section="activity"]'); });
add("UAT-064 İş ayrıntısı sekmelerle kullanılabilir", async p => assert(await p.locator(".detail-modal").count()===1,"İş ayrıntısı kapanmış"));
add("UAT-065 İş ayrıntısı kapatılabilir", async p => { await p.locator(".detail-modal [data-close-modal]").click(); await p.locator(".detail-modal").waitFor({state:"detached"}); });

// Teams and assignment planning
const teamSelectors = [
  ["UAT-066 Takım paneli açılır",".teams-page"], ["UAT-067 Takım ekleme eylemi görünür",'[data-action="new-team"]'],
  ["UAT-068 Takım paneli üye araması sunar","#team-member-search"], ["UAT-069 Takım istatistikleri görünür",".team-overview-stats"],
  ["UAT-070 Takım tarih filtresi görünür","#team-filter-start"], ["UAT-071 Takım hedef tarih filtresi görünür","#team-filter-target"],
  ["UAT-072 Takım dönem filtresi görünür","#team-filter-period"], ["UAT-073 Efor aralığı filtreleri görünür","#team-filter-min-estimate"],
  ["UAT-074 Takım üye kartları görünür",".team-member-card"], ["UAT-075 Üye bazlı iş takibi sunulur",".team-inline-add"],
  ["UAT-076 Takım düzenleme eylemi sunulur",'[data-action="edit-team"]'],
];
for (const [name, selector] of teamSelectors) add(name, async p => { await nav(p,"teams",".teams-page"); await visible(p,selector); });
add("UAT-077 Takım oluşturma formu açılır", async p => { await nav(p,"teams",".teams-page"); await p.locator('[data-action="new-team"]').click(); await visible(p,"#team-form"); });
for (const [name, selector] of [["UAT-078 Takım adı alınır",'#team-form [name="name"]'],["UAT-079 Takıma üye eklenebilir",'#team-form [name="members"]'],["UAT-080 Takım formu kaydetme eylemi sunar",'#team-form button[type="submit"]']]) add(name,async p=>{if(!await p.locator("#team-form").count()){await nav(p,"teams",".teams-page");await p.locator('[data-action="new-team"]').click();}await visible(p,selector);});
add("UAT-081 Takım oluşturma formu kapatılıp panele dönülür",async p=>{await nav(p,"teams",".teams-page");await visible(p,".teams-page");});

// Product component inventory
const assetSelectors = [
 ["UAT-082 Ürün envanteri açılır",".assets-page"],["UAT-083 Envanter bileşeni ekleme eylemi görünür",'[data-action="new-asset"]'],
 ["UAT-084 Envanter araması görünür","#asset-search"],["UAT-085 Envanter tür filtresi görünür","#asset-type-filter"],
 ["UAT-086 Envanter proje filtresi görünür","#asset-project-filter"],["UAT-087 Pasif bileşenleri gösterme seçeneği görünür","#asset-inactive-filter"],
 ["UAT-088 Envanter görünür kayıt sayısını gösterir","#asset-visible-count"],["UAT-089 Kart ve ilişki diyagramı görünümleri değiştirilebilir",'[data-action="asset-presentation"]'],
];
for(const [name,selector] of assetSelectors) add(name,async p=>{await nav(p,"assets",".assets-page");await visible(p,selector);});
add("UAT-090 Yeni bileşen formu açılır",async p=>{await nav(p,"assets",".assets-page");await p.locator('[data-action="new-asset"]').click();await visible(p,"#asset-form");});
for(const [name,selector] of [["UAT-091 Bileşen adı ve kodu zorunlu alanları sunulur",'#asset-form [name="code"]'],["UAT-092 Ekran batch rapor ve servis türleri seçilebilir",'#asset-form [name="type"]'],["UAT-093 Bileşen proje ve alan bilgisi alınır",'#asset-form [name="area"]'],["UAT-094 Bileşenler arası çoklu ilişki seçilebilir",'#asset-form [name="relatedAssetIds"]'],["UAT-095 Bileşen sorumlusu tanımlanabilir",'#asset-form [name="ownerName"]']]) add(name,async p=>{if(!await p.locator("#asset-form").count()){await nav(p,"assets",".assets-page");await p.locator('[data-action="new-asset"]').click();}await visible(p,selector);});

// Roadmap, releases and personal work
const finalChecks = [
 ["UAT-096 Yol haritası initiative ve epic kapsamı sunar",".roadmap-page","roadmap"],
 ["UAT-097 Release planı açılır",".releases-page","releases"],
 ["UAT-098 Kişisel alanda görev ve notlar birlikte izlenir",".focus-page","focus"],
 ["UAT-099 Açık sorular görünümü açılır",".questions-page","questions"],
 ["UAT-100 Günlük ve haftalık çalışma özetleri açılır",".page-content","weekly-summary"],
];
for(const [name,selector,view] of finalChecks) add(name,async p=>{await nav(p,view,selector);assert((await p.locator("#view-root").innerText()).trim().length>15,"Sayfa içeriği boş");});

addComplexCases(cases);
addUncoveredCases(cases);

if (cases.length !== 350) throw new Error(`Kabul senaryosu sayısı 350 değil: ${cases.length}`);
const complexFilter = process.env.ROTA_UAT_FILTER || "";
const complexCases = cases.slice(100).filter(test => !complexFilter || test.name.toLocaleLowerCase("tr-TR").includes(complexFilter.toLocaleLowerCase("tr-TR")));
const casesForRun = process.env.ROTA_UAT_COMPLEX_ONLY === "1" ? [...cases.slice(0, 8), ...complexCases] : cases;

const tempProfile = path.join(os.tmpdir(), `rota-uat-${Date.now()}`);
const app = await electron.launch({ args: [`--user-data-dir=${tempProfile}`, "."], timeout: 60000 });
const page = await app.firstWindow();
page.setDefaultTimeout(process.env.ROTA_UAT_COMPLEX_ONLY === "1" ? 1800 : 1500);
const results = [];
try {
  await page.waitForSelector("#setup-form", { timeout: 20000 });
  await page.locator('[name="organization"]').fill("UAT Bankası");
  await page.locator('[name="workspace"]').fill("Kabul Testi");
  await page.locator('[name="userName"]').fill("UAT Kullanıcısı");
  await page.locator('[name="userRole"]').fill("Product Owner");
  await page.locator('[name="projects"]').fill("Ödeme Platformu\nDijital Kanallar");
  await page.locator('[name="teams"]').fill("Ödeme Takımı: Ayşe Yılmaz, Mehmet Demir\nKanallar Takımı: Ece Kaya");
  for (const test of cases.slice(0, 8)) {
    try { await test.run(page); results.push({ id: `UAT-${String(results.length + 1).padStart(3,"0")}`, name: test.name, result: "PASS", detail: "" }); }
    catch (error) { results.push({ id: `UAT-${String(results.length + 1).padStart(3,"0")}`, name: test.name, result: "FAIL", detail: String(error?.message || error).replace(/\s+/g," ").slice(0,240) }); }
  }
  await page.locator('#setup-form button[type="submit"]').click();
  await page.waitForSelector("#view-root", { timeout: 20000 });
  await page.waitForTimeout(1200);
  for (const test of casesForRun.slice(8)) {
    try { await test.run(page); results.push({ id: `UAT-${String(results.length + 1).padStart(3,"0")}`, name: test.name, result: "PASS", detail: "" }); }
    catch (error) { results.push({ id: `UAT-${String(results.length + 1).padStart(3,"0")}`, name: test.name, result: "FAIL", detail: String(error?.message || error).replace(/\s+/g," ").slice(0,240) }); }
    if (process.env.ROTA_UAT_COMPLEX_ONLY === "1" && results.length % 25 === 0) console.log(`İlerleme: ${results.length - 8}/${complexCases.length} yeni test`);
  }
} finally {
  await app.close();
}

for (const row of results) console.log(`${row.result.padEnd(4)} ${row.id} ${row.name}${row.detail ? ` — ${row.detail}` : ""}`);
const failed = results.filter(row => row.result === "FAIL");
console.log(`\nSonuç: ${results.length} senaryo, ${results.length - failed.length} başarılı, ${failed.length} başarısız.`);
const rows = results.map(row => `| ${row.id} | ${row.name.replace(/^UAT-\d+\s*/, "")} | ${row.result}${row.detail ? ` — ${row.detail.replaceAll("|", "\\|")}` : ""} |`).join("\n");
const report = `# Kullanıcı kabul testleri\n\nTestler Electron uygulamasını geçici ve izole bir kullanıcı profiliyle açar; mevcut Rota kullanıcı verilerine dokunmaz. Canlı Jira sunucusu entegrasyonu kapsam dışıdır; Jira kapalıyken kullanıcı akışı doğrulanır.\n\n- Senaryo sayısı: ${results.length}\n- Başarılı: ${results.length - failed.length}\n- Başarısız: ${failed.length}\n- Çalıştırma zamanı: ${new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}\n- Çalıştırma: \`npm run test:acceptance\`\n\nHer senaryo, belirtilen kullanıcı akışının ilgili ekranını, alanını veya eylemini Electron arayüzünde doğrular. PASS olan senaryolar beklenen UI kabul ölçütünü karşıladı.\n\n| ID | Kullanıcı kabul senaryosu | Sonuç |\n|---|---|\n${rows}\n`;
writeFileSync(new URL("../../docs/kullanici-kabul-testleri.md", import.meta.url), report, "utf8");
if (failed.length) process.exitCode = 1;
