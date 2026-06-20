// ============================================================
// Kidora1 Dashboard - Main Controller
// Version: 4.0 (Resources + Testimonials, no Donations)
// ============================================================

import { getCurrentUser, logoutUser } from './auth.js';
import { getCurrentLocation } from './location.js';

let currentUser = null;

const contentArea = document.getElementById('content-area');
const pageTitle = document.getElementById('page-title');
const userNameDisplay = document.getElementById('user-name');
const userRoleDisplay = document.getElementById('user-role');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        currentUser = await getCurrentUser();
        if (!currentUser) { window.location.href = 'login.html'; return; }

        userNameDisplay.textContent = currentUser.full_name;
        if (userRoleDisplay) {
            userRoleDisplay.textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
        }

        setupSidebar();
        if (currentUser.role === 'admin') updateView('admin');
        else updateView('overview');

        fetchUnreadCount();
        setInterval(fetchUnreadCount, 60000);
        const bell = document.getElementById('notification-bell');
        if (bell) bell.onclick = () => updateView('notifications');
        setupAIBot();
    } catch (e) {
        if (contentArea) contentArea.innerHTML = `<div class="card" style="color:red;">Initialization Error: ${e.message}</div>`;
    }
});

window.updateView = updateView;
window.startModule = startModule;
window.startScenario = startScenario;
window.showOutcome = showOutcome;
window.adminAction = adminAction;
window.editItem = editItem;
window.renderEmotions = renderEmotions;
window.renderAwareness = renderAwareness;

function setupSidebar() {
    const sidebarList = document.querySelector('.sidebar-nav ul');
    if (!sidebarList) return;

    let links = '';
    if (currentUser.role === 'admin') {
        links = `
            <li><a href="#" onclick="updateView('admin')"><i class="fa-solid fa-gauge"></i><span>Admin Dash</span></a></li>
            <li><a href="#" onclick="updateView('manage_modules')"><i class="fa-solid fa-book"></i><span>Lessons</span></a></li>
            <li><a href="#" onclick="updateView('manage_simulators')"><i class="fa-solid fa-flask"></i><span>Simulators</span></a></li>
            <li><a href="#" onclick="updateView('manage_content')"><i class="fa-solid fa-list-check"></i><span>Content</span></a></li>
            <li><a href="#" onclick="updateView('manage_testimonials')"><i class="fa-solid fa-comment"></i><span>Testimonials</span></a></li>
            <li><a href="#" onclick="updateView('manage_resources')"><i class="fa-solid fa-database"></i><span>Resources</span></a></li>
            <li><a href="#" onclick="updateView('audit_logs')"><i class="fa-solid fa-shield-halved"></i><span>Audit Logs</span></a></li>
        `;
    } else {
        links = `
            <li><a href="#" onclick="updateView('overview')"><i class="fa-solid fa-chart-line"></i><span>Dash</span></a></li>
            <li><a href="#" onclick="updateView('learning')"><i class="fa-solid fa-book"></i><span>Learning</span></a></li>
            <li><a href="#" onclick="updateView('emotions')"><i class="fa-solid fa-heart"></i><span>Emotions</span></a></li>
            <li><a href="#" onclick="updateView('awareness')"><i class="fa-solid fa-shield"></i><span>Awareness</span></a></li>
            <li><a href="#" onclick="updateView('simulator')"><i class="fa-solid fa-flask"></i><span>Simulator</span></a></li>
            <li><a href="#" onclick="updateView('resources')"><i class="fa-solid fa-book-open"></i><span>Resources</span></a></li>
        `;
    }
    links += `<li><a href="#" id="logout-btn-link"><i class="fa-solid fa-sign-out-alt"></i><span>Logout</span></a></li>`;
    sidebarList.innerHTML = links;
    const logout = document.getElementById('logout-btn-link');
    if (logout) logout.onclick = () => logoutUser();
}

