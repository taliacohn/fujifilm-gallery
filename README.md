# 📷 Fujifilm X-T3 Recipe Gallery

A beautiful, modern web gallery to showcase and organize photos taken with different Fujifilm film simulation recipes on the X-T3.

## Features

- 🎨 **Modern, Responsive Design** - Works beautifully on desktop, tablet, and mobile
- 🔍 **Search & Filter** - Find recipes by name, film simulation, or status
- 📸 **Photo Management** - Organize photos by recipe with captions and tags
- ❤️ **Like System** - Mark your favorite photos (saved in browser)
- 🏷️ **Recipe Details** - View all settings: film sim, white balance, highlights, shadows, etc.
- 🔗 **Credit Links** - Direct links to original recipe creators
- 📊 **Organization** - Track which recipes you're using, have tried, or want to try
- 🌐 **GitHub Pages Ready** - Host for free on GitHub

## Quick Start

### 1. Clone or Download

This repository is already set up with 37 recipes from your Google Sheet!

### 2. View Locally

Simply open `index.html` in your web browser. That's it!

Or use a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have npx)
npx http-server
```

Then visit `http://localhost:8000`

### 3. Deploy to GitHub Pages

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial gallery setup"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be live at: `https://[your-username].github.io/fujifilm-gallery/`

## Adding Your Photos

### Step 1: Organize Photos

Create folders in the `photos/` directory matching recipe IDs:

```
photos/
  ├── reggies-portra/
  │   ├── photo1.jpg
  │   └── photo2.jpg
  └── kodachrome/
      └── sunset.jpg
```

Recipe IDs are found in `recipes.json` (e.g., `"id": "reggies-portra"`).

### Step 2: Update recipes.json

Add your photos to the recipe's `photos` array:

```json
{
  "id": "reggies-portra",
  "name": "Reggie's Portra",
  "photos": [
    {
      "filename": "photo1.jpg",
      "caption": "Golden hour portrait",
      "tags": ["portrait", "golden-hour", "outdoor"],
      "liked": false
    },
    {
      "filename": "photo2.jpg",
      "caption": "Street photography",
      "tags": ["street", "urban", "midday"]
    }
  ]
}
```

### Photo Properties

- **filename** (required): Image filename in the recipe's folder
- **caption** (optional): Description of the photo
- **tags** (optional): Array of tags for organization
  - Suggested tags: `golden-hour`, `midday`, `overcast`, `indoor`, `outdoor`, `portrait`, `landscape`, `street`, etc.
- **liked** (optional): Managed automatically by the website

### Suggested Tags for Organization

#### Lighting:
- `golden-hour`, `blue-hour`, `midday`, `overcast`, `harsh-light`, `soft-light`

#### Location:
- `indoor`, `outdoor`, `urban`, `nature`, `beach`, `mountains`

#### Subject:
- `portrait`, `landscape`, `street`, `architecture`, `wildlife`, `food`

#### Technical:
- `high-iso`, `low-light`, `backlit`, `silhouette`, `long-exposure`

## Customization

### Adding New Recipes

Add to `recipes.json`:

```json
{
  "id": "my-custom-recipe",
  "name": "My Custom Recipe",
  "usingNow": false,
  "tried": false,
  "notes": "Great for portraits",
  "filmSim": "Classic Chrome",
  "dynamicRange": "DR400",
  "grain": "Weak",
  "colorChromeEffect": "Strong",
  "whiteBalance": "Auto 2R -4B",
  "highlight": "-1",
  "shadow": "-1",
  "color": "2",
  "sharpness": "-2",
  "noiseReduction": "-4",
  "link": "https://example.com/recipe",
  "photos": []
}
```

### Updating Recipe Status

Change these fields in `recipes.json`:

- `"usingNow": true` - Currently using this recipe
- `"tried": true` - You've tested this recipe
- `"notes": "Your notes here"` - Add personal notes

### Styling

Edit `styles.css` to customize colors, fonts, and layout:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    /* ... customize these! */
}
```

## File Structure

```
fujifilm-gallery/
├── index.html          # Main HTML page
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── recipes.json        # Recipe database (edit this!)
├── photos/             # Your photos organized by recipe
│   └── README.md       # Photo organization guide
└── README.md           # This file
```

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Tips for Best Results

### Photography
1. **Test in different lighting** - Tag photos with lighting conditions
2. **Take notes** - Use captions to remember what worked
3. **Compare recipes** - Use the filter to see all "Using Now" recipes
4. **Like your favorites** - Helps identify which recipes work best for you

### Organization
1. **Use consistent tags** - Makes filtering easier
2. **Optimize images** - Resize large photos (recommended max: 2000px width)
3. **Backup regularly** - Commit and push to GitHub often
4. **Update status** - Mark recipes as "tried" after testing

### Performance
1. **Compress images** - Use tools like TinyPNG or ImageOptim
2. **Consistent naming** - Use lowercase, no spaces (e.g., `golden-hour-1.jpg`)
3. **Batch processing** - Add multiple photos at once

## Updating from Google Sheets

If you update your Google Sheet and want to re-import:

1. Export as CSV or copy the data
2. Convert to JSON format matching the structure in `recipes.json`
3. Replace the relevant entries in `recipes.json`
4. Commit and push to GitHub

## Troubleshooting

### Photos not showing
- Check that the folder name matches the recipe `id` exactly
- Verify the filename in `recipes.json` matches the actual file
- Ensure photos are in a web-compatible format (JPG, PNG, WebP)

### Site not updating on GitHub Pages
- Wait 1-2 minutes for GitHub to rebuild
- Clear your browser cache (Cmd/Ctrl + Shift + R)
- Check GitHub Actions for build errors

### Likes not saving
- Likes are stored in browser localStorage
- They won't sync across devices/browsers
- Clearing browser data will reset likes

## Future Enhancements

Ideas for expansion:
- Export/import likes feature
- Comparison view (side-by-side photos)
- EXIF data display
- Sort by date taken
- Recipe ratings
- Print-ready recipe cards

## Credits

All recipes are credited to their original creators with direct links. This gallery is for personal use and photo organization.

## License

MIT License - Feel free to use and modify for your own photography!

---

Made with ❤️ for Fujifilm X-T3 photography

