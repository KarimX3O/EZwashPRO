const receipts = JSON.parse(localStorage.getItem('receipts') || []);

// مجموع عام
const totalAll = receipts.reduce((sum, r) => sum + r.total, 0);

// عدد الوصولات
const receiptsCount = receipts.length;

// حساب القطع
let itemsCount = {};
receipts.forEach(r => {
  r.content.split("\n").forEach(line => {
    if (!line.trim()) return;

    let clean = line.split("----------------->")[0].trim();
    let parts = clean.split(" ");
    let qty = parseFloat(parts[0]);
    let name = parts.slice(1).join(" ");

    itemsCount[name] = (itemsCount[name] || 0) + qty;
  });
});

let sortedItems = Object.entries(itemsCount).sort((a,b)=>b[1]-a[1]);
let mostItem = sortedItems[0] || ["-", 0];
let leastItem = sortedItems[sortedItems.length-1] || ["-", 0];

// تصبين سريع
let fastCount = receipts.filter(r => r.fast).length;

// مدفوع
let paidCount = receipts.filter(r => r.paid).length;

// غير مدفوع
let unpaidTotal = receipts
  .filter(r => !r.paid)
  .reduce((sum, r) => sum + r.total, 0);

// عرض فـ HTML
document.getElementById("totalAll").innerHTML =`
 <h3>$ ${totalAll}</h3>
  <p>💰درهم</p><span></span>
`
  

document.getElementById("receiptsCount").textContent =
  "🧾 عدد الوصولات: " + receiptsCount;

document.getElementById("mostItem").textContent =
  "👕 أكثر قطعة: " + mostItem[0] + " (" + mostItem[1] + ")";

document.getElementById("leastItem").textContent =
  "👖 أقل قطعة: " + leastItem[0] + " (" + leastItem[1] + ")";

document.getElementById("fastCount").textContent =
  "⚡ عدد التصبين السريع: " + fastCount;

document.getElementById("paidCount").textContent =
  "✅ الوصولات المدفوعة: " + paidCount;

document.getElementById("unpaidTotal").textContent =
  "❌ مجموع غير المدفوع: " + unpaidTotal + " درهم";


  function indes() {
  window.location.href = 'index.html';
}
