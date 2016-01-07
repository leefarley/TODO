'use strict';

angular.module('todoApp', [])
    .controller('TodoCtrl', function ($http) {
        this.$http = $http;
        this.awesomeThings = [];
        this.newThing = { name: "", info: "" };
        self = this;

        this.loadThings = function () {
            return this.$http.get('/api/things').then(response => {
                this.awesomeThings = response.data;
                this.selectedThing = null;
            });
        }

        this.selectThing = function (thing) {
            this.selectedThing = thing;
        }

        this.addThing = function () {
            if (this.newThing.name.length > 0) {
                this.$http.post('/api/things', { name: this.newThing.name, info: this.newThing.info })
                    .then(() => this.loadThings())
                    .then(() => this.clearNewThing());
            }
        }

        this.completeThing = function (id) {
            this.$http.put('/api/things/complete/' + id)
                .then(() => this.loadThings());
        }

        this.clearNewThing = function () {
            this.newThing.name = "";
            this.newThing.info = "";
        }

        this.loadThings();
    });