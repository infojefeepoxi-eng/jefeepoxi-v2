@echo off
echo Starting deployment to Netlify...

REM Build the project
echo Building project...
call npm run build

REM Deploy to Netlify
echo Deploying to Netlify...
npx netlify-cli deploy --dir=dist --prod --open

echo Deployment completed!
pause

