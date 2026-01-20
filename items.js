// **ملاحظة هامة:** يجب أن تكون المصفوفات (TikitM, TikitS, TikitSB) معرّفة في ملفك الرئيسي (script.js) قبل تحميل هذا الملف.

// =======================================================
// 1. وظيفة العرض (Render)
// =======================================================

function renderTable(id, data) {
  const tbody = document.getElementById(id);
  // إضافة خاصية data-type للـ tbody لتحديد الفئة عند التعديل
  tbody.setAttribute('data-type', id.replace('table', '').toLowerCase());
  tbody.innerHTML = "";

  data.forEach((item) => {
    const tr = document.createElement("tr");
    
    // إضافة data-label ليتناسب مع التنسيق المتجاوب (Responsive CSS)
    
    // ID
    const tdId = document.createElement("td");
    tdId.setAttribute('data-label', 'ID');
    tdId.textContent = item.id;
    tr.appendChild(tdId);

    // الاسم
    const tdName = document.createElement("td");
    tdName.setAttribute('data-label', 'القطعة');
    tdName.textContent = item.name;
    tr.appendChild(tdName);

    // الثمن (input قابل للتغيير)
    const tdPrice = document.createElement("td");
    tdPrice.setAttribute('data-label', 'الثمن');
    
    const input = document.createElement("input");
    input.type = "number";
    input.value = item.pric;
    input.style.width = "80px";
    
    // لضمان التنسيق الجيد داخل جدول الإدارة
    input.style.textAlign = 'center'; 
    input.style.padding = '5px';

    input.addEventListener("change", (e) => {
      // البحث عن العنصر بالاسم في المصفوفة وتحديث الثمن
      // نستخدم findIndex و item.name لضمان تحديث العنصر الصحيح
      const newValue = parseFloat(e.target.value);
      const index = data.findIndex(i => i.id === item.id);
      
      if (index !== -1 && !isNaN(newValue) && newValue >= 0) {
          data[index].pric = newValue; // تحديث الثمن في المصفوفة
          saveData(); // نحفظ مباشرة بعد التغيير
      } else {
          // إعادة قيمة الإدخال للقيمة القديمة إذا كان الإدخال غير صالح
          e.target.value = item.pric; 
          alert("⚠️ الثمن غير صالح أو يجب أن يكون رقماً موجباً.");
      }
    });

    tdPrice.appendChild(input);
    
    // عرض /متر إذا كانت القطعة تحسب بالمتر
    if(item.byMeter) {
        const meterSpan = document.createElement('span');
        meterSpan.textContent = " /متر";
        meterSpan.style.marginRight = '5px';
        tdPrice.appendChild(meterSpan);
    }
    
    tr.appendChild(tdPrice);

    tbody.appendChild(tr);
  });
}

// =======================================================
// 2. وظائف إدارة البيانات (الحفظ والتحميل)
// =======================================================

function saveData() {
  localStorage.setItem("TikitM", JSON.stringify(TikitM));
  localStorage.setItem("TikitS", JSON.stringify(TikitS));
  localStorage.setItem("TikitSB", JSON.stringify(TikitSB));
  alert("✅ تم حفظ التغييرات في localStorage");
}

function loadData() {
  const m = localStorage.getItem("TikitM");
  const s = localStorage.getItem("TikitS");
  const sb = localStorage.getItem("TikitSB");

  // ملاحظة: استخدام Object.assign(target, source) يعمل بشكل جيد هنا 
  // إذا كانت المصفوفات TikitM, TikitS, TikitSB مُعرّفة كـ let أو const []
  if (m) Object.assign(TikitM, JSON.parse(m));
  if (s) Object.assign(TikitS, JSON.parse(s));
  if (sb) Object.assign(TikitSB, JSON.parse(sb));
}

// =======================================================
// 3. وظيفة إضافة قطعة جديدة
// =======================================================

