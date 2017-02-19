/**
 * Created by emiliovillante on 19/2/17.
 */
angular
    .module('triggered')
    .directive('board', [function () {
        return {
            template:
            // Top
            '<div class="team team--horizontal {{ startingTeam }}"></div>' +
            '<div>' +
            // Left
            '   <div class="team team--vertical  {{ startingTeam }}"></div>' +
            // Center
            '   <div class="table">' +
            '       <div class="cell {{ cell }}" ng-repeat="cell in cells track by $index"></div>' +
            '   </div>' +
            // Right
            '   <div class="team team--vertical  {{ startingTeam }}"></div>' +
            '</div>' +
            // Bottom
            '<div class="team team--horizontal  {{ startingTeam }}"></div>',
            restrict: 'E',
            scope: {},
            controller: ['$scope', function ($scope) {

                var teams = ['a', 'b'],
                    gridSize = 25,
                    teamBaseAmount = 8,
                    numbAssassins = 1;

                $scope.startingTeam = teams[Math.round(Math.random())];

                var squareTypes = [
                    {
                        type: teams[0],
                        amount: $scope.startingTeam == teams[0] ? teamBaseAmount + 1 : teamBaseAmount
                    },
                    {
                        type: teams[1],
                        amount: $scope.startingTeam == teams[1] ? teamBaseAmount + 1 : teamBaseAmount
                    },
                    {
                        type: 'assassin',
                        amount: numbAssassins
                    },
                    {
                        type: 'neutral',
                        amount: gridSize - teamBaseAmount - (teamBaseAmount + 1) - numbAssassins
                    }
                ];

                $scope.cells = getCellGrid();

                function getCellGrid() {
                    var cells = [];
                    for (var i = 0; i < gridSize; i++) {
                        var randType = Math.floor(Math.random() * squareTypes.length);
                        cells.push(angular.copy(squareTypes[randType].type));
                        // Reduce the remaining square type amount
                        squareTypes[randType].amount--;
                        // Remove the square type if no amount remaining
                        if (!squareTypes[randType].amount) {
                            squareTypes.splice(randType, 1);
                        }
                    }
                    return cells;
                }
            }]
        }
    }]);