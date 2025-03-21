const fs = require('fs');
const path = require('path');

function generateSitemap() {
    const baseUrl = 'https://www.airstreet.com';
    const pages = fs.readdirSync(path.join(__dirname, '..')).filter(file => file.endsWith('.html'));
    
    // Define priority and change frequency for different types of pages
    const pageConfig = {
        'index.html': { priority: '1.0', changefreq: 'daily' },
        'portfolio.html': { priority: '0.9', changefreq: 'weekly' },
        'team.html': { priority: '0.8', changefreq: 'weekly' },
        'bio.html': { priority: '0.8', changefreq: 'monthly' },
        'default': { priority: '0.7', changefreq: 'monthly' }
    };

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map(page => {
    const config = pageConfig[page] || pageConfig.default;
    const url = page === 'index.html' ? baseUrl : `${baseUrl}/${page}`;
    return `    <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${config.changefreq}</changefreq>
        <priority>${config.priority}</priority>
    </url>`;
}).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(__dirname, '../sitemap.xml'), xmlContent);
    console.log('Generated sitemap.xml');
}

generateSitemap(); 