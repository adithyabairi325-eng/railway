@echo off
echo Adding and committing fixes...
git add .
git commit -m "Fix build errors: remove invalid GanttChart import and add CI=false for Vercel"
echo Pushing to GitHub...
git push origin main
echo Done!
pause
