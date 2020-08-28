Unit 1 Project

Where's Walter?

---

"Where's Walter" is a simple app that utilizes the Breaking Bad API (available here: https://breakingbadapi.com/documentation) to select a season of Breaking Bad, populate the list of episodes from that season, then sequentially populate a list of characters from that episode. You can click on a character to reveal their photo. 

This app was built using HTML, Javascript, jQuery, AJAX, CSS for styling, and of course the Breaking Bad API. 

I approached this project tech-first. It was very basic-looking until the bitter end. I wanted to make sure I could pull in each episode that corresponded to each season, then pull in each character, then pull in their photos. Each piece of this was abstracted. There are a few photos that have 404 errors from wherever they're nested in the API. Unfortunately those won't appear. 

A couple of huge challenges:
    <br>
    -Running two, simultaneous AJAX calls where the second would call only if the first was successful. The character's images were only accessible via a different call. I was able to solve this one via two promise variables
    <br>
    -Accessing the image ID's in an iterable loop and then matching them to the clicked ID of the li of the character name. Sounds easy, but jQuery objects make this a lot harder. I was able to finally accomplish it via an .each loop, then comparing the strings captured. 