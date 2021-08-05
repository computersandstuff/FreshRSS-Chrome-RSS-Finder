// Saves options to chrome.storage
  var serverUrlCurrent = ''
  var serverUrlExactCurrent = ''
  var useExactUrlCurrent = ''
function save_options() {
	if (useExactUrlCurrent == true){
		serverUrlExactCurrent = document.getElementById('serverUrl').value
	}else{
		serverUrlCurrent = document.getElementById('serverUrl').value
	}
  chrome.storage.sync.set({
    serverUrl: serverUrlCurrent,
	useExactUrl: useExactUrlCurrent,
	serverUrlExact: serverUrlExactCurrent,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  
  chrome.storage.sync.get({
    serverUrl: '',
	serverUrlExact: '',
	useExactUrl: '',
  }, function(items) {
    serverUrlCurrent = items.serverUrl;
	serverUrlExactCurrent = items.serverUrlExact;
	if (items.useExactUrl == true){
		document.getElementById("exactUrlCheck").checked = true;
		document.getElementById("serverUrlExample").innerHTML = "Example: <br>http://192.168.1.15:84/i/?c=feed&a=add&url_rss= <br> https://demo.freshrss.org/i/?c=feed&a=add&url_rss="
		useExactUrlCurrent = true;
		document.getElementById("serverUrl").value = serverUrlExactCurrent;
		
  
  }else{
	  useExactUrlCurrent = false;
	  document.getElementById("exactUrlCheck").checked = false;
	  document.getElementById("serverUrl").value = serverUrlCurrent;
	  document.getElementById("serverUrlExample").innerHTML = "Example: <br>http://192.168.1.15:84/i/  <br>  https://demo.freshrss.org/i/"
  
  }
  });
}
document.addEventListener('DOMContentLoaded', restore_options);

function checkboxchanged() {
  var checkBox = document.getElementById("exactUrlCheck");
  if (checkBox.checked == true){
	  document.getElementById("serverUrlExample").innerHTML = "Example: <br>http://192.168.1.15:84/i/?c=feed&a=add&url_rss= <br> https://demo.freshrss.org/i/?c=feed&a=add&url_rss="
	  useExactUrlCurrent = true;
  } else {
	  document.getElementById("serverUrlExample").innerHTML = "Example: <br>http://192.168.1.15:84/i/  <br>  https://demo.freshrss.org/i/"
	    useExactUrlCurrent = false;
  }
}



window.onload=function(){
  document.getElementById('saveButton').addEventListener('click', save_options);
  document.getElementById('exactUrlCheck').addEventListener('click', checkboxchanged);
}


