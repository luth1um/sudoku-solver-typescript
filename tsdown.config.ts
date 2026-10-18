import { type UserConfig, defineConfig } from 'tsdown';

const config: UserConfig = defineConfig({
  dts: true,
  entry: './src/index.ts',
  exports: true,
  platform: 'neutral',
  sourcemap: true,
});

export default config;