function addNewItem() {
    // 1. جمع البيانات من المستخدم
    const name = prompt("أدخل اسم القطعة الجديدة:");
    if (!name || name.trim() === "") {
        alert("⚠️ الإسم لا يمكن أن يكون فارغاً.");
        return;
    }

    const priceInput = prompt(`أدخل الثمن لـ ${name}:`);
    const price = parseFloat(priceInput);
    if (isNaN(price) || price <= 0) {
        alert("⚠️ الثمن غير صالح أو أقل من صفر!");
        return;
    }

    const type = prompt("أدخل النوع (m = التحداد, s = التصبين+التحداد, sb = الصباغة):");
    if (!['m', 's', 'sb'].includes(type)) {
        alert("❌ النوع غير صحيح! استخدم m أو s أو sb.");
        return;
    }

    // 2. تحديد المصفوفة الصحيحة
    let targetList;
    let targetTableId;

    if (type === 'm') {
        targetList = TikitM;
        targetTableId = 'tableM';
    } else if (type === 's') {
        targetList = TikitS;
        targetTableId = 'tableS';
    } else {
        targetList = TikitSB;
        targetTableId = 'tableSB';
    }

    // 3. إنشاء العنصر الجديد وإضافته
    // نستخدم Date.now() كـ ID لضمان التفرد
    const newItem = { id: Date.now(), name: name.trim(), pric: price };
    
    // سؤال عن خاصية byMeter
    if (type === 's' && confirm(`هل هذه القطعة تُحسب "بالمتر"؟ (مثل الزربية)`)) {
        newItem.byMeter = true;
    }
    
    targetList.push(newItem);

    // 4. حفظ البيانات وإعادة عرض الجدول
    saveData();
    renderTable(targetTableId, targetList); 

    alert(`✅ تمت إضافة قطعة "${name}" بنجاح إلى فئة ${type.toUpperCase()}!`);
}

function indes() {
  window.location.href = 'index.html';
}

// =======================================================
// 4. التنفيذ الأولي والتعامل مع الأزرار
// =======================================================

// ⚪ 4.1. تحميل البيانات وعرض الجداول فوراً
loadData();
renderTable("tableM", TikitM);
renderTable("tableS", TikitS);
renderTable("tableSB", TikitSB);


// 🟢 4.2. إنشاء زر الحفظ (saveBtn) أولاً لتجنب الخطأ
const saveBtn = document.createElement("button");
saveBtn.textContent = "💾 حفظ التغييرات";

// ستايلات أنيقة (مدمجة هنا)
saveBtn.style.margin = "20px";
saveBtn.style.padding = "10px 20px";
saveBtn.style.backgroundColor = "#3498db";
saveBtn.style.color = "white";
saveBtn.style.fontSize = "16px";
saveBtn.style.fontWeight = "bold";
saveBtn.style.border = "none";
saveBtn.style.borderRadius = "8px";
saveBtn.style.cursor = "pointer";
saveBtn.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
saveBtn.style.transition = "all 0.3s ease";

// تأثير عند المرور على الزر (hover)
saveBtn.onmouseover = () => {
  saveBtn.style.backgroundColor = "#2980b9";
  saveBtn.style.transform = "scale(1.05)";
};
saveBtn.onmouseout = () => {
  saveBtn.style.backgroundColor = "#3498db";
  saveBtn.style.transform = "scale(1)";
};

// ربط الوظيفة
saveBtn.onclick = saveData;

// 🔗 إضافة زر الحفظ للصفحة
document.body.appendChild(saveBtn);


// 🔵 4.3. إنشاء زر الإضافة (addItemBtn) ثانياً
const addItemBtn = document.createElement("button");
addItemBtn.textContent = "➕ إضافة قطعة جديدة";
addItemBtn.onclick = addNewItem;

// 💡 نسخ ستايل saveBtn بعد تعريفه وتنسيقه بالكامل
addItemBtn.style.cssText = saveBtn.style.cssText;
addItemBtn.style.marginLeft = "10px"; // فصله عن زر الحفظ

// 🔗 إضافة زر الإضافة للصفحة
document.body.appendChild(addItemBtn);
