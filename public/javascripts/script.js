document.addEventListener("DOMContentLoaded", function () {
    // Your front end javascript goes here
    const form = document.getElementById("entryForm");

    const entriesContainer =
        document.getElementById("entries");

    const filterEmotion =
        document.getElementById("filterEmotion");


    async function loadEntries() {

        try {

            const response =
                await fetch("/entries");

            const entries =
                await response.json();

            displayEntries(entries);

        } catch (error) {

            console.log(
                "Error loading entries:",
                error
            );

        }

    }




    function displayEntries(entries) {

        entriesContainer.innerHTML = "";

        entries.forEach((entry) => {

            const card =
                document.createElement("div");

            card.classList.add("letter-card");




            card.innerHTML = `

            <h3>
                ${entry.title}
            </h3>

            <p>
                "${entry.message}"
            </p>

            <div class="card-info">

                <span>
                    To age ${entry.youngerAge}
                </span>

                <span>
                    Emotion:
                    ${entry.emotion}
                </span>

            </div>


        `;

            entriesContainer.appendChild(card);

        });

    }



    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const entryData = {

                title:
                    document.getElementById("title").value,

                currentAge:
                    document.getElementById("currentAge").value,

                youngerAge:
                    document.getElementById("youngerAge").value,

                emotion:
                    document.getElementById("emotion").value,

                message:
                    document.getElementById("message").value

            };


            try {

                const response =
                    await fetch("/entries", {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(entryData)

                    });


                if (!response.ok) {

                    const errorData = await response.json();

                    throw new Error(errorData.error);

                }


                // clear form
                form.reset();


                // reload entries
                loadEntries();

            } catch (error) {

                console.log(
                    "Error submitting form:",
                    error
                );

            }

        }
    );



    filterEmotion.addEventListener(
        "change",
        async function () {

            try {

                const response =
                    await fetch("/entries");

                const entries =
                    await response.json();

                const selectedEmotion =
                    filterEmotion.value;


                if (selectedEmotion === "all") {

                    displayEntries(entries);

                } else {

                    const filteredEntries =
                        entries.filter((entry) => {

                            return (
                                entry.emotion ===
                                selectedEmotion
                            );

                        });

                    displayEntries(filteredEntries);

                }

            } catch (error) {

                console.log(
                    "Error filtering entries:",
                    error
                );

            }

        }
    );



    loadEntries();
});