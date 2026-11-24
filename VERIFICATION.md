# Foundation verification

Completed on 23 November 2026 on Windows 11, using Node.js 24.20.0, pnpm 10.34.9 and Docker Engine 29.10.0 / Compose 5.8.0 in Ubuntu WSL.

## Results

| Check | Result | Evidence |
| --- | --- | --- |
| Dependency installation | Pass | `pnpm install`; subsequent `pnpm install --frozen-lockfile` succeeds |
| Workspace configuration | Pass | Root plus the two independent app manifests; both app importers in the version 9 pnpm lockfile |
| Installed versions | Pass | `pnpm list --recursive --depth 0` lists the selected SvelteKit/Svelte/Tailwind/TypeScript and Medusa versions |
| PostgreSQL startup | Pass | `pnpm infra:up` waits for a healthy `postgres:17.12-alpine` container |
| Database version and connectivity | Pass | Direct SQL reports PostgreSQL 17.12; Medusa migrations connect from Windows to the Docker database |
| Medusa migrations | Pass | Module migrations, links, search indexes and standard migration scripts complete with exit code 0 |
| Database schema and seed scope | Pass | 151 public tables; product count is 0 |
| Medusa development startup | Pass | `pnpm dev:commerce` starts the server on port 9000 |
| Medusa health | Pass | Built-in `/health` returns HTTP 200 and `OK` |
| Standard Medusa administration | Pass | `/app/` returns HTTP 200 HTML; unauthenticated `/admin/users/me` returns HTTP 401 |
| CORS | Pass | Configured storefront origin receives credentialed CORS permission; an unconfigured origin receives none |
| Storefront development startup | Pass | App-local `pnpm dev` and root `pnpm dev:storefront` start Vite on port 5173 |
| Storefront/backend connectivity | Pass | Storefront `/health` returns HTTP 200 with commerce `ok`; server-rendered landing page reports connected |
| Backend outage handling | Pass | Storefront landing page remains HTTP 200; readiness becomes HTTP 503 / `degraded` |
| Missing page handling | Pass | Unknown page returns HTTP 404 with the custom Page not found view |
| Strict TypeScript checks | Pass | Root `pnpm check` completes; Svelte reports 0 errors and 0 warnings |
| Independent application builds | Pass | Both app builds complete, including Medusa's admin bundle and the SvelteKit Node adapter |
| Root build | Pass | `pnpm build` completes both applications in sequence |
| Built storefront runtime | Pass | App-local `pnpm start` runs the standalone Node build; its readiness and landing page connect to Medusa |
| Commerce artifact boundary | Pass | Generated server manifest has no workspace dependencies and includes its own start command and compiled config |
| Client credential boundary | Pass | Built storefront client files contain none of the actual local commerce database/JWT/cookie values |
| Persistent local storage | Pass | Compose down/up preserves the 151-table schema and zero-product state |
| Git handling | Pass | Initial workspace had no repository/remotes; local `main` initialised, no remotes added, no commits or pushes |
| Ignored files | Pass | Local environments and both app build artifacts are excluded by `.gitignore` |

## Resolved issues and remaining limits

Medusa's development CLI requires `ts-node`, so it is installed with the official SWC configuration. SvelteKit 3 uses explicit environment declarations, native `#lib` imports with extensions, and its current error-hook types; the initial integration errors were corrected.

This Windows host produced process-spawning errors with recursive pnpm development commands. The final development scripts address each app directory explicitly, and the root checks/builds use sequential commands that passed verification. `pnpm dev` starts the storefront; start commerce in a second terminal. Keep an Ubuntu WSL shell open while using its Docker engine so WSL does not shut down the database during inactivity.

Installation emits upstream deprecation notices for three Medusa transitive dependencies, and an optional telemetry postinstall notice. Medusa also emits its expected local-provider notices. These do not prevent installation, migrations, startup, checks or builds; no vendor packages were patched.

Health verification establishes backend liveness and storefront connectivity. Database connectivity is established separately through migrations and SQL. Production shared infrastructure, real payment providers, customer login flows, admin user creation, catalogue/checkout behavior, 3D and animation remain outside this foundation milestone.

No unresolved implementation blockers remain. Application servers and the project database are stopped after verification; the persistent database volume and ignored local configuration are retained.
