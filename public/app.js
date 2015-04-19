function initPage() {
	onUploadForm();	
};

function onUploadForm() {
	var uploadForm = document.forms['ajaxUploadForm'];

	uploadForm.onsubmit = function(event) {
		event.preventDefault();

		var formData = new FormData(),
			uploadedImages = uploadForm['uploadedImages'].files;

		for (var i = 0; i < uploadedImages.length; i++) {
			formData.append('uploadedImages[]', uploadedImages[i]);	
		};

		ajaxx(uploadForm.action, uploadForm.method, formData, appendImages);
	};

	function appendImages(responseText, status) {
		var uploadedImagesContainer = document.getElementById('uploadedImages');

		responseText['uploadedFileNames'].forEach(function(value) {
			uploadedImagesContainer.innerHTML += '<img src="/uploads/' + value.base + '" width="150" />';
		});

	}
}



// Common function to initialize XML Http Request object 
function getHttpRequestObject() {
	// Define and initialize as false
	var xmlHttpRequst = false;
	
	// Mozilla/Safari/Non-IE
    if (window.XMLHttpRequest) 
	{
        xmlHttpRequst = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject) 
	{
        xmlHttpRequst = new ActiveXObject("Microsoft.XMLHTTP");
    }
	return xmlHttpRequst;
};

// Does the AJAX call to URL specific with rest of the parameters
function ajaxx(url, method, data, responseHandler, async) {
	// Set the variables
	url = url || "";
	method = method || "GET";
	async = async || true;
	data = data || null;
	responseHandler = responseHandler || function () {};
	
	if(url == "")
	{
		alert("URL can not be null/blank");
		return false;
	}
	var xmlHttpRequst = getHttpRequestObject();
	
	// If AJAX supported
	if(xmlHttpRequst != false)
	{
		// Open Http Request connection
		if(method == "GET")
		{
			url = url + "?" + data;
			data = null;
		}
		xmlHttpRequst.open(method, url, async);
		// Set request header (optional if GET method is used)
		if(method == "POST")
		{
			xmlHttpRequst.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			xmlHttpRequst.setRequestHeader('Accept', 'application/json');
		}
		// Assign (or define) response-handler/callback when ReadyState is changed.
		xmlHttpRequst.onreadystatechange = function() {
			if(xmlHttpRequst.readyState==4){
	            if(xmlHttpRequst.status==200) {
	                responseHandler(JSON.parse(xmlHttpRequst.responseText), xmlHttpRequst.status);           
	            } else {
	            	responseHandler(xmlHttpRequst.responseText, xmlHttpRequst.status);           
	            }
	        }
			
		};
		// Send data
		xmlHttpRequst.send(data);
	}
	else {
		console.error("Please use a browser with Ajax support.");
	}
};
