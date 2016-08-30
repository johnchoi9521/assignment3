// public/core.js
var Weather = angular.module('Weather', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all weathers and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.weathers = data;
            
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createWeather = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.weathers = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteWeather = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.weathers = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    /*
    // when landing on the page, get all weathers and show them
    $scope.getWeather = function() {
        
        $http.get('/api/getweather')
            .success(function(data) {
                $scope.tempweathers = data;
                document.getElementById('city').value=XXXXXXX4;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    {
  */
    // Initialization of the scope variables. 
 
    $scope.cityName = "Your City";
    $scope.tmp = 0;
    $scope.minTemp = 0;
    $scope.maxTemp = 0;
 
    // Logic for the On-Click event.
 
    $scope.getWeather = function(){
        var url = "/api/getweather/" + $scope.cityName;
        $http.get(url)
        .success(function(response) {
            $scope.imgWidth = 150;
            $scope.imgHeight = 150;
            $scope.wtData = response[0].coord;
            $scope.ct = response[0].name;
            $scope.tmp = response[0].main.temp - 272.15;
            $scope.minTemp = response[0].main.temp_min - 272.15;
            $scope.maxTemp = response[0].main.temp_max - 272.15;
            $scope.hmdy = response[0].main.humidity;
            $scope.cm = response[0].weather[0].main;
            $scope.imgCode = response[0].weather[0].icon;
            $scope.formData.city=$scope.ct;
            $scope.formData.cloudiness=$scope.cm;
            $scope.formData.temperature=$scope.tmp;
            document.getElementById("cityname").value = $scope.ct;
            document.getElementById("cityweather").value = $scope.cm;
            document.getElementById("citytemperature").value = $scope.tmp;
        })
            .error(function(data) {
                console.log('Error: ' + data);
        });

     }
}