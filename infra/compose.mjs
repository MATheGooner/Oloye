import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const composeArgs = ['compose', '--env-file', 'infra/.env', '-f', 'infra/compose.yaml', ...process.argv.slice(2)];
const distro = process.env.OLOYE_DOCKER_WSL_DISTRO;
const useWsl = process.platform === 'win32' && Boolean(distro);
const result = spawnSync(
  useWsl ? 'wsl.exe' : 'docker',
  useWsl ? ['-d', distro, '-u', 'root', '--cd', root, '--', 'docker', ...composeArgs] : composeArgs,
  { cwd: root, stdio: 'inherit' }
);

if (result.error) {
  console.error('Docker could not run. Start Docker with Compose, or configure OLOYE_DOCKER_WSL_DISTRO on Windows.');
}
process.exit(result.status ?? 1);
