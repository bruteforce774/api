async function loadItems() {
    const res = await fetch('/api/items');
    const items = await res.json();
    const list = document.getElementById('list');
    list.innerHTML = items.map(i => `<li>${i}</li>`).join('');
}

async function addItem() {
    const name = document.getElementById('newItem').value;
    await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    document.getElementById('newItem').value = '';
    loadItems();
}

document.getElementById('addBtn').onclick = addItem;
loadItems();