let selectedNumber = null;
  let totalPrice = 0;

  let TikitM = [
    { id: 1, name: "سروال", pric: 6},
    { id: 2, name: "قميجة", pric: 6 },
    { id: 3, name: "جلابة", pric: 6 },
    { id: 4, name: "فيستة", pric: 6 },
    { id: 5, name: "جاكيطة", pric: 6 },
    { id: 6, name: "مونطو", pric: 6 },
    { id: 7, name: "تكشطة", pric: 12 },
    { id: 8, name: "قفطان", pric: 6 },
    { id: 9, name: "شورط", pric: 5 },
    { id: 10, name: "كونبلي", pric: 12 },
    { id: 11, name: "صاية", pric: 6 },
    { id: 12, name: "كسوة بنات طويلة", pric: 6 },
    { id: 13, name: "تريكو", pric: 6 },
    { id: 14, name: "فوطة", pric: 3 },
  ];

  let TikitS = [
    { id: 1, name: "سروال", pric: 10 },
    { id: 2, name: "قميجة", pric: 10 },
    { id: 3, name: "جلابة", pric: 15 },
    { id: 4, name: "فيستة", pric: 17 },
    { id: 5, name: "جاكيطة", pric: 15 },
    { id: 6, name: "مونطو", pric: 20 },
    { id: 7, name: "تكشطة", pric: 30 },
    { id: 8, name: "قفطان", pric: 15 },
    { id: 9, name: "سبرديلة", pric: 20 },
    { id: 10, name: "شورط", pric: 10 },
    { id: 11, name: "كونبلي", pric: 30 },
    { id: 12, name: "صاية", pric: 10 },
    { id: 13, name: "كسوة بنات طويلة", pric: 12 },
    { id: 14, name: "تريكو", pric: 12 },
    { id: 15, name: "مانطا", pric: 35 },
    { id: 16, name: "فوطة", pric: 10 },
    { id: 17, name: "كوفرلي", pric: 35 },
    { id: 18, name: "زربية", pric: 20, byMeter: true }
  ];
  
 let TikitSB = [
    { id: 1, name: "سروال", pric: 30 },
    { id: 2, name: "قميجة", pric: 30},
    { id: 3, name: "جلابة", pric: 30},
    { id: 4, name: "فيستة", pric: 30 },
    { id: 5, name: "جاكيطة", pric: 30 },
    { id: 6, name: "مونطو", pric: 30 },
    { id: 7, name: "شورط", pric: 30 },
    { id: 8, name: "كونبلي", pric: 30 },
    { id: 9, name: "صاية", pric: 30 },
    { id: 10, name: "كسوة بنات طويلة", pric: 30 },
    { id: 11, name: "تريكو", pric: 30 },
  ];

  let currentList = TikitM;

function loadItemsFromStorage() {
  const m = localStorage.getItem("TikitM");
  const s = localStorage.getItem("TikitS");
  const sb = localStorage.getItem("TikitSB");

  if (m) TikitM = JSON.parse(m);
  if (s) TikitS = JSON.parse(s);
  if (sb) TikitSB = JSON.parse(sb);
}

// استدعاء الدالة قبل استخدام المصفوفات
loadItemsFromStorage();



  const today = new Date();
  const dateString = today.toLocaleDateString('ar-MA');
  document.getElementById("todayDate").textContent = dateString;

  function selectNumber(num) {
    selectedNumber = num;
    document.querySelectorAll('.numbers button').forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
  }

 /* function renderItems(list) {
    const container = document.getElementById("itemsContainer");
    container.innerHTML = "";
    list.forEach(item => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `<div class="item-name">${item.name}</div>
      <div class="item-price">${item.pric}DH </div>`;
      
      container.appendChild(div);
    });
  }*/
  function createItemHTML(item) {
  // بناء الجزء الداخلي من العنصر (الاسم والثمن)
  const priceDisplay = item.byMeter ? `${item.pric}DH /متر` : `${item.pric}DH`;
  
  return `<div class="item-name">${item.name}</div>
          <div class="item-price">${priceDisplay}</div>`;
}


