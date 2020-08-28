const promise1 = $.ajax({
    url: "https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad"
})

const promise2 = $.ajax({
    url: "https://www.breakingbadapi.com/api/characters"
})

$.when(promise1, promise2).done(function() {
    $('#season-btn').on('click', (event) => { // listener that lets user choose the season
        event.preventDefault();
        $('.character-list').empty();
        $('#episode').empty();
        let seasonValueInit = $('#season').val(); // grabs value of season at button submit
        let seasonValue = seasonValueInit.charAt(seasonValueInit.length - 1); // isolates the number in the string
        // console.log(seasonValue) // debugger 
        promise1.then (
            (data) => {
                // console.log(data) // shows all objects, use for debugging
                for (let i=0; i < data.length; i++) {
                    let seasons = data[i].season
                    let titles = data[i].title
                    if (seasons === seasonValue) {
                        $('#episode').append(new Option(titles, titles));
                    } 
                }
                //listener that brings in specific episodes, then iterates over those episodes to pull in the characters based off of the chosen episode
                $('#episode-btn').on('click', (event) => {
                    event.preventDefault();
                    $('#eps-char').empty();
                    $('#ep-char').empty();
                    $('.character-list').empty();
                    const $episodeSelection = $('#episode').val();
                    for (let j=0; j<data.length; j++) {
                        let characters = data[j].characters
                        characters.forEach(character => {
                            let titleForChar = data[j].title
                            if ($episodeSelection === titleForChar) {
                                $li = $('<li>').text(character)
                                $li.attr('id', character);
                                let charId = $li.attr('id')
                                $li.on('click', (event) => {
                                    const img = $('img')
                                    let image;
                                    img.each(function(index) {
                                        const curr = $(this)
                                        if (curr.attr('id') === character) {
                                            image = curr;
                                        } else {
                                            curr.addClass('hide');
                                        }
                                    })
                                    image.removeClass('hide');
                                    // console.log(image);
                                })
                                console.log(charId)
                                $('.character-list').hide().append($li).fadeIn(300);
                            }
                        });
                        // console.log(characters)
                        // console.log(characters, epNumber)
                    }
                    promise2.then (
                        (data) => {
                            // console.log(data)
                            for (let y=0; y<data.length; y++) {
                                let characters = data[y].name
                                let imageUrl = data[y].img
                                $img = $('<img>').attr('src', "")
                                $img.attr('src', imageUrl);
                                $img.attr('id', characters);
                                $img.addClass('hide')
                                let imgId = $img.attr('id')
                                // console.log(imgId)
                                // $img.css('display', 'none');
                                $('#img-location').append($img);
                            }
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