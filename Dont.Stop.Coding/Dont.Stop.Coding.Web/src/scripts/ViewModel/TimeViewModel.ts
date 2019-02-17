/// <reference path="../../../typings/knockout.d.ts"/>
/// <reference path="C:\\Program Files (x86)\\Microsoft SDKs\\TypeScript\\3.2\\lib.d.ts"/>

'use strict';

namespace ViewModel {

	class Colors {
		public static grey = "#eae7dc";
		public static brown = "#d8c3a5";
		public static darkGrey = "#8d8e8a";
		public static lightRed = "#e98074";
		public static mildRed = "#e85a4f";
	}

	export class TimeViewModel extends ViewModelBase {

		public pageName = "time";
		public currentTime: KnockoutObservable<Date> = ko.observable(new Date());

		constructor(appsRunner: IAppsRunner) {
			super(appsRunner);
			this.backgroundColor(Colors.grey);

			setInterval(() => {
				this.currentTime(new Date());
				this.drawCurrentAnalogicTime();
			}, 500);
		}

		private drawCurrentAnalogicTime(): void {
			const canvas = document.getElementById("current-analogic-time") as HTMLCanvasElement;
			const canvasCtx = this.setupSmoothCanvas(canvas);

			const height = canvas.height * 0.8;
			const width = canvas.width * 0.8;

			canvasCtx.strokeStyle = Colors.darkGrey;
			canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
			canvasCtx.beginPath();
			const radius = height / 2 - 10;
			canvasCtx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
			canvasCtx.closePath();
			canvasCtx.stroke();
		}

		private setupSmoothCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
			// Get the device pixel ratio, falling back to 1.
			const dpr = window.devicePixelRatio || 1;
			// Get the size of the canvas in CSS pixels.
			const rect = canvas.getBoundingClientRect();
			// Give the canvas pixel dimensions of their CSS
			// size * the device pixel ratio.
			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;
			const ctx = canvas.getContext('2d');
			// Scale all drawing operations by the dpr, so you
			// don't have to worry about the difference.
			ctx.scale(dpr, dpr);
			return ctx;
		}
	}
}