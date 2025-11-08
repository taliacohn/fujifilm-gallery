# Quick Start Guide

## How to View Your Gallery

**You CANNOT just open `index.html` directly** - it needs a server to work properly.

### 🚀 Easiest Way (Mac):

**Just double-click `start-server.command`** in Finder!

Then open your browser to: **http://localhost:8000**

Press `Ctrl+C` in the terminal window to stop the server when done.

---

### Alternative Methods:

#### Option 1: Terminal Command (Mac/Linux)
```bash
cd /Users/taliacohn/Desktop/Code/fujifilm-gallery
python3 -m http.server 8000
```

#### Option 2: VS Code
If you have VS Code with Live Server extension:
- Right-click `index.html`
- Select "Open with Live Server"

---

## Adding Photos with Tags

### Step 1: Add your photo to the correct folder
Put your image in: `photos/reggies-portra/dogs.jpg` ✅ (You already did this!)

### Step 2: Update recipes.json

Find your recipe and update the `photos` array:

```json
{
  "id": "reggies-portra",
  "name": "Reggie's Portra",
  ...
  "photos": [
    {
      "filename": "dogs.jpg",
      "caption": "Testing Reggie's Portra",
      "tags": ["outdoor", "portrait", "golden-hour"],
      "liked": false
    },
    {
      "filename": "another-photo.jpg",
      "caption": "Street scene in Brooklyn",
      "tags": ["urban", "street", "midday"],
      "liked": false
    }
  ]
}
```

### Understanding Tags

**Tags go in the `"tags"` array** for each photo. Use them to organize by:

#### Lighting:
- `"golden-hour"`, `"blue-hour"`, `"midday"`, `"overcast"`, `"harsh-light"`, `"soft-light"`

#### Location:
- `"indoor"`, `"outdoor"`, `"urban"`, `"nature"`, `"beach"`, `"mountains"`

#### Subject:
- `"portrait"`, `"landscape"`, `"street"`, `"architecture"`, `"animals"`, `"food"`

#### Your Opinion:
- `"favorite"`, `"testing"`, `"needs-work"`

#### Example with multiple tags:
```json
{
  "filename": "sunset-portrait.jpg",
  "caption": "Golden hour test shot",
  "tags": ["portrait", "outdoor", "golden-hour", "favorite"],
  "liked": false
}
```

---

## Your Current Setup ✅

I've already set up your first photo! Check `recipes.json` line 19-26:

```json
"photos": [
  {
    "filename": "dogs.jpg",
    "caption": "Testing Reggie's Portra",
    "tags": ["outdoor", "portrait"],
    "liked": false
  }
]
```

Now just run the server and you'll see it in the gallery!

