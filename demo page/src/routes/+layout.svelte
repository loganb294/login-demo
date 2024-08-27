<script>
   // This is the main layout file
</script>

<!-- TODO remove the log out button if not logged in -->
<form method="POST" action="/?/logout">
    <button type="submit">Log Out</button>
</form>
<!-- TODO display the logged-in user's name in the header -->

<main>
    <slot />
</main>

<style>
    main {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }
</style>