# Vikalp Gupta - Personal Website

A lightweight, fast personal website built with Hugo and deployed on Netlify.

## Features

- Blog section for writing
- Photography portfolio page
- Gear/tools page
- Clean, minimal design
- Fast loading times
- Fully responsive

## Getting Started

### Prerequisites

Install Hugo on macOS:

```bash
brew install hugo
```

Or download from [Hugo releases](https://github.com/gohugoio/hugo/releases).

### Local Development

1. Clone this repository
2. Run the local development server:

```bash
hugo server -D
```

3. Open your browser to `http://localhost:1313`

The `-D` flag includes draft posts. Remove it to see only published content.

### Creating Content

#### New Blog Post

```bash
hugo new blog/my-post-title.md
```

Edit the file in `content/blog/my-post-title.md` and set `draft: false` when ready to publish.

#### Add Photos

1. Place your images in `static/images/`
2. Edit `content/photography/_index.md`
3. Add image references:

```html
<img src="/images/your-photo.jpg" alt="Description">
```

#### Update Gear Page

Edit `content/gear.md` and add your tools and equipment.

### Building for Production

```bash
hugo --gc --minify
```

This generates the static site in the `public/` directory.

## Deploying to Netlify

### Option 1: Connect Git Repository (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Connect your repository
5. Netlify will auto-detect Hugo and use settings from `netlify.toml`
6. Click "Deploy site"

### Option 2: Manual Deploy

1. Build the site locally: `hugo --gc --minify`
2. Log in to [Netlify](https://app.netlify.com/)
3. Drag and drop the `public/` folder to Netlify

### Custom Domain

To use your custom domain `vikalpgupta.com`:

1. In Netlify, go to Site settings > Domain management
2. Click "Add custom domain"
3. Enter `vikalpgupta.com`
4. Follow instructions to update DNS records at your domain registrar
5. Netlify will automatically provision SSL certificate

## Project Structure

```
.
├── archetypes/          # Content templates
├── content/             # All content (Markdown files)
│   ├── blog/           # Blog posts
│   ├── photography/    # Photography page
│   └── gear.md         # Gear/tools page
├── layouts/            # HTML templates
│   ├── _default/       # Default templates
│   └── partials/       # Reusable components
├── static/             # Static assets
│   ├── css/           # Stylesheets
│   └── images/        # Images
├── hugo.toml          # Hugo configuration
└── netlify.toml       # Netlify configuration
```

## Customization

### Site Title and Info

Edit `hugo.toml`:

```toml
title = 'Your Name'
[params]
  description = 'Your description'
  author = 'Your Name'
```

### Styling

Edit `static/css/style.css` to customize colors, fonts, and layout.

### Navigation

Add or modify menu items in `hugo.toml`:

```toml
[[menu.main]]
  name = 'New Page'
  url = '/new-page/'
  weight = 4
```

## Performance

This site is optimized for speed:

- No JavaScript required
- Minimal CSS
- Static HTML generation
- Asset caching headers configured in `netlify.toml`
- Minified HTML, CSS in production build

## License

This project is open source and available under the MIT License.

## Support

For Hugo documentation, visit [gohugo.io/documentation](https://gohugo.io/documentation/)

For Netlify documentation, visit [docs.netlify.com](https://docs.netlify.com/)
