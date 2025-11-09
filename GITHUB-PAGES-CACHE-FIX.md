# GitHub Pages Cache Issue - How to Fix

## The Problem
When you push updates to GitHub Pages, your browser may show the old cached version instead of your new changes.

## Solutions

### 1. Hard Refresh Your Browser (Quick Fix)

**On Mac:**
- **Chrome/Edge/Firefox:** `Cmd + Shift + R`
- **Safari:** `Cmd + Option + R` or hold Shift and click refresh button

**On Windows:**
- **Chrome/Edge/Firefox:** `Ctrl + Shift + R` or `Ctrl + F5`

### 2. Clear Browser Cache (More Thorough)

**Chrome:**
1. Open Chrome DevTools (`Cmd/Ctrl + Shift + I`)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

**Safari:**
1. Open Safari Preferences → Advanced
2. Check "Show Develop menu"
3. Develop → Empty Caches

**Firefox:**
1. Preferences → Privacy & Security
2. Cookies and Site Data → Clear Data
3. Check "Cached Web Content" → Clear

### 3. Wait for GitHub Pages to Update
Sometimes GitHub Pages takes 1-2 minutes to rebuild after pushing. Wait a bit and try refreshing.

### 4. Check GitHub Actions
1. Go to your repository on GitHub
2. Click the "Actions" tab
3. Make sure the latest "pages build and deployment" succeeded
4. Look for a green checkmark ✓

### 5. Verify Your Push Worked
```bash
# Check if your changes were pushed
git log origin/main -1

# Should show your latest commit
```

### 6. Test in Incognito/Private Window
Open your site in an incognito/private window - it won't have any cached files.

**Chrome:** `Cmd/Ctrl + Shift + N`
**Safari:** `Cmd + Shift + N`
**Firefox:** `Cmd/Ctrl + Shift + P`

## Prevention

I've added cache-busting meta tags to your `index.html` that tell browsers not to cache the page. This should help reduce caching issues going forward!

## Still Having Issues?

If updates still aren't showing:

1. **Check the timestamp:** View the page source and look for recent edit dates
2. **Check a different device:** View on your phone to confirm updates are live
3. **Clear all browser data:** Nuclear option but guaranteed to work
4. **Wait 5-10 minutes:** Sometimes propagation takes time

## Quick Reference

After pushing to GitHub:
1. Wait 1-2 minutes for GitHub to rebuild
2. Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
3. If still not working, open in incognito mode to verify

---

**Pro Tip:** Keep DevTools open while developing. With DevTools open, you can check "Disable cache" in the Network tab, and it will always fetch fresh content while DevTools are open.

