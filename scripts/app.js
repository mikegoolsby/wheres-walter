const promise = $.ajax({
    url: "https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad",
});

const $seasonOne = $('#season-one') // not sure what i'm gonna do here

$('#season-btn').on('click', (event) => {
    event.preventDefault();
    let seasonValueInit = $('#season').val(); // grabs value of season at button submit
    let seasonValue = seasonValueInit.charAt(seasonValueInit.length - 1); // isolates the number in the string
    console.log(seasonValue) // debugger 
    promise.then (
        (data) => {
            console.log(data)
            for (let i=0; i < data.length; i++)
            console.log(data[i].season, data[i].title); // need to figure out how to hard-stop episode return based on above button submit
        },
        () => {
            console.log('bad request');
        }
    )
});


