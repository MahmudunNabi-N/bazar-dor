$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

if (-not (Test-Path ".git")) {
    git init
}

$GitName = git config user.name
$GitEmail = git config user.email
if ([string]::IsNullOrWhiteSpace($GitName) -or [string]::IsNullOrWhiteSpace($GitEmail)) {
    Write-Host "Before creating commits, set your Git identity:" -ForegroundColor Yellow
    Write-Host '  git config --global user.name "Your Name"'
    Write-Host '  git config --global user.email "your-github-email@example.com"'
    exit 1
}

function Commit-Group {
    param(
        [string[]]$Paths,
        [string]$Message
    )

    foreach ($Path in $Paths) {
        git add -- (":(literal)" + $Path)
    }

    git commit -m $Message
    if ($LASTEXITCODE -ne 0) {
        throw "Commit failed: $Message"
    }
}

Commit-Group @(
    "package.json", "tsconfig.json", "next.config.mjs", "postcss.config.mjs",
    "tailwind.config.ts", "next-env.d.ts", ".gitignore", ".env.example",
    "scripts/create-git-history.ps1"
) "chore: set up Next.js and Tailwind project"

Commit-Group @(
    "data/categories.ts", "data/fallback-products.ts", "lib/types.ts",
    "lib/format.ts", "lib/products.ts"
) "feat: add product data and API fallback layer"

Commit-Group @(
    "components/navbar.tsx", "components/price-ticker.tsx",
    "components/site-shell.tsx", "components/footer.tsx"
) "feat: build responsive navigation and price ticker"

Commit-Group @(
    "components/hero.tsx", "components/price-movers.tsx",
    "components/section-heading.tsx"
) "feat: add market hero and daily price movers"

Commit-Group @(
    "components/product-card.tsx", "components/product-grid.tsx",
    "components/skeleton-grid.tsx"
) "feat: build searchable and sortable product catalogue"

Commit-Group @(
    "components/product-detail.tsx", "app/page.tsx",
    "app/category/[slug]/page.tsx", "app/product/[slug]/page.tsx",
    "app/loading.tsx", "app/not-found.tsx"
) "feat: add category, product details, and loading routes"

Commit-Group @(
    "components/auth-form.tsx", "components/profile-view.tsx",
    "components/toast-provider.tsx", "app/signin/page.tsx",
    "app/signup/page.tsx", "app/profile/page.tsx",
    "app/profile/update/page.tsx"
) "feat: add authentication UI and profile update flow"

Commit-Group @(
    "app/layout.tsx", "app/globals.css", "README.md"
) "style: finish responsive design and project documentation"

Write-Host "Created the 8 assignment commits successfully." -ForegroundColor Green
Write-Host "Next: connect your GitHub repository with git remote add origin <repo-url>, then push your branch."
git log --oneline -8
