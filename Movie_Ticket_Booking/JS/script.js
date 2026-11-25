// Rows from the original layout: 6, 5, 4, 3, 2, 1 seats. Price is per seat.
const ROWS = [
    { label: "A", seats: 6, price: 250 },
    { label: "B", seats: 5, price: 250 },
    { label: "C", seats: 4, price: 200 },
    { label: "D", seats: 3, price: 200 },
    { label: "E", seats: 2, price: 150 },
    { label: "F", seats: 1, price: 150 },
];
const STORAGE_KEY = "bookedSeats";

const map = document.getElementById("seatMap");
const chips = document.getElementById("chips");
const bookBtn = document.getElementById("bookBtn");
const toastEl = document.getElementById("toast");

let selected = new Set();
let booked = new Set(load());

function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
}
function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...booked])); } catch {}
}

const priceOf = id => ROWS.find(r => r.label === id[0]).price;

// Build the seat map
ROWS.forEach(row => {
    const line = document.createElement("div");
    line.className = "row-line";
    line.innerHTML = `<span class="row-label">${row.label}</span>`;
    for (let n = 1; n <= row.seats; n++) {
        const id = row.label + n;
        const seat = document.createElement("button");
        seat.type = "button";
        seat.className = "seat";
        seat.dataset.id = id;
        seat.textContent = id;
        seat.title = `Seat ${id} · ₹${row.price}`;
        seat.addEventListener("click", () => toggle(id));
        line.appendChild(seat);
    }
    map.appendChild(line);
});

document.getElementById("totalSeats").textContent = ROWS.reduce((s, r) => s + r.seats, 0);

function toggle(id) {
    if (booked.has(id)) return;
    selected.has(id) ? selected.delete(id) : selected.add(id);
    render();
}

function render() {
    map.querySelectorAll(".seat").forEach(el => {
        const id = el.dataset.id;
        const isBooked = booked.has(id);
        el.classList.toggle("selected", selected.has(id));
        el.classList.toggle("booked", isBooked);
        el.disabled = isBooked;
        el.setAttribute("aria-pressed", selected.has(id));
        el.setAttribute("aria-label", `Seat ${id}, ${isBooked ? "booked" : selected.has(id) ? "selected" : "available"}`);
    });

    const ids = [...selected].sort();
    chips.innerHTML = ids.map(id => `<span class="chip">${id}</span>`).join("");
    document.getElementById("count").textContent = ids.length;
    document.getElementById("total").textContent = "₹" + ids.reduce((s, id) => s + priceOf(id), 0);
    document.getElementById("bookedCount").textContent = booked.size;
    bookBtn.disabled = ids.length === 0;
}

function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

// Book seats: selected become booked
bookBtn.addEventListener("click", () => {
    const n = selected.size;
    const total = [...selected].reduce((s, id) => s + priceOf(id), 0);
    selected.forEach(id => booked.add(id));
    selected.clear();
    save();
    render();
    toast(`Booked ${n} seat${n > 1 ? "s" : ""} for ₹${total}`);
});

// Clear the current selection (booked seats stay)
document.getElementById("cancelBtn").addEventListener("click", () => {
    selected.clear();
    render();
    toast("Selection cleared");
});

// Reset everything
document.getElementById("resetBtn").addEventListener("click", () => {
    if (booked.size && !confirm("Reset all bookings?")) return;
    selected.clear();
    booked.clear();
    save();
    render();
    toast("All seats reset");
});

render();