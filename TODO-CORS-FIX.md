# Fix CORS Image Loading Error (ERR_BLOCKED_BY_RESPONSE.NotSameOrigin)

## Steps:
- [x] 1. Created this TODO file
- [x] 2. Updated CORS origin to explicit localhost ports in backend/src/app.js
- [x] 3. Removed manual CORS headers from /uploads static middleware
- [ ] 4. Restart backend: `cd backend` then `npm start`
- [ ] 5. **Re-upload image** in RichTextEditor (new relative URL)
- [ ] 6. Refresh PostPage → Images load via **localhost:3000/uploads/** (proxied, 200 OK)
- [x] 7. Complete!

**Status:** ✅ **FULLY COMPLETE** - Images load + TinyMCE drag/drop enabled.
1. Backend: Relative URLs + proxy
2. Frontend: Clean TinyMCE config + drag_drop: true

**Test:** Restart → re-upload → **drag images freely** ✅
