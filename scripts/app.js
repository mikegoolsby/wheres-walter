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
                    } else {
                        console.log('cache for non matches')
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
                        let characters = data[j].characters // appends to DOM weird
                        characters.forEach(character => {
                            let titleForChar = data[j].title
                            if ($episodeSelection === titleForChar) {
                                $li = $('<li>').text(character)
                                $li.attr('id', character);
                                let charId = $li.attr('id')
                                console.log(charId)
                                $('.character-list').append($li);
                            } else {
                                console.log('ignore')
                            }
                        });
                        // console.log(characters)
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
                                let imgId = $img.attr('id')
                                // console.log(imgId)
                                $img.css('display', 'none');
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
    $('body').on('click', "li", function (event) { // listener that listens for the specific character being clicked
        event.preventDefault();
        $liText =  $(this).text();
        const displayImage = () => {
          $('img').attr($liText).css('display', 'block'); // this should display the image but i find it impossible to access the css properties of the images. 
        }
        images = $('#img-location').children('img')
        if ($liText) {
            for (let i=0; i<images.length; i++) {
                let imageId = images.attr('id')
                if ($liText === imageId) {
                    displayImage();
                } 
            }
        }
    });
});

