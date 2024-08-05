import { resolve } from 'path';
import { withPageConfig } from '@chrome-extension-boilerplate/vite-config';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');
const workspaceDir = resolve(rootDir, '..', '..');

export default withPageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
      '@workspace': workspaceDir,
    },
  },
  publicDir: resolve(rootDir, 'public'),
  build: {
    outDir: resolve(workspaceDir, 'dist', 'popup'),
  },
});