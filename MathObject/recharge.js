// State
let cards = JSON.parse(localStorage.getItem("rechargeCards")) || [];
let serialCounter = cards.length ? Math.max(...cards.map(c => c.sn)) + 1 : 1;

// Elements
const pin = document.getElementById("pin");
const networkSelect = document.getElementById("network");
const amountInput = document.getElementById("amount");
const rechargeCodeInput = document.getElementById("rechargeCode");
const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById("tableBody");

// Helpers
function saveToStorage() {
    localStorage.setItem("rechargeCards", JSON.stringify(cards));
}

// Network USSD templates. {PIN} will be replaced with the generated pin.
const networkTemplates = {
    Airtel: "*126*{PIN}#",
    Glo: "*311*{PIN}#",
    MTN: "*555*{PIN}#",
    "9Mobile": "*323*{PIN}#"
};

function getTemplateFor(network) {
    return networkTemplates[network] || "*126*{PIN}#";
}

function updateRechargeCode() {
    const currentPin = String(pin.value || "").trim();
    if (!currentPin) {
        rechargeCodeInput.value = "";
        return;
    }
    const template = getTemplateFor(networkSelect.value);
    rechargeCodeInput.value = template.replace("{PIN}", currentPin);
}

// Generate Pin 
function generatePin() {
    if (!amountInput.value.trim()) {
        Swal.fire({ title: "Amount Required", text: "Please enter an amount first.", icon: "warning" });
        return;
    }
    // Generate a reasonably long numeric PIN (16 digits)
    const random = Math.floor(Math.random() * 9e15) + Math.floor(Math.random() * 9e0);
    pin.value = String(random);
    updateRechargeCode();

    Swal.fire({ title: "PIN Generated!", text: "Your PIN has been generated successfully.", icon: "success" });
}

// Save Pin
function savePin() {
    if (!pin.value) {
        Swal.fire({ title: "No PIN", text: "Generate a PIN before saving.", icon: "warning" });
        return;
    }
    if (!networkSelect.value || !amountInput.value.trim()) {
        Swal.fire({ title: "Missing Info", text: "Select a network and enter an amount.", icon: "warning" });
        return;
    }

    const card = {
        sn: serialCounter++,
        network: networkSelect.value,
        amount: amountInput.value,
        pin: pin.value,
        // rechargeCode is computed from network + pin when displayed; no need to store raw code
        rechargeCode: null,
        status: "Unused",
        dateCreated: new Date().toLocaleString(),
        dateUsed: "-"
    };

    cards.push(card);
    saveToStorage();
    renderTable(cards);

    // Reset form
    amountInput.value = "";
    pin.value = "";
    rechargeCodeInput.value = "";

    Swal.fire({ title: "Saved!", text: "Recharge card saved successfully.", icon: "success" });
}

// Render Table 
function renderTable(data) {
    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="9" class="text-center">No recharge cards found</td></tr>`;
        return;
    }

    data.forEach((card, index) => {
        const row = document.createElement("tr");
        // Display network-specific USSD code (template + PIN) in the table
        const displayCode = getTemplateFor(card.network).replace("{PIN}", card.pin);
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${card.network}</td>
            <td>${card.amount}</td>
            <td>${card.pin}</td>
            <td>${displayCode}</td>
            <td>${card.status}</td>
            <td>${card.dateCreated}</td>
            <td>${card.dateUsed}</td>
            <td><button class="btn btn-sm btn-danger" onclick="deleteCard(${card.sn})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Delete
function deleteCard(sn) {
    Swal.fire({
        title: "Are you sure?",
        text: "This recharge card will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it"
    }).then((result) => {
        if (result.isConfirmed) {
            cards = cards.filter(c => c.sn !== sn);
            saveToStorage();
            renderTable(cards);
            Swal.fire("Deleted!", "", "success");
        }
    });
}

// Recharge (mark as Used) 
function rechargeNow() {
    const raw = (rechargeCodeInput.value || searchInput.value || "").trim();
    if (!raw) {
        Swal.fire({ title: "No Code", text: "Enter, select or generate a recharge code first.", icon: "warning" });
        return;
    }

    const normalize = s => String(s).replace(/\s+/g, "");
    const rawNorm = normalize(raw);

    // Try several matching strategies: exact, ignore trailing '#', match PIN, match without '#'
    // Match against computed display code for each saved card
    let card = cards.find(c => normalize(getTemplateFor(c.network).replace("{PIN}", c.pin)) === rawNorm);
    if (!card) card = cards.find(c => normalize(getTemplateFor(c.network).replace("{PIN}", c.pin)).replace(/#/g, "") === rawNorm.replace(/#/g, ""));
    if (!card && /^\d+$/.test(rawNorm)) card = cards.find(c => String(c.pin) === rawNorm);

    if (!card) {
        Swal.fire({ title: "Not Found", text: "This recharge code was not found in saved cards.", icon: "error" });
        return;
    }
    if (card.status === "Used") {
        Swal.fire({ title: "Already Used", text: `This card was used on ${card.dateUsed}.`, icon: "info" });
        return;
    }

    card.status = "Used";
    card.dateUsed = new Date().toLocaleString();
    saveToStorage();
    renderTable(cards);

    Swal.fire({ title: "Recharged!", text: "Recharge successful.", icon: "success" });
}

// (Previously had a helper to populate a card into the form; removed as not needed.)

// Search
function searchRecharge() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        renderTable(cards);
        return;
    }
    const filtered = cards.filter(c => {
        const display = getTemplateFor(c.network).replace("{PIN}", c.pin).toLowerCase();
        return display.includes(query) || String(c.pin).toLowerCase().includes(query);
    });
    renderTable(filtered);
}

// Events
pin.addEventListener("input", updateRechargeCode);
networkSelect.addEventListener("change", updateRechargeCode);
searchInput.addEventListener("input", searchRecharge);

// Init
document.addEventListener("DOMContentLoaded", () => {
    renderTable(cards);
});