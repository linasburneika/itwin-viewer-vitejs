import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'
import { NodePackageImporter } from 'sass';
import fs from 'fs';
import { parse, resolve} from 'path'
import { replaceCodePlugin } from "vite-plugin-replace";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
  },
  server:{
    port: 3000
  },
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
    replaceCodePlugin({
      replacements: [
        {
          from: "__dirname",
          to: "/",
        }
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        importers: [new NodePackageImporter()],
      },
    },
  },
  resolve: {
    alias: [
      {
        // this is required for the SCSS 
        // a very rough implementation of the SCSS tilde import
        find: /^~(.*)$/,
        replacement: '$1',
        customResolver(source, importer) {
          if (fs.existsSync(source)) {
            return source;
          }

          if (importer?.endsWith('.scss') || importer?.endsWith('.sass')) {
            const dir = parse(source).dir
            const fileName = parse(source).name;
            const ext = parse(source).ext || '.scss';

            const partial = resolve('node_modules', dir, `_${fileName}${ext}`);
            const scss = resolve('node_modules', dir, `${fileName}${ext}`);

            if (fs.existsSync(partial)) {
              return partial;
            }
            if (fs.existsSync(scss)) {
              return scss;
            }
          }
        },
      },
    ],
  },
});
