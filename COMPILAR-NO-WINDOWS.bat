@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Instalando dependencias de compilacao...
call npm install
if errorlevel 1 goto erro
echo Gerando instalador do Windows...
call npm run dist:win
if errorlevel 1 goto erro
echo.
echo INSTALADOR CRIADO: dist\Financas-Pessoais-Setup-1.9.12.exe
pause
exit /b 0
:erro
echo Falha. Verifique a conexao com a internet e o Node.js.
pause
exit /b 1
