// Generated by CoffeeScript 1.7.1
(function() {
  define(function(require, exports, module) {
    var analysis, editor;
    require('jquery');
    require('bootstrap');
    require('angular');
    analysis = require('/static/har/analysis');
    editor = angular.module('HAREditor', []);
    editor.controller('UploadCtrl', function($scope, $rootScope) {
      var element;
      element = angular.element('#upload-har');
      element.modal('show').on('hide.bs.modal', function() {
        return $scope.uploaded != null;
      });
      element.find('input[type=file]').on('change', function(ev) {
        return $scope.file = this.files[0];
      });
      $scope.alert = function(message) {
        return element.find('.alert').text(message).show();
      };
      $scope.loaded = function(data) {
        console.log(data);
        $scope.uploaded = true;
        $rootScope.$emit('har-loaded', data);
        return angular.element('#upload-har').modal('hide');
      };
      return $scope.upload = function() {
        var reader;
        if ($scope.file == null) {
          return false;
        }
        console.log($scope.file);
        if ($scope.file.size > 50 * 1024 * 1024) {
          $scope.alert('文件大小超过50M');
          return false;
        }
        element.find('button').button('loading');
        reader = new FileReader();
        reader.onload = function(ev) {
          var error;
          $scope.uploaded = true;
          try {
            return $scope.loaded(angular.fromJson(ev.target.result));
          } catch (_error) {
            error = _error;
            console.log(error);
            return $scope.alert('HAR 格式错误');
          } finally {
            element.find('button').button('reset');
          }
        };
        return reader.readAsText($scope.file);
      };
    });
    editor.controller('EditorCtrl', function($scope, $rootScope) {
      $rootScope.$on('har-loaded', function(ev, data) {
        data = analysis.analyze(data);
        return $scope.$apply(function() {
          return $scope.har = data;
        });
      });
      $scope.status_label = function(status) {
        if (Math.floor(status / 100) === 2) {
          return 'label-success';
        } else if (Math.floor(status / 100) === 3) {
          return 'label-info';
        } else if (status === 0) {
          return 'label-danger';
        } else {
          return 'label-warning';
        }
      };
      return $scope.filter = {
        checked: true
      };
    });
    return {
      init: function() {
        return angular.bootstrap(document.body, ['HAREditor']);
      }
    };
  });

}).call(this);
