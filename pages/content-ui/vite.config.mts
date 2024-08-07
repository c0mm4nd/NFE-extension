import { resolve } from 'path';
import { makeEntryPointPlugin } from '@chrome-extension-boilerplate/hmr';
import { withPageConfig, isDev } from '@chrome-extension-boilerplate/vite-config';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');
const workspaceDir = resolve(rootDir, '..', '..');

export default withPageConfig({
  assetsInclude: ['**/*.wasm'],
  resolve: {
    alias: {
      '@src': srcDir,
      '@workspace': workspaceDir,
    },
  },
  plugins: [
    isDev && makeEntryPointPlugin(),
    viteStaticCopy({
      targets: [
          { src: 'node_modules/onnxruntime-web/dist/*.wasm', dest: '.' }
      ]
    })
  ],
  publicDir: resolve(rootDir, 'public'),
  build: {
    lib: {
      entry: resolve(srcDir, 'index.tsx'),
      name: 'contentUI',
      formats: ['iife'],
      fileName: 'index',
    },
    outDir: resolve(rootDir, '..', '..', 'dist', 'content-ui'),
  },

});
