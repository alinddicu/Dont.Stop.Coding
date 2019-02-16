/* global ViewModel:false */

/// <reference path="../../typings/knockout.d.ts"/>
/// <reference path="../../typings/sammy.d.ts"/>

function AppsRunner() {
	var self = this;
	self.currentViewModel = ko.observable();
	self.menuOpen = ko.observable(false);
	self.working = ko.observable(false);
	self.errorMessage = ko.observable("");

	//self.api = new ApiTest();
	self.api = new Api($);

	self.startWorking = function() {
		self.working(true);
		self.errorMessage("");
	};

	self.finishWorking = function (errorMessage) {
		self.working(false);
		if (errorMessage)
		{
			self.errorMessage(errorMessage);
		}
	}

	function closeMenu() {
		self.menuOpen(false);
	}

	self.gotoTime = function () {
		location.hash = "/time";
	};

	self.gotoGameOfLife = function () {
		location.hash = "/game-of-life";
	};

	self.gotoSortingArrays = function () {
		location.hash = "/sorting-arrays";
	};

	self.gotoRssAggregator = function (feedId) {
		var hash = "/rss-aggregator";
		if (feedId)
		{
			hash += "/feedId/" + feedId;
		}

		location.hash = hash;
	};

	var changeFavicon = function (faviconName) {
		var link = document.querySelector("link[rel='icon']") || document.createElement("link");
		link.type = "image/x-icon";
		link.rel = "icon";
		link.href = `images/favicon/${faviconName}.png`;
		document.getElementsByTagName("head")[0].appendChild(link);
	};

	var changePage = function (viewModel) {
		self.currentViewModel(viewModel);
		closeMenu();
		changeFavicon(viewModel.pageName);
	};

	Sammy(function () {
		this.get("#/time", function () {
			changePage(new ViewModel.TimeViewModel(self));
		});

		this.get("#/game-of-life", function () {
			changePage(new ViewModel.GameOfLifeViewModel(self));
		});

		this.get("#/sorting-arrays", function () {
			changePage(new ViewModel.SortingArraysViewModel(self));
		});

		this.get("#/rss-aggregator/feedId/:feedId", function () {
			changePage(new ViewModel.RssAggregatorViewModel(self, this.params.feedId));
		});

		this.get("", function () {
			changePage(new ViewModel.RssAggregatorViewModel(self, null));
		});
	}).run();

	if (!self.currentViewModel())
	{
		self.gotoRssAggregator();
	}
}