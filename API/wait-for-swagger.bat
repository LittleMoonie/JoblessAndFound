@echo off
set url=http://localhost:5000/swagger/v1/swagger.json
set timeout=120
set elapsed=0
set success=0

echo Waiting for Swagger to become available at %url%

:loop
timeout /t 5 >nul
set /a elapsed+=5

curl -s -o NUL -w "%%{http_code}" %url% | findstr /b 200 >nul
if %errorlevel%==0 (
    echo Swagger is available.
    set success=1
    goto :end
)

if %elapsed% geq %timeout% (
    echo Swagger did not become available in time (%timeout% seconds).
    exit /b 1
)

goto loop

:end
if %success%==1 exit /b 0
