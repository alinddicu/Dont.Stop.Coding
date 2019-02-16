/// <reference path="../../../typings/knockout.d.ts"/>

namespace ViewModel {
	export class TimeViewModel extends ViewModelBase {

		public pageName = "time";
		public  currentTime: KnockoutObservable<Date> = ko.observable(new Date());

		constructor(appsRunner: IAppsRunner) {
			super(appsRunner);
			this.backgroundColor("white");
		}
	}
}