var app = angular.module('rtfmApp', ['firebase', 'ui.router']);

app.constant('firebaseUrl', {
	url: 'https://shining-fire-5362.firebaseio.com'
});

app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('threads', {
			url: '/threads',
			controller: 'threadsCtrl',
			templateUrl: '/threads/threads.html',
			resolve: {
				threadsRef: function(ThreadService) {
					return ThreadService.getThreads();
				}
			}
		})
		.state('thread', {
			url: '/threads/:threadId',
			controller: 'threadCtrl',
			templateUrl: '/thread/thread.html',
			resolve: {
				threadRef: function(ThreadService, $stateParams) {
					return ThreadService.getThread($stateParams.threadId);
				},
				commentsRef: function(ThreadService, $stateParams) {
					return ThreadService.getComments($stateParams.threadId);
				}
			}
		});

	$urlRouterProvider.otherwise('/threads');

});
