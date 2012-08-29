// Map build color codes to display icons
var STATUS_TO_ICON_MAP = {
    "blue": "blue.png",
    "red": "red.png",
    "red_anime": "red_anime.gif",
    "blue_anime": "blue_anime.gif",
    "grey_anime": "grey_anime.gif",
    "aborted": "grey.png",
    "grey": "grey.png",
    "yellow": "yellow.png"

};

function outputBuildStatus (status) {
    var html = [];
    html.push("<ul>");
    $.each(status.json.jobs, function(i, job) {
        html.push("<li>");
        html.push("<div class='buildStatus'><img src='img/" + STATUS_TO_ICON_MAP[job.color] + "' /></div>");
        html.push("<div class='buildDesc'><div class='title'>");
				html.push("<a href='" + job.url + "' alt='" + job.name + "'><span>" + job.name + "</span></a>");
				html.push("</div>");
				html.push("<div class='info'><span>");
				if (job.healthReport[0] !== undefined) {
						html.push(job.healthReport[0].description);
				} else {
						html.push("No build information");
				}
				html.push("</span></div>");
        html.push("</li>");
    });
    html.push("</ul>");

    $("#statusList").empty().append(html.join(''));

    $(".subHeader").text("Checked: " +
        status.date.toLocaleDateString() + 
        " at " +
        status.date.toLocaleTimeString());

    $("ul a").click(handleURLClick);
    $("li").click(function () {
        location.href = "info.html";
    });
}

// Generate <option> tags for each view entry in the status json
function outputViewList(views) {
	var html = [];
	$.each(views, function(i, view) {
		html.push("<option value='" + view.url + "'>" + view.name + "</option>");	
	});

	$("#views").empty().append(html.join(''));

	if (views.length === 1) {
		$("#views").attr('disabled', '');
	}
	
	// onselect handling for each entry in the view
	// Get json for selected view
	// Update localStorage.selectedView
	$("#views").change(function () {
		localStorage.selectedView = this.value;
		console.log("Selected view = '" + this.value + "'");
		chrome.extension.getBackgroundPage().getBuildStatus(this.value);	
	});
}

// Generate server error message, in event we can't contact the user's
// specified Jenkins server
function outputServerError () {
	var html = [];
	html.push("<div id='serverError'>");
	// Supply correct markup + stylings for the below
	html.push("Unable to contact Jenkins - please check the supplied URL is correct.");
	html.push("</div>");

	$("#content .inner").empty().append(html.join(""));
}

// Generate a "Busy getting data" div
function outputSpinner () {
	var html = [];
	html.push("<div id='spinner'>");
	// Supply correct markup + stylings for the below
	html.push("Obtaining build information... please wait");
	// Insert spinner image here
	html.push("</div>");

	$("#content .inner").empty().append(html.join(""));
}


// Open a job URL in a new tab
function handleURLClick (e) {
    chrome.tabs.create({
        url: this.getAttribute("href")
    });
    window.close();
}

$("#options").click(function () {
    location.href = "options.html";
});

if (localStorage.url !== undefined) {
		var buildStatus = chrome.extension.getBackgroundPage().getStatus();
		console.log("main.js: Got status, time = " + new Date().toLocaleTimeString());
		var title;
    if (buildStatus !== undefined) {
				outputViewList(buildStatus.json.views);
        outputBuildStatus(buildStatus);
				title = localStorage.url;
    } else {
				outputServerError();
				title = "Error contacting server";
		}

    $(".header h3").text(title);
} else {
    location.href = "options.html";
}
