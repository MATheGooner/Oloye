# OLOYE

Premium contemporary menswear commerce platform. A **Bitmason Labs** portfolio project.

The development foundation, visual identity and frontend catalogue milestones are complete: an independent SvelteKit storefront, a Medusa v2 backend, local PostgreSQL, a responsive editorial homepage and a 38-product catalogue. Collection listings include functional search, filters, sorting and a wishlist saved on the current device. Live inventory integration, cart, checkout, accounts and 3D remain reserved for later milestones.

## Requirements and selected versions

| Technology | Version | Responsibility |
| --- | --- | --- |
| Node.js | 24.20.0 LTS | Both applications; pinned in `.nvmrc` and `.node-version` |
| pnpm | 10.34.9 | Workspace installation and scripts; pinned in `packageManager` |
| SvelteKit / Svelte | 3.4.0 / 5.59.1 | Storefront and server rendering |
| TypeScript | 6.0.3 | Both applications |
| Vite | 8.3.8 | Storefront tooling and Medusa's admin bundler |
| Tailwind CSS | 4.3.5 | Storefront styling through its Vite plugin |
| SvelteKit Node adapter | 6.0.5 | Independently deployable storefront server |
| Medusa | 2.23.0 | Commerce APIs, modules and standard administration |
| React / React DOM | 19.3.1 | Medusa's existing admin; storefront uses Svelte |
| PostgreSQL | 17.12 | Persistent local database |
| Docker + Compose | Engine with Compose supporting `up --wait` | PostgreSQL only |
| Git | Current Git CLI | Version control |

Dependencies are pinned, and `pnpm-lock.yaml` records the complete installation. The selected versions match current official requirements: Medusa requires Node 22.22+; SvelteKit 3 requires Svelte 5, Vite 8 and TypeScript 6. pnpm 10 is configured using Medusa's documented monorepo hoisting requirements. TypeScript 7 is deliberately excluded because the selected packages require TypeScript 6.

Three.js, Threlte and GSAP are not installed. Homepage interactions use Svelte and restrained CSS transitions. Threlte 8 supports Svelte 5; revisit stable versions when implementing the 3D milestone.

## Install

Use Node 24.20.0, an operational Docker engine with Compose, and Git. On Windows, use Docker Desktop with Linux containers, or the WSL option below.

From the repository root:

```sh
npm install --global pnpm@10.34.9
pnpm install --frozen-lockfile
```

If PowerShell blocks the package manager's script shim, use `pnpm.cmd` and `npm.cmd` in place of `pnpm` and `npm`.

## Configure local environments

Create these files from the provided examples. In PowerShell:

```powershell
Copy-Item infra/.env.example infra/.env
Copy-Item apps/commerce/.env.example apps/commerce/.env
Copy-Item apps/storefront/.env.example apps/storefront/.env
```

On macOS/Linux:

```sh
cp infra/.env.example infra/.env
cp apps/commerce/.env.example apps/commerce/.env
cp apps/storefront/.env.example apps/storefront/.env
```

For this workspace, ignored local environment files have already been generated with random credentials; preserve them when resuming local development.

Edit the local files:

| File | Variables | Configuration |
| --- | --- | --- |
| `infra/.env` | `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT` | Choose local credentials; default database/user are `oloye`, port `5432` |
| `apps/commerce/.env` | `DATABASE_URL` | Match PostgreSQL credentials, port and database; URL-encode the password |
| `apps/commerce/.env` | `JWT_SECRET`, `COOKIE_SECRET` | Independent random secrets, each at least 32 characters |
| `apps/commerce/.env` | `STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS` | Exact comma-separated origins, without paths or trailing slashes |
| `apps/commerce/.env` | `PORT` | Backend port; default `9000` |
| `apps/storefront/.env` | `MEDUSA_BACKEND_URL` | Backend HTTP(S) origin; default `http://localhost:9000` |
| `apps/storefront/.env` | `MEDUSA_REQUEST_TIMEOUT_MS` | Integer from 1–30000; default `5000` |
| `apps/storefront/.env` | `MEDUSA_PUBLISHABLE_KEY` | Optional for health checks; required for future Store API requests |
| `apps/storefront/.env` | `HOST`, `PORT`, `ORIGIN` | Node adapter production binding and public origin; local defaults use port `5173` |

Generate each secret independently, then paste it into the appropriate ignored environment file:

```sh
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

Commerce fails fast on missing configuration, unchanged secret placeholders, short secrets and invalid CORS origins. Use `http://localhost:5173` for the storefront and `http://localhost:9000/app` for Medusa Admin with the provided CORS values. If you use `127.0.0.1`, add its origins to the CORS lists.

All storefront variables are explicitly private in `src/env.ts`; none are exported to the browser. Never put database credentials, JWT/cookie secrets, admin tokens or payment secrets in a public environment variable. Medusa's publishable key is a Store API key, never an admin secret.

## Start services independently

### 1. PostgreSQL

```sh
pnpm infra:up
pnpm infra:status
```

This starts only PostgreSQL, waits for its health check and persists data in the `oloye_postgres_data` Docker volume. Port 5432 is bound to localhost. Database credentials take effect when the volume is first initialised; changing the environment does not change an existing database password.

The equivalent direct Compose command is:

```sh
docker compose --env-file infra/.env -f infra/compose.yaml up -d --wait
```

**This Windows workspace uses Docker Engine in the existing Ubuntu WSL distribution.** Engine 29.10.0 and Compose 5.8.0 were installed there for verification. Set this in each PowerShell terminal that runs infrastructure scripts:

```powershell
$env:OLOYE_DOCKER_WSL_DISTRO = 'Ubuntu'
pnpm infra:up
```

