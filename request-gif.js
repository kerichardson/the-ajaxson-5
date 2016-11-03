

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});

/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();
    setGifLoadedStatus(false);
    errorMsg(false);
    // get the user's input text from the DOM
    var searchQuery = $("#tag").val(), verify = $(".form-control").val();

if (verify != 5) {
    errorMsg(true);
} else {
    var params = {
        root: "https://api.giphy.com/v1/gifs",
        token: "dc6zaTOxFJmzC",
        tag: ("jackson+5+" + searchQuery)
        };
    $.ajax({
        url: params.root + "/random?api_key=" + params.token + "&tag=" + params.tag,
        dataType: 'jsonp',
    success: function(response) {
        loadingMsg(true);
        $("#gif").attr("src", response.data.image_url);
        loadingMsg(false);
        setGifLoadedStatus(true);
        },
    error: function() {
        // if something went wrong, the code in here will execute instead of the success function, give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });
}
};
/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}

function errorMsg(isError) {
    $("#error").attr("hidden", !isError)
    loadingMsg(false);
}

function loadingMsg(isLoading) {
    $("#loading").attr("hidden", !isLoading)
}
