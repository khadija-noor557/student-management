const supabaseUrl = "https://usqzyvfgnwvuysjlcxdp.supabase.co";
const supabaseKey = "sb_publishable_pDpuqIOUz6F0azIM_1qGng_1Jhcm8Hz"


const { createClient } = supabase
const client = createClient(supabaseUrl, supabaseKey)

console.log(client);

const form = document.querySelector("#studentRegistration");

form.addEventListener("submit", async(event) => {
    event.preventDefault()
    try {
        const formData = new FormData(form)

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

        const data = Object.fromEntries(formData)
        console.log(data)
        const { email, password } = data


        const { data:signUpData, error } = await client.auth.signUp({
            email,
            password,
        })
       if(signUpData){
        console.log(signUpData)
       }
       else{
        console.log(error.message)
       }
    }
    catch (error) {
        console.log(error)
    }
})

const inputs = document.querySelectorAll("input")
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        if (input.value !== "") {
            input.style.border = ""

        }
    })

})