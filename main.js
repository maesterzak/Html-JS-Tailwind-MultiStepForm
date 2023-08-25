
const hideCurrentStep = (step) => {
    document.getElementById(`step${step}`).classList.toggle("hidden")
    document.getElementById(`step${step}`).classList.toggle("opacity-100")
    document.getElementById(`step${step}`).classList.toggle("opacity-0")
}

function submitHandler(e) {
    e.preventDefault()
    alert("Form Submitted")
    e.target.reset()

    hideCurrentStep(5)
    let y = 1
    document.getElementById(`step${y}`).classList.toggle("hidden")
    document.getElementById(`step${y}`).classList.remove("opacity-0")
    document.getElementById(`step${y}`).classList.toggle("opacity-100")
}

function formValidator(step) {
    let values
    if (step == 1) {
        values = ["first_name", "last_name", "middle_name", "dob", "gender", "city"]
    }
    else if (step == 2) {
        values = ["email", "phone_number", "address"]
    }
    else if (step == 3) {
        values = ["student_id", "major_field_study", "enrollment_year", "expected_graduation_date", "gpa"]
    }

    if (values?.length > 0) {
        let nullFields = []
        values.forEach((e) => {
            let u = document.getElementById(e).value
            if (!u) {
                nullFields.push(e)
            }
            else {
                let v = document.getElementById(`${e}_warning`).classList.contains("hidden")
                if (!v) {
                    document.getElementById(`${e}_warning`).classList.toggle("hidden")
                }
            }
        })
        if (nullFields.length > 0) {
            return nullFields
        }
        else {
            return true
        }
    }
    else {
        return true
    }

}


async function toggleStep(param, current) {
    let x = current

    const showWarnings = (res) => {
        if (res.length > 0) {
            res.forEach((e) => {
                document.getElementById(`${e}_warning`).classList.toggle("hidden")
            })
        }
    }
    if (param == "forward") {

        let res = await formValidator(current)

        if (res == true) {
            hideCurrentStep(x)
            let y = current + 1

            document.getElementById(`step${y}`).classList.toggle("hidden")
            document.getElementById(`step${y}`).classList.remove("opacity-0")
            document.getElementById(`step${y}`).classList.toggle("opacity-100")
            if (y == 5) {
                let div = document.getElementById("formData")

                let values = ["first_name", "last_name", "middle_name", "dob", "gender", "city", "email", "phone_number", "address", "student_id", "major_field_study", "enrollment_year", "expected_graduation_date", "gpa", "comment"]
                values.forEach((e) => {
                    let fieldVal = document.getElementById(e).value
                    var div2 = document.createElement("div")

                    div2.innerHTML = `<span>${e} : </span> <span>${fieldVal}</span>`
                    div.append(div2)
                })
            }
        }
        else {
            showWarnings(res)
        }
    }
    else if (param == "backward") {
        hideCurrentStep(x)
        let y = current - 1
        document.getElementById(`step${y}`).classList.toggle("hidden")
        document.getElementById(`step${y}`).classList.remove("opacity-0")
        document.getElementById(`step${y}`).classList.toggle("opacity-100")
    }
}
