// Save/restore options

// Saves options to localStorage.
function saveOptions () {
    var url = $("#url").val();

    if (localStorage.url !== url) {
        localStorage.url = url;
    }

    localStorage.pollInterval = $("option:selected").val();

    // Return back to the popup HTML
    location.href="popup.html";
}

// Restores select box state to saved value from localStorage.
function restoreOptions () {
    var url = localStorage.url;
    if (url !== undefined) {
        $("#url").val(url);
    }

    var pollInterval = localStorage.pollInterval;
    if (pollInterval !== undefined) {
        $("option[value=\'" + pollInterval + "\']").attr("selected", "selected");
    }
}

restoreOptions();

$("#save").click(function () {
    saveOptions();
});
$("#cancel").click(function () {
    location.href="popup.html";
});