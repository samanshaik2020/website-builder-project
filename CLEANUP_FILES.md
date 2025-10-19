# Files to Delete - Manual Cleanup Required

## ✅ COMPLETED: Theme Folders Deleted

**Successfully Deleted:**
- ✅ `components/templates/normal/portfolio/themes/` (3 theme files ~1,400 lines)
- ✅ `components/templates/normal/saas-landing/themes/` (3 theme files ~1,200 lines)

**Total Removed:** ~2,600 lines of unused React components

---

## ❌ SQL Files to Delete (Access Codes & Themes - Not Needed)

Delete these files from `lib/supabase/`:

1. ✅ `migration-access-codes.sql` - Access code system (not using)
2. ✅ `complete-access-codes-setup.sql` - Access code setup (not using)
3. ✅ `fix-access-codes-plan-update.sql` - Access code fixes (not using)
4. ✅ `migration-add-theme-column.sql` - Theme migration (already done, not needed)
5. ✅ `migration-fix-null-themes.sql` - Theme fixes (not needed anymore)

## 📝 How to Delete

### Option 1: Using File Explorer
1. Navigate to each folder/file
2. Select and press Delete
3. Confirm deletion

### Option 2: Using PowerShell (Run in project root)
```powershell
# Delete SQL files
Remove-Item "lib\supabase\migration-access-codes.sql"
Remove-Item "lib\supabase\complete-access-codes-setup.sql"
Remove-Item "lib\supabase\fix-access-codes-plan-update.sql"
Remove-Item "lib\supabase\migration-add-theme-column.sql"
Remove-Item "lib\supabase\migration-fix-null-themes.sql"

# Delete theme folders
Remove-Item "components\templates\normal\portfolio\themes" -Recurse
Remove-Item "components\templates\normal\saas-landing\themes" -Recurse
```

### Option 3: Using Command Prompt (Run in project root)
```cmd
del lib\supabase\migration-access-codes.sql
del lib\supabase\complete-access-codes-setup.sql
del lib\supabase\fix-access-codes-plan-update.sql
del lib\supabase\migration-add-theme-column.sql
del lib\supabase\migration-fix-null-themes.sql

rmdir /s components\templates\normal\portfolio\themes
rmdir /s components\templates\normal\saas-landing\themes
```

## ✅ What to Keep

### Keep These SQL Files:
- ✅ `COMPLETE-SETUP-RUN-THIS.sql` - Main setup script
- ✅ `complete-reset.sql` - Reset script (useful for development)
- ✅ `fix-new-user-trigger.sql` - User trigger fixes
- ✅ `fix-shareable-links-406.sql` - Shareable links fixes
- ✅ `migration-analytics.sql` - Analytics features
- ✅ `migration-shareable-links-fix.sql` - Shareable links migration
- ✅ `schema.sql` - Main database schema

### Keep These Template Files:
- ✅ `components/templates/normal/portfolio/default.tsx` - Default portfolio
- ✅ `components/templates/normal/portfolio/index.ts` - Portfolio exports
- ✅ `components/templates/normal/saas-landing/default.tsx` - Default SaaS landing
- ✅ `components/templates/normal/saas-landing/index.ts` - SaaS landing exports

## 📊 Cleanup Summary

**Files to Delete:**
- 5 SQL files (access codes + theme migrations)
- ✅ 2 theme folders (6 theme component files total) - COMPLETED

**Total Cleanup:**
- ~11 files/folders removed (6 completed)
- Cleaner, simpler codebase
- No unused code

---

**After deletion, your codebase will be much cleaner with only the files you actually use!**
