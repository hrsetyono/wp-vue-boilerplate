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

## Login Authentication

1. Install this plugin: [JWT Authentication](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)

1. Add this to wp-config:

    ```php
    define('JWT_AUTH_CORS_ENABLE', true);
    define('JWT_AUTH_SECRET_KEY', 'any-salted-hash');
    ```

    Pick any of the salted hash from here: https://api.wordpress.org/secret-key/1.1/salt/

1. Done!

If you **don't need a login feature**, delete these:

- `/user` folder
- `/LayoutLogin.vue`

And remove login-related code in these files:

- `/router.js`
- `/App.vue`
- `/helpers.js`
- `/components/HeaderMain.vue`
- `/components/HeaderOffcanvas.vue`

## Custom API Endpoint

### PUBLIC API

No login required.

```php
// GET https://mysite.com/wp-json/my/v1/example-get/:id

register_rest_route('my/v1', '/example-get/(?P<id>\d+)', [
  'methods' => 'GET',
  'permission_callback' => '__return_true',
  'callback' => function($params) {
    $id = $params['id'];
    return "You passed in ID: {$id}";
  }
]);
```

### PRIVATE API

Require login. This API call will be rejected if you didn't pass in the JWT Access token in Header.

Check out `/helpers.js` where we implement adding the token.

```php
// POST https://mysite.com/wp-json/my/v1/example-post/:id

register_rest_route('my/v1', '/example-post/(?P<id>\d+)', [
  'methods' => 'POST',
  'permission_callback' => function() {
    return is_user_logged_in();
  },
  'callback' => function($request) {
    $params = $request->get_params($request);
    $params = wp_parse_args($params, [
      'id' => 0,
      'data1' => 'default value',
      'data2' => 'default value',
    ]);

    return $params;
  }
]);
```

### ⚠️ WARNING: Permission != Validation

A User with "Author" role should only be able to edit his/her own posts. But in API callback, they can edit everyone's post!

```php
'callback' => function($request) {
  $params = $request->get_params($request);

  // This works on everyone's post, NOT GOOD!
  wp_update_post([
    'ID' => $params['id'],
    'post_title' => 'Just Edited!',
  ]);
}
```

That means we need to add a conditional like this:

```php
'callback' => function($request) {
  $params = $request->get_params($request);
  $current_user = wp_get_current_user();

  $is_not_author = $post->post_author !== $current_user->ID;
  $can_edit_others = current_user_can('edit_others_posts');

  // If not author OR cannot edit others
  if (!$is_not_author || !$can_edit_others) {
    return new WP_Error('edit_not_allowed', 'You are not allowed to edit other\'s post');
  }

  wp_update_post([
    'ID' => $params['id'],
    'post_title' => 'Just Edited!',
  ]);
}
```