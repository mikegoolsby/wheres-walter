const promise1 = $.ajax({
    url: "https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad"
})

const promise2 = $.ajax({
    url: "https://www.breakingbadapi.com/api/characters"
})

$.when(promise1, promise2).done(function() {
    $('#season-btn').on('click', (event) => {
        event.preventDefault();
        $('.character-list').empty();
        $('#episode').empty();
        let seasonValueInit = $('#season').val(); // grabs value of season at button submit
        let seasonValue = seasonValueInit.charAt(seasonValueInit.length - 1); // isolates the number in the string
        // console.log(seasonValue) // debugger 
        promise1.then (
            (data) => {
                // console.log(data) // shows all objects
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
                    $('.character-list').empty();
                    const $episodeSelection = $('#episode').val();
                    for (let j=0; j<data.length; j++) {
                        let characters = data[j].characters // appends to DOM weird
                        characters.forEach(character => {
                            let titleForChar = data[j].title
                            if ($episodeSelection === titleForChar) {
                                $li = $('<li>').text(character)
                                $li.attr('id', character);
                                $('.character-list').append($li);
                            } else {
                                console.log('cache for non matches')
                            }
                        });
                        console.log(characters)
                        // console.log(characters, epNumber)
                    }
                    promise2.then (
                        (data) => {
                            console.log(data)
                            for (let y=0; y<data.length; y++) {
                                let characters = data[y].name
                                let imageUrl = data[y].img
                                $img = $('<img>').attr('src', "")
                                $img.attr('src', imageUrl);
                                $img.attr('id', characters);
                                $img.css('display', 'none');
                                $('#img-location').append($img);
                            }
                        }
                    )
                    ////// THIS IS WHERE THE IMG CAROUSEL COMES IN
                    // const testing = $('.character-list').attr('id');
                    // const testing2 = $('#img-location').attr('id');
                    // for (let i=0; i<$('img').length; i++) {
                    //     if (testing == testing2) {
                    //         $img.css('display', 'block')
                    //     } else {
                    //         console.log('refactor');
                    //     }
                    // }

                });
            },
            () => {
                console.log('bad request');
            }
        )

    });
});

