// ==========================================
// 1. NARRATIVE ONBOARDING STATE & LOGIC
// ==========================================
let currentObStep = 1;
let mandateHoldTimer;
let mandateHeld = false;

function nextObStep(stepNumber) {
    // Hide current
    document.getElementById(`ob-${currentObStep}`).classList.remove('active');
    // Show next
    currentObStep = stepNumber;
    document.getElementById(`ob-${currentObStep}`).classList.add('active');
}

function selectObOption(element, isCustom = false, isAnchor = false) {
    // Remove selected class from siblings
    const siblings = element.parentElement.children;
    for(let sibling of siblings) {
        sibling.classList.remove('selected');
    }
    // Add to clicked
    element.classList.add('selected');

    // If this is the Anchor screen (Step 3), show the native camera upload prompt
    if(isAnchor) {
        document.getElementById('anchor-photo-upload').style.display = 'block';
    }
}

// Simulated Native Camera Hook (Will be replaced by Capacitor Camera plugin)
function triggerNativeCamera() {
    alert("NATIVE HOOK: Opening Android Camera/Gallery to select Anchor Photo.");
    // Simulate photo selected
    const uploadDiv = document.getElementById('anchor-photo-upload');
    uploadDiv.innerHTML = `
        <div style="width: 80px; height: 80px; border-radius: 12px; background: var(--surface2); margin: 0 auto 10px auto; overflow: hidden; display:flex; align-items:center; justify-content:center;">
            <span>📸 Set</span>
        </div>
        <div class="pz-title" style="color: var(--green);">Mental Armor Locked</div>
    `;
}

// ------------------------------------------
// The Mandate Hold Button (Step 4)
// ------------------------------------------
function holdMandateStart() {
    const btn = document.getElementById('mandate-btn');
    btn.style.transform = 'scale(0.95)';
    btn.style.background = 'var(--red)';
    btn.style.color = 'var(--text)';
    btn.innerText = 'Holding...';
    
    // Trigger initial haptic (Simulated)
    if(navigator.vibrate) navigator.vibrate(50);

    mandateHoldTimer = setTimeout(() => {
        mandateHeld = true;
        btn.innerText = 'Mandate Accepted';
        btn.style.background = 'var(--green)';
        // Trigger massive haptic confirmation
        if(navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
        
        setTimeout(() => {
            nextObStep(5);
        }, 800);
    }, 1500); // Requires 1.5 second hold
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
    // By default, activate home screen
    document.getElementById('s-home').classList.add('active');
}

// ==========================================
// 2. CORE NAVIGATION & UI STATE
// ==========================================

function switchNav(targetScreen, navElement) {
    // Reset bottom nav active states
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    navElement.classList.add('active');

    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // Show target
    document.getElementById(`s-${targetScreen}`).classList.add('active');
    
    // Light haptic feedback
    if(navigator.vibrate) navigator.vibrate(10);
}

function switchNutrTab(targetView, tabElement) {
    // Reset tabs
    const tabs = document.querySelectorAll('.ntab');
    tabs.forEach(tab => tab.classList.remove('active'));
    tabElement.classList.add('active');

    // Hide views
    const views = document.querySelectorAll('.nview');
    views.forEach(view => view.classList.remove('active'));

    // Show target
    document.getElementById(`nv-${targetView}`).classList.add('active');
}

// ==========================================
// 3. MODAL HANDLERS
// ==========================================

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    if(navigator.vibrate) navigator.vibrate(15);
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Mock functions for intercepts
function applySwap() {
    closeModal('swap-interceptor-modal');
    alert("Hack Applied: Macros updated in daily log.");
}

function triggerFailureHaptic() {
    // Deep double vibration for the final set
    if(navigator.vibrate) navigator.vibrate([200, 100, 300]);
    alert("MANDATE TRIGGERED: Leave absolutely nothing in the tank. Remember your Anchor.");
}