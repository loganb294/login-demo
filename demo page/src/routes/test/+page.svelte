<script>
    /* 
        This file contains the main functionality of the app: managing instutution records.
        It's a protected route so the user has to be logged in to access it.
        TODO: add a fallback with a message if the user is not logged in 
    */

    export let data;
    export let form;
    const institutions = data.institutions.data;

    let showForm = false;
    if (form?.success) {
        showForm = false;
    }

    // Edit functionality
    let currentlyEditing = "";
    let editableName = "";
    let editableRegion = "";
    let editableCountry = "";

    function edit(id, name, region, country) {
        currentlyEditing = id;
        editableName = name;
        editableRegion = region;
        editableCountry = country;
    }
</script>

<h1>CRUD Demonstration</h1>

<!-- A button to show or hide the form -->
<button on:click={() => (showForm = !showForm)}>Add New Institution</button>

<!-- A form to accept institution name, region and country -->
{#if showForm}
    <form method="POST" action="?/create" class="modal">
        <h2>Add new institution</h2>
        <label for="name">Institution Name: 
        <input type="text" id="name" name="name" required /></label>

        <label for="region">Region: 
        <input type="text" id="region" name="region" required /></label>

        <label for="country">Country: 
        <input type="text" id="country" name="country" required /></label>

        <button type="submit">Submit</button>
    </form>
{/if}

<!-- A table to display the data -->
<table>
    <thead>
        <tr>
            <th>Institution</th>
            <th>Region</th>
            <th>Country</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        {#each institutions as { id, name, region, country }}
            <tr>
                {#if currentlyEditing === id}
                <td colspan="4" class="cellrow">
                    <!-- TODO fix the layout of the row while editing -->
                    <form method="POST" action="?/update">
                        <input type="hidden" name="id" value={id} />
                        <td><input bind:value={editableName} name="name"/></td>
                        <td><input bind:value={editableRegion} name="region"/></td>
                        <td><input bind:value={editableCountry} name="country"/></td>
                        <td>
                            <button type="submit" on:click={currentlyEditing=""}>Save</button>
                        </td>
                    </form>
                </td>
                {:else}
                <!-- Display the row normally when not in edit mode -->
                    <td>{name}</td>
                    <td>{region}</td>
                    <td>{country}</td>
                    <td>
                        <button on:click={() => edit(id, name, region, country)}>
                            Edit
                        </button>
                    </td>
                {/if}
                <td>
                    <!-- Just one button to delete a given row -->
                    <form method="POST" action="?/delete">
                        <input type="hidden" name="id" value={id} />
                        <button type="submit">X</button>
                    </form>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    /* Style the form as a modal */
    .modal {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 0.5rem;
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        z-index: 100;
        margin-bottom: 1rem;
    }
    .modal > label {
        display: flex;
        justify-content: space-between;
    }
    .modal input {
        margin-left: 1em;
    }
    .modal h2 {
        margin: 0;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1em;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 0.5rem;
    }

    th {
        background-color: #f2f2f2;
    }
    .cellrow form {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: center;
    }
    .cellrow {
        padding: 0;
        border: none;
    }
    
</style>
