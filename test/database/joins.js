/*jshint trailing:true, white:true, indent:2, strict:true, curly:true,
  immed:true, eqeqeq:true, forin:true, latedef:true,
  newcap:true, noarg:true, undef:true */
/*global XT:true, describe:true, it:true, require:true, __dirname:true, after:true */

var _ = require("underscore"),
  assert = require('chai').assert,
  datasource = require('../../node-datasource/lib/ext/datasource').dataSource,
  path = require('path');

(function () {
  "use strict";
  describe('The database', function () {
    this.timeout(10 * 1000);

    var loginData = require(path.join(__dirname, "../lib/login_data.js")).data,
      datasource = require('../../../xtuple/node-datasource/lib/ext/datasource').dataSource,
      config = require(path.join(__dirname, "../../node-datasource/config.js")),
      creds = config.databaseServer,
      databaseName = loginData.org;

    it('should execute a query with a join filter', function (done) {
      var sql = 'select xt.js_init(true);select xt.get($${"nameSpace":"XM","type":"ContactListItem","query":{"orderBy":[{"attribute":"lastName"}],"rowOffset":0,"rowLimit":50,"parameters":[{"attribute":"owner.username","operator":"","isCharacteristic":false,"value":"admin"}]},"username":"admin","encryptionKey":"foo"}$$);';

      creds.database = databaseName;
      datasource.query(sql, creds, function (err, res) {
        var results;
        assert.isNull(err);
        assert.equal(1, res.rowCount, JSON.stringify(res.rows));
        results = JSON.parse(res.rows[1].get);
        assert.equal(results.data.length, 5);
        done();
      });
    });

    it('should execute a query with a simple filter', function (done) {
      var sql = 'select xt.js_init(true);select xt.get($${"nameSpace":"XM","type":"ContactListItem","query":{"orderBy":[{"attribute":"lastName"}],"rowOffset":0,"rowLimit":50,"parameters":[{"attribute":"isActive","operator":"=","value":true}]},"username":"admin","encryptionKey":"foo"}$$);';

      creds.database = databaseName;
      datasource.query(sql, creds, function (err, res) {
        var results;
        assert.isNull(err);
        assert.equal(1, res.rowCount, JSON.stringify(res.rows));
        results = JSON.parse(res.rows[1].get);
        assert.equal(results.data.length, 29);
        done();
      });
    });

    it('should execute a query with a simple filter and a join filter', function (done) {
      var sql = 'select xt.js_init(true);select xt.get($${"nameSpace":"XM","type":"ContactListItem","query":{"orderBy":[{"attribute":"lastName"}],"rowOffset":0,"rowLimit":50,"parameters":[{"attribute":"isActive","operator":"=","value":true},{"attribute":"owner.username","operator":"","isCharacteristic":false,"value":"admin"}]},"username":"admin","encryptionKey":"foo"}$$);';

      creds.database = databaseName;
      datasource.query(sql, creds, function (err, res) {
        var results;
        assert.isNull(err);
        assert.equal(1, res.rowCount, JSON.stringify(res.rows));
        results = JSON.parse(res.rows[1].get);
        assert.equal(results.data.length, 5);
        done();
      });
    });

  });
}());


