const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co";
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8";

const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey)

console.log(client);

const loginForm = document.querySelector("#loginform");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    try {
        const formData = new FormData(loginForm)

        let emptyField = false;
        const inputs = document.querySelectorAll("input")
        inputs.forEach((input) => {
            if (input.value === "") {
                input.style.border = "2px solid red"
                emptyField = true;
            }
        })

        if (emptyField) {
            return
        }

        const { email, password } = Object.fromEntries(formData)
        const { data: signInData, error } = await client.auth.signInWithPassword({
            email,
            password,
        })
        console.log(data)
        console.log(error)

        if (signInData) {
            console.log(signInData);
        }
        else {
            console.log(error.message)
        }

        console.log("Login successful:", signInData);
            window.location.href = "../index.html";



    }
    catch (error) {
        console.log(error)
    }
})