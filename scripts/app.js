const promise1 = $.ajax({
    url: "https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad"
})

const promise2 = $.ajax({
    url: "https://www.breakingbadapi.com/api/characters"
})

$.when(promise1, promise2).done(function() {
    $('#season-btn').on('click', (event) => {
        event.preventDefault();
        $('#episode').empty();
        let seasonValueInit = $('#season').val(); // grabs value of season at button submit
        let seasonValue = seasonValueInit.charAt(seasonValueInit.length - 1); // isolates the number in the string
        console.log(seasonValue) // debugger 
        promise1.then (
            (data) => {
                console.log(data) // shows all objects
                for (let i=0; i < data.length; i++) {
                    let seasons = data[i].season
                    let titles = data[i].title
                    if (seasons === seasonValue) {
                        $('#episode').append(new Option(titles, titles));
                    } else {
                        console.log('cache for non matches')
                    }
                }
                $('#episode-btn').on('click', (event) => {
                    event.preventDefault();
                    $('#eps-char').empty();
                    $('#ep-char').empty();
                    const $episodeSelection = $('#episode').val();
                    for (let j=0; j<data.length; j++) {
                        let characters = data[j].characters + " " // appends to DOM weird
                        let titleForChar = data[j].title
                        if ($episodeSelection === titleForChar) {
                            $('.character-list').append(characters);
                        } else {
                            console.log('cache for non matches')
                        }
                        // console.log(characters, epNumber)
                    }
                    promise2.then (
                        (data) => {
                            // console.log(data)
                            let charImgArr = []
                            for (let y=0; y<data.length; y++) {
                                let imageUrl = data[y].img
                                let characters = data[y].name
                                $('#ep-char').attr('src', imageUrl);
                            }
                            $('#eps-char').on('click', (event) => {
                                event.preventDefault();
                                console.log(target.text())
                            });
                        }
                    )
                });
            },
            () => {
                console.log('bad request');
            }
        )

    });
});



//////////////////////////////
// const promise = $.ajax({
//     url: "https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad",
// });

// $('#season-btn').on('click', (event) => {
//     event.preventDefault();
//     $('#episode').empty();
//     let seasonValueInit = $('#season').val(); // grabs value of season at button submit
//     let seasonValue = seasonValueInit.charAt(seasonValueInit.length - 1); // isolates the number in the string
//     console.log(seasonValue) // debugger 
//     promise.then (
//         (data) => {
//             console.log(data) // shows all objects
//             for (let i=0; i < data.length; i++) {
//                 let seasons = data[i].season
//                 let titles = data[i].title
//                 if (seasons === seasonValue) {
//                     $('#episode').append(new Option(titles, titles));
//                 } else {
//                     console.log('cache for non matches')
//                 }
//             }
//             $('#episode-btn').on('click', (event) => {
//                 event.preventDefault();
//                 $('#eps-char').empty();
//                 $('#ep-char').empty();
//                 const $episodeSelection = $('#episode').val();
//                 for (let j=0; j<data.length; j++) {
//                     let characters = data[j].characters + " " // appends to DOM weird
//                     let imageUrl = data[j].img 
//                     let titleForChar = data[j].title
//                     if ($episodeSelection === titleForChar) {
//                         $('#eps-char').append(characters);
//                         $('#eps-char').append(imageUrl);
//                     } else {
//                         console.log('cache for non matches')
//                     }
//                     // console.log(characters, epNumber)
//                 }
//             });
//         },
//         () => {
//             console.log('bad request');
//         }
//     )
// });



