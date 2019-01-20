
'use strict';

var params = new GoL.Drawing.ParamsForm();
var board = params.init();

var viewModel = {
	board: ko.observable(board),
	isParamsVisible: ko.observable(false),
	isExportVisible: ko.observable(false),
	isImportVisible: ko.observable(false)
};
ko.applyBindings(viewModel);

function init() {
	board = params.init();
	board.initCellButtonsInSquare(params.options);
	viewModel.board(board);
	viewModel.isParamsVisible(false);
}

function showParams() {
	var currentValue = viewModel.isParamsVisible();
	viewModel.isParamsVisible(!currentValue);
	viewModel.board().isEnabled(currentValue);
}

function exportAliveCells() {
	var currentValue = viewModel.isExportVisible();
	viewModel.board().isEnabled(currentValue);
	viewModel.isExportVisible(!currentValue);
	var textArea = document.getElementById("exportTextArea") as HTMLTextAreaElement;
	if (textArea) {
		textArea.value = board.export();
	}
}

function showImportAliveCells() {
	var currentValue = viewModel.isImportVisible();
	viewModel.isImportVisible(!currentValue);
	viewModel.board().isEnabled(currentValue);
}

function importAliveCells() {
	var textArea = document.getElementById("importTextArea") as HTMLTextAreaElement;
	if (textArea && textArea.value) {
		board.import(textArea.value);
	}

	viewModel.isImportVisible(false);
	viewModel.board().isEnabled(true);
}