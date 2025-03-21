const fs = require('fs');
const path = require('path');

describe('Build Process', () => {
    test('dist directory exists', () => {
        expect(fs.existsSync(path.join(__dirname, '../dist'))).toBe(true);
    });

    test('minified CSS exists', () => {
        expect(fs.existsSync(path.join(__dirname, '../dist/main.min.css'))).toBe(true);
    });

    test('sitemap.xml exists', () => {
        expect(fs.existsSync(path.join(__dirname, '../dist/sitemap.xml'))).toBe(true);
    });

    test('robots.txt exists', () => {
        expect(fs.existsSync(path.join(__dirname, '../robots.txt'))).toBe(true);
    });

    test('security.txt exists', () => {
        expect(fs.existsSync(path.join(__dirname, '../.well-known/security.txt'))).toBe(true);
    });
}); 