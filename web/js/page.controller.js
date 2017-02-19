angular
    .module('triggered')
    .controller('PageCtrl', ['$scope', 'GoogleSheets', function ($scope, GoogleSheets) {

        $scope.loading = true;

        GoogleSheets.get().then(function (words) {
            $scope.pages = buildPages(words, 4, 5);
            $scope.loading = false;
            console.log($scope.pages)
        });

        function buildPages(words, cardsWide, cardsHigh) {
            var pages = [[]];
            var cardsOnPage = cardsWide * cardsHigh;
            var cardCount = 0;

            for (var i = 0; i < words.length; i++) {
                if (cardCount < cardsOnPage) {
                    pages[pages.length - 1].push(words[i]);
                    cardCount++;
                } else {
                    // Add a new page
                    pages.push([]);
                    pages[pages.length - 1].push(words[i]);
                    cardCount = 1;
                }
            }
            return pages;
        }
    }]);
