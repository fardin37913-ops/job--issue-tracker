let allIssues = [];

function handleLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if(u === 'admin' && p === 'admin123') {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        loadData();
    } else { alert("Wrong credentials!"); }
}

async function loadData() {
    toggleLoader(true);
    try {
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const data = await res.json();
        allIssues = data.data || data; // API response structure safe-check
        render(allIssues);
    } catch(e) { console.error(e); }
    finally { toggleLoader(false); }
}

function render(data) {
    const grid = document.getElementById('issues-grid');
    const count = document.getElementById('issue-count');
    grid.innerHTML = '';
    count.innerText = data.length || 0;

    data.forEach(item => {
        const priorityClass = item.priority ? item.priority.toLowerCase() : 'low';
        const card = document.createElement('div');
        card.className = 'card';
        card.style.borderTopColor = item.status === 'open' ? '#22c55e' : '#a855f7';
        card.onclick = () => openModal(item.id);
        
        card.innerHTML = `
            <div class="card-top">
                <div class="icon-circle">
                    <svg width="16" height="16" fill="${item.status === 'open' ? '#22c55e' : '#a855f7'}" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
                </div>
                <span class="priority ${priorityClass}">${item.priority || 'LOW'}</span>
            </div>
            <h4>${item.title}</h4>
            <p>${item.description.slice(0, 70)}...</p>
            <div class="tags">
                <span class="tag" style="color: #ef4444; background: #fee2e2;">🐞 BUG</span>
                <span class="tag" style="color: #f59e0b; background: #fef3c7;">⚙️ HELP WANTED</span>
            </div>
            <div class="card-footer">
                #${item.id} by ${item.author} <br> ${item.createdAt || '1/15/2024'}
            </div>
        `;
        grid.appendChild(card);
    });
}

async function openModal(id) {
    const modal = document.getElementById('issue-modal');
    const body = document.getElementById('modal-body');
    modal.classList.remove('hidden');
    body.innerHTML = '<div class="spinner"></div>';

    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
        const result = await res.json();
        const data = result.data || result;

        body.innerHTML = `
            <h2 style="font-size:20px;">${data.title}</h2>
            <div class="modal-header-info">
                <span class="status-badge">${data.status.toUpperCase()}</span>
                <span>Opened by <b>${data.author}</b> • ${data.createdAt}</span>
            </div>
            <div class="tags">
                 <span class="tag" style="color: #ef4444; background: #fee2e2;">🐞 BUG</span>
                 <span class="tag" style="color: #f59e0b; background: #fef3c7;">⚙️ HELP WANTED</span>
            </div>
            <div class="modal-desc">${data.description}</div>
            <div class="modal-grid">
                <div><p style="color:#94a3b8; font-size:12px;">Assignee:</p><b>${data.author}</b></div>
                <div><p style="color:#94a3b8; font-size:12px;">Priority:</p><span class="priority ${data.priority.toLowerCase()}">${data.priority}</span></div>
            </div>
        `;
    } catch(e) { body.innerHTML = "Error loading data."; }
}

function filterIssues(type) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`tab-${type}`).classList.add('active');
    if(type === 'all') render(allIssues);
    else render(allIssues.filter(i => i.status === type));
}

function handleSearch() {
    const q = document.getElementById('search-input').value.toLowerCase();
    render(allIssues.filter(i => i.title.toLowerCase().includes(q)));
}

function closeModal() { document.getElementById('issue-modal').classList.add('hidden'); }
function toggleLoader(s) { document.getElementById('loader').classList.toggle('hidden', !s); }