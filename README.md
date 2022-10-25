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

## Login

The Login form requires these steps to work:

1. Install [JWT Authentication](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) plugin.

1. Add this to wp-config:

    ```php
    define('JWT_AUTH_CORS_ENABLE', true);
    define('JWT_AUTH_SECRET_KEY', 'any-salted-hash');
    ```

    Pick any of the salted hash from here: https://api.wordpress.org/secret-key/1.1/salt/

1. Done!

## Register and Forgot Password

WordPress doesn't have native APIs for Register and Forgot Password. So we need to implement them on our own.

Check out the sample code from our Wiki. This boilerplate works out-of-the-box with these samples:

- [Register API](https://github.com/hrsetyono/wp-vue-boilerplate/wiki/API-%E2%80%93-User-Register)
- [Forgot Password API](https://github.com/hrsetyono/wp-vue-boilerplate/wiki/API-%E2%80%93-Forgot-Password)

## SVG Loader

You can import SVG into a component like this:

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