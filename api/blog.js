import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const blogDir = path.join(process.cwd(), 'public', 'blogs');
    const templatePath = path.join(process.cwd(), 'public', 'views', 'blog.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    const files = fs.readdirSync(blogDir);
    const listItems = files
        .filter(f => f.endsWith('.md'))
        .map(f => {
            const slug = f.replace('.md', '');
            return `<li><a href="/api/blog/${slug}">${slug.replace(/-/g, ' ')}</a></li>`;
        }).join('\n');

    const content = `<h1>My Blogs</h1><ul>${listItems}</ul>`;
    const html = template.replace(/{{title}}/g, 'My Blog').replace(/{{content}}/g, content);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