function renderItems(list) {
  const container = document.getElementById("itemsContainer");
  container.innerHTML = "";
  
  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    
    // 💡 استخدام الدالة الجديدة لإنشاء المحتوى الداخلي
    div.innerHTML = createItemHTML(item); 
    
    // منطق النقر (Click Logic) يبقى كما هو لضمان الوظيفة
    if (item.byMeter) {
      div.onclick = () => addClothingByMeter(item.name, item.pric);
    } else {
      div.onclick = () => addClothing(item.name, item.pric);
    }

    container.appendChild(div);
  });
}

  function showCategory(cat) {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    if (cat === 'm') {
      currentList = TikitM;
      renderItems(TikitM);
      document.querySelector(".tab:nth-child(1)").classList.add("active");
    } else if(cat==='s') {
      currentList = TikitS;
      renderItems(TikitS);
      document.querySelector(".tab:nth-child(2)").classList.add("active");
    } else {
      currentList = TikitSB;
      renderItems(TikitSB);
      document.querySelector(".tab:nth-child(3)").classList.add("active");
    }
  }


// دالة خاصة بالقطع بالمتر
function addClothingByMeter(item, price) {
  const output = document.getElementById("output");
  
  let meters = parseFloat(prompt(`أدخل عدد الأمتار ل: ${item}`));
  if (isNaN(meters) || meters <= 0) {
    alert("⚠️ المرجو إدخال عدد أمتار صحيح!");
    return;
  }

  let lines = output.value.trim().split("\n").filter(line => line.trim() !== "");
  let updated = false;

  for (let i = 0; i < lines.length; i++) {
    let parts = lines[i].split(" ");
    let lineQuantity = parseFloat(parts[0]);
    let lineItem = parts.slice(1).join(" ").split('----------------->')[0].trim();

    if (lineItem === item) {
      lineQuantity += meters;
      lines[i] = `${lineQuantity} متر ${item} ----------------->${price * lineQuantity}`;
      updated = true;
      break;
    }
  }

  if (!updated) {
    lines.push(`${meters} متر ${item} ----------------->${price * meters}`);
  }

  output.value = lines.join("\n");
  totalPrice += price * meters;
  document.getElementById("total").textContent = `المجموع: ${totalPrice} درهم`;
}




  function addClothing(item, price) {
    const output = document.getElementById("output");
    let quantity = selectedNumber || 1;
    let lines = output.value.trim().split("\n").filter(line => line.trim() !== "");
    let updated = false;

    for (let i = 0; i < lines.length; i++) {
      let parts = lines[i].split(" ");
      let lineQuantity = parseInt(parts[0]);
      let lineItem = parts.slice(1).join(" ").split('----------------->')[0].trim();

      if (lineItem === item) {
        lineQuantity += quantity;
        lines[i] = `${lineQuantity} ${item} ----------------->${price * lineQuantity}`;
        updated = true;
        break;
      }
    }

    if (!updated) {
      lines.push(`${quantity} ${item} ----------------->${price * quantity}`);
    }

    output.value = lines.join("\n");
    totalPrice += price * quantity;
    document.getElementById("total").textContent = `المجموع: ${totalPrice} درهم`;
    selectedNumber = null;
    document.querySelectorAll('.numbers button').forEach(btn => btn.classList.remove('selected'));
  }

  function clearAll() {
  document.getElementById("output").value = "";
    document.getElementById("total").textContent = "المجموع: 0 درهم";
    document.getElementById("receiptId").textContent = "----";
    totalPrice = 0;
    selectedNumber = null;
    document.getElementById("whatsappNumber").value = "";
    document.getElementById("nameclione").value = "";
    document.querySelectorAll('.numbers button').forEach(btn => btn.classList.remove('selected'));
  }

 
  function sendToWhatsapp() {
  const output = document.getElementById("output").value;
  const number = document.getElementById("whatsappNumber").value.trim();
  const name = document.getElementById("nameclione").value.trim();
  const date = document.getElementById("todayDate").textContent;

  const isFast = document.getElementById("fastWash").checked;
  const isPaid = document.getElementById("paid").checked;

  if (!number) {
    alert("المرجو إدخال رقم واتساب أولاً.");
    return;
  }

  let lastId = localStorage.getItem('lastReceiptId');
  if (!lastId) lastId = 0;
  let currentId = parseInt(lastId) + 1;
  let formattedId = currentId.toString().padStart(4, '0');
  document.getElementById("receiptId").textContent = formattedId;
  localStorage.setItem('lastReceiptId', currentId);

  const receiptId = formattedId;

  let receiptContent = `
السلام عليكم 👋
هادا هو الوصل ديالك من مصبنة "karim-X3O"

🧾 وصل رقم: ${receiptId}
📅 التاريخ: ${date}
👤 الاسم: ${name}

${output}
---------------------
💰 المجموع: ${totalPrice} درهم

${isFast ? "⚡ تصبين سريع\n" : ""}${isPaid ? "✅ تم الدفع\n" : ""}
📞 للاستفسار: 0657836514
شكرا على ثقتكم 🙏
`;
  let receipts = JSON.parse(localStorage.getItem('receipts') || '[]');
  receipts.push({ 
    id: receiptId, 
    date, 
    name, 
    number, 
    content: output, 
    total: totalPrice, 
    fast: isFast, 
    paid: isPaid 
  });
  localStorage.setItem('receipts', JSON.stringify(receipts));

  let message = encodeURIComponent(receiptContent);
  let phone = number;

  if (phone.startsWith("0")) {
    phone = "212" + phone.substring(1);
  } else if (!phone.startsWith("212")) {
    phone = "212" + phone;
  }

  let whatsappURL = `https://wa.me/${phone}?text=${message}`;
  window.open(whatsappURL, '_blank');

  // إعادة تعيين الحقول
  document.getElementById("whatsappNumber").value = "";
  document.getElementById("nameclione").value = "";
  document.getElementById("output").value = "";
  document.getElementById("total").textContent = "المجموع: 0 درهم";
  totalPrice = 0;
  document.getElementById("fastWash").checked = false;
  document.getElementById("paid").checked = false;
}

 function showReceipts() {
  window.location.href = 'receipts.html';
}

