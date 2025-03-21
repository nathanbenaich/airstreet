const fs = require('fs');
const path = require('path');

// Read the header template
const headerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Air Street Capital - Venture Capital for AI-First Companies</title>
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="Air Street Capital - Venture Capital for AI-First Companies">
    <meta name="description" content="Air Street Capital is a venture capital firm investing in AI-first technology companies. We back ambitious founders building companies that leverage AI to solve meaningful problems.">
    <meta name="keywords" content="venture capital, AI investments, artificial intelligence, startup funding, technology VC, Air Street Capital">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.airstreet.com/">
    <meta property="og:title" content="Air Street Capital - Venture Capital for AI-First Companies">
    <meta property="og:description" content="Air Street Capital is a venture capital firm investing in AI-first technology companies. We back ambitious founders building companies that leverage AI to solve meaningful problems.">
    <meta property="og:image" content="/images/og-image.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://www.airstreet.com/">
    <meta property="twitter:title" content="Air Street Capital - Venture Capital for AI-First Companies">
    <meta property="twitter:description" content="Air Street Capital is a venture capital firm investing in AI-first technology companies. We back ambitious founders building companies that leverage AI to solve meaningful problems.">
    <meta property="twitter:image" content="/images/og-image.png">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.airstreet.com/">
    
    <!-- Robots Meta -->
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    
    <!-- Styling -->
    <link rel="stylesheet" href="/dist/main.min.css">
    
    <!-- PWA Support -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#010061">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- Apple Touch Icons -->
    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="57x57" href="/images/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/images/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/images/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/images/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/images/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/images/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="167x167" href="/images/apple-touch-icon-167x167.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon-180x180.png">
    
    <!-- iOS Meta Tags -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Air Street Capital">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Air Street Capital",
        "url": "https://www.airstreet.com",
        "logo": "https://www.airstreet.com/images/logo.png",
        "description": "Air Street Capital is a venture capital firm investing in AI-first technology companies. We back ambitious founders building companies that leverage AI to solve meaningful problems.",
        "sameAs": [
            "https://twitter.com/airstreet",
            "https://www.linkedin.com/company/air-street-capital"
        ]
    }
    </script>
</head>
<body>`;

// Function to update header in HTML files
function updateHeaders() {
    const rootDir = path.join(__dirname, '..');
    const files = fs.readdirSync(rootDir).filter(file => file.endsWith('.html'));

    files.forEach(file => {
        const filePath = path.join(rootDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find the end of the existing header (</head>)
        const headEndIndex = content.indexOf('</head>');
        if (headEndIndex === -1) return;
        
        // Find the start of the existing header (<!DOCTYPE html>)
        const headStartIndex = content.indexOf('<!DOCTYPE html>');
        if (headStartIndex === -1) return;
        
        // Replace the old header with the new one
        const newContent = headerTemplate + content.substring(content.indexOf('<body>') + '<body>'.length);
        
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated ${filePath}`);
    });
}

updateHeaders(); 