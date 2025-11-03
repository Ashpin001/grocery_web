param(
  [switch]$SkipInstall
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$backend = Resolve-Path (Join-Path $root '..\backend')
$frontend = Resolve-Path (Join-Path $root '..\frontend')

Write-Host "Starting backend and frontend in new PowerShell windows..." -ForegroundColor Cyan

function StartWin($workdir, $commands, $title) {
  $cmd = "Set-Location -Path '$workdir'; $($commands -join ' ; '); Write-Host 'Process finished in $title'; Read-Host 'Press Enter to close'"
  Start-Process -FilePath powershell -ArgumentList '-NoExit','-Command',$cmd -WindowStyle Normal -Verb RunAs
}

$backendCmds = @()
if (-not $SkipInstall) { $backendCmds += 'npm install' }
$backendCmds += 'if (-Not (Test-Path .env) -and (Test-Path .env.example)) { Copy-Item .env.example .env }'
$backendCmds += 'npm run seed -ErrorAction SilentlyContinue'
$backendCmds += 'npm start'

$frontendCmds = @()
if (-not $SkipInstall) { $frontendCmds += 'npm install' }
$frontendCmds += 'npm start'

StartWin $backend.Path $backendCmds 'Backend'
StartWin $frontend.Path $frontendCmds 'Frontend'

Write-Host "Launched both windows." -ForegroundColor Green
