<script>
    // The register page
</script>

<!-- TODO make this form a component and reuse for login form -->
<!-- The action attribute points to the root page server file (routes/+page.server.js), where there's a named register action
     https://kit.svelte.dev/docs/form-actions#named-actions -->
<form method="POST" action="/?/register">
    <h2>Register</h2>
    <label for="name">Name: </label>
    <input type="text" id="name" name="name" required />

    <label for="email">Email: </label>
    <input type="email" id="email" name="email" required />

    <label for="password">Password: </label>
    <input type="password" id="password" name="password" required />

    <button type="submit">Submit</button>
    
    <!-- My login form is on the home page -->
    <p>Already have an account? <a href="/">Log in</a></p>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        width: 40%;
        margin: 0 auto;
        border: #ccc solid 1px;
        padding: 1rem;
        border-radius: 0.5rem;
    }

    label {
        margin: 0.5rem 0;
    }

    input {
        padding: 0.5rem;
        font-size: 1rem;
    }

    button {
        padding: 0.5rem;
        font-size: 1rem;
        background-color: #333;
        color: white;
        border: none;
        cursor: pointer;
        margin-top: 1em;
    }

    button:hover {
        background-color: #555;
    }

    a {
        color: #333;
    }
</style>