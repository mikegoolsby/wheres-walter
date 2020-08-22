$.ajax({
    url: "https://www.breakingbadapi.com/api/characters?name=Walter+White",
    success: (data) => {
        console.log(data)
    }
});