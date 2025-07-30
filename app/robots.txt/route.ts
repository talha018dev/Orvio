// /app/robots.txt/route.ts

export function GET() {
    const content = `
  User-agent: GPTBot
  Disallow: /
  
  User-agent: Google-Extended
  Disallow: /
  
  User-agent: CCBot
  Disallow: /
  
  User-agent: ClaudeBot
  Disallow: /
  
  User-agent: anthropic-ai
  Disallow: /
  
  User-agent: FacebookBot
  Disallow: /
  
  User-agent: *
  Disallow: /private/
  Allow: /
  
  Sitemap: https://yourdomain.com/sitemap.xml
    `.trim()

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain',
        },
    })
}
