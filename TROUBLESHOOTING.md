# Troubleshooting Guide - Partners Management System

## 🐛 Common Issues and Solutions

### Date Display Problems

#### Issue: Shows "عضویت از 1404 سال پیش" or "NaN undefined NaN"

**Cause**: Invalid date format in partner data

**Symptoms**:
- Date shows as "NaN undefined NaN"
- Relative time shows incorrect values like "1404 سال پیش"
- Date field shows "تاریخ نامعتبر"

**Solution**:
1. **Run the date fix script**:
   ```bash
   node scripts/fix-dates.js
   ```

2. **Manual fix for single partner**:
   - Go to admin panel (`/admin`)
   - Find the problematic partner
   - Edit and set date in correct format: `YYYY/MM/DD`
   - Example: `1404/03/12`

3. **Acceptable date formats**:
   ✅ `1404/03/12` (Correct)
   ✅ `1403/12/29` (Correct)
   ❌ `۱۴۰۴/۰۳/۱۲` (Persian numerals - Wrong)
   ❌ `1404` (Incomplete - Wrong)
   ❌ `1404/3/12` (Missing leading zero - Works but not recommended)

#### Issue: Admin panel date field auto-generation fails

**Cause**: Moment.js Jalali not working properly

**Solution**:
1. **Check dependencies**:
   ```bash
   npm list moment-jalaali
   ```

2. **Reinstall if needed**:
   ```bash
   npm uninstall moment-jalaali
   npm install moment-jalaali @types/moment-jalaali
   ```

3. **Test date generation**:
   ```bash
   node scripts/debug-dates.js
   ```

### Admin Panel Issues

#### Issue: Admin panel not accessible

**Symptoms**:
- 404 error on `/admin`
- Admin button not visible

**Solution**:
1. **Check file exists**: Ensure `/src/app/admin/page.tsx` exists
2. **Restart dev server**:
   ```bash
   npm run dev
   ```
3. **Check browser console** for JavaScript errors

#### Issue: Partner data not saving

**Symptoms**:
- Changes don't persist after refresh
- API errors in console

**Solution**:
1. **Check file permissions**:
   - Ensure `src/data/partners.json` is writable
   - Check server has write access to filesystem

2. **Verify API endpoints**:
   ```bash
   # Test in browser console
   fetch('/api/partners').then(r => r.json()).then(console.log)
   ```

3. **Check server logs** for file system errors

#### Issue: Logo generation fails

**Symptoms**:
- New partners show without logos
- 500 errors when adding partners

**Solution**:
1. **Check logos directory**:
   ```bash
   ls -la public/logos/
   ```

2. **Create directory if missing**:
   ```bash
   mkdir -p public/logos
   ```

3. **Test logo generation manually**:
   ```bash
   node scripts/generate-logos.js
   ```

### Performance Issues

#### Issue: Slow search/sorting with many partners

**Symptoms**:
- Lag when typing in search
- Slow sort operations

**Solution**:
1. **Check partner count**:
   ```bash
   node scripts/test-api.js
   ```

2. **Enable pagination** if over 500 partners
3. **Consider virtual scrolling** for very large datasets

#### Issue: Large JSON file causing issues

**Symptoms**:
- Slow page loads
- Memory issues

**Solution**:
1. **Check file size**:
   ```bash
   ls -lh src/data/partners.json
   ```

2. **If over 1MB**, consider:
   - Database migration
   - API pagination
   - Data compression

### Data Integrity Issues

#### Issue: Duplicate partner IDs

**Symptoms**:
- React key warnings
- Inconsistent partner display

**Solution**:
1. **Run ID cleanup script**:
   ```javascript
   // Create script to fix IDs
   const partners = require('./src/data/partners.json');
   partners.partners.forEach((p, i) => p.id = i + 1);
   fs.writeFileSync('./src/data/partners.json', JSON.stringify(partners, null, 2));
   ```

#### Issue: Corrupted JSON file

**Symptoms**:
- Parse errors
- Admin panel won't load
- Empty partner list

**Solution**:
1. **Validate JSON**:
   ```bash
   node -e "console.log(JSON.parse(require('fs').readFileSync('src/data/partners.json', 'utf8')))"
   ```

2. **Restore from backup** if available
3. **Regenerate from script**:
   ```bash
   node scripts/add-dates.js
   ```

### Development Issues

#### Issue: TypeScript compilation errors

**Common Errors**:
- Import path issues
- Type mismatches
- Missing dependencies

**Solution**:
1. **Check imports**:
   ```typescript
   // Correct import paths
   import { getCurrentJalaliDate } from '@/lib/jalali-utils';
   ```

2. **Verify types**:
   ```bash
   npx tsc --noEmit
   ```

3. **Install missing types**:
   ```bash
   npm install --save-dev @types/moment-jalaali
   ```

#### Issue: Build failures

**Symptoms**:
- `npm run build` fails
- Type errors in production

**Solution**:
1. **Clean build**:
   ```bash
   rm -rf .next
   npm run build
   ```

2. **Check diagnostics**:
   ```bash
   npx next build --debug
   ```

## 🚀 Quick Fixes

### Emergency Date Reset
```bash
# Reset all dates to valid range
node scripts/fix-dates.js
```

### Force Partner Reload
```bash
# Restart development server
npm run dev
```

### Manual JSON Fix
```javascript
// In browser console on admin page
fetch('/api/partners', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({partners: []}) // Reset to empty
})
```

### Logo Regeneration
```bash
# Regenerate all logos
rm -rf public/logos/*
node scripts/generate-logos.js
```

## 🔍 Debugging Tools

### Check Current State
```bash
# Run all tests
node scripts/test-api.js
node scripts/test-sorting.js
node scripts/debug-dates.js
```

### Validate Data
```bash
# Check partners count
grep -c '"id"' src/data/partners.json

# Check date formats
grep -o '"addedDate": "[^"]*"' src/data/partners.json | head -10
```

### Performance Check
```bash
# File sizes
du -h src/data/partners.json
du -h public/logos/

# Partner count
jq '.partners | length' src/data/partners.json
```

## 📞 Getting Help

1. **Check browser console** for JavaScript errors
2. **Check server logs** for API errors
3. **Run test scripts** to identify specific issues
4. **Check file permissions** if data isn't persisting
5. **Verify dependencies** are properly installed

## 🛡️ Prevention

### Regular Maintenance
- **Backup JSON file** before major changes
- **Run test scripts** periodically
- **Monitor file sizes** as data grows
- **Validate dates** when adding partners

### Best Practices
- Always use `YYYY/MM/DD` format for dates
- Test admin panel after adding partners
- Keep partner names under 50 characters
- Use valid URLs with protocol (https://)
- Generate logos for better performance