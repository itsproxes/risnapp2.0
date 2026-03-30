// ==========================================
// CAPACITOR NATIVE HOOKS
// ==========================================

async function triggerNativeCamera() {
    try {
        // Check if Capacitor is available (Native Android)
        if (window.Capacitor && window.Capacitor.Plugins.Camera) {
            const { Camera, CameraResultType } = window.Capacitor.Plugins;
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Uri
            });
            
            console.log("Anchor Photo selected:", image.webPath);
            updateAnchorUI();
        } else {
            // Fallback for local web testing
            console.log("Web mode: Simulating Camera API");
            updateAnchorUI();
        }
    } catch (error) {
        console.error("Camera error:", error);
    }
}

function updateAnchorUI() {
    const uploadDiv = document.getElementById('anchor-photo-upload');
    uploadDiv.innerHTML = `
        <div style="width: 80px; height: 80px; border-radius: 12px; background: var(--surface2); margin: 0 auto 10px auto; overflow: hidden; display:flex; align-items:center; justify-content:center; border: 2px solid var(--accent);">
            <span>📸 Set</span>
        </div>
        <div class="pz-title" style="color: var(--green);">Mental Armor Locked In</div>
    `;
}

async function triggerFailureHaptic() {
    try {
        if (window.Capacitor && window.Capacitor.Plugins.Haptics) {
            const { Haptics, ImpactStyle } = window.Capacitor.Plugins;
            // Heavy stutter vibration for the final set
            await Haptics.impact({ style: ImpactStyle.Heavy });
            setTimeout(async () => await Haptics.impact({ style: ImpactStyle.Heavy }), 150);
            setTimeout(async () => await Haptics.impact({ style: ImpactStyle.Heavy }), 300);
        } else {
            // Web fallback
            if(navigator.vibrate) navigator.vibrate([200, 100, 300]);
            console.log("MANDATE TRIGGERED: Leave absolutely nothing in the tank. Remember your Anchor.");
        }
    } catch (error) {
        console.error("Haptics error:", error);
    }
}