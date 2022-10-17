# Vue3 WordPress Boilerplate

This is a simple Vue 3 project using WordPress API that shows latest posts.

We usually don't use it to display latest posts, but it's just an example to show how it's done.

> Previously only for internal project in my agency: [**Pixel Studio**](https://pixelstudio.id).

List of packages:

- Vite
- Vue Router
- Pinia
- Axios
- SVG Loader
- ESLint Airbnb
- Sass

## How to Use

1. Install all packages:

    ```
    npm install
    ```

1. Update the Environment variable (`.env.development` and `.env.production`) to fit your URL.

1. To start development server, run this command:

    ```
    npm run dev
    ```

1. Start coding! All source code are in `/src` folder.

1. Before deployment, you need to compile and minify the files. Run this command and the compiled files will be in `/dist` folder:

    ```
    npm run build
    ```

1. If you are deploying it into Apache server, add this `.htaccess` to the root folder:

    ```
    <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    </IfModule>
    ```

## SRC Structure

**FILES**:

- `main.js` - The entry point to declare the Vue app.

- `App.vue` - The main layout containing common elements such as Header and Footer.

- `router.js` - Handles URL routing.

- `helpers.js` - Reusable functions. Currently only containing `wpApi` (for native API) and `api` (for custom API).

- `style.sass` - Global stylesheet, containing mainly Gutenberg styles and CSS Vars

**FOLDERS**:

- `/components` - Reusable elements.

- `/stores` - Manages global variables and functions using Pinia.

- `/views` - Templates for each route.

- `/css` - Partial stylesheets that are combined into `style.sass`. The `_helpers.sass` contains reusable mixins, import it to use it within Vue.

- `/fonts` - Webfonts that are declared as @font-face in `style.sass`.

- `/svg` - SVG files that can be imported into component or used as background in CSS

    ```js
    <script setup>
      import HouseSVG from '../svg/house.svg';
    </script>
    
    <template>
      <router-link to="/">
        <HouseSVG />
        Back to Home
      </router-link>
    </template>
    ```

    or

    ```html
    <style lang="sass" scoped>
      .button-home
        background: url('../svg/house.svg') no-repeat center center
        background-size: 1rem 1rem
    </style>
    ```