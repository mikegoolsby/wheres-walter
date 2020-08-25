$.ajax({
    url: "https://www.breakingbadapi.com/api/characters?name=Walter+White",
    success: (data) => {
        console.log(data)
    }
});

const $seasonList = $('#season');

$seasonList.Option[0] = new Option('--Select--', '');
$seasonList.options[1] = new Option('Season 1', 'Season 1');
$seasonList.options[2] = new Option('Season 2', 'Season 2');
$seasonList.options[3] = new Option('Season 3', 'Season 3');
$seasonList.options[4] = new Option('Season 4', 'Season 4');
$seasonList.options[5] = new Option('Season 5', 'Season 5');