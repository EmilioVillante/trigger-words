/**
 * Created by emiliovillante on 13/2/17.
 */

angular
    .module('triggered')
    .factory('GoogleSheets', ['$http', function ($http) {
        return {
            get: function () {
                var columnTitle = 'Words To Print';
                return $http.get('https://sheetsu.com/apis/v1.0/b0820d6484ee').then(function (response) {
                    return response.data.reduce(function (result, next) {
                        if (next[columnTitle]) {
                            result.push(next[columnTitle]);
                        }
                        return result;
                    }, []);
                })
            }
        }
    }]);