/* Demonstration of CRUD for Institutions */

// const baseUrl = "https://web1-pr-1.onrender.com";
const baseUrl = "http://localhost:3000";

// Use SvelteKit load function to fetch list of institutions from API on page load
export async function load({ fetch, cookies }) {
    let token = cookies.get('token');
    const res = await fetch(`${baseUrl}/institutions`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Need to be logged in to access this route
                'Authorization': `Bearer ${token}`
            }
        }
    );
    const institutions = await res.json();

    // Send the data to the page as props (`export let data` in the page component)
    return {
        institutions
    };
};

// Use SveleKit form actions to CRUD institution records
export const actions = {
    create: async ({ request, cookies }) => {
        try {
            // Parse the form data
            const data = await request.formData();
            const institution = Object.fromEntries(data.entries());
            const res = await fetch(`${baseUrl}/institutions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Need to be logged in
                    'Authorization': `Bearer ${cookies.get('token')}`
                },
                body: JSON.stringify(institution),
            });
            console.log(res.status);

            return {
                success: true,
                institution // Allows us to use some of the form answers in the success message
            };

        } catch (error) {
            console.error('Error posting institution:', error);
        }
    },
    delete: async ({ request, cookies }) => {
        try {
            const data = await request.formData();
            const institution = Object.fromEntries(data.entries());

            const res = await fetch(`${baseUrl}/institutions/${institution.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.get('token')}`
                },
            });
            console.log(res.status);

            return {
                success: true
            };

        } catch (error) {
            console.error('Error deleting institution:', error);
        }
    },
    update: async ({ request, cookies }) => {
        try {
            const data = await request.formData();
            const institution = Object.fromEntries(data.entries());

            // Create a copy of the institution object without the id property
            const { id, ...institutionWithoutId } = institution;

            const res = await fetch(`${baseUrl}/institutions/${institution.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.get('token')}`
                },
                body: JSON.stringify(institutionWithoutId),
            });
            const resJson = await res.json();
            console.log(resJson);

            return {
                success: true,
                institution
            };

        } catch (error) {
            console.error('Error updating institution:', error);
        }
    }
};