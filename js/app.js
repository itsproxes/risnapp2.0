// ==========================================
// 1. NARRATIVE ONBOARDING STATE & LOGIC
// ==========================================
let currentObStep = 1;
let mandateHoldTimer;
let mandateHeld = false;

function nextObStep(stepNumber) {
    document.getElementById(`ob-${currentObStep}`).classList.remove('active');
    currentObStep = stepNumber;
    document.getElementById(`ob-${currentObStep}`).classList.add('active');
}

function selectObOption(element, isCustom = false, isAnchor = false) {
    const siblings = element.parentElement.children;
    for(let sibling of siblings) { sibling.classList.remove('selected'); }
    element.classList.add('selected');
    if(isAnchor) { document.getElementById('anchor-photo-upload').style.display = 'block'; }
}

function holdMandateStart() {
    const btn = document.getElementById('mandate-btn');
    btn.style.transform = 'scale(0.95)';
    btn.style.background = 'var(--red)';
    btn.style.color = 'var(--text)';
    btn.innerText = 'Holding...';
    if(navigator.vibrate) navigator.vibrate(50);

    mandateHoldTimer = setTimeout(() => {
        mandateHeld = true;
        btn.innerText = 'Mandate Accepted';
        btn.style.background = 'var(--green)';
        if(navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
        setTimeout(() => { nextObStep(5); }, 800);
    }, 1500); 
}

function holdMandateEnd() {
    if(!mandateHeld) {
        clearTimeout(mandateHoldTimer);
        const btn = document.getElementById('mandate-btn');
        btn.style.transform = 'scale(1)';
        btn.style.background = 'var(--surface2)';
        btn.style.color = 'var(--text-muted)';
        btn.innerText = 'Hold to Accept';
    }
}

function finishOnboarding() {
    document.getElementById('onboarding-flow').style.display = 'none';
    document.getElementById('s-home').classList.add('active');
}

// ==========================================
// 2. CORE NAVIGATION & UI INTERACTIVITY
// ==========================================
function switchNav(targetScreen, navElement) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    if(navElement) navElement.classList.add('active');

    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(`s-${targetScreen}`).classList.add('active');
    if(navigator.vibrate) navigator.vibrate(10);
}

// Allows tapping inner buttons (like dashboard stats) to jump to main tabs
function switchTab(targetScreen) {
    const navMap = { 'home': 0, 'fitness': 1, 'nutrition': 2, 'coach': 3, 'community': 4 };
    const navItems = document.querySelectorAll('.nav-item');
    if (navMap[targetScreen] !== undefined) {
        switchNav(targetScreen, navItems[navMap[targetScreen]]);
    }
}

function switchNutrTab(targetView, tabElement) {
    const tabs = document.querySelectorAll('.ntab');
    tabs.forEach(tab => tab.classList.remove('active'));
    tabElement.classList.add('active');

    const views = document.querySelectorAll('.nview');
    views.forEach(view => view.classList.remove('active'));
    document.getElementById(`nv-${targetView}`).classList.add('active');
}

// ==========================================
// 3. HABITS & HYDRATION ENGINE
// ==========================================
function toggleHabit(element) {
    element.classList.toggle('done');
    const xpElement = element.querySelector('.h-xp');
    const hMeta = element.querySelector('.h-meta');
    
    if (element.classList.contains('done')) {
        if(xpElement) xpElement.style.opacity = '1';
        if(hMeta) hMeta.style.color = 'var(--accent)';
        if(navigator.vibrate) navigator.vibrate([15, 30]);
    } else {
        if(xpElement) xpElement.style.opacity = '0';
        if(hMeta) hMeta.style.color = 'var(--text-muted)';
        if(navigator.vibrate) navigator.vibrate(10);
    }
}

function toggleWater(index) {
    const glasses = document.querySelectorAll('.wt-glass');
    glasses[index].classList.toggle('filled');
    
    let count = 0;
    glasses.forEach(glass => { if (glass.classList.contains('filled')) count++; });
    const countEl = document.getElementById('waterCount');
    if(countEl) countEl.innerText = count;
    
    if(navigator.vibrate) navigator.vibrate(10);
}

// ==========================================
// 4. FITNESS GENERATOR STATE LOGIC
// ==========================================
function selType(type) {
    document.querySelectorAll('.type-card').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.type-check').forEach(el => el.innerHTML = '');
    document.getElementById(`type-${type}`).classList.add('selected');
    document.getElementById(`tc-${type}`).innerHTML = '✓';
    if(navigator.vibrate) navigator.vibrate(10);
}

function selSplit(split) {
    document.querySelectorAll('.split-card').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.split-check').forEach(el => el.innerHTML = '');
    document.getElementById(`sp-${split}`).classList.add('selected');
    document.getElementById(`sc-${split}`).innerHTML = '✓';
    if(navigator.vibrate) navigator.vibrate(10);
}

function selLevel(level) {
    document.querySelectorAll('.lvl-btn').forEach(el => el.classList.remove('selected'));
    document.getElementById(`lv-${level}`).classList.add('selected');
    if(navigator.vibrate) navigator.vibrate(10);
}

function generateWorkout() {
    alert("Risn AI: Generating your custom protocol based on selected parameters...");
    if(navigator.vibrate) navigator.vibrate([20, 50, 20]);
}

// ==========================================
// 5. MODAL HANDLERS
// ==========================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = 'flex';
        modal.classList.add('active', 'show'); 
    }
    if(navigator.vibrate) navigator.vibrate(15);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.remove('active', 'show');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
    }
}

function applySwap() {
    closeModal('swap-interceptor-modal');
    alert("Hack Applied: Macros updated in daily log.");
}
