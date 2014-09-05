function createExtensionUI(extensionListArray){

	var extensionLength = extensionListArray.length;
	
	for(var i=0; i<extensionLength; i++){
		
		var extensionObject = extensionListArray[i];
		if(extensionObject.type == "extension"){	
			var checkbox = "";
			if(extensionObject.enabled){
					checkbox = '<label><input type="checkbox" checked="checked" class= "extensionboxEnabled" id= "' + extensionObject.id  + '"/>'+extensionObject.shortName+'</label><hr>';
			}else{
					checkbox = '<label><input type="checkbox" class= "extensionboxDisabled" id= "' + extensionObject.id  + '"/>'+extensionObject.shortName+'</label><hr>';
			}
			$('#extensionList').append(checkbox);
			$('#extensionList').append('<div class="clear"></div>');
		}
	}

}

function getExtensionList(extensionListArray){

	createExtensionUI(extensionListArray);
	
	$("input[type=checkbox]").change(function() {
			var extensionId = this.id;
			changeExtensionState(extensionId);
    });
}


function changeExtensionState(extensionId){

	var extensionState;
	chrome.management.get(extensionId, function(extensionInfo){

			var state = extensionInfo.enabled;
			extensionState = state;			
			
			if(extensionState){
				chrome.management.setEnabled(extensionId, false);
				$('#status').text("Extension Disabled");
			}else{
				chrome.management.setEnabled(extensionId, true);
				$('#status').text("Extension Enabled");
			}
	});
	
}

function getExtensionStatus(extensionId){

	chrome.management.get(extensionId, function(extensionInfo){

			var state = extensionInfo.enabled;
			return state;
	});
}


//Execute the function after page load.
$(document).ready(function(){
	chrome.management.getAll(getExtensionList);
});




