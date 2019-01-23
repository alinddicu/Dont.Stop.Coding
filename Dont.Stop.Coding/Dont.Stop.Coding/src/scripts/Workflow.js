/// <reference path="../../typings/knockout.d.ts"/>
/// <reference path="../../typings/sammy.d.ts"/>

function Workflow() {
	var self = this;
	self.currentViewModel= ko.observable();

	self.gotoGameOfLife = function () { location.hash = "/game-of-life"; };
    self.gotoSortingArrays = function () { location.hash = "/sorting-arrays"; };
	
	var changePage = function(viewModel) {
		self.currentViewModel(viewModel);
	};

	Sammy(function() {
		this.get("#/game-of-life", function () {
			changePage(new ViewModel.GameOfLifeViewModel(self));
		});

		this.get("#/sorting-arrays", function () {
			changePage(new ViewModel.SortingArraysViewModel(self));
		});
	}).run();

	if (!self.currentViewModel()) {
        self.gotoSortingArrays();
    }
}