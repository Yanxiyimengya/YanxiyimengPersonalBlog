cd ..\

if not exist node_modules (
    echo Installing dependencies...
    npm install
    echo.
)

npm run dev

pause