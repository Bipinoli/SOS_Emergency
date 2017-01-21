function getxmlhttp() { 	var xmlhttp = false; 	try { 			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); 		} catch (e) { 			try { 				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 			} catch (E) { 				xmlhttp = false; 			} 		} 		if (!xmlhttp && typeof XMLHttpRequest != 'undefined') { 			xmlhttp = new XMLHttpRequest(); 		} 	return xmlhttp; }  function processajax (serverPage, obj, getOrPost, str) { xmlhttp = getxmlhttp(); 	if (getOrPost == "get"){ 		xmlhttp.open("GET", serverPage); 		xmlhttp.onreadystatechange = function() { 			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 				obj.innerHTML = xmlhttp.responseText; 			}; 		}; 		xmlhttp.send(null); 	} else { 		xmlhttp.open("POST", serverPage, true); 		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"); 		xmlhttp.onreadystatechange = function() { 			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 				obj.innerHTML = xmlhttp.responseText; 			}; 		}; 		xmlhttp.send(str); 	}; }  function getformvalues (fobj){ var str = ""; aok = true; var val; for(var i = 0; i < fobj.elements.length; i++){ 	if (aok == true) { 		val = fobj.elements[i].value, fobj.elements[i].name; 		if (val == false){ 			//aok == false; this can be used if you want the form to not get submitted if anyfield left empty
 		} 	} 		str += fobj.elements[i].name + "=" + escape(fobj.elements[i].value) + "&"; 	}; 	return str; }  
function submitform (theform, serverPage, objID){ 	var obj = document.getElementById(objID); 	update(obj); 	var str = getformvalues (theform); 	var file = serverPage; 		if (aok == true){ 			processajax (file, obj, "post", str); 		} }function update (obj) { 	obj.innerHTML = ""; }
function getthetime() {dt = new Date(); var hours = dt.getHours(); var minutes = dt.getMinutes(); var seconds = dt.getSeconds(); var dn = 'AM'; if (hours >= 12) { 	dn = 'PM'; }; if (hours > 12){ 	hours = hours-12 } if (hours == 0){ 	hours =	12 } if (minutes <= 9) { 	minutes='0'+ minutes }var time = hours + ":" + minutes + dn; document.getElementById('time').innerHTML=time;}; function display_tip (msg, objID, e){ 	theObject = document.getElementById(objID); 	theObject.style.visibility = 'visible'; 	posx = e.clientX + document.body.scrollLeft + 8; 	posy = e.clientY + document.body.scrollTop + 13; 	theObject.style.left = posx + 'px'; 	theObject.style.top = posy + 'px'; 	 	theObject.innerHTML = msg; }; function close_(objID) { 	var obj = document.getElementById(objID); 	obj.style.visibility = 'hidden'; }  
function findPosX(obj){
var curleft = 0;
if (obj.offsetParent){
while (obj.offsetParent){
curleft += obj.offsetLeft
obj = obj.offsetParent;
}
} else if (obj.x){
curleft += obj.x;
}
return curleft;
}
function findPosY(obj){
var curtop = 0;
if (obj.offsetParent){
while (obj.offsetParent){
curtop += obj.offsetTop
obj = obj.offsetParent;
}
} else if (obj.y){
curtop += obj.y;
}
return curtop;
}
function auto_complete(thevalue, e) {
	theObject = document.getElementById("autocomplete");
	theObject.style.visibility = "visible";
	theObject.style.width = "138px";
	var posx = 0;
	var posy = 0;
	posx = (findPosX (document.getElementById("genre")) + 1);
	posy = (findPosY (document.getElementById("genre")) + 0);
	theObject.style.left = posx + "px";
	theObject.style.top = posy + "px";
	var theextrachar = e.which;
	if (theextrachar == undefined){
	theextrachar = e.keyCode;
	}
	//The location we are loading the page into.
	var objID = "autocomplete";
	//Take into account the backspace.
	if (theextrachar == 8){
	if (thevalue.length == 1){
	var serverPage = "add.php?autocomp";
	} else {
	var serverPage = "add.php?autocomp&" + "sstring=" + thevalue.substr (0, (thevalue.length -1));
	}
	} else {
	var serverPage = "add.php?autocomp&" + "sstring=" + thevalue + String.fromCharCode (theextrachar);
	}
	var obj = document.getElementById(objID);
	xmlhttp = getxmlhttp();
	xmlhttp.open("GET", serverPage);
	xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	obj.innerHTML = xmlhttp.responseText;
	}
	}
	xmlhttp.send(null);
}

function setvalue (thevalue){
acObject = document.getElementById("autocomplete");
acObject.style.visibility = "hidden";
acObject.style.height = "0px";
acObject.style.width = "0px";
document.getElementById("genre").value = thevalue;
}

function emptyform () {
	document.getElementById("frm").reset();
}

function makerequest(serverPage, objID) {
//var obj = document.getElementById(objID);
xmlhttp = getxmlhttp();
xmlhttp.open("GET", serverPage);
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
// obj.innerHTML = xmlhttp.responseText;
}
}
xmlhttp.send(null);
}

function requestwobj (serverPage, objID) {
	var obj = document.getElementById(objID);
	xmlhttp = getxmlhttp();
	xmlhttp.open("GET", serverPage);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			obj.innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.send(null);
}
