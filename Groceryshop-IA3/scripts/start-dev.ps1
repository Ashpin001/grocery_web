param(
  [switch]$SkipInstall
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$backend = Resolve-Path (Join-Path $root '..\backend')
$frontend = Resolve-Path (Join-Path $root '..\frontend')

Write-Host "Starting development servers..." -ForegroundColor Cyan

Try {
  Start-Service MongoDB -ErrorAction Stop
  Write-Host "MongoDB service started." -ForegroundColor Green
} Catch {
  Write-Warning "MongoDB service not started by script. Start mongod manually if needed."
}

function Start-Terminal([string]$name, [string]$workdir, [string[]]$cmds) {
  $ps = "Set-Location -Path '$workdir'; $($cmds -join ' ; '); Write-Host 'Process finished in terminal $name'"
  Start-Process -FilePath powershell -ArgumentList "-NoExit","-Command",$ps -WindowStyle Normal
}

$backendCmds = @()
if (-not $SkipInstall) { $backendCmds += 'npm install' }
$backendCmds += 'if (-Not (Test-Path .env) -and (Test-Path .env.example)) { Copy-Item .env.example .env }'
$backendCmds += 'npm run seed -ErrorAction SilentlyContinue'
$backendCmds += 'npm start'

$frontendCmds = @()
if (-not $SkipInstall) { $frontendCmds += 'npm install' }
$frontendCmds += 'npm start'

Start-Terminal -name 'backend' -workdir $backend -cmds $backendCmds
Start-Terminal -name 'frontend' -workdir $frontend -cmds $frontendCmds

Write-Host "Launched backend and frontend in new PowerShell windows." -ForegroundColor Green
