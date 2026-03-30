// ==========================================
// 1. THE BANK ACCOUNT ECONOMY (CALORIE MATH)
// ==========================================
let userEconomy = {
    floor: 1800,
    ceiling: 2300,
    consumedToday: 0
};

// This hooks into the Onboarding Screen 5 inputs
function calculateEconomy(weight, targetWeight, age) {
    // A baseline calculation to generate the Target Zone
    const maintenance = weight * 15; 
    userEconomy.ceiling = maintenance - 300; // Sustainable
    userEconomy.floor = maintenance - 800;   // Aggressive
    
    // Dynamically update the UI
    const preview = document.getElementById('economy-preview');
    if(preview) {
        preview.innerHTML = `
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em;">Target Zone Generated</div>
            <div style="font-size: 24px; font-weight: bold; color: var(--accent); margin-top: 5px;">
                ${Math.round(userEconomy.floor)} <span style="font-size: 14px; color: var(--text-dim);">Floor</span> - 
                ${Math.round(userEconomy.ceiling)} <span style="font-size: 14px; color: var(--text-dim);">Ceiling</span>
            </div>
        `;
    }
}

// Attach event listeners to onboarding inputs to auto-calculate
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('#ob-5 .ob-input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const weight = parseFloat(inputs[1].value);
            if(weight > 0) calculateEconomy(weight, 0, 0);
        });
    });
});

// ==========================================
// 2. SWAP NOT STOP INTERCEPTOR
// ==========================================
// The active AI Coach dictionary based on your e-book protocols
const swapDatabase = {
    "burger": "Dropping the diced onions and pickles on that burger, or swapping standard mayo for a side packet, cuts hidden fats. Protect the deficit.",
    "sub": "Tell them to add spinach and cucumbers. You get a massive, filling sandwich for a fraction of the original calories.",
    "mcdonalds": "Grabbing a Mac? Drop the mayo and skip the middle bun to instantly save 150 calories of pure fat.",
    "oil": "Swap the cooking oil for zero-calorie avocado oil spray. It keeps the calories at zero while getting that perfect crisp.",
    "ranch": "Swap traditional ranch for Bolthouse Farms Classic Ranch or a yogurt-based dressing to drop from 140 calories to 45.",
    "ice cream": "Try the Binge-Proof Dessert: A massive tub of Dannon Light & Fit Greek Yogurt mixed with zero-sugar pudding mix. Massive volume, 450 calories total."
};

// Call this function when the user types in the food search bar
function searchFood(query) {
    const q = query.toLowerCase();
    for (const [key, hack] of Object.entries(swapDatabase)) {
        if (q.includes(key)) {
            // Populate Modal
            document.getElementById('swap-body').innerText = hack;
            // Trigger Modal
            openModal('swap-interceptor-modal');
            return;
        }
    }
    console.log("Logging standard food...");
}

// ==========================================
// 3. VARIABLE VS LIE (WEIGHT CHECK-IN)
// ==========================================
let previousWeight = 185; // Simulated saved weight

function logDailyWeight(newWeight) {
    if (newWeight > previousWeight) {
        // Intercept panic and trigger reality check
        openModal('weight-check-modal');
    } else {
        previousWeight = newWeight;
        console.log("Weight logged successfully.");
    }
}

function logWeightVariable(type) {
    closeModal('weight-check-modal');
    // Shift the user's mindset to the weekly view
    alert(`Variable tracked (${type}). The scale is not fat gain. Shifting UI to Weekly Bank view.`);
}

function logWeightLie() {
    closeModal('weight-check-modal');
    // Force accountability
    alert("Honesty tracked. Use the Autopilot Cardio Buffer today or apply the 6-Day Correction tomorrow to balance the week.");
}