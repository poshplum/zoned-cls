/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as path from 'path';
import * as shx from 'shelljs';

/**
 * Utility functions that allows me to create fs paths
 *   p`${foo}/some/${{bar}}/path` rather than path.join(foo, 'some',
 */
function p(templateStringArray: TemplateStringsArray) {
  const segments = [];
  for (const entry of templateStringArray) {
    segments.push(...entry.split('/').filter(s => s !== ''));
  }
  return path.join(...segments);
}

describe('Zone.js npm_package', () => {
  beforeEach(() => {
    shx.cd('./npm_package');
  });
  afterEach(() => {
    shx.cd('../');
  });
  describe('misc root files', () => {
    describe('README.md', () => {
      it('should have a README.md file with basic info', () => {
        expect(shx.cat('README.md')).toContain(`Zone`);
      });
    });
  });

  describe('primary entry-point', () => {
    const packageJson = 'package.json';

    it('should have a package.json file', () => {
      expect(shx.grep('"name":', packageJson)).toContain(`zone.js`);
    });

    it('should contain correct version number with the PLACEHOLDER string replaced', () => {
      expect(shx.grep('"version":', packageJson)).toMatch(/\d+\.\d+\.\d+(?!-PLACEHOLDER)/);
    });

    it('should contain module resolution mappings', () => {
      expect(shx.grep('"main":', packageJson)).toContain(`dist/zoned-cls-node.js`);
    });
  });

  describe('check dist folder', () => {
    beforeEach(() => {
      shx.cd('./dist');
    });
    afterEach(() => {
      shx.cd('../');
    });
    describe('typescript support', () => {
      it('should have an d/zoned-cls.d.ts file', () => {
        expect(shx.cat('zoned-cls.d.ts')).toContain('declare const');
      });
    });

    describe('closure', () => {
      it('should contain externs', () => {
        expect(shx.cat('zoned-cls_externs.js')).toContain('Externs for zone.js');
      });
    });

    describe('es5', () => {
      it('zoned-cls.js(es5) should not contain es6 spread code', () => {
        expect(shx.cat('zoned-cls.js')).not.toContain('let value of values');
      });
    });

    describe('es2015', () => {
      it('zoned-cls-evergreen.js(es2015) should contain es6 code', () => {
        expect(shx.cat('zoned-cls-evergreen.js')).toContain('let value of values');
      });
    });

    describe('dist file list', () => {
      it('should contain all files', () => {
        const list = shx.ls('./').stdout.split('\n').sort().slice(1);
        const expected = [
          'async-test.js',
          'async-test.min.js',
          'fake-async-test.js',
          'fake-async-test.min.js',
          'jasmine-patch.js',
          'jasmine-patch.min.js',
          'long-stack-trace-zone.js',
          'long-stack-trace-zone.min.js',
          'mocha-patch.js',
          'mocha-patch.min.js',
          'proxy.js',
          'proxy.min.js',
          'sync-test.js',
          'sync-test.min.js',
          'webapis-media-query.js',
          'webapis-media-query.min.js',
          'webapis-notification.js',
          'webapis-notification.min.js',
          'webapis-rtc-peer-connection.js',
          'webapis-rtc-peer-connection.min.js',
          'webapis-shadydom.js',
          'webapis-shadydom.min.js',
          'wtf.js',
          'wtf.min.js',
          'zoned-cls_externs.js',
          'zoned-cls-bluebird.js',
          'zoned-cls-bluebird.min.js',
          'zoned-cls-error.js',
          'zoned-cls-error.min.js',
          'zoned-cls-evergreen.js',
          'zoned-cls-evergreen.min.js',
          'zoned-cls-evergreen-testing-bundle.js',
          'zoned-cls-evergreen-testing-bundle.min.js',
          'zoned-cls-legacy.js',
          'zoned-cls-legacy.min.js',
          'zoned-cls-mix.js',
          'zoned-cls-mix.min.js',
          'zoned-cls-node.js',
          'zoned-cls-node.min.js',
          'zone-patch-canvas.js',
          'zone-patch-canvas.min.js',
          'zoned-cls-patch-cordova.js',
          'zoned-cls-patch-cordova.min.js',
          'zoned-cls-patch-electron.js',
          'zoned-cls-patch-electron.min.js',
          'zoned-cls-patch-fetch.js',
          'zoned-cls-patch-fetch.min.js',
          'zoned-cls-patch-jsonp.js',
          'zoned-cls-patch-jsonp.min.js',
          'zoned-cls-patch-promise-test.js',
          'zoned-cls-patch-promise-test.min.js',
          'zoned-cls-patch-resize-observer.js',
          'zoned-cls-patch-resize-observer.min.js',
          'zoned-cls-patch-rxjs-fake-async.js',
          'zoned-cls-patch-rxjs-fake-async.min.js',
          'zoned-cls-patch-rxjs.js',
          'zoned-cls-patch-rxjs.min.js',
          'zoned-cls-patch-socket-io.js',
          'zoned-cls-patch-socket-io.min.js',
          'zoned-cls-patch-user-media.js',
          'zoned-cls-patch-user-media.min.js',
          'zoned-cls-testing-bundle.js',
          'zoned-cls-testing-bundle.min.js',
          'zoned-cls-testing-node-bundle.js',
          'zoned-cls-testing-node-bundle.min.js',
          'zoned-cls-testing.js',
          'zoned-cls-testing.min.js',
          'zoned-cls.js',
          'zoned-cls.d.ts',
          'zoned-cls.min.js',
        ].sort();
        expect(list.length).toBe(expected.length);
        for (let i = 0; i < list.length; i++) {
          expect(list[i]).toEqual(expected[i]);
        }
      });
    });
  });
});