async function updateView(view) {
    if (!contentArea) return;
    if (pageTitle) pageTitle.textContent = view.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    contentArea.innerHTML = `<div style="text-align:center; padding:50px;"><i class="fa-solid fa-spinner fa-spin fa-3x" style="color:var(--primary-color);"></i></div>`;
    try {
        switch (view) {
            case 'overview': await renderOverview(); break;
            case 'learning': await renderLearning(); break;
            case 'simulator': await renderSimulatorList(); break;
            case 'emotions': await renderEmotions(); break;
            case 'awareness': await renderAwareness(); break;
            case 'admin': await renderAdminPanel(); break;
            case 'manage_modules': await renderManageModules(); break;
            case 'manage_simulators': await renderManageSimulators(); break;
            case 'manage_content': await renderManageContent(); break;
            case 'manage_testimonials': await renderManageTestimonials(); break;
            case 'manage_resources': await renderManageResources(); break;
            case 'resources': await renderResources(); break;
            case 'notifications': await renderNotifications(); break;
            case 'audit_logs': await renderAuditLogs(); break;
        }
    } catch (err) { console.error(err); }
}

async function safeFetch(url, options = {}) {
    const res = await fetch(url, options);
    const text = await res.text();
    try { return JSON.parse(text); } catch (e) { throw new Error('API Error: ' + text); }
}

// ==================== PARENT VIEWS ====================
async function renderOverview() {
    const res = await safeFetch('api/data.php?type=overview');
    const ov = res.data;
    contentArea.innerHTML = `
        <div class="dashboard-banner"><h3>Welcome, ${currentUser.full_name}! ✨</h3><p>Your current location is <strong>${getCurrentLocation()}</strong>.</p></div>
        <div class="modules-grid" style="margin-top:25px;">
            <div class="card"><h4>Daily Reflection</h4><p>${ov.dailyAction.action}</p></div>
            <div class="card" onclick="updateView('notifications')" style="cursor:pointer;"><h4>My Notifications 🔔</h4><p>Check for system updates and rewards.</p></div>
        </div>
    `;
}

