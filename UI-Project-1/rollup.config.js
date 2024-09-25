import { spawn } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

// Define the base path for your app
const basePath = production ? '/UI-Project-1' : '';

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    // Output to public/build or public/UI-Project-1/build depending on the environment
    file: `public${basePath}/build/bundle.js`,
  },
  plugins: [
    svelte({
      compilerOptions: {
        // Enable run-time checks when not in production
        dev: !production,
      },
    }),
    // Extract component CSS into a separate file
    css({ output: 'bundle.css' }),

    // Handle module resolution
    resolve({
      browser: true,
      dedupe: ['svelte'],
      exportConditions: ['svelte'],
    }),
    commonjs(),

    // Replace __BASE_PATH__ in code with the actual base path
    replace({
      preventAssignment: true,
      __BASE_PATH__: basePath,
    }),

    // Serve in development mode
    !production && serve(),

    // Live reload in development mode
    !production && livereload('public'),

    // Minify in production mode
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
