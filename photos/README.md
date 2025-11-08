# Photos Directory

This directory contains all your photos organized by recipe.

## Structure

Each recipe should have its own subdirectory named after the recipe's `id` in `recipes.json`.

Example structure:
```
photos/
  ├── reggies-portra/
  │   ├── photo1.jpg
  │   ├── photo2.jpg
  │   └── photo3.jpg
  ├── kodachrome/
  │   ├── sunset.jpg
  │   └── portrait.jpg
  └── hp5-bw/
      └── street.jpg
```

## Adding Photos

1. Create a folder matching the recipe `id` (e.g., `reggies-portra`)
2. Add your photos to that folder
3. Update the recipe in `recipes.json` to include the photos

### Example: Adding photos to a recipe

In `recipes.json`, find your recipe and add to the `photos` array:

```json
{
  "id": "reggies-portra",
  "name": "Reggie's Portra",
  ...
  "photos": [
    {
      "filename": "photo1.jpg",
      "caption": "Golden hour portrait",
      "tags": ["portrait", "golden-hour", "outdoor"],
      "liked": false
    },
    {
      "filename": "photo2.jpg",
      "caption": "Street scene",
      "tags": ["street", "urban", "daylight"],
      "liked": false
    }
  ]
}
```

### Photo Object Properties

- `filename` (required): The name of the image file
- `caption` (optional): A description of the photo
- `tags` (optional): Array of tags like lighting conditions, subjects, settings, etc.
  - Suggested tags: `indoor`, `outdoor`, `golden-hour`, `midday`, `overcast`, `portrait`, `landscape`, `street`, `liked`, `disliked`, etc.
- `liked` (optional): Will be managed automatically by the website's like button

## Tips

- Use descriptive filenames
- Keep images web-optimized (recommended: max 2000px width, compressed)
- Organize by lighting conditions and subjects using tags
- Use the website's like button to favorite your best shots