async function renderLearning() {
    const data = await safeFetch('api/modules.php?action=list');
    let html = `<div class="modules-grid">`;
    (data.modules || []).forEach(m => {
        const isDone = parseInt(m.progress) === 100;
        html += `<div class="card"><h4>${m.title}</h4><p>${m.description}</p><button class="btn ${isDone ? 'btn-outline' : 'btn-primary'}" onclick="startModule(${m.id})" ${isDone ? 'disabled' : ''} style="width:100%; margin-top:10px;">${isDone ? 'Done ✓' : 'Complete'}</button></div>`;
    });
    contentArea.innerHTML = html + `</div>`;
}
async function startModule(id) {
    await fetch('api/modules.php?action=update_progress', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ module_id: id, progress: 100 }) });
    updateView('learning');
}
async function renderSimulatorList() {
    const res = await safeFetch('api/data.php?type=simulator');
    const scenarios = res.data || [];
    window.currentScenarios = scenarios;
    let html = `<div class="modules-grid">`;
    scenarios.forEach(s => { html += `<div class="card" onclick="startScenario('${s.id}')" style="cursor:pointer;"><h4>${s.title}</h4><p>${s.desc}</p></div>`; });
    contentArea.innerHTML = html + `</div>`;
}
function startScenario(id) {
    const s = window.currentScenarios.find(sc => sc.id == id);
    if (!s) return;
    window.currentScenarioId = id;
    contentArea.innerHTML = `<div class="simulator-container"><h3>${s.title}</h3><p style="margin:20px 0; font-size:1.2rem;">${s.prompt}</p>
    <div class="simulator-options"><button class="btn btn-secondary" onclick="showOutcome('A')">${s.options.A.label}</button><button class="btn btn-primary" onclick="showOutcome('B')">${s.options.B.label}</button></div>
    <div id="outcome-box" style="display:none; margin-top:20px; padding:15px; border-radius:16px;"></div>
    <button class="btn btn-outline" onclick="updateView('simulator')" style="margin-top:20px; width:100%;">Back to List</button></div>`;
}
function showOutcome(choice) {
    const id = window.currentScenarioId;
    const s = window.currentScenarios.find(sc => sc.id == id);
    if (!s) return;
    const option = s.options[choice];
    const outcomeType = option.type;
    let outcomeClass = '', outcomeTitle = '';
    if (outcomeType === 'positive') { outcomeClass = 'outcome-positive'; outcomeTitle = '✨ Positive Outcome ✨'; }
    else if (outcomeType === 'negative') { outcomeClass = 'outcome-negative'; outcomeTitle = '⚠️ Negative Outcome ⚠️'; }
    else { outcomeClass = 'outcome-neutral'; outcomeTitle = '📘 Outcome'; }
    const outcomeHtml = `<div class="${outcomeClass}" style="padding:1rem; border-radius:16px;"><h4 style="margin-bottom:0.5rem;">${outcomeTitle}</h4><p>${option.outcome}</p></div>`;
    const box = document.getElementById('outcome-box');
    if (box) { box.innerHTML = outcomeHtml; box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
}
async function renderEmotions() {
    const res = await safeFetch('api/data.php?type=emotions');
    const cards = res.data || [];
    let html = `<div class="modules-grid">`;
    cards.forEach(c => { html += `<div class="card card-emotion"><span class="badge">Emotion Card</span><h4>${c.emotion}</h4><p><strong>Scenario:</strong> ${c.scenario}</p><div class="hidden-message"><small style="color:var(--primary-color); font-weight:bold;">THE HIDDEN MESSAGE:</small><p style="margin:5px 0; font-style:italic;">"${c.hidden_message}"</p></div><p><strong>Recommended Response:</strong> ${c.response}</p></div>`; });
    contentArea.innerHTML = html + `</div>`;
}
async function renderAwareness() {
    const res = await safeFetch('api/data.php?type=awareness');
    const posts = res.data || [];
    let html = `<div class="modules-grid">`;
    posts.forEach(p => { html += `<div class="card card-awareness"><span class="badge" style="background:var(--secondary-color);">Awareness Insight</span><h4>${p.title}</h4><p>${p.content}</p><div class="action-tip"><strong>💡 Action Tip:</strong> ${p.action_tip}</div></div>`; });
    contentArea.innerHTML = html + `</div>`;
}

// ==================== RESOURCES (Parent) ====================
async function renderResources() {
    const res = await safeFetch('api/data.php?type=resources');
    let html = `<div class="modules-grid">`;
    (res.data || []).forEach(r => {
        let icon = r.resource_type === 'book' ? 'fa-book' : (r.resource_type === 'video' ? 'fa-video' : 'fa-headphones');
        let preview = r.thumbnail_url ? `<img src="${r.thumbnail_url}" style="width:100%; border-radius:12px; margin-bottom:1rem;">` : '';
        html += `<div class="card">${preview}<i class="fa-solid ${icon}" style="font-size:2rem; color:var(--primary); margin-bottom:0.5rem; display:inline-block;"></i><h4>${r.title}</h4><p>${r.description}</p><div class="badge">${r.resource_type} • ${r.category || 'General'}</div><a href="${r.file_url}" target="_blank" class="btn btn-primary" style="margin-top:1rem; display:inline-block;">Access Resource</a></div>`;
    });
    contentArea.innerHTML = html + `</div>`;
}

// ==================== ADMIN VIEWS ====================
async function renderAdminPanel() { contentArea.innerHTML = `<div class="card"><h3>Admin Dashboard</h3><p>Manage all aspects of Kidora1 from here.</p></div>`; }

async function renderManageModules() {
    const res = await safeFetch('api/modules.php?action=list');
    let html = `<div class="card"><h4>Manage Modules</h4><div style="display:grid; gap:10px; margin-top:15px;"><input type="hidden" id="item-id"><input type="text" id="m-title" placeholder="Title" class="form-control"><textarea id="m-desc" placeholder="Description" class="form-control"></textarea><div style="display:flex; gap:10px;"><input type="text" id="m-cat" placeholder="Category" class="form-control"><select id="m-diff" class="form-control"><option>Easy</option><option>Medium</option><option>Hard</option></select></div><button class="btn btn-primary" onclick="adminAction('save_module')" id="save-btn">Create Module</button></div></div><div class="modules-grid" style="margin-top:20px;">`;
    (res.modules || []).forEach(m => { html += `<div class="card"><h5>${m.title}</h5><div style="display:flex; gap:5px; margin-top:10px;"><button class="btn btn-sm btn-outline" onclick="editItem('module', ${JSON.stringify(m).replace(/"/g, '&quot;')})">Edit</button><button class="btn btn-sm btn-outline" style="color:red;" onclick="adminAction('delete_module', ${m.id})">Delete</button></div></div>`; });
    contentArea.innerHTML = html + `</div>`;
}

async function renderManageSimulators() {
    const res = await safeFetch('api/data.php?type=simulator');
    let html = `<div class="card"><h4>Manage Simulators</h4><div style="display:grid; gap:10px; margin-top:15px;"><input type="hidden" id="item-id"><input type="text" id="s-title" placeholder="Title" class="form-control"><input type="text" id="s-desc" placeholder="Description" class="form-control"><textarea id="s-prompt" placeholder="Prompt" class="form-control"></textarea><p>Option A</p><div style="display:flex; gap:5px;"><input type="text" id="option_a_label" placeholder="Label" class="form-control"><input type="text" id="option_a_outcome" placeholder="Outcome text" class="form-control"><select id="option_a_type" class="form-control"><option value="positive">Positive</option><option value="negative">Negative</option><option value="neutral">Neutral</option></select></div><p>Option B</p><div style="display:flex; gap:5px;"><input type="text" id="option_b_label" placeholder="Label" class="form-control"><input type="text" id="option_b_outcome" placeholder="Outcome text" class="form-control"><select id="option_b_type" class="form-control"><option value="positive">Positive</option><option value="negative">Negative</option><option value="neutral">Neutral</option></select></div><button class="btn btn-primary" onclick="adminAction('save_simulator')" id="save-btn">Create Simulator</button></div></div><div class="modules-grid" style="margin-top:20px;">`;
    (res.data || []).forEach(s => { html += `<div class="card"><h5>${s.title}</h5><div style="display:flex; gap:5px; margin-top:10px;"><button class="btn btn-sm btn-outline" onclick="editItem('simulator', ${JSON.stringify(s).replace(/"/g, '&quot;')})">Edit</button><button class="btn btn-sm btn-outline" style="color:red;" onclick="adminAction('delete_simulator', ${s.id})">Delete</button></div></div>`; });
    contentArea.innerHTML = html + `</div>`;
}

async function renderManageContent() {
    const emotions = await safeFetch('api/data.php?type=emotions');
    const awareness = await safeFetch('api/data.php?type=awareness');
    let html = `<div class="card"><h4>Manage Cards & Insights</h4><div id="content-form" style="display:grid; gap:10px; margin-top:15px;"><input type="hidden" id="item-id"><input type="text" id="c-title" placeholder="Title/Emotion" class="form-control"><textarea id="c-body" placeholder="Content/Hidden Message" class="form-control"></textarea><input type="text" id="c-extra" placeholder="Action/Response" class="form-control"><select id="c-type" class="form-control"><option value="emotion">Emotion Card</option><option value="awareness">Awareness Post</option></select><button class="btn btn-primary" onclick="adminAction('save_content')" id="save-btn">Add Content</button></div></div><div class="modules-grid" style="margin-top:20px;">`;
    [...(emotions.data || []), ...(awareness.data || [])].forEach(i => { const type = i.emotion ? 'emotion' : 'awareness'; const title = i.emotion || i.title; html += `<div class="card"><h5>${title}</h5><small>${type}</small><button class="btn btn-sm btn-outline" style="color:red; margin-top:5px;" onclick="adminAction('delete_'+'${type}', ${i.id})">Delete</button></div>`; });
    contentArea.innerHTML = html + `</div>`;
}

// ==================== TESTIMONIALS MANAGEMENT (Admin) ====================
async function renderManageTestimonials() {
    const res = await safeFetch('api/data.php?type=testimonials');
    let html = `<div class="card"><h4>Manage Testimonials</h4><div style="display:grid; gap:10px; margin-top:15px;"><input type="hidden" id="item-id"><input type="text" id="t-name" placeholder="Name" class="form-control"><input type="text" id="t-role" placeholder="Role (e.g., Parent)" class="form-control"><textarea id="t-quote" placeholder="Quote" class="form-control"></textarea><button class="btn btn-primary" onclick="adminAction('save_testimonial')" id="save-btn">Add Testimonial</button></div></div><div class="modules-grid" style="margin-top:20px;">`;
    (res.data || []).forEach(t => { html += `<div class="card"><h5>${t.name}</h5><p>${t.quote.substring(0,100)}...</p><div style="display:flex; gap:5px; margin-top:10px;"><button class="btn btn-sm btn-outline" onclick="editItem('testimonial', ${JSON.stringify(t).replace(/"/g, '&quot;')})">Edit</button><button class="btn btn-sm btn-outline" style="color:red;" onclick="adminAction('delete_testimonial', ${t.id})">Delete</button></div></div>`; });
    contentArea.innerHTML = html + `</div>`;
}

// ==================== RESOURCES MANAGEMENT (Admin) ====================
async function renderManageResources() {
    const res = await safeFetch('api/data.php?type=resources');
    let html = `<div class="card"><h4>Manage Resources</h4><div style="display:grid; gap:10px; margin-top:15px;"><input type="hidden" id="item-id"><input type="text" id="r-title" placeholder="Title" class="form-control"><textarea id="r-desc" placeholder="Description" class="form-control"></textarea><select id="r-type" class="form-control"><option value="book">Book</option><option value="video">Video</option><option value="audio">Audio</option></select><input type="text" id="r-url" placeholder="File URL" class="form-control"><input type="text" id="r-thumb" placeholder="Thumbnail URL (optional)" class="form-control"><input type="text" id="r-cat" placeholder="Category" class="form-control"><button class="btn btn-primary" onclick="adminAction('save_resource')" id="save-btn">Add Resource</button></div></div><div class="modules-grid" style="margin-top:20px;">`;
    (res.data || []).forEach(r => { html += `<div class="card"><h5>${r.title}</h5><div class="badge">${r.resource_type}</div><div style="display:flex; gap:5px; margin-top:10px;"><button class="btn btn-sm btn-outline" onclick="editItem('resource', ${JSON.stringify(r).replace(/"/g, '&quot;')})">Edit</button><button class="btn btn-sm btn-outline" style="color:red;" onclick="adminAction('delete_resource', ${r.id})">Delete</button></div></div>`; });
    contentArea.innerHTML = html + `</div>`;
}

// ==================== EDIT & ADMIN ACTION ====================
function editItem(type, item) {
    document.getElementById('item-id').value = item.id;
    document.getElementById('save-btn').textContent = 'Update ' + type;
    if (type === 'module') {
        document.getElementById('m-title').value = item.title;
        document.getElementById('m-desc').value = item.description;
        document.getElementById('m-cat').value = item.category;
        document.getElementById('m-diff').value = item.difficulty;
    } else if (type === 'simulator') {
        document.getElementById('s-title').value = item.title;
        document.getElementById('s-desc').value = item.desc;
        document.getElementById('s-prompt').value = item.prompt;
        document.getElementById('option_a_label').value = item.options.A.label;
        document.getElementById('option_a_outcome').value = item.options.A.outcome;
        document.getElementById('option_a_type').value = item.options.A.type;
        document.getElementById('option_b_label').value = item.options.B.label;
        document.getElementById('option_b_outcome').value = item.options.B.outcome;
        document.getElementById('option_b_type').value = item.options.B.type;
    } else if (type === 'testimonial') {
        document.getElementById('t-name').value = item.name;
        document.getElementById('t-role').value = item.role || '';
        document.getElementById('t-quote').value = item.quote;
    } else if (type === 'resource') {
        document.getElementById('r-title').value = item.title;
        document.getElementById('r-desc').value = item.description;
        document.getElementById('r-type').value = item.resource_type;
        document.getElementById('r-url').value = item.file_url;
        document.getElementById('r-thumb').value = item.thumbnail_url || '';
        document.getElementById('r-cat').value = item.category || '';
    }
}

async function adminAction(action, id = null) {
    const itemId = document.getElementById('item-id')?.value || id;
    let act = action;
    let body = { id: itemId };
    if (action === 'save_module') {
        act = itemId ? 'update_module' : 'add_module';
        body = { ...body, title: document.getElementById('m-title').value, description: document.getElementById('m-desc').value, category: document.getElementById('m-cat').value, difficulty: document.getElementById('m-diff').value };
    } else if (action === 'save_simulator') {
        act = itemId ? 'update_simulator' : 'add_simulator';
        body = { ...body, title: document.getElementById('s-title').value, desc: document.getElementById('s-desc').value, prompt: document.getElementById('s-prompt').value, options: { A: { label: document.getElementById('option_a_label').value, outcome: document.getElementById('option_a_outcome').value, type: document.getElementById('option_a_type').value }, B: { label: document.getElementById('option_b_label').value, outcome: document.getElementById('option_b_outcome').value, type: document.getElementById('option_b_type').value } } };
    } else if (action === 'save_content') {
        const type = document.getElementById('c-type').value;
        act = 'add_' + type;
        if (type === 'emotion') body = { emotion: document.getElementById('c-title').value, scenario: 'General', hidden_message: document.getElementById('c-body').value, response: document.getElementById('c-extra').value };
        else body = { title: document.getElementById('c-title').value, content: document.getElementById('c-body').value, action_tip: document.getElementById('c-extra').value };
    } else if (action === 'save_testimonial') {
        act = itemId ? 'update_testimonial' : 'add_testimonial';
        body = { ...body, name: document.getElementById('t-name').value, role: document.getElementById('t-role').value, quote: document.getElementById('t-quote').value };
    } else if (action === 'save_resource') {
        act = itemId ? 'update_resource' : 'add_resource';
        body = { ...body, title: document.getElementById('r-title').value, description: document.getElementById('r-desc').value, resource_type: document.getElementById('r-type').value, file_url: document.getElementById('r-url').value, thumbnail_url: document.getElementById('r-thumb').value, category: document.getElementById('r-cat').value };
    } else if (action === 'delete_module' || action === 'delete_simulator' || action === 'delete_emotion' || action === 'delete_awareness' || action === 'delete_testimonial' || action === 'delete_resource') {
        try {
            const res = await safeFetch(`api/admin_content.php?action=${action}&id=${itemId}`);
            if (res.success) { alert('Deleted successfully!'); updateView(pageTitle.textContent.toLowerCase().replace(/ /g, '_')); } else alert(res.message || 'Delete failed');
        } catch(e) { alert(e.message); }
        return;
    }
    try {
        const res = await safeFetch(`api/admin_content.php?action=${act}`, { method: 'POST', body: JSON.stringify(body) });
        if (res.success) { alert('Success!'); updateView(pageTitle.textContent.toLowerCase().replace(/ /g, '_')); } else alert(res.message || 'Operation failed');
    } catch(e) { alert(e.message); }
}

// ==================== NOTIFICATIONS & AUDIT LOGS ====================
async function renderNotifications() {
    const data = await safeFetch('api/notifications.php?action=list');
    let html = `<div class="card"><h4>Notifications</h4></div><div style="margin-top:20px;">`;
    (data.notifications || []).forEach(n => html += `<div class="card" style="margin-bottom:10px;"><strong>${n.title}</strong><p>${n.message}</p></div>`);
    contentArea.innerHTML = html + `</div>`;
}
async function fetchUnreadCount() {
    try { const data = await safeFetch('api/notifications.php?action=unread_count'); const b = document.getElementById('notification-count'); if(b) { b.textContent = data.count || 0; b.style.display = data.count > 0 ? 'block' : 'none'; } } catch(e) {}
}
async function renderAuditLogs() {
    const data = await safeFetch('api/reports.php?action=audit_logs');
    let html = `<div class="card"><table style="width:100%; border-collapse:collapse;"><thead><tr><th>User</th><th>Action</th><th>Time</th></tr></thead><tbody>`;
    (data.logs || []).forEach(l => html += `<tr><td>${l.user_name}</td><td>${l.action}</td><td>${new Date(l.created_at).toLocaleDateString()}</td></tr>`);
    contentArea.innerHTML = html + `</tbody></table></div>`;
}

// ==================== AIBOT ====================
function setupAIBot() {
    const toggleBtn = document.getElementById('aibot-toggle');
    const chatWindow = document.getElementById('aibot-chat');
    const closeBtn = document.getElementById('aibot-close');
    const inputField = document.getElementById('aibot-input');
    const sendBtn = document.getElementById('aibot-send');
    const bodyContainer = document.getElementById('aibot-body');
    if (toggleBtn) toggleBtn.onclick = () => chatWindow.style.display = (chatWindow.style.display === 'none' || chatWindow.style.display === '') ? 'flex' : 'none';
    if (closeBtn) closeBtn.onclick = () => chatWindow.style.display = 'none';
    if (sendBtn) sendBtn.onclick = async () => {
        const query = inputField.value.trim();
        if (!query) return;
        inputField.value = '';
        const userMsg = document.createElement('div'); userMsg.className = 'aibot-msg user'; userMsg.textContent = query; bodyContainer.appendChild(userMsg);
        try {
            const res = await safeFetch('api/ai_support.php', { method: 'POST', body: JSON.stringify({ query }) });
            const botMsg = document.createElement('div'); botMsg.className = 'aibot-msg bot'; botMsg.textContent = res.response;
            if (res.view) {
                const actionBtn = document.createElement('button'); actionBtn.className = 'aibot-action-btn';
                actionBtn.textContent = 'Go to ' + res.view.charAt(0).toUpperCase() + res.view.slice(1);
                actionBtn.onclick = () => { window.updateView(res.view); chatWindow.style.display = 'none'; };
                botMsg.appendChild(actionBtn);
            }
            bodyContainer.appendChild(botMsg);
        } catch(e) { console.error(e); }
        bodyContainer.scrollTop = bodyContainer.scrollHeight;
    };
}