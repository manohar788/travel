$source = 'C:\Users\ammis\1810'
$tempDir = 'C:\Users\ammis\1810_temp_zip'
$zipPath = 'C:\Users\ammis\OneDrive\Desktop\MoodTravel-App.zip'

if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }

$excludePatterns = @('node_modules', 'dist', 'vibe_images', '.git')

robocopy $source $tempDir /E /XD node_modules dist vibe_images .git /NFL /NDL /NJH /NJS /NC /NS /NP

Remove-Item $zipPath -Force -ErrorAction SilentlyContinue
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -Force
Remove-Item $tempDir -Recurse -Force

$size = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
Write-Host "Created MoodTravel-App.zip ($size MB) on Desktop"
