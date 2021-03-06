angular.module('triangulate.directives', [])

.directive('triangulateValidateSiteId', function(Site) {
    return {
        // attribute
        restrict: 'A',
       
        link: function(scope, element, attrs) {
        
        	element.bind('blur', function(){
        	
        		$el = $(this);
        		
        		$validating = $el.parent().find('.triangulate-validating');
        		$valid = $el.parent().find('.triangulate-valid');
        		$invalid = $el.parent().find('.triangulate-invalid');
        		
	        	$validating.show();
	        	$valid.hide();
	        	$invalid.hide();
	       
				var name = $el.val();
				var friendlyId = $el.attr('data-id');
				
				if(name == ''){
					$validating.hide();
					$invalid.show();
					return;
				}
				
				// validate id
				Site.validateFriendlyId(friendlyId, 
					function(data){ // success
						$validating.hide();
						$valid.show();
					},
					function(data){ // failure
						$validating.hide();
						$invalid.show();
					});
					        	
	        	
        	}); 	
          
        }
    };
})

.directive('triangulateValidateSiteEmail', function(Site) {
    return {
        // attribute
        restrict: 'A',
       
        link: function(scope, element, attrs) {
        
        	element.bind('blur', function(){
        	
        		$el = $(this);
        		
        		$validating = $el.parent().find('.triangulate-validating');
        		$valid = $el.parent().find('.triangulate-valid');
        		$invalid = $el.parent().find('.triangulate-invalid');
        		
	        	$validating.show();
	        	$valid.hide();
	        	$invalid.hide();
	       
				var email = $el.val();
				
				if(email == ''){
					$validating.hide();
					$invalid.show();
					return;
				}
				
				// validate id
				Site.validateEmail(email, 
					function(data){ // success
						$validating.hide();
						$valid.show();
					},
					function(data){ // failure
						$validating.hide();
						$invalid.show();
					});
					        	
	        	
        	}); 	
          
        }
    };
})

.directive('triangulateCreateId', function() {
    return {
        // attribute
        restrict: 'A',
       
        link: function(scope, element, attrs) {
        
        	element.bind('keyup', function(){
        	
        		$el = $(this);
        		
        		var keyed = $el.val().toLowerCase().replace(/[^a-zA-Z 0-9]+/g,'').replace(/\s/g, '-');
				keyed = keyed.substring(0,25);
				
	        	scope.$apply(function() {
	        	
		          	scope.friendlyId = keyed;
			        
			        if(scope.temp){
			       		scope.temp.FriendlyId = keyed;
			        }
		        });
		     	
        	});  	
          
        }
    };
})

.directive('triangulateValidatePasscode', function(Setup) {
    return {
        // attribute
        restrict: 'A',
       
        link: function(scope, element, attrs) {
        
        	element.bind('blur', function(){
        	
        		$el = $(this);
        		
        		$validating = $el.parent().find('.triangulate-validating');
        		$valid = $el.parent().find('.triangulate-valid');
        		$invalid = $el.parent().find('.triangulate-invalid');
        		
	        	$validating.show();
	        	$valid.hide();
	        	$invalid.hide();
	       
				var passcode = $el.val();
				
				if(passcode !== Setup.passcode){
					$validating.hide();
					$invalid.show();
					return;
				}
				else{
					$validating.hide();
					$valid.show();
				}
					        	
	        	
        	}); 	
          
        }
    };
})

.directive('dropZone', function(File, Setup) {
  	return function(scope, element, attrs) {
 
	  	Dropzone.autoDiscover = false;
 
	  	$(element).dropzone({ 
            url: Setup.api + '/file/post',
            headers: { 'Authorization': 'Bearer ' + window.sessionStorage.token},
            clickable: true,
            sending: function(file, xhr, formData){
            
				if(attrs.filename != '' && attrs.filename != null){
				  	formData.append('overwrite', attrs.filename);
				}
				
				if(attrs.folder != '' && attrs.folder != null && attrs.folder != undefined){
					formData.append('folder', attrs.folder);
				}
				
				$(element).find('.dz-message').hide();
				
				return true;
	            
            },
            success: function(file, response){
            
            	// clear cache
				File.invalidateCache();
            
                var image = response;
                
                if(attrs.target == 'editor'){
                
                	scope.image = response;

	                // call method to update list
	                scope.$apply(attrs.callback);
	                
	                // call method to add image
	                scope.$apply('addImage(image)');
                }
                else if(attrs.target == 'branding'){
                
	                // call method to update list
	                scope.$apply(attrs.callback);
	                
	                scope.image = response;
	                
	                // call method to add image
	                scope.$apply('addImage(image)');
                }
                else if(attrs.target == 'profile'){
                
	                // call method to update list
	                scope.$apply(attrs.callback);
	                
	                scope.image = response;
	                
	                // call method to add image
	                scope.$apply('addImage(image)');
                }
                else{
	                // call method to update list
	                scope.$apply(attrs.callback);
                }
            }
            
        });
	  	
		
	}
})

.directive('triangulateSpectrum', function(Setup) {
    return {
        // attribute
        restrict: 'A',
       
        link: function(scope, element, attrs) {
        
        	 	$(element).spectrum({
        	 		beforeShow: function(){
	        	 		utilities.selection = utilities.saveSelection();
	        	 		
	        	 		console.log('set selection');
        	 		},
        	 		change: function(color) {
					    
					    // restore selection
					    if(utilities.selection != null){
					    	utilities.restoreSelection(utilities.selection);
						}
					    
					    // get hex
					    var hex = color.toHexString();
					    
					    // execute forecolor
					    document.execCommand('foreColor', false, hex);
					}
        	 	});
          
        }
    };
})

;