function showRecei() {
  window.location.href = 'items.html';
}

function stats() {
  window.location.href = 'stats.html';
}

function addNewItem() {
  const name = prompt("أدخل اسم القطعة:");
  if (!name) return;

  const price = parseFloat(prompt("أدخل الثمن:"));
  if (isNaN(price) || price <= 0) {
    alert("الثمن غير صالح!");
    return;
  }

  const type = prompt("أدخل النوع (m = التحداد, s = التصبين+التحداد, sb = الصباغة):");
  if (!['m', 's', 'sb'].includes(type)) {
    alert("النوع غير صحيح! استعمل: m أو s أو sb");
    return;
  }

  const newItem = { id: Date.now(), name: name, pric: price };

  if (type === 'm') {
    TikitM.push(newItem);
    if (currentList === TikitM) renderItems(TikitM);
  } else if (type === 's') {
    TikitS.push(newItem);
    if (currentList === TikitS) renderItems(TikitS);
  } else {
    TikitSB.push(newItem);
    if (currentList === TikitSB) renderItems(TikitSB);
  }

  alert("✅ تمت إضافة القطعة بنجاح!");
}

function editItemPrice() {
  const type = prompt("أدخل النوع (m = التحداد, s = التصبين+التحداد, sb = الصباغة):");
  if (!['m', 's', 'sb'].includes(type)) {
    alert("النوع غير صحيح!");
    return;
  }

  let list;
  if (type === 'm') list = TikitM;
  else if (type === 's') list = TikitS;
  else list = TikitSB;

  const name = prompt("أدخل اسم القطعة التي تريد تعديل ثمنها:");
  if (!name) return;

  const item = list.find(i => i.name === name);
  if (!item) {
    alert("❌ هذه القطعة غير موجودة في اللائحة!");
    return;
  }

  const newPrice = parseFloat(prompt("أدخل الثمن الجديد:"));
  if (isNaN(newPrice) || newPrice <= 0) {
    alert("الثمن غير صالح!");
    return;
  }

  item.pric = newPrice;
  alert(`✅ تم تعديل ثمن "${name}" إلى ${newPrice} درهم`);

  // إعادة العرض إذا كنت في نفس القائمة
  if (currentList === list) renderItems(list);
}



if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // تم التسجيل بنجاح
      console.log('Service Worker registered with scope: ', registration.scope);
    }, function(err) {
      // فشل التسجيل
      console.log('Service Worker registration failed: ', err);
    });
  });
}



renderItems(TikitM);
// قبل تعريف TikitM, TikitS, TikitSB








