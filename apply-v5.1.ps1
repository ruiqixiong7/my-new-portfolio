$ErrorActionPreference="Stop"
$page="app\page.tsx"; $css="app\home-v4.module.css"
if(!(Test-Path $page)){throw "找不到 app\page.tsx"}
if(!(Test-Path $css)){throw "找不到 app\home-v4.module.css"}
Copy-Item $page "$page.v51-backup" -Force
Copy-Item $css "$css.v51-backup" -Force
$c=Get-Content $page -Raw -Encoding UTF8
$p='(?s)\s*const distance = index - position;\s*const depth = Math\.min\(Math\.abs\(distance\), 1\);.*?artwork\.style\.clipPath = distance < 0 \? `inset\(\$\{inset\}px 0 0\)` : `inset\(0 0 \$\{inset\}px\)`;\s*\}\s*'
$r=@'
        const distance = index - position;
        const absDistance = Math.abs(distance);
        const neighbor = Math.min(absDistance, 1);
        const easedNeighbor = 1 - Math.pow(1 - neighbor, 3);
        const track = Math.sign(distance) * (easedNeighbor * 0.565 + Math.max(0, absDistance - 1) * 0.115);
        const scale = reduced.matches ? 1 : 1 - easedNeighbor * 0.055;
        const brightness = reduced.matches ? 1 : 1 - easedNeighbor * 0.38;
        const opacity = clamp(1 - Math.max(0, absDistance - 1.35) * 1.55, 0, 1);
        card.style.transform = `translate3d(-50%, -50%, 0) translateY(${track * height}px) scale(${scale})`;
        card.style.filter = `brightness(${brightness})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(30 - Math.round(absDistance * 5));
        card.style.visibility = absDistance > 2.15 ? 'hidden' : 'visible';
        card.style.pointerEvents = index === nearest ? 'auto' : 'none';
        card.tabIndex = index === nearest ? 0 : -1;
        card.setAttribute('aria-hidden', String(index !== nearest));
        const artwork = card.querySelector('img');
        if (artwork) artwork.style.clipPath = 'none';
'@
$rx=[regex]::new($p)
if(!$rx.IsMatch($c)){throw "未匹配到当前 GitHub main 的滚动代码，未覆盖文件。"}
$c=$rx.Replace($c,"`r`n$r`r`n",1)
$c=$c -replace 'Math\.exp\(-dt / 105\)','Math.exp(-dt / 150)'
$c=$c -replace 'Math\.exp\(-dt / 75\)','Math.exp(-dt / 118)'
$c=$c -replace '\}, 180\);','}, 260);'
Set-Content $page $c -Encoding UTF8
$s=Get-Content $css -Raw -Encoding UTF8
$s=[regex]::Replace($s,'(?m)^\.artwork \{.*\}$','.artwork { position: absolute; left: 50%; top: 50%; width: min(72vw, 1180px); height: 62svh; display: block; background: transparent; will-change: transform, opacity, filter; backface-visibility: hidden; transform-origin: 50% 50%; }',1)
$s=[regex]::Replace($s,'(?m)^\.artwork::before, \.artwork::after \{.*\}\r?\n?','')
$s=[regex]::Replace($s,'(?m)^\.artwork::before \{.*\}\r?\n?','')
$s=[regex]::Replace($s,'(?m)^\.artwork::after \{.*\}\r?\n?','')
$s=[regex]::Replace($s,'(?m)^\.artwork img \{.*\}$','.artwork img { position: relative; display: block; width: 100%; height: 100%; object-fit: contain; user-select: none; }',1)
Set-Content $css $s -Encoding UTF8
Write-Host "V5.1 applied successfully." -ForegroundColor Green
Write-Host "Now run: npm run dev" -ForegroundColor Cyan