`infra/compose.mjs` uses ordinary Docker by default. With that optional variable on Windows, it runs the same Compose configuration through WSL, without exposing a Docker daemon TCP port. Keep an Ubuntu WSL shell open in a separate terminal (`wsl -d Ubuntu`) while developing, because systemd services alone do not keep a WSL distribution alive. If the WSL engine is stopped, start it using `wsl -d Ubuntu -u root -- systemctl start docker`. Application commands still run natively in Windows.

### 2. Commerce backend

Run the standard Medusa migrations before the first startup, and after updates that introduce migrations:

```sh
pnpm db:migrate
pnpm dev:commerce
```

Or independently from the app directory:

```sh
cd apps/commerce
pnpm db:migrate
pnpm dev
```

Backend: `http://localhost:9000`. Built-in health endpoint: `http://localhost:9000/health` (returns `OK`). Medusa Admin: `http://localhost:9000/app`.

No demo seed runs. Create an admin user when needed using the standard Medusa CLI:

```sh
pnpm --filter @oloye/commerce user:create --email your-email@example.com --password YOUR_PRIVATE_PASSWORD
```

Choose the password locally and account for your shell history. Admin setup is independent of foundation health verification. Use Medusa Admin to create a publishable API key and associate it with a sales channel when future Store API integration requires one.

### 3. Storefront

In another terminal:

```sh
pnpm dev:storefront
```

Or independently:

```sh
cd apps/storefront
pnpm dev
```

Open `http://localhost:5173`. The page reports whether the commerce backend is connected. It remains usable if commerce is offline.

Readiness endpoint: `http://localhost:5173/health`. It performs a real server-side request to Medusa and returns HTTP 200 when connected or 503 when commerce is unavailable. This verifies connectivity; Medusa's health endpoint is a liveness check, so database migrations and a direct database query are verified separately.

Run `pnpm dev:commerce` and `pnpm dev:storefront` in separate terminals. `pnpm dev` is an alias for the storefront. Explicit app-directory scripts avoid the recursive pnpm development-command spawning issue encountered on this Windows host. Neither app imports the other application's code.

## Checks and builds

```sh
pnpm list --recursive --depth 0
pnpm check
pnpm build
```

Both applications have strict TypeScript checks. Medusa uses its supported Node16 module resolution and decorators; SvelteKit uses the generated `$app/tsconfig`. There is no mock commerce layer.

Independent builds:

```sh
pnpm --filter @oloye/commerce build
pnpm --filter @oloye/storefront build
```

The storefront build emits `apps/storefront/build`. From `apps/storefront`, `pnpm start` loads the local `.env` through Node and starts this build. In deployment, provide environment variables through the platform and run `node build`.

Medusa emits its server and bundled admin under `apps/commerce/.medusa/server`. To deploy commerce independently, use that directory as the deployment artifact, install its runtime dependencies, supply the required environment variables, run migrations and start it with `pnpm start`. Its generated package manifest is independent of the storefront. For a standalone pnpm install, also include the root `.npmrc` hoisting configuration and retain the tested dependency versions.

This milestone uses Medusa's standard local event bus, workflow engine, cache, locking and in-memory session infrastructure. Sessions reset after backend restarts. Before production scaling, configure shared persistent infrastructure using Medusa's supported providers, including Redis where appropriate; review database TLS, HTTPS cookie requirements and deployment origins. No Redis service is needed for the selected local configuration.

## Stop services

Stop each development server with Ctrl+C, then:

```sh
pnpm infra:down
```

Shutdown preserves the PostgreSQL volume. `pnpm infra:logs` streams database logs. To shut down the WSL Docker engine after removing the project containers: `wsl -d Ubuntu -u root -- systemctl stop docker docker.socket`.

Deleting the volume is a separate, destructive operation; it is not part of routine shutdown.

## Documentation and references

See [ARCHITECTURE.md](ARCHITECTURE.md) for boundaries and extension points, [VERIFICATION.md](VERIFICATION.md) for foundation results, [HOMEPAGE.md](HOMEPAGE.md) for the visual identity milestone, [CATALOGUE.md](CATALOGUE.md) for product discovery and verification, and [PHOTOGRAPHY.md](PHOTOGRAPHY.md) for asset credits and licensing.

Official sources checked before dependency installation:

- [Svelte CLI project creation](https://svelte.dev/docs/cli/sv-create)
- [SvelteKit 3 configuration and migration requirements](https://svelte.dev/docs/kit/migrating-to-sveltekit-3)
- [SvelteKit explicit environment variables](https://svelte.dev/docs/kit/environment-variables)
- [SvelteKit Node adapter](https://svelte.dev/docs/kit/adapter-node)
- [Tailwind CSS with SvelteKit](https://tailwindcss.com/docs/installation/framework-guides/sveltekit)
- [Medusa installation](https://docs.medusajs.com/learn/installation)
- [Medusa pnpm monorepos](https://docs.medusajs.com/learn/configurations/pnpm)
- [Medusa configuration](https://docs.medusajs.com/learn/configurations/medusa-config)
- [Official Medusa starter configuration](https://github.com/medusajs/dtc-starter/tree/main/apps/backend)
- [PostgreSQL supported versions](https://www.postgresql.org/support/versioning/)
- [Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Threlte installation and peers](https://threlte.xyz/docs/learn/getting-started/installation/)

The SvelteKit minimal scaffold was created with `sv@1.7.0`. Commerce is a minimal Medusa application based on its official starter configuration, without starter demo features. npm registry package metadata was also checked for exact stable versions and peer requirements.

The workspace initially contained no Git repository or remote. A local repository was initialised on `main`. No automatic commit or push is part of this milestone.
