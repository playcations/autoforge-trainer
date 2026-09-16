$ErrorActionPreference = 'Stop'
$trainerNode = (Get-Command node -ErrorAction Stop).Source
& $trainerNode (Join-Path $PSScriptRoot 'build-userscript.cjs')
if ($LASTEXITCODE -ne 0) { throw 'Userscript build failed' }
try {
    $trainerResponse = Invoke-WebRequest 'http://127.0.0.1:8767/autoforge-inspector.meta.js' -TimeoutSec 2
    if ($trainerResponse.Content -like '*AutoForge Read-only Inspector*') {
        Write-Host 'Update server is already available.'
        exit
    }
} catch {}
Start-Process -FilePath $trainerNode -ArgumentList ('"' + (Join-Path $PSScriptRoot 'serve-userscript.cjs') + '"') -WorkingDirectory $PSScriptRoot -WindowStyle Hidden
Write-Host 'Started local update server. Open http://127.0.0.1:8767/autoforge-inspector.user.js in Chrome.'
