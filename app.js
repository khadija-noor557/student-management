const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co";
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8";

const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey)

console.log(client);

const form = document.querySelector("#studentRegistration");

form.addEventListener("submit", async (event) => {
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

        const { email, password, address, city, firstname, lastname, fathername, course, dob, gender, user_id } = data
        console.log(address, city, firstname, lastname, fathername, course, dob, gender)

        const { data: signUpData, error } = await client.auth.signUp({
            email,
            password,
        })


        const id = signUpData?.user?.id
        console.log(id);


        // database insertion

        const { error: databaseError } = await client
            .from('student_data')
            .insert({
                firstname,
                lastname,
                "father'sname": fathername,
                address,
                gender,
                city,
                dob,
                course,
                user_id, id
            })
        console.log(databaseError)

        if (signUpData) {
            console.log(signUpData);
        }
        else {
            console.log(error.message)
        }
        window.location.href = "login.html";

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