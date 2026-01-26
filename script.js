// Color Switching Application Script
        // DOM Elements
        const colorDisplay = document.getElementById('colorDisplay');
        const colorHex = document.getElementById('colorHex');
        const hexValue = document.getElementById('hexValue');
        const rgbValue = document.getElementById('rgbValue');
        const presetColors = document.getElementById('presetColors');
        const redSlider = document.getElementById('redSlider');
        const greenSlider = document.getElementById('greenSlider');
        const blueSlider = document.getElementById('blueSlider');
        const redValue = document.getElementById('redValue');
        const greenValue = document.getElementById('greenValue');
        const blueValue = document.getElementById('blueValue');
        const hexInput = document.getElementById('hexInput');
        const applyHex = document.getElementById('applyHex');
        const randomBtn = document.getElementById('randomBtn');
        const copyBtn = document.getElementById('copyBtn');
        const notification = document.getElementById('notification');

        // Current color values
        let currentRed = 106;
        let currentGreen = 17;
        let currentBlue = 203;

        // Preset colors array
        const presets = [
            { name: "Violet", hex: "#6A11CB", rgb: "rgb(106, 17, 203)" },
            { name: "Blue", hex: "#2575FC", rgb: "rgb(37, 117, 252)" },
            { name: "Red", hex: "#FF4757", rgb: "rgb(255, 71, 87)" },
            { name: "Green", hex: "#2ED573", rgb: "rgb(46, 213, 115)" },
            { name: "Orange", hex: "#FF9F43", rgb: "rgb(255, 159, 67)" },
            { name: "Purple", hex: "#9B59B6", rgb: "rgb(155, 89, 182)" },
            { name: "Pink", hex: "#FD79A8", rgb: "rgb(253, 121, 168)" },
            { name: "Yellow", hex: "#FFD32A", rgb: "rgb(255, 211, 42)" },
            { name: "Teal", hex: "#00CEC9", rgb: "rgb(0, 206, 201)" },
            { name: "Dark", hex: "#2D3436", rgb: "rgb(45, 52, 54)" }
        ];

        // Initialize the app
        function initApp() {
            // Create preset color buttons
            presets.forEach(color => {
                const colorBtn = document.createElement('button');
                colorBtn.className = 'color-btn';
                colorBtn.style.backgroundColor = color.hex;
                colorBtn.title = color.name;
                colorBtn.setAttribute('data-hex', color.hex);
                colorBtn.addEventListener('click', () => {
                    setColorFromHex(color.hex);
                });
                presetColors.appendChild(colorBtn);
            });

            // Set initial color
            updateColor();
            
            // Add event listeners to sliders
            redSlider.addEventListener('input', updateColorFromSliders);
            greenSlider.addEventListener('input', updateColorFromSliders);
            blueSlider.addEventListener('input', updateColorFromSliders);
            
            // Add event listener to hex apply button
            applyHex.addEventListener('click', applyHexColor);
            
            // Add event listener to hex input (Enter key)
            hexInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    applyHexColor();
                }
            });
            
            // Add event listener to random button
            randomBtn.addEventListener('click', generateRandomColor);
            
            // Add event listener to copy button
            copyBtn.addEventListener('click', copyHexToClipboard);
        }

        // Update color from sliders
        function updateColorFromSliders() {
            currentRed = parseInt(redSlider.value);
            currentGreen = parseInt(greenSlider.value);
            currentBlue = parseInt(blueSlider.value);
            
            redValue.textContent = currentRed;
            greenValue.textContent = currentGreen;
            blueValue.textContent = currentBlue;
            
            updateColor();
        }

        // Update all color displays
        function updateColor() {
            const hexColor = rgbToHex(currentRed, currentGreen, currentBlue);
            const rgbColor = `rgb(${currentRed}, ${currentGreen}, ${currentBlue})`;
            
            // Update display
            colorDisplay.style.backgroundColor = rgbColor;
            colorHex.textContent = hexColor.toUpperCase();
            
            // Update info panel
            hexValue.textContent = hexColor.toUpperCase();
            rgbValue.textContent = rgbColor;
            
            // Update hex input
            hexInput.value = hexColor.toUpperCase();
            
            // Update sliders values display
            redValue.textContent = currentRed;
            greenValue.textContent = currentGreen;
            blueValue.textContent = currentBlue;
            
            // Update slider positions
            redSlider.value = currentRed;
            greenSlider.value = currentGreen;
            blueSlider.value = currentBlue;
        }

        // Convert RGB to HEX
        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        // Set color from HEX
        function setColorFromHex(hex) {
            // Remove # if present
            hex = hex.replace('#', '');
            
            // Parse hex values
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            
            currentRed = parseInt(hex.substring(0, 2), 16);
            currentGreen = parseInt(hex.substring(2, 4), 16);
            currentBlue = parseInt(hex.substring(4, 6), 16);
            
            updateColor();
        }

        // Apply hex color from input
        function applyHexColor() {
            let hex = hexInput.value.trim();
            
            // Validate hex format
            if (!/^#[0-9A-F]{6}$/i.test(hex) && !/^[0-9A-F]{6}$/i.test(hex)) {
                showNotification("Invalid HEX format! Use #RRGGBB", true);
                return;
            }
            
            // Add # if missing
            if (!hex.startsWith('#')) {
                hex = '#' + hex;
                hexInput.value = hex;
            }
            
            setColorFromHex(hex);
            showNotification("HEX color applied!");
        }

        // Generate random color
        function generateRandomColor() {
            currentRed = Math.floor(Math.random() * 256);
            currentGreen = Math.floor(Math.random() * 256);
            currentBlue = Math.floor(Math.random() * 256);
            
            updateColor();
            showNotification("Random color generated!");
        }

        // Copy hex to clipboard
        function copyHexToClipboard() {
            const hexCode = rgbToHex(currentRed, currentGreen, currentBlue).toUpperCase();
            
            navigator.clipboard.writeText(hexCode).then(() => {
                showNotification("Color code copied to clipboard!");
            }).catch(err => {
                console.error("Failed to copy: ", err);
                showNotification("Failed to copy to clipboard", true);
            });
        }

        // Show notification
        function showNotification(message, isError = false) {
            notification.textContent = message;
            notification.style.backgroundColor = isError ? "#FF4757" : "#2ED573";
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', initApp);
    