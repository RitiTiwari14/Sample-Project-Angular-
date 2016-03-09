var app = angular.module("myNotebook",[]);


app.directive("pageMenu", function(){
	return{
		restrict:'A',
		template: '<li ng-repeat ="(key, value) in mainObject"><a id="{{key}}" ng-class="{active:key==activeId}"'
		 +'ng-click="menuClick($event)" href="#">{{key}}</a></li>'
	};
});

app.directive("appendPages",function($compile){
	return{ 
		link: function(scope, element, attrs){

			element.bind('click', function () {
			sessionStorage.pagetracker = parseInt(sessionStorage.pagetracker)+1;
			var mykey ="page"+sessionStorage.pagetracker;
			scope.$apply(function() {
    		  scope.tempObject[mykey] = "";
			  sessionStorage.pageObject = JSON.stringify(scope.tempObject);
   			});
			
			var compiledElement = $compile('<li ng-init="key'+sessionStorage.pagetracker+'='+"'"+mykey+"'"+'"><a id="'+mykey+'" ng-class="{active:key'+sessionStorage.pagetracker+'==activeId}"  ng-click="menuClick($event)" href="#">'+mykey+'</a></li>')(scope); 
			angular.element(document.querySelector("#nav div")).append(compiledElement);
			
			});
		}
		
	}
});

app.controller("notebookCntrlr",function($scope, $compile){

	$scope.mainObject = {
		"page1": "",
		"page2": "",
		"page3": "",
		"page4": "",
		"page5": ""
	};
	$scope.pageText;
	$scope.activeId;
	$scope.tempObject={}

	$scope.menuClick = function(event){
		
		 $scope.activeId = event.target.id;
		 sessionStorage.pageid = $scope.activeId;
		 $scope.pageText = $scope.tempObject[sessionStorage.pageid];	

	 }

//on pageload
	if(sessionStorage.pageid == undefined){
		$scope.activeId = "page1";
		sessionStorage.pageid = "page1";
		sessionStorage.pagetracker = 5;
	}
	else{
		$scope.activeId = sessionStorage.pageid;
		if(sessionStorage.pageObject !=undefined){
			$scope.tempObject = JSON.parse(sessionStorage.pageObject);
		   	for(var key in $scope.tempObject) {
		    	$scope.mainObject[key] = $scope.tempObject[key];
			}
			$scope.pageText = $scope.mainObject[sessionStorage.pageid];
		}
	}
   
   	$scope.savePagetext =function(){
		$scope.tempObject[sessionStorage.pageid] = $scope.pageText;
		sessionStorage.pageObject = JSON.stringify($scope.tempObject);
	}
  
});





