﻿/* global ViewModel:false */

/// <reference path="../../typings/knockout.d.ts"/>
/// <reference path="../../typings/sammy.d.ts"/>

function Workflow() {
	var self = this;
	self.currentViewModel = ko.observable();
	self.menuOpen = ko.observable(false);

	function closeMenu() {
		self.menuOpen(false);
	}

	self.gotoGameOfLife = function () {
		location.hash = "/game-of-life";
	};

	self.gotoSortingArrays = function () {
		location.hash = "/sorting-arrays";
	};

	var changeFavicon = function(faviconName) {
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
		this.get("#/game-of-life", function () {
			changePage(new ViewModel.GameOfLifeViewModel(self));
		});

		this.get("#/sorting-arrays", function () {
			changePage(new ViewModel.SortingArraysViewModel(self));
		});

		this.get("", function () {
			changePage(new ViewModel.SortingArraysViewModel(self));
		});
	}).run();

	if (!self.currentViewModel())
	{
		self.gotoSortingArrays();
	}
}