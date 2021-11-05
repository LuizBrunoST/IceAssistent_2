window.onload = function(){
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        title = tabs[0].title
        urlCurrent = tabs[0].url;
        urlIconCurrent = tabs[0].favIconUrl;
        document.getElementById("title").innerHTML = "title >>: " + title
        document.getElementById("url").innerHTML = "Url >>: " + urlCurrent
        document.getElementById("icon").innerHTML = "Favicon >>: <img src='" + urlIconCurrent + "' title='"+ title +"'>"
    })
}