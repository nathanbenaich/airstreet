// Function to load and insert the header
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        const html = await response.text();
        // Extract only the head content
        const headContent = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)[1];
        // Replace the current head content
        document.head.innerHTML = headContent;
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Load the header when the page loads
document.addEventListener('DOMContentLoaded', loadHeader); 