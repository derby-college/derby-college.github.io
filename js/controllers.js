angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', '$state', 'Firebase', function ($scope, $stateParams, $state, Firebase) {
    $scope.content = {};
    $scope.admin = false;
    $scope.menu = {};

    $scope.toggleAdmin = function(){
        $scope.admin = !$scope.admin;
    };
    $scope.doRefresh = function(){
        firebase.database().ref('homePage/').once('value',function(snapshot){
            $scope.content = snapshot.val();
            firebase.database().ref('menus/' + $scope.content.menu).once('value',function(snapshot){
                $scope.menu = snapshot.val();
            }).then(function(){
                console.log('Page Loaded!');
            });
        });
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.$on('$ionicView.beforeEnter',function(){
        firebase.database().ref('homePage/').once('value',function(snapshot){
            $scope.content = snapshot.val();
            firebase.database().ref('menus/' + $scope.content.menu).once('value',function(snapshot){
                $scope.menu = snapshot.val();
            }).then(function(){
                console.log('Page Loaded!');
                console.log($scope.menu);
                $scope.$apply();
            });
        });
    });

    $scope.open = function(page,id){
        $state.go(page,{key_id:id});
    };
    $scope.iconFactory = {};
    firebase.database().ref('icons/').on('value',function(snapshot){
        $scope.iconFactory = snapshot.val();
       // alert($scope.iconFactory["-KVeK-Lwr1K0B-Qm4SlA"].title);
        $scope.$apply();
    });
    $scope.uploadImg = function(event){
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(event[0]);
    };
    
    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.content.titleImage = e.target.result;
        });
    };
    $scope.save = function(){
        firebase.database().ref('homePage/').set($scope.content).then(function(){
           console.log('Saved!'); 
           alert('saved');
        });
    }
}])
   
.controller('contentCtrl', ['$scope', '$stateParams', 'Firebase', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Firebase) {
    $scope.content = [];
    $scope.admin = false;
    $scope.toggleAdmin = function(){
        $scope.admin = !$scope.admin;
    };
    
    $scope.doRefresh = function(){
        if($stateParams.key_id !== ''){
            firebase.database().ref('content/' + $stateParams.key_id).once('value',function(snapshot){
                $scope.content = snapshot.val();
            }).then(function(){
                console.log('Loaded Data');
                $scope.$apply();
            });
        }
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.$on('$ionicView.beforeEnter',function(){
        if($stateParams.key_id !== ''){
            firebase.database().ref('content/' + $stateParams.key_id).once('value',function(snapshot){
                console.log('Loaded Data');
                $scope.content = snapshot.val();
            }).then(function(){
                $scope.$apply();
            });
        }
    });
    $scope.uploadImg = function(event){
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(event[0]);
    };
    
    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.content.image = e.target.result;
        });
    };
    
    $scope.save = function(){
        var newKey = $stateParams.key_id;
        console.log('newKey = ' + newKey);
        if(newKey === ''){
            newKey = firebase.database().ref('content/').push().key;
            console.log('newKey = ' + newKey);
        }
        $scope.content.key = newKey;
        firebase.database().ref('content/' + newKey).set($scope.content).then(function(){
            console.log('Saved Page to ' + newKey);
        });
    };
}])
   
.controller('addIconsCtrl', ['$scope', '$stateParams', 'Firebase', '$ionicPopup', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Firebase, $ionicPopup, $timeout) {
    $scope.icon=[];
    $scope.saveIcon = function(){
        var newKey = firebase.database().ref('/icons/').push().key;
        $scope.icon.key = newKey;
        firebase.database().ref('/icons/'+newKey).set($scope.icon).then(function(){
            $scope.icon = [];
            var mypopup = $ionicPopup.show({
                template:"Success"
            });
            $timeout(function() {
                mypopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);
        });
        
    };
    
}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('editMenusCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 