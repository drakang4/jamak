module.exports = /******/ (function(modules) {
  // webpackBootstrap
  /******/ // eslint-disable-next-line no-unused-vars
  /******/ function hotDownloadUpdateChunk(chunkId) {
    /******/ var filename = require('path').join(
      __dirname,
      '' + chunkId + '.' + hotCurrentHash + '.hot-update.js',
    );
    /******/ require('fs').readFile(filename, 'utf-8', function(err, content) {
      /******/ if (err) {
        /******/ if (__webpack_require__.onError)
          return __webpack_require__.oe(err);
        /******/ throw err;
        /******/
      }
      /******/ var chunk = {};
      /******/ require('vm').runInThisContext(
        /******/ '(function(exports) {' + content + '\n})',
        /******/ { filename: filename },
        /******/
      )(chunk);
      /******/ hotAddUpdateChunk(chunk.id, chunk.modules);
      /******/
    });
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotDownloadManifest() {
    /******/ var filename = require('path').join(
      __dirname,
      '' + hotCurrentHash + '.hot-update.json',
    );
    /******/ return new Promise(function(resolve, reject) {
      /******/ require('fs').readFile(filename, 'utf-8', function(
        err,
        content,
      ) {
        /******/ if (err) return resolve();
        /******/ try {
          /******/ var update = JSON.parse(content);
          /******/
        } catch (e) {
          /******/ return reject(e);
          /******/
        }
        /******/ resolve(update);
        /******/
      });
      /******/
    });
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotDisposeChunk(chunkId) {
    /******/ delete installedChunks[chunkId];
    /******/
  }
  /******/
  /******/ var hotApplyOnUpdate = true; // eslint-disable-next-line no-unused-vars
  /******/ /******/ var hotCurrentHash = 'f682866f3af1165c6868';
  /******/ var hotRequestTimeout = 10000;
  /******/ var hotCurrentModuleData = {};
  /******/ var hotCurrentChildModule; // eslint-disable-next-line no-unused-vars
  /******/ /******/ var hotCurrentParents = []; // eslint-disable-next-line no-unused-vars
  /******/ /******/ var hotCurrentParentsTemp = []; // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotCreateRequire(moduleId) {
    /******/ var me = installedModules[moduleId];
    /******/ if (!me) return __webpack_require__;
    /******/ var fn = function(request) {
      /******/ if (me.hot.active) {
        /******/ if (installedModules[request]) {
          /******/ if (
            installedModules[request].parents.indexOf(moduleId) === -1
          ) {
            /******/ installedModules[request].parents.push(moduleId);
            /******/
          }
          /******/
        } else {
          /******/ hotCurrentParents = [moduleId];
          /******/ hotCurrentChildModule = request;
          /******/
        }
        /******/ if (me.children.indexOf(request) === -1) {
          /******/ me.children.push(request);
          /******/
        }
        /******/
      } else {
        /******/ console.warn(
          /******/ '[HMR] unexpected require(' +
            /******/ request +
            /******/ ') from disposed module ' +
            /******/ moduleId,
          /******/
        );
        /******/ hotCurrentParents = [];
        /******/
      }
      /******/ return __webpack_require__(request);
      /******/
    };
    /******/ var ObjectFactory = function ObjectFactory(name) {
      /******/ return {
        /******/ configurable: true,
        /******/ enumerable: true,
        /******/ get: function() {
          /******/ return __webpack_require__[name];
          /******/
        },
        /******/ set: function(value) {
          /******/ __webpack_require__[name] = value;
          /******/
        },
        /******/
      };
      /******/
    };
    /******/ for (var name in __webpack_require__) {
      /******/ if (
        /******/ Object.prototype.hasOwnProperty.call(
          __webpack_require__,
          name,
        ) &&
        /******/ name !== 'e' &&
        /******/ name !== 't'
        /******/
      ) {
        /******/ Object.defineProperty(fn, name, ObjectFactory(name));
        /******/
      }
      /******/
    }
    /******/ fn.e = function(chunkId) {
      /******/ if (hotStatus === 'ready') hotSetStatus('prepare');
      /******/ hotChunksLoading++;
      /******/ return __webpack_require__
        .e(chunkId)
        .then(finishChunkLoading, function(err) {
          /******/ finishChunkLoading();
          /******/ throw err;
          /******/
        });
      /******/
      /******/ function finishChunkLoading() {
        /******/ hotChunksLoading--;
        /******/ if (hotStatus === 'prepare') {
          /******/ if (!hotWaitingFilesMap[chunkId]) {
            /******/ hotEnsureUpdateChunk(chunkId);
            /******/
          }
          /******/ if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
            /******/ hotUpdateDownloaded();
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    };
    /******/ fn.t = function(value, mode) {
      /******/ if (mode & 1) value = fn(value);
      /******/ return __webpack_require__.t(value, mode & ~1);
      /******/
    };
    /******/ return fn;
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotCreateModule(moduleId) {
    /******/ var hot = {
      /******/ // private stuff
      /******/ _acceptedDependencies: {},
      /******/ _declinedDependencies: {},
      /******/ _selfAccepted: false,
      /******/ _selfDeclined: false,
      /******/ _disposeHandlers: [],
      /******/ _main: hotCurrentChildModule !== moduleId, // Module API
      /******/
      /******/ /******/ active: true,
      /******/ accept: function(dep, callback) {
        /******/ if (dep === undefined) hot._selfAccepted = true;
        /******/ else if (typeof dep === 'function') hot._selfAccepted = dep;
        /******/ else if (typeof dep === 'object')
          /******/ for (var i = 0; i < dep.length; i++)
            /******/ hot._acceptedDependencies[dep[i]] =
              callback || function() {};
        /******/ else
          hot._acceptedDependencies[dep] = callback || function() {};
        /******/
      },
      /******/ decline: function(dep) {
        /******/ if (dep === undefined) hot._selfDeclined = true;
        /******/ else if (typeof dep === 'object')
          /******/ for (var i = 0; i < dep.length; i++)
            /******/ hot._declinedDependencies[dep[i]] = true;
        /******/ else hot._declinedDependencies[dep] = true;
        /******/
      },
      /******/ dispose: function(callback) {
        /******/ hot._disposeHandlers.push(callback);
        /******/
      },
      /******/ addDisposeHandler: function(callback) {
        /******/ hot._disposeHandlers.push(callback);
        /******/
      },
      /******/ removeDisposeHandler: function(callback) {
        /******/ var idx = hot._disposeHandlers.indexOf(callback);
        /******/ if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
        /******/
      }, // Management API
      /******/
      /******/ /******/ check: hotCheck,
      /******/ apply: hotApply,
      /******/ status: function(l) {
        /******/ if (!l) return hotStatus;
        /******/ hotStatusHandlers.push(l);
        /******/
      },
      /******/ addStatusHandler: function(l) {
        /******/ hotStatusHandlers.push(l);
        /******/
      },
      /******/ removeStatusHandler: function(l) {
        /******/ var idx = hotStatusHandlers.indexOf(l);
        /******/ if (idx >= 0) hotStatusHandlers.splice(idx, 1);
        /******/
      }, //inherit from previous dispose call
      /******/
      /******/ /******/ data: hotCurrentModuleData[moduleId],
      /******/
    };
    /******/ hotCurrentChildModule = undefined;
    /******/ return hot;
    /******/
  }
  /******/
  /******/ var hotStatusHandlers = [];
  /******/ var hotStatus = 'idle';
  /******/
  /******/ function hotSetStatus(newStatus) {
    /******/ hotStatus = newStatus;
    /******/ for (var i = 0; i < hotStatusHandlers.length; i++)
      /******/ hotStatusHandlers[i].call(null, newStatus);
    /******/
  } // while downloading
  /******/
  /******/ /******/ var hotWaitingFiles = 0;
  /******/ var hotChunksLoading = 0;
  /******/ var hotWaitingFilesMap = {};
  /******/ var hotRequestedFilesMap = {};
  /******/ var hotAvailableFilesMap = {};
  /******/ var hotDeferred; // The update info
  /******/
  /******/ /******/ var hotUpdate, hotUpdateNewHash;
  /******/
  /******/ function toModuleId(id) {
    /******/ var isNumber = +id + '' === id;
    /******/ return isNumber ? +id : id;
    /******/
  }
  /******/
  /******/ function hotCheck(apply) {
    /******/ if (hotStatus !== 'idle') {
      /******/ throw new Error('check() is only allowed in idle status');
      /******/
    }
    /******/ hotApplyOnUpdate = apply;
    /******/ hotSetStatus('check');
    /******/ return hotDownloadManifest(hotRequestTimeout).then(function(
      update,
    ) {
      /******/ if (!update) {
        /******/ hotSetStatus('idle');
        /******/ return null;
        /******/
      }
      /******/ hotRequestedFilesMap = {};
      /******/ hotWaitingFilesMap = {};
      /******/ hotAvailableFilesMap = update.c;
      /******/ hotUpdateNewHash = update.h;
      /******/
      /******/ hotSetStatus('prepare');
      /******/ var promise = new Promise(function(resolve, reject) {
        /******/ hotDeferred = {
          /******/ resolve: resolve,
          /******/ reject: reject,
          /******/
        };
        /******/
      });
      /******/ hotUpdate = {};
      /******/ var chunkId = 'main'; // eslint-disable-next-line no-lone-blocks
      /******/ /******/ {
        /******/ /*globals chunkId */
        /******/ hotEnsureUpdateChunk(chunkId);
        /******/
      }
      /******/ if (
        /******/ hotStatus === 'prepare' &&
        /******/ hotChunksLoading === 0 &&
        /******/ hotWaitingFiles === 0
        /******/
      ) {
        /******/ hotUpdateDownloaded();
        /******/
      }
      /******/ return promise;
      /******/
    });
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotAddUpdateChunk(chunkId, moreModules) {
    /******/ if (
      !hotAvailableFilesMap[chunkId] ||
      !hotRequestedFilesMap[chunkId]
    )
      /******/ return;
    /******/ hotRequestedFilesMap[chunkId] = false;
    /******/ for (var moduleId in moreModules) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(moreModules, moduleId)
      ) {
        /******/ hotUpdate[moduleId] = moreModules[moduleId];
        /******/
      }
      /******/
    }
    /******/ if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
      /******/ hotUpdateDownloaded();
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotEnsureUpdateChunk(chunkId) {
    /******/ if (!hotAvailableFilesMap[chunkId]) {
      /******/ hotWaitingFilesMap[chunkId] = true;
      /******/
    } else {
      /******/ hotRequestedFilesMap[chunkId] = true;
      /******/ hotWaitingFiles++;
      /******/ hotDownloadUpdateChunk(chunkId);
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotUpdateDownloaded() {
    /******/ hotSetStatus('ready');
    /******/ var deferred = hotDeferred;
    /******/ hotDeferred = null;
    /******/ if (!deferred) return;
    /******/ if (hotApplyOnUpdate) {
      /******/ // Wrap deferred object in Promise to mark it as a well-handled Promise to
      /******/ // avoid triggering uncaught exception warning in Chrome.
      /******/ // See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
      /******/ Promise.resolve()
        /******/ .then(function() {
          /******/ return hotApply(hotApplyOnUpdate);
          /******/
        })
        /******/ .then(
          /******/ function(result) {
            /******/ deferred.resolve(result);
            /******/
          },
          /******/ function(err) {
            /******/ deferred.reject(err);
            /******/
          },
          /******/
        );
      /******/
    } else {
      /******/ var outdatedModules = [];
      /******/ for (var id in hotUpdate) {
        /******/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
          /******/ outdatedModules.push(toModuleId(id));
          /******/
        }
        /******/
      }
      /******/ deferred.resolve(outdatedModules);
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotApply(options) {
    /******/ if (hotStatus !== 'ready')
      /******/ throw new Error('apply() is only allowed in ready status');
    /******/ options = options || {};
    /******/
    /******/ var cb;
    /******/ var i;
    /******/ var j;
    /******/ var module;
    /******/ var moduleId;
    /******/
    /******/ function getAffectedStuff(updateModuleId) {
      /******/ var outdatedModules = [updateModuleId];
      /******/ var outdatedDependencies = {};
      /******/
      /******/ var queue = outdatedModules.slice().map(function(id) {
        /******/ return {
          /******/ chain: [id],
          /******/ id: id,
          /******/
        };
        /******/
      });
      /******/ while (queue.length > 0) {
        /******/ var queueItem = queue.pop();
        /******/ var moduleId = queueItem.id;
        /******/ var chain = queueItem.chain;
        /******/ module = installedModules[moduleId];
        /******/ if (!module || module.hot._selfAccepted) continue;
        /******/ if (module.hot._selfDeclined) {
          /******/ return {
            /******/ type: 'self-declined',
            /******/ chain: chain,
            /******/ moduleId: moduleId,
            /******/
          };
          /******/
        }
        /******/ if (module.hot._main) {
          /******/ return {
            /******/ type: 'unaccepted',
            /******/ chain: chain,
            /******/ moduleId: moduleId,
            /******/
          };
          /******/
        }
        /******/ for (var i = 0; i < module.parents.length; i++) {
          /******/ var parentId = module.parents[i];
          /******/ var parent = installedModules[parentId];
          /******/ if (!parent) continue;
          /******/ if (parent.hot._declinedDependencies[moduleId]) {
            /******/ return {
              /******/ type: 'declined',
              /******/ chain: chain.concat([parentId]),
              /******/ moduleId: moduleId,
              /******/ parentId: parentId,
              /******/
            };
            /******/
          }
          /******/ if (outdatedModules.indexOf(parentId) !== -1) continue;
          /******/ if (parent.hot._acceptedDependencies[moduleId]) {
            /******/ if (!outdatedDependencies[parentId])
              /******/ outdatedDependencies[parentId] = [];
            /******/ addAllToSet(outdatedDependencies[parentId], [moduleId]);
            /******/ continue;
            /******/
          }
          /******/ delete outdatedDependencies[parentId];
          /******/ outdatedModules.push(parentId);
          /******/ queue.push({
            /******/ chain: chain.concat([parentId]),
            /******/ id: parentId,
            /******/
          });
          /******/
        }
        /******/
      }
      /******/
      /******/ return {
        /******/ type: 'accepted',
        /******/ moduleId: updateModuleId,
        /******/ outdatedModules: outdatedModules,
        /******/ outdatedDependencies: outdatedDependencies,
        /******/
      };
      /******/
    }
    /******/
    /******/ function addAllToSet(a, b) {
      /******/ for (var i = 0; i < b.length; i++) {
        /******/ var item = b[i];
        /******/ if (a.indexOf(item) === -1) a.push(item);
        /******/
      }
      /******/
    } // at begin all updates modules are outdated // the "outdated" status can propagate to parents if they don't accept the children
    /******/
    /******/ /******/ /******/ var outdatedDependencies = {};
    /******/ var outdatedModules = [];
    /******/ var appliedUpdate = {};
    /******/
    /******/ var warnUnexpectedRequire = function warnUnexpectedRequire() {
      /******/ console.warn(
        /******/ '[HMR] unexpected require(' +
          result.moduleId +
          ') to disposed module',
        /******/
      );
      /******/
    };
    /******/
    /******/ for (var id in hotUpdate) {
      /******/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
        /******/ moduleId = toModuleId(id); /** @type {TODO} */
        /******/ /******/ var result;
        /******/ if (hotUpdate[id]) {
          /******/ result = getAffectedStuff(moduleId);
          /******/
        } else {
          /******/ result = {
            /******/ type: 'disposed',
            /******/ moduleId: id,
            /******/
          };
          /******/
        } /** @type {Error|false} */
        /******/ /******/ var abortError = false;
        /******/ var doApply = false;
        /******/ var doDispose = false;
        /******/ var chainInfo = '';
        /******/ if (result.chain) {
          /******/ chainInfo =
            '\nUpdate propagation: ' + result.chain.join(' -> ');
          /******/
        }
        /******/ switch (result.type) {
          /******/ case 'self-declined':
            /******/ if (options.onDeclined) options.onDeclined(result);
            /******/ if (!options.ignoreDeclined)
              /******/ abortError = new Error(
                /******/ 'Aborted because of self decline: ' +
                  /******/ result.moduleId +
                  /******/ chainInfo,
                /******/
              );
            /******/ break;
          /******/ case 'declined':
            /******/ if (options.onDeclined) options.onDeclined(result);
            /******/ if (!options.ignoreDeclined)
              /******/ abortError = new Error(
                /******/ 'Aborted because of declined dependency: ' +
                  /******/ result.moduleId +
                  /******/ ' in ' +
                  /******/ result.parentId +
                  /******/ chainInfo,
                /******/
              );
            /******/ break;
          /******/ case 'unaccepted':
            /******/ if (options.onUnaccepted) options.onUnaccepted(result);
            /******/ if (!options.ignoreUnaccepted)
              /******/ abortError = new Error(
                /******/ 'Aborted because ' +
                  moduleId +
                  ' is not accepted' +
                  chainInfo,
                /******/
              );
            /******/ break;
          /******/ case 'accepted':
            /******/ if (options.onAccepted) options.onAccepted(result);
            /******/ doApply = true;
            /******/ break;
          /******/ case 'disposed':
            /******/ if (options.onDisposed) options.onDisposed(result);
            /******/ doDispose = true;
            /******/ break;
          /******/ default:
            /******/ throw new Error('Unexception type ' + result.type);
          /******/
        }
        /******/ if (abortError) {
          /******/ hotSetStatus('abort');
          /******/ return Promise.reject(abortError);
          /******/
        }
        /******/ if (doApply) {
          /******/ appliedUpdate[moduleId] = hotUpdate[moduleId];
          /******/ addAllToSet(outdatedModules, result.outdatedModules);
          /******/ for (moduleId in result.outdatedDependencies) {
            /******/ if (
              /******/ Object.prototype.hasOwnProperty.call(
                /******/ result.outdatedDependencies,
                /******/ moduleId,
                /******/
              )
              /******/
            ) {
              /******/ if (!outdatedDependencies[moduleId])
                /******/ outdatedDependencies[moduleId] = [];
              /******/ addAllToSet(
                /******/ outdatedDependencies[moduleId],
                /******/ result.outdatedDependencies[moduleId],
                /******/
              );
              /******/
            }
            /******/
          }
          /******/
        }
        /******/ if (doDispose) {
          /******/ addAllToSet(outdatedModules, [result.moduleId]);
          /******/ appliedUpdate[moduleId] = warnUnexpectedRequire;
          /******/
        }
        /******/
      }
      /******/
    } // Store self accepted outdated modules to require them later by the module system
    /******/
    /******/ /******/ var outdatedSelfAcceptedModules = [];
    /******/ for (i = 0; i < outdatedModules.length; i++) {
      /******/ moduleId = outdatedModules[i];
      /******/ if (
        /******/ installedModules[moduleId] &&
        /******/ installedModules[moduleId].hot._selfAccepted
        /******/
      )
        /******/ outdatedSelfAcceptedModules.push({
          /******/ module: moduleId,
          /******/ errorHandler: installedModules[moduleId].hot._selfAccepted,
          /******/
        });
      /******/
    } // Now in "dispose" phase
    /******/
    /******/ /******/ hotSetStatus('dispose');
    /******/ Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
      /******/ if (hotAvailableFilesMap[chunkId] === false) {
        /******/ hotDisposeChunk(chunkId);
        /******/
      }
      /******/
    });
    /******/
    /******/ var idx;
    /******/ var queue = outdatedModules.slice();
    /******/ while (queue.length > 0) {
      /******/ moduleId = queue.pop();
      /******/ module = installedModules[moduleId];
      /******/ if (!module) continue;
      /******/
      /******/ var data = {}; // Call dispose handlers
      /******/
      /******/ /******/ var disposeHandlers = module.hot._disposeHandlers;
      /******/ for (j = 0; j < disposeHandlers.length; j++) {
        /******/ cb = disposeHandlers[j];
        /******/ cb(data);
        /******/
      }
      /******/ hotCurrentModuleData[moduleId] = data; // disable module (this disables requires from this module)
      /******/
      /******/ /******/ module.hot.active = false; // remove module from cache
      /******/
      /******/ /******/ delete installedModules[moduleId]; // when disposing there is no need to call dispose handler
      /******/
      /******/ /******/ delete outdatedDependencies[moduleId]; // remove "parents" references from all children
      /******/
      /******/ /******/ for (j = 0; j < module.children.length; j++) {
        /******/ var child = installedModules[module.children[j]];
        /******/ if (!child) continue;
        /******/ idx = child.parents.indexOf(moduleId);
        /******/ if (idx >= 0) {
          /******/ child.parents.splice(idx, 1);
          /******/
        }
        /******/
      }
      /******/
    } // remove outdated dependency from module children
    /******/
    /******/ /******/ var dependency;
    /******/ var moduleOutdatedDependencies;
    /******/ for (moduleId in outdatedDependencies) {
      /******/ if (
        /******/ Object.prototype.hasOwnProperty.call(
          outdatedDependencies,
          moduleId,
        )
        /******/
      ) {
        /******/ module = installedModules[moduleId];
        /******/ if (module) {
          /******/ moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /******/ for (j = 0; j < moduleOutdatedDependencies.length; j++) {
            /******/ dependency = moduleOutdatedDependencies[j];
            /******/ idx = module.children.indexOf(dependency);
            /******/ if (idx >= 0) module.children.splice(idx, 1);
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // Not in "apply" phase
    /******/
    /******/ /******/ hotSetStatus('apply');
    /******/
    /******/ hotCurrentHash = hotUpdateNewHash; // insert new code
    /******/
    /******/ /******/ for (moduleId in appliedUpdate) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)
      ) {
        /******/ modules[moduleId] = appliedUpdate[moduleId];
        /******/
      }
      /******/
    } // call accept handlers
    /******/
    /******/ /******/ var error = null;
    /******/ for (moduleId in outdatedDependencies) {
      /******/ if (
        /******/ Object.prototype.hasOwnProperty.call(
          outdatedDependencies,
          moduleId,
        )
        /******/
      ) {
        /******/ module = installedModules[moduleId];
        /******/ if (module) {
          /******/ moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /******/ var callbacks = [];
          /******/ for (i = 0; i < moduleOutdatedDependencies.length; i++) {
            /******/ dependency = moduleOutdatedDependencies[i];
            /******/ cb = module.hot._acceptedDependencies[dependency];
            /******/ if (cb) {
              /******/ if (callbacks.indexOf(cb) !== -1) continue;
              /******/ callbacks.push(cb);
              /******/
            }
            /******/
          }
          /******/ for (i = 0; i < callbacks.length; i++) {
            /******/ cb = callbacks[i];
            /******/ try {
              /******/ cb(moduleOutdatedDependencies);
              /******/
            } catch (err) {
              /******/ if (options.onErrored) {
                /******/ options.onErrored({
                  /******/ type: 'accept-errored',
                  /******/ moduleId: moduleId,
                  /******/ dependencyId: moduleOutdatedDependencies[i],
                  /******/ error: err,
                  /******/
                });
                /******/
              }
              /******/ if (!options.ignoreErrored) {
                /******/ if (!error) error = err;
                /******/
              }
              /******/
            }
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // Load self accepted modules
    /******/
    /******/ /******/ for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
      /******/ var item = outdatedSelfAcceptedModules[i];
      /******/ moduleId = item.module;
      /******/ hotCurrentParents = [moduleId];
      /******/ try {
        /******/ __webpack_require__(moduleId);
        /******/
      } catch (err) {
        /******/ if (typeof item.errorHandler === 'function') {
          /******/ try {
            /******/ item.errorHandler(err);
            /******/
          } catch (err2) {
            /******/ if (options.onErrored) {
              /******/ options.onErrored({
                /******/ type: 'self-accept-error-handler-errored',
                /******/ moduleId: moduleId,
                /******/ error: err2,
                /******/ originalError: err,
                /******/
              });
              /******/
            }
            /******/ if (!options.ignoreErrored) {
              /******/ if (!error) error = err2;
              /******/
            }
            /******/ if (!error) error = err;
            /******/
          }
          /******/
        } else {
          /******/ if (options.onErrored) {
            /******/ options.onErrored({
              /******/ type: 'self-accept-errored',
              /******/ moduleId: moduleId,
              /******/ error: err,
              /******/
            });
            /******/
          }
          /******/ if (!options.ignoreErrored) {
            /******/ if (!error) error = err;
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // handle errors in accept handlers and self accepted module load
    /******/
    /******/ /******/ if (error) {
      /******/ hotSetStatus('fail');
      /******/ return Promise.reject(error);
      /******/
    }
    /******/
    /******/ hotSetStatus('idle');
    /******/ return new Promise(function(resolve) {
      /******/ resolve(outdatedModules);
      /******/
    });
    /******/
  } // The module cache
  /******/
  /******/ /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/ hot: hotCreateModule(moduleId),
      /******/ parents: ((hotCurrentParentsTemp = hotCurrentParents),
      (hotCurrentParents = []),
      hotCurrentParentsTemp),
      /******/ children: [],
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      hotCreateRequire(moduleId),
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module',
      });
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode,
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value,
    });
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key];
          }.bind(null, key),
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default'];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ''; // __webpack_hash__
  /******/
  /******/ /******/ __webpack_require__.h = function() {
    return hotCurrentHash;
  }; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return hotCreateRequire(0)((__webpack_require__.s = 0));
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './LICENSE.md':
      /*!********************!*\
  !*** ./LICENSE.md ***!
  \********************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = "<p>The MIT License (MIT)\\nCopyright (c) &lt;2018&gt; &lt;Heeryong Kang&gt;</p>\\n<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>\\n<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>\\n<p>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>\\n";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9MSUNFTlNFLm1kP2VjZTciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThELFFBQVEsS0FBSyxpQkFBaUIscUpBQXFKLGNBQWMsK2NBQStjLFdBQVciLCJmaWxlIjoiLi9MSUNFTlNFLm1kLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjxwPlRoZSBNSVQgTGljZW5zZSAoTUlUKVxcbkNvcHlyaWdodCAoYykgJmx0OzIwMTgmZ3Q7ICZsdDtIZWVyeW9uZyBLYW5nJmd0OzwvcD5cXG48cD5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlICZxdW90O1NvZnR3YXJlJnF1b3Q7KSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6PC9wPlxcbjxwPlRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLjwvcD5cXG48cD5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgJnF1b3Q7QVMgSVMmcXVvdDssIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLjwvcD5cXG5cIjsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./LICENSE.md\n',
        );

        /***/
      },

    /***/ './node_modules/electron-webpack/out/electron-main-hmr/main-hmr.js':
      /*!*************************************************************************!*\
  !*** ./node_modules/electron-webpack/out/electron-main-hmr/main-hmr.js ***!
  \*************************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        eval(
          '\n\n__webpack_require__(/*! source-map-support/source-map-support.js */ "source-map-support/source-map-support.js").install();\n\nconst socketPath = process.env.ELECTRON_HMR_SOCKET_PATH;\n\nif (socketPath == null) {\n  throw new Error(`[HMR] Env ELECTRON_HMR_SOCKET_PATH is not set`);\n} // module, but not relative path must be used (because this file is used as entry)\n\n\nconst HmrClient = __webpack_require__(/*! electron-webpack/out/electron-main-hmr/HmrClient */ "electron-webpack/out/electron-main-hmr/HmrClient").HmrClient; // tslint:disable:no-unused-expression\n\n\nnew HmrClient(socketPath, module.hot, () => {\n  return __webpack_require__.h();\n}); \n//# sourceMappingURL=main-hmr.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZWxlY3Ryb24td2VicGFjay9vdXQvZWxlY3Ryb24tbWFpbi1obXIvbWFpbi1obXIuanM/MWJkYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixtQkFBTyxDQUFDLDBGQUEwQzs7QUFFbEQ7O0FBRUE7QUFDQTtBQUNBLENBQUM7OztBQUdELGtCQUFrQixtQkFBTyxDQUFDLDBHQUFrRCxZQUFZOzs7QUFHeEY7QUFDQSxTQUFTLHVCQUFnQjtBQUN6QixDQUFDLEU7QUFDRCIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9lbGVjdHJvbi13ZWJwYWNrL291dC9lbGVjdHJvbi1tYWluLWhtci9tYWluLWhtci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5yZXF1aXJlKFwic291cmNlLW1hcC1zdXBwb3J0L3NvdXJjZS1tYXAtc3VwcG9ydC5qc1wiKS5pbnN0YWxsKCk7XG5cbmNvbnN0IHNvY2tldFBhdGggPSBwcm9jZXNzLmVudi5FTEVDVFJPTl9ITVJfU09DS0VUX1BBVEg7XG5cbmlmIChzb2NrZXRQYXRoID09IG51bGwpIHtcbiAgdGhyb3cgbmV3IEVycm9yKGBbSE1SXSBFbnYgRUxFQ1RST05fSE1SX1NPQ0tFVF9QQVRIIGlzIG5vdCBzZXRgKTtcbn0gLy8gbW9kdWxlLCBidXQgbm90IHJlbGF0aXZlIHBhdGggbXVzdCBiZSB1c2VkIChiZWNhdXNlIHRoaXMgZmlsZSBpcyB1c2VkIGFzIGVudHJ5KVxuXG5cbmNvbnN0IEhtckNsaWVudCA9IHJlcXVpcmUoXCJlbGVjdHJvbi13ZWJwYWNrL291dC9lbGVjdHJvbi1tYWluLWhtci9IbXJDbGllbnRcIikuSG1yQ2xpZW50OyAvLyB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtZXhwcmVzc2lvblxuXG5cbm5ldyBIbXJDbGllbnQoc29ja2V0UGF0aCwgbW9kdWxlLmhvdCwgKCkgPT4ge1xuICByZXR1cm4gX193ZWJwYWNrX2hhc2hfXztcbn0pOyBcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4taG1yLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/electron-webpack/out/electron-main-hmr/main-hmr.js\n',
        );

        /***/
      },

    /***/ './package.json':
      /*!**********************!*\
  !*** ./package.json ***!
  \**********************/
      /*! exports provided: name, productName, version, description, homepage, repository, scripts, author, license, devDependencies, dependencies, default */
      /***/ function(module) {
        eval(
          'module.exports = {"name":"jamak","productName":"Jamak","version":"1.0.0-beta.1","description":"My Electron application description","homepage":"https://github.com/drakang4/jamak","repository":{"type":"git","url":"https://github.com/drakang4/jamak.git"},"scripts":{"dev":"electron-webpack dev","compile":"electron-webpack","build":"electron-builder build","lint":"tslint --project tsconfig.json --type-check --force","precommit":"pretty-quick --staged"},"author":"Heeryong Kang","license":"MIT","devDependencies":{"@babel/plugin-proposal-class-properties":"^7.0.0","@babel/plugin-proposal-object-rest-spread":"^7.0.0","@babel/preset-react":"^7.0.0","@babel/preset-typescript":"^7.0.0","@types/common-tags":"^1.4.0","@types/electron-devtools-installer":"^2.2.0","@types/electron-json-storage":"^4.0.0","@types/html-to-text":"^1.4.31","@types/parse-ms":"^1.0.0","@types/react":"^16.4.18","@types/react-dom":"^16.0.7","@types/react-dropzone":"^4.2.2","@types/react-helmet":"^5.0.7","@types/react-redux":"^6.0.9","@types/react-resize-detector":"^3.1.0","@types/react-router-dom":"^4.3.1","@types/react-side-effect":"^1.1.1","@types/react-textarea-autosize":"^4.3.3","@types/react-virtualized":"^9.18.7","@types/styled-components":"^4.0.1","@types/webpack-env":"^1.13.6","babel-plugin-styled-components":"^1.8.0","electron":"3.0.5","electron-builder":"^20.28.4","electron-devtools-installer":"^2.2.4","electron-webpack":"^2.3.1","electron-webpack-ts":"^2.1.1","husky":"^1.1.2","markdown-loader":"^4.0.0","prettier":"1.14.3","pretty-quick":"^1.8.0","tslint":"^5.11.0","tslint-config-prettier":"^1.15.0","tslint-react":"^3.6.0","typescript":"^3.0.3","typescript-styled-plugin":"^0.12.0","webpack":"^4.22.0"},"dependencies":{"common-tags":"^1.8.0","electron-debug":"^2.0.0","electron-json-storage":"^4.1.2","html-to-text":"^4.0.0","konva":"^2.4.2","normalize.css":"^8.0.0","parse-ms":"^2.0.0","react":"^16.5.1","react-dom":"^16.5.1","react-dropzone":"^6.2.4","react-helmet":"^5.2.0","react-hot-loader":"^4.3.7","react-konva":"^16.5.2","react-redux":"^5.0.1","react-resize-detector":"^3.1.2","react-router-dom":"^4.1.1","react-side-effect":"^1.1.5","react-textarea-autosize":"^7.0.4","react-virtualized":"^9.7.6","redux":"^4.0.1","redux-devtools-extension":"^2.13.5","source-map-support":"^0.5.9","styled-components":"^4.0.2","subtitle-utils":"^1.2.3","typesafe-actions":"^2.0.4"}};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3BhY2thZ2UuanNvbi5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./package.json\n',
        );

        /***/
      },

    /***/ './src/main/fileDialogs.ts':
      /*!*********************************!*\
  !*** ./src/main/fileDialogs.ts ***!
  \*********************************/
      /*! exports provided: openVideoDialog, openSubtitleDialog, saveAsSubtitleDialog */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"openVideoDialog\", function() { return openVideoDialog; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"openSubtitleDialog\", function() { return openSubtitleDialog; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveAsSubtitleDialog\", function() { return saveAsSubtitleDialog; });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _subtitleFileIO__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subtitleFileIO */ \"./src/main/subtitleFileIO.ts\");\n\n\nconst videoFilters = [\n    { name: 'Video Files', extensions: ['mp4'] },\n    { name: 'All Files', extensions: ['*'] },\n];\nconst subtitleFilters = [\n    { name: 'Subtitle Files', extensions: ['srt', 'vtt'] },\n    { name: 'All Files', extensions: ['*'] },\n];\nconst openVideoDialog = (webContents) => {\n    const paths = electron__WEBPACK_IMPORTED_MODULE_0__[\"dialog\"].showOpenDialog({\n        filters: videoFilters,\n        properties: ['openFile'],\n    });\n    if (!Array.isArray(paths) || paths.length === 0) {\n        return;\n    }\n    if (paths.length > 1) {\n        console.log('only support one file');\n    }\n    webContents.send('open-video', paths[0]);\n};\nconst openSubtitleDialog = async (webContents) => {\n    try {\n        const paths = electron__WEBPACK_IMPORTED_MODULE_0__[\"dialog\"].showOpenDialog({\n            filters: subtitleFilters,\n            properties: ['openFile'],\n        });\n        if (!Array.isArray(paths) || paths.length === 0) {\n            return;\n        }\n        if (paths.length > 1) {\n            console.log('only support one file');\n        }\n        const subtitles = await Object(_subtitleFileIO__WEBPACK_IMPORTED_MODULE_1__[\"readSubtitleFile\"])(paths[0]);\n        webContents.send('open-subtitle', paths[0], subtitles);\n    }\n    catch (error) {\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"dialog\"].showErrorBox('error', error);\n    }\n};\nconst saveAsSubtitleDialog = (webContents) => {\n    const path = electron__WEBPACK_IMPORTED_MODULE_0__[\"dialog\"].showSaveDialog({\n        filters: subtitleFilters,\n    });\n    if (!path) {\n        return;\n    }\n    webContents.send('save-subtitle', path);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9maWxlRGlhbG9ncy50cz9jYjhmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWtDO0FBQ2tCO0FBRXBELE1BQU0sWUFBWSxHQUEwQjtJQUMxQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDNUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0NBQ3pDLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBMEI7SUFDN0MsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQ3RELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtDQUN6QyxDQUFDO0FBRUssTUFBTSxlQUFlLEdBQUcsQ0FBQyxXQUFpQyxFQUFFLEVBQUU7SUFDbkUsTUFBTSxLQUFLLEdBQUcsK0NBQU0sQ0FBQyxjQUFjLENBQUM7UUFDbEMsT0FBTyxFQUFFLFlBQVk7UUFDckIsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDO0tBQ3pCLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQy9DLE9BQU87S0FDUjtJQUVELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBRUssTUFBTSxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsV0FBaUMsRUFBRSxFQUFFO0lBQzVFLElBQUk7UUFDRixNQUFNLEtBQUssR0FBRywrQ0FBTSxDQUFDLGNBQWMsQ0FBQztZQUNsQyxPQUFPLEVBQUUsZUFBZTtZQUN4QixVQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDekIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDL0MsT0FBTztTQUNSO1FBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDdEM7UUFFRCxNQUFNLFNBQVMsR0FBRyxNQUFNLHdFQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5ELFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUN4RDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsK0NBQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3JDO0FBQ0gsQ0FBQyxDQUFDO0FBRUssTUFBTSxvQkFBb0IsR0FBRyxDQUFDLFdBQWlDLEVBQUUsRUFBRTtJQUN4RSxNQUFNLElBQUksR0FBRywrQ0FBTSxDQUFDLGNBQWMsQ0FBQztRQUNqQyxPQUFPLEVBQUUsZUFBZTtLQUN6QixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsT0FBTztLQUNSO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDIiwiZmlsZSI6Ii4vc3JjL21haW4vZmlsZURpYWxvZ3MudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaWFsb2cgfSBmcm9tICdlbGVjdHJvbic7XHJcbmltcG9ydCB7IHJlYWRTdWJ0aXRsZUZpbGUgfSBmcm9tICcuL3N1YnRpdGxlRmlsZUlPJztcclxuXHJcbmNvbnN0IHZpZGVvRmlsdGVyczogRWxlY3Ryb24uRmlsZUZpbHRlcltdID0gW1xyXG4gIHsgbmFtZTogJ1ZpZGVvIEZpbGVzJywgZXh0ZW5zaW9uczogWydtcDQnXSB9LFxyXG4gIHsgbmFtZTogJ0FsbCBGaWxlcycsIGV4dGVuc2lvbnM6IFsnKiddIH0sXHJcbl07XHJcblxyXG5jb25zdCBzdWJ0aXRsZUZpbHRlcnM6IEVsZWN0cm9uLkZpbGVGaWx0ZXJbXSA9IFtcclxuICB7IG5hbWU6ICdTdWJ0aXRsZSBGaWxlcycsIGV4dGVuc2lvbnM6IFsnc3J0JywgJ3Z0dCddIH0sXHJcbiAgeyBuYW1lOiAnQWxsIEZpbGVzJywgZXh0ZW5zaW9uczogWycqJ10gfSxcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBvcGVuVmlkZW9EaWFsb2cgPSAod2ViQ29udGVudHM6IEVsZWN0cm9uLldlYkNvbnRlbnRzKSA9PiB7XHJcbiAgY29uc3QgcGF0aHMgPSBkaWFsb2cuc2hvd09wZW5EaWFsb2coe1xyXG4gICAgZmlsdGVyczogdmlkZW9GaWx0ZXJzLFxyXG4gICAgcHJvcGVydGllczogWydvcGVuRmlsZSddLFxyXG4gIH0pO1xyXG5cclxuICBpZiAoIUFycmF5LmlzQXJyYXkocGF0aHMpIHx8IHBhdGhzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKHBhdGhzLmxlbmd0aCA+IDEpIHtcclxuICAgIGNvbnNvbGUubG9nKCdvbmx5IHN1cHBvcnQgb25lIGZpbGUnKTtcclxuICB9XHJcblxyXG4gIHdlYkNvbnRlbnRzLnNlbmQoJ29wZW4tdmlkZW8nLCBwYXRoc1swXSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgb3BlblN1YnRpdGxlRGlhbG9nID0gYXN5bmMgKHdlYkNvbnRlbnRzOiBFbGVjdHJvbi5XZWJDb250ZW50cykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBwYXRocyA9IGRpYWxvZy5zaG93T3BlbkRpYWxvZyh7XHJcbiAgICAgIGZpbHRlcnM6IHN1YnRpdGxlRmlsdGVycyxcclxuICAgICAgcHJvcGVydGllczogWydvcGVuRmlsZSddLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhdGhzKSB8fCBwYXRocy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXRocy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdvbmx5IHN1cHBvcnQgb25lIGZpbGUnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdWJ0aXRsZXMgPSBhd2FpdCByZWFkU3VidGl0bGVGaWxlKHBhdGhzWzBdKTtcclxuXHJcbiAgICB3ZWJDb250ZW50cy5zZW5kKCdvcGVuLXN1YnRpdGxlJywgcGF0aHNbMF0sIHN1YnRpdGxlcyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGRpYWxvZy5zaG93RXJyb3JCb3goJ2Vycm9yJywgZXJyb3IpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzYXZlQXNTdWJ0aXRsZURpYWxvZyA9ICh3ZWJDb250ZW50czogRWxlY3Ryb24uV2ViQ29udGVudHMpID0+IHtcclxuICBjb25zdCBwYXRoID0gZGlhbG9nLnNob3dTYXZlRGlhbG9nKHtcclxuICAgIGZpbHRlcnM6IHN1YnRpdGxlRmlsdGVycyxcclxuICB9KTtcclxuXHJcbiAgaWYgKCFwYXRoKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB3ZWJDb250ZW50cy5zZW5kKCdzYXZlLXN1YnRpdGxlJywgcGF0aCk7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main/fileDialogs.ts\n",
        );

        /***/
      },

    /***/ './src/main/index.ts':
      /*!***************************!*\
  !*** ./src/main/index.ts ***!
  \***************************/
      /*! no exports provided */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var electron_devtools_installer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron-devtools-installer */ "electron-devtools-installer");\n/* harmony import */ var electron_devtools_installer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron_devtools_installer__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu */ "./src/main/menu.ts");\n/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listeners */ "./src/main/listeners.ts");\n\n\n\n\n// Keep a global reference of the window object, if you don\'t, the window will\n// be closed automatically when the JavaScript object is garbage collected.\nlet mainWindow;\nconst isDevMode = "development" === \'development\';\nconst createWindow = async () => {\n    // Create the browser window.\n    mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"]({\n        height: 800,\n        width: 1200,\n        title: \'Jamak\',\n        backgroundColor: \'#212529\',\n        webPreferences: {\n            webSecurity: false,\n            experimentalCanvasFeatures: true,\n        },\n    });\n    // and load the index.html of the app.\n    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);\n    // Open the DevTools.\n    if (isDevMode) {\n        try {\n            // BrowserWindow.addDevToolsExtension(\n            //   \'C:/Users/draka/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.3.2_0\',\n            // );\n            await electron_devtools_installer__WEBPACK_IMPORTED_MODULE_1___default()(electron_devtools_installer__WEBPACK_IMPORTED_MODULE_1__["REACT_DEVELOPER_TOOLS"]);\n            await electron_devtools_installer__WEBPACK_IMPORTED_MODULE_1___default()(electron_devtools_installer__WEBPACK_IMPORTED_MODULE_1__["REDUX_DEVTOOLS"]);\n            mainWindow.webContents.openDevTools();\n        }\n        catch (error) {\n            console.error(error);\n        }\n    }\n    await Object(_menu__WEBPACK_IMPORTED_MODULE_2__["createMenu"])();\n    Object(_listeners__WEBPACK_IMPORTED_MODULE_3__["createMessageListeners"])(mainWindow.webContents);\n    // Emitted when the window is closed.\n    mainWindow.on(\'closed\', () => {\n        // Dereference the window object, usually you would store windows\n        // in an array if your app supports multi windows, this is the time\n        // when you should delete the corresponding element.\n        mainWindow = null;\n    });\n};\n// This method will be called when Electron has finished\n// initialization and is ready to create browser windows.\nelectron__WEBPACK_IMPORTED_MODULE_0__["app"].on(\'ready\', async () => {\n    createWindow();\n});\n// Quit when all windows are closed.\nelectron__WEBPACK_IMPORTED_MODULE_0__["app"].on(\'window-all-closed\', () => {\n    // On OS X it is common for applications and their menu bar\n    // to stay active until the user quits explicitly with Cmd + Q\n    if (process.platform !== \'darwin\') {\n        electron__WEBPACK_IMPORTED_MODULE_0__["app"].quit();\n    }\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__["app"].on(\'activate\', () => {\n    // On OS X it\'s common to re-create a window in the app when the\n    // dock icon is clicked and there are no other windows open.\n    if (mainWindow === null) {\n        createWindow();\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9pbmRleC50cz8wNWI2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThDO0FBS1Q7QUFFRDtBQUNpQjtBQUVyRCw4RUFBOEU7QUFDOUUsMkVBQTJFO0FBQzNFLElBQUksVUFBeUMsQ0FBQztBQUU5QyxNQUFNLFNBQVMsR0FBRyxhQUFvQixLQUFLLGFBQWEsQ0FBQztBQUV6RCxNQUFNLFlBQVksR0FBRyxLQUFLLElBQUksRUFBRTtJQUM5Qiw2QkFBNkI7SUFDN0IsVUFBVSxHQUFHLElBQUksc0RBQWEsQ0FBQztRQUM3QixNQUFNLEVBQUUsR0FBRztRQUNYLEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLE9BQU87UUFDZCxlQUFlLEVBQUUsU0FBUztRQUMxQixjQUFjLEVBQUU7WUFDZCxXQUFXLEVBQUUsS0FBSztZQUNsQiwwQkFBMEIsRUFBRSxJQUFJO1NBQ2pDO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsc0NBQXNDO0lBQ3RDLFVBQVUsQ0FBQyxPQUFPLENBQ2hCLG9CQUFvQixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLENBQzVELENBQUM7SUFFRixxQkFBcUI7SUFDckIsSUFBSSxTQUFTLEVBQUU7UUFDYixJQUFJO1lBQ0Ysc0NBQXNDO1lBQ3RDLHdIQUF3SDtZQUN4SCxLQUFLO1lBQ0wsTUFBTSxrRUFBZ0IsQ0FBQyxpRkFBcUIsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sa0VBQWdCLENBQUMsMEVBQWMsQ0FBQyxDQUFDO1lBQ3ZDLFVBQVUsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7S0FDRjtJQUVELE1BQU0sd0RBQVUsRUFBRSxDQUFDO0lBRW5CLHlFQUFzQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUUvQyxxQ0FBcUM7SUFDckMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1FBQzNCLGlFQUFpRTtRQUNqRSxtRUFBbUU7UUFDbkUsb0RBQW9EO1FBQ3BELFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRix3REFBd0Q7QUFDeEQseURBQXlEO0FBQ3pELDRDQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtJQUN6QixZQUFZLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQztBQUVILG9DQUFvQztBQUNwQyw0Q0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7SUFDL0IsMkRBQTJEO0lBQzNELDhEQUE4RDtJQUM5RCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ2pDLDRDQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDWjtBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsNENBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtJQUN0QixnRUFBZ0U7SUFDaEUsNERBQTREO0lBQzVELElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtRQUN2QixZQUFZLEVBQUUsQ0FBQztLQUNoQjtBQUNILENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Ii4vc3JjL21haW4vaW5kZXgudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHAsIEJyb3dzZXJXaW5kb3cgfSBmcm9tICdlbGVjdHJvbic7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyBpbnN0YWxsRXh0ZW5zaW9uLFxyXG4gIFJFQUNUX0RFVkVMT1BFUl9UT09MUyxcclxuICBSRURVWF9ERVZUT09MUyxcclxufSBmcm9tICdlbGVjdHJvbi1kZXZ0b29scy1pbnN0YWxsZXInO1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlTWVudSB9IGZyb20gJy4vbWVudSc7XHJcbmltcG9ydCB7IGNyZWF0ZU1lc3NhZ2VMaXN0ZW5lcnMgfSBmcm9tICcuL2xpc3RlbmVycyc7XHJcblxyXG4vLyBLZWVwIGEgZ2xvYmFsIHJlZmVyZW5jZSBvZiB0aGUgd2luZG93IG9iamVjdCwgaWYgeW91IGRvbid0LCB0aGUgd2luZG93IHdpbGxcclxuLy8gYmUgY2xvc2VkIGF1dG9tYXRpY2FsbHkgd2hlbiB0aGUgSmF2YVNjcmlwdCBvYmplY3QgaXMgZ2FyYmFnZSBjb2xsZWN0ZWQuXHJcbmxldCBtYWluV2luZG93OiBFbGVjdHJvbi5Ccm93c2VyV2luZG93IHwgbnVsbDtcclxuXHJcbmNvbnN0IGlzRGV2TW9kZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xyXG5cclxuY29uc3QgY3JlYXRlV2luZG93ID0gYXN5bmMgKCkgPT4ge1xyXG4gIC8vIENyZWF0ZSB0aGUgYnJvd3NlciB3aW5kb3cuXHJcbiAgbWFpbldpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KHtcclxuICAgIGhlaWdodDogODAwLFxyXG4gICAgd2lkdGg6IDEyMDAsXHJcbiAgICB0aXRsZTogJ0phbWFrJyxcclxuICAgIGJhY2tncm91bmRDb2xvcjogJyMyMTI1MjknLFxyXG4gICAgd2ViUHJlZmVyZW5jZXM6IHtcclxuICAgICAgd2ViU2VjdXJpdHk6IGZhbHNlLFxyXG4gICAgICBleHBlcmltZW50YWxDYW52YXNGZWF0dXJlczogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIC8vIGFuZCBsb2FkIHRoZSBpbmRleC5odG1sIG9mIHRoZSBhcHAuXHJcbiAgbWFpbldpbmRvdy5sb2FkVVJMKFxyXG4gICAgYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwcm9jZXNzLmVudi5FTEVDVFJPTl9XRUJQQUNLX1dEU19QT1JUfWAsXHJcbiAgKTtcclxuXHJcbiAgLy8gT3BlbiB0aGUgRGV2VG9vbHMuXHJcbiAgaWYgKGlzRGV2TW9kZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gQnJvd3NlcldpbmRvdy5hZGREZXZUb29sc0V4dGVuc2lvbihcclxuICAgICAgLy8gICAnQzovVXNlcnMvZHJha2EvQXBwRGF0YS9Mb2NhbC9Hb29nbGUvQ2hyb21lL1VzZXIgRGF0YS9EZWZhdWx0L0V4dGVuc2lvbnMvZm1rYWRtYXBnb2ZhZG9wbGpiamZrYXBka29pZW5paGkvMy4zLjJfMCcsXHJcbiAgICAgIC8vICk7XHJcbiAgICAgIGF3YWl0IGluc3RhbGxFeHRlbnNpb24oUkVBQ1RfREVWRUxPUEVSX1RPT0xTKTtcclxuICAgICAgYXdhaXQgaW5zdGFsbEV4dGVuc2lvbihSRURVWF9ERVZUT09MUyk7XHJcbiAgICAgIG1haW5XaW5kb3cud2ViQ29udGVudHMub3BlbkRldlRvb2xzKCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGF3YWl0IGNyZWF0ZU1lbnUoKTtcclxuXHJcbiAgY3JlYXRlTWVzc2FnZUxpc3RlbmVycyhtYWluV2luZG93LndlYkNvbnRlbnRzKTtcclxuXHJcbiAgLy8gRW1pdHRlZCB3aGVuIHRoZSB3aW5kb3cgaXMgY2xvc2VkLlxyXG4gIG1haW5XaW5kb3cub24oJ2Nsb3NlZCcsICgpID0+IHtcclxuICAgIC8vIERlcmVmZXJlbmNlIHRoZSB3aW5kb3cgb2JqZWN0LCB1c3VhbGx5IHlvdSB3b3VsZCBzdG9yZSB3aW5kb3dzXHJcbiAgICAvLyBpbiBhbiBhcnJheSBpZiB5b3VyIGFwcCBzdXBwb3J0cyBtdWx0aSB3aW5kb3dzLCB0aGlzIGlzIHRoZSB0aW1lXHJcbiAgICAvLyB3aGVuIHlvdSBzaG91bGQgZGVsZXRlIHRoZSBjb3JyZXNwb25kaW5nIGVsZW1lbnQuXHJcbiAgICBtYWluV2luZG93ID0gbnVsbDtcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIHdoZW4gRWxlY3Ryb24gaGFzIGZpbmlzaGVkXHJcbi8vIGluaXRpYWxpemF0aW9uIGFuZCBpcyByZWFkeSB0byBjcmVhdGUgYnJvd3NlciB3aW5kb3dzLlxyXG5hcHAub24oJ3JlYWR5JywgYXN5bmMgKCkgPT4ge1xyXG4gIGNyZWF0ZVdpbmRvdygpO1xyXG59KTtcclxuXHJcbi8vIFF1aXQgd2hlbiBhbGwgd2luZG93cyBhcmUgY2xvc2VkLlxyXG5hcHAub24oJ3dpbmRvdy1hbGwtY2xvc2VkJywgKCkgPT4ge1xyXG4gIC8vIE9uIE9TIFggaXQgaXMgY29tbW9uIGZvciBhcHBsaWNhdGlvbnMgYW5kIHRoZWlyIG1lbnUgYmFyXHJcbiAgLy8gdG8gc3RheSBhY3RpdmUgdW50aWwgdGhlIHVzZXIgcXVpdHMgZXhwbGljaXRseSB3aXRoIENtZCArIFFcclxuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gJ2RhcndpbicpIHtcclxuICAgIGFwcC5xdWl0KCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmFwcC5vbignYWN0aXZhdGUnLCAoKSA9PiB7XHJcbiAgLy8gT24gT1MgWCBpdCdzIGNvbW1vbiB0byByZS1jcmVhdGUgYSB3aW5kb3cgaW4gdGhlIGFwcCB3aGVuIHRoZVxyXG4gIC8vIGRvY2sgaWNvbiBpcyBjbGlja2VkIGFuZCB0aGVyZSBhcmUgbm8gb3RoZXIgd2luZG93cyBvcGVuLlxyXG4gIGlmIChtYWluV2luZG93ID09PSBudWxsKSB7XHJcbiAgICBjcmVhdGVXaW5kb3coKTtcclxuICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/index.ts\n',
        );

        /***/
      },

    /***/ './src/main/listeners.ts':
      /*!*******************************!*\
  !*** ./src/main/listeners.ts ***!
  \*******************************/
      /*! exports provided: createMessageListeners */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMessageListeners", function() { return createMessageListeners; });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _fileDialogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fileDialogs */ "./src/main/fileDialogs.ts");\n/* harmony import */ var _subtitleFileIO__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subtitleFileIO */ "./src/main/subtitleFileIO.ts");\n\n\n\nfunction createMessageListeners(webContents) {\n    electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on(\'request-open-video\', (event, filepath) => {\n        webContents.send(\'open-video\', filepath);\n    });\n    electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on(\'request-open-subtitle\', async (event, filepath) => {\n        const subtitles = await Object(_subtitleFileIO__WEBPACK_IMPORTED_MODULE_2__["readSubtitleFile"])(filepath);\n        webContents.send(\'open-subtitle\', filepath, subtitles);\n    });\n    electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on(\'request-open-video-dialog\', () => {\n        Object(_fileDialogs__WEBPACK_IMPORTED_MODULE_1__["openVideoDialog"])(webContents);\n    });\n    electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on(\'request-open-subtitle-dialog\', () => {\n        Object(_fileDialogs__WEBPACK_IMPORTED_MODULE_1__["openSubtitleDialog"])(webContents);\n    });\n    electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on(\'request-save-as-subtitle-dialog\', () => {\n        Object(_fileDialogs__WEBPACK_IMPORTED_MODULE_1__["saveAsSubtitleDialog"])(webContents);\n    });\n    electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on(\'request-save-subtitle\', async (event, filepath, data) => {\n        await Object(_subtitleFileIO__WEBPACK_IMPORTED_MODULE_2__["writeSubtitleFile"])(filepath, data);\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9saXN0ZW5lcnMudHM/ZWI1NCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUM7QUFLWjtBQUNnRDtBQUVoRSxTQUFTLHNCQUFzQixDQUFDLFdBQWlDO0lBQ3RFLGdEQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUMsS0FBWSxFQUFFLFFBQWdCLEVBQUUsRUFBRTtRQUNsRSxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztJQUVILGdEQUFPLENBQUMsRUFBRSxDQUNSLHVCQUF1QixFQUN2QixLQUFLLEVBQUUsS0FBWSxFQUFFLFFBQWdCLEVBQUUsRUFBRTtRQUN2QyxNQUFNLFNBQVMsR0FBRyxNQUFNLHdFQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5ELFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQ0YsQ0FBQztJQUVGLGdEQUFPLENBQUMsRUFBRSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtRQUMzQyxvRUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBRUgsZ0RBQU8sQ0FBQyxFQUFFLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFO1FBQzlDLHVFQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBRUgsZ0RBQU8sQ0FBQyxFQUFFLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1FBQ2pELHlFQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBRUgsZ0RBQU8sQ0FBQyxFQUFFLENBQ1IsdUJBQXVCLEVBQ3ZCLEtBQUssRUFBRSxLQUFZLEVBQUUsUUFBZ0IsRUFBRSxJQUFTLEVBQUUsRUFBRTtRQUNsRCxNQUFNLHlFQUFpQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQ0YsQ0FBQztBQUNKLENBQUMiLCJmaWxlIjoiLi9zcmMvbWFpbi9saXN0ZW5lcnMudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpcGNNYWluIH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5pbXBvcnQge1xyXG4gIG9wZW5WaWRlb0RpYWxvZyxcclxuICBvcGVuU3VidGl0bGVEaWFsb2csXHJcbiAgc2F2ZUFzU3VidGl0bGVEaWFsb2csXHJcbn0gZnJvbSAnLi9maWxlRGlhbG9ncyc7XHJcbmltcG9ydCB7IHdyaXRlU3VidGl0bGVGaWxlLCByZWFkU3VidGl0bGVGaWxlIH0gZnJvbSAnLi9zdWJ0aXRsZUZpbGVJTyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUxpc3RlbmVycyh3ZWJDb250ZW50czogRWxlY3Ryb24uV2ViQ29udGVudHMpIHtcclxuICBpcGNNYWluLm9uKCdyZXF1ZXN0LW9wZW4tdmlkZW8nLCAoZXZlbnQ6IEV2ZW50LCBmaWxlcGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgICB3ZWJDb250ZW50cy5zZW5kKCdvcGVuLXZpZGVvJywgZmlsZXBhdGgpO1xyXG4gIH0pO1xyXG5cclxuICBpcGNNYWluLm9uKFxyXG4gICAgJ3JlcXVlc3Qtb3Blbi1zdWJ0aXRsZScsXHJcbiAgICBhc3luYyAoZXZlbnQ6IEV2ZW50LCBmaWxlcGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IHN1YnRpdGxlcyA9IGF3YWl0IHJlYWRTdWJ0aXRsZUZpbGUoZmlsZXBhdGgpO1xyXG5cclxuICAgICAgd2ViQ29udGVudHMuc2VuZCgnb3Blbi1zdWJ0aXRsZScsIGZpbGVwYXRoLCBzdWJ0aXRsZXMpO1xyXG4gICAgfSxcclxuICApO1xyXG5cclxuICBpcGNNYWluLm9uKCdyZXF1ZXN0LW9wZW4tdmlkZW8tZGlhbG9nJywgKCkgPT4ge1xyXG4gICAgb3BlblZpZGVvRGlhbG9nKHdlYkNvbnRlbnRzKTtcclxuICB9KTtcclxuXHJcbiAgaXBjTWFpbi5vbigncmVxdWVzdC1vcGVuLXN1YnRpdGxlLWRpYWxvZycsICgpID0+IHtcclxuICAgIG9wZW5TdWJ0aXRsZURpYWxvZyh3ZWJDb250ZW50cyk7XHJcbiAgfSk7XHJcblxyXG4gIGlwY01haW4ub24oJ3JlcXVlc3Qtc2F2ZS1hcy1zdWJ0aXRsZS1kaWFsb2cnLCAoKSA9PiB7XHJcbiAgICBzYXZlQXNTdWJ0aXRsZURpYWxvZyh3ZWJDb250ZW50cyk7XHJcbiAgfSk7XHJcblxyXG4gIGlwY01haW4ub24oXHJcbiAgICAncmVxdWVzdC1zYXZlLXN1YnRpdGxlJyxcclxuICAgIGFzeW5jIChldmVudDogRXZlbnQsIGZpbGVwYXRoOiBzdHJpbmcsIGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICBhd2FpdCB3cml0ZVN1YnRpdGxlRmlsZShmaWxlcGF0aCwgZGF0YSk7XHJcbiAgICB9LFxyXG4gICk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/listeners.ts\n',
        );

        /***/
      },

    /***/ './src/main/menu.ts':
      /*!**************************!*\
  !*** ./src/main/menu.ts ***!
  \**************************/
      /*! exports provided: createMenu */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createMenu\", function() { return createMenu; });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _fileDialogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fileDialogs */ \"./src/main/fileDialogs.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/main/utils.ts\");\n\n\n\nconst template = [\n    {\n        label: 'File',\n        submenu: [\n            {\n                label: 'New Subtitle File',\n                accelerator: 'CmdOrCtrl+N',\n                click: Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"ipcSender\"])('new-subtitle'),\n            },\n            { type: 'separator' },\n            {\n                label: 'Open Subtitle File',\n                accelerator: 'CmdOrCtrl+O',\n                click: (menuItem, browserWindow) => Object(_fileDialogs__WEBPACK_IMPORTED_MODULE_1__[\"openSubtitleDialog\"])(browserWindow.webContents),\n            },\n            {\n                label: 'Open Video',\n                accelerator: 'CmdOrCtrl+Shift+O',\n                click: (menuItem, browserWindow) => Object(_fileDialogs__WEBPACK_IMPORTED_MODULE_1__[\"openVideoDialog\"])(browserWindow.webContents),\n            },\n            { type: 'separator' },\n            {\n                label: 'Open Recent',\n                submenu: [{}],\n            },\n            { type: 'separator' },\n            {\n                label: 'Save',\n                accelerator: 'CmdOrCtrl+S',\n                click: Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"ipcSender\"])('save-or-save-as'),\n            },\n            {\n                label: 'Save As',\n                accelerator: 'CmdOrCtrl+Shift+S',\n                click: (menuItem, browerWindow) => Object(_fileDialogs__WEBPACK_IMPORTED_MODULE_1__[\"saveAsSubtitleDialog\"])(browerWindow.webContents),\n            },\n            { type: 'separator' },\n            { label: 'Settings' },\n            { type: 'separator' },\n            { label: 'Quit', role: 'quit' },\n        ],\n    },\n    {\n        label: 'Edit',\n        submenu: [\n            { label: 'Undo', role: 'undo' },\n            { label: 'Redo', role: 'redo' },\n            { type: 'separator' },\n            { label: 'Cut', role: 'cut' },\n            { label: 'Copy', role: 'copy' },\n            { label: 'Paste', role: 'paste' },\n        ],\n    },\n    {\n        label: 'Player',\n        submenu: [\n            {\n                label: 'Play / Pause',\n                accelerator: 'CmdOrCtrl+Space',\n                click: Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"ipcSender\"])('play-or-pause'),\n            },\n            {\n                label: 'Mute / Unmute',\n                accelerator: 'CmdOrCtrl+Shift+M',\n                click: Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"ipcSender\"])('mute-or-unmute'),\n            },\n            {\n                label: 'Volume Up',\n                accelerator: 'CmdOrCtrl+]',\n                click: Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"ipcSender\"])('volume-up'),\n            },\n            {\n                label: 'Volume Down',\n                accelerator: 'CmdOrCtrl+[',\n                click: Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"ipcSender\"])('volume-down'),\n            },\n            {\n                label: 'Play Speed Up',\n                accelerator: 'CmdOrCtrl+Shift+.',\n                click: Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"ipcSender\"])('speed-up'),\n            },\n            {\n                label: 'Play Speed Down',\n                accelerator: 'CmdOrCtrl+Shift+,',\n                click: Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"ipcSender\"])('speed-down'),\n            },\n        ],\n    },\n    {\n        label: 'View',\n        submenu: [\n            { label: 'Reload', role: 'reload' },\n            { label: 'Force Reload', role: 'forceReload' },\n            { type: 'separator' },\n            { label: 'Actual Size', role: 'resetZoom' },\n            { label: 'Zoom In', role: 'zoomIn' },\n            { label: 'Zoom Out', role: 'zoomOut' },\n            { type: 'separator' },\n            { label: 'Toggle Full Screen', role: 'toggleFullScreen' },\n        ],\n    },\n    {\n        label: 'Window',\n        submenu: [\n            { label: 'Minimize', role: 'minimize' },\n            { label: 'Close', role: 'close' },\n        ],\n    },\n    {\n        label: 'Help',\n        submenu: [\n            {\n                label: 'Info',\n                click: (menuItem, browserWindow) => {\n                    electron__WEBPACK_IMPORTED_MODULE_0__[\"dialog\"].showMessageBox(browserWindow, {\n                        title: 'Info',\n                        message: Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"getVersion\"])(),\n                        type: 'info',\n                    });\n                },\n            },\n            {\n                label: 'Official Website',\n                click: () => {\n                    Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"openWebsite\"])();\n                },\n            },\n            {\n                label: 'License',\n                click: (menuItem, browserWindow) => {\n                    electron__WEBPACK_IMPORTED_MODULE_0__[\"dialog\"].showMessageBox(browserWindow, {\n                        title: 'LICENSE',\n                        message: Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"getLicense\"])(),\n                        type: 'info',\n                    });\n                },\n            },\n            {\n                label: 'Toggle Developer Tools',\n                role: 'toggleDevTools',\n                enabled: \"development\" === 'development',\n                visible: \"development\" === 'development',\n            },\n        ],\n    },\n];\nasync function createMenu() {\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"].setApplicationMenu(electron__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"].buildFromTemplate(template));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9tZW51LnRzPzg0MjgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdDO0FBS2pCO0FBQ2tEO0FBRXpFLE1BQU0sUUFBUSxHQUEwQztJQUN0RDtRQUNFLEtBQUssRUFBRSxNQUFNO1FBQ2IsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsV0FBVyxFQUFFLGFBQWE7Z0JBQzFCLEtBQUssRUFBRSx3REFBUyxDQUFDLGNBQWMsQ0FBQzthQUNqQztZQUNELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUNyQjtnQkFDRSxLQUFLLEVBQUUsb0JBQW9CO2dCQUMzQixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxFQUFFLENBQ2pDLHVFQUFrQixDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7YUFDaEQ7WUFDRDtnQkFDRSxLQUFLLEVBQUUsWUFBWTtnQkFDbkIsV0FBVyxFQUFFLG1CQUFtQjtnQkFDaEMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxFQUFFLENBQ2pDLG9FQUFlLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzthQUM3QztZQUNELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUNyQjtnQkFDRSxLQUFLLEVBQUUsYUFBYTtnQkFDcEIsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2Q7WUFDRCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDckI7Z0JBQ0UsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsV0FBVyxFQUFFLGFBQWE7Z0JBQzFCLEtBQUssRUFBRSx3REFBUyxDQUFDLGlCQUFpQixDQUFDO2FBQ3BDO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFdBQVcsRUFBRSxtQkFBbUI7Z0JBQ2hDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUNoQyx5RUFBb0IsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO2FBQ2pEO1lBQ0QsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ3JCLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtZQUNyQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDckIsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7U0FDaEM7S0FDRjtJQUNEO1FBQ0UsS0FBSyxFQUFFLE1BQU07UUFDYixPQUFPLEVBQUU7WUFDUCxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtZQUMvQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtZQUMvQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDckIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDN0IsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDL0IsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7U0FDbEM7S0FDRjtJQUNEO1FBQ0UsS0FBSyxFQUFFLFFBQVE7UUFDZixPQUFPLEVBQUU7WUFDUDtnQkFDRSxLQUFLLEVBQUUsY0FBYztnQkFDckIsV0FBVyxFQUFFLGlCQUFpQjtnQkFDOUIsS0FBSyxFQUFFLHdEQUFTLENBQUMsZUFBZSxDQUFDO2FBQ2xDO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLFdBQVcsRUFBRSxtQkFBbUI7Z0JBQ2hDLEtBQUssRUFBRSx3REFBUyxDQUFDLGdCQUFnQixDQUFDO2FBQ25DO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixLQUFLLEVBQUUsd0RBQVMsQ0FBQyxXQUFXLENBQUM7YUFDOUI7WUFDRDtnQkFDRSxLQUFLLEVBQUUsYUFBYTtnQkFDcEIsV0FBVyxFQUFFLGFBQWE7Z0JBQzFCLEtBQUssRUFBRSx3REFBUyxDQUFDLGFBQWEsQ0FBQzthQUNoQztZQUNEO2dCQUNFLEtBQUssRUFBRSxlQUFlO2dCQUN0QixXQUFXLEVBQUUsbUJBQW1CO2dCQUNoQyxLQUFLLEVBQUUsd0RBQVMsQ0FBQyxVQUFVLENBQUM7YUFDN0I7WUFDRDtnQkFDRSxLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixXQUFXLEVBQUUsbUJBQW1CO2dCQUNoQyxLQUFLLEVBQUUsd0RBQVMsQ0FBQyxZQUFZLENBQUM7YUFDL0I7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsTUFBTTtRQUNiLE9BQU8sRUFBRTtZQUNQLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ25DLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQzlDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUNyQixFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUMzQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNwQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUN0QyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDckIsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1NBQzFEO0tBQ0Y7SUFDRDtRQUNFLEtBQUssRUFBRSxRQUFRO1FBQ2YsT0FBTyxFQUFFO1lBQ1AsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDdkMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7U0FDbEM7S0FDRjtJQUNEO1FBQ0UsS0FBSyxFQUFFLE1BQU07UUFDYixPQUFPLEVBQUU7WUFDUDtnQkFDRSxLQUFLLEVBQUUsTUFBTTtnQkFDYixLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLEVBQUU7b0JBQ2pDLCtDQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRTt3QkFDbkMsS0FBSyxFQUFFLE1BQU07d0JBQ2IsT0FBTyxFQUFFLHlEQUFVLEVBQUU7d0JBQ3JCLElBQUksRUFBRSxNQUFNO3FCQUNiLENBQUMsQ0FBQztnQkFDTCxDQUFDO2FBQ0Y7WUFDRDtnQkFDRSxLQUFLLEVBQUUsa0JBQWtCO2dCQUN6QixLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUNWLDBEQUFXLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQzthQUNGO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRTtvQkFDakMsK0NBQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFO3dCQUNuQyxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsT0FBTyxFQUFFLHlEQUFVLEVBQUU7d0JBQ3JCLElBQUksRUFBRSxNQUFNO3FCQUNiLENBQUMsQ0FBQztnQkFDTCxDQUFDO2FBQ0Y7WUFDRDtnQkFDRSxLQUFLLEVBQUUsd0JBQXdCO2dCQUMvQixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixPQUFPLEVBQUUsYUFBb0IsS0FBSyxhQUFhO2dCQUMvQyxPQUFPLEVBQUUsYUFBb0IsS0FBSyxhQUFhO2FBQ2hEO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFSyxLQUFLLFVBQVUsVUFBVTtJQUM5Qiw2Q0FBSSxDQUFDLGtCQUFrQixDQUFDLDZDQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUM1RCxDQUFDIiwiZmlsZSI6Ii4vc3JjL21haW4vbWVudS50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lbnUsIGRpYWxvZyB9IGZyb20gJ2VsZWN0cm9uJztcclxuaW1wb3J0IHtcclxuICBvcGVuU3VidGl0bGVEaWFsb2csXHJcbiAgb3BlblZpZGVvRGlhbG9nLFxyXG4gIHNhdmVBc1N1YnRpdGxlRGlhbG9nLFxyXG59IGZyb20gJy4vZmlsZURpYWxvZ3MnO1xyXG5pbXBvcnQgeyBpcGNTZW5kZXIsIGdldFZlcnNpb24sIGdldExpY2Vuc2UsIG9wZW5XZWJzaXRlIH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5jb25zdCB0ZW1wbGF0ZTogRWxlY3Ryb24uTWVudUl0ZW1Db25zdHJ1Y3Rvck9wdGlvbnNbXSA9IFtcclxuICB7XHJcbiAgICBsYWJlbDogJ0ZpbGUnLFxyXG4gICAgc3VibWVudTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgbGFiZWw6ICdOZXcgU3VidGl0bGUgRmlsZScsXHJcbiAgICAgICAgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrTicsXHJcbiAgICAgICAgY2xpY2s6IGlwY1NlbmRlcignbmV3LXN1YnRpdGxlJyksXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcclxuICAgICAge1xyXG4gICAgICAgIGxhYmVsOiAnT3BlbiBTdWJ0aXRsZSBGaWxlJyxcclxuICAgICAgICBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtPJyxcclxuICAgICAgICBjbGljazogKG1lbnVJdGVtLCBicm93c2VyV2luZG93KSA9PlxyXG4gICAgICAgICAgb3BlblN1YnRpdGxlRGlhbG9nKGJyb3dzZXJXaW5kb3cud2ViQ29udGVudHMpLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbGFiZWw6ICdPcGVuIFZpZGVvJyxcclxuICAgICAgICBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtTaGlmdCtPJyxcclxuICAgICAgICBjbGljazogKG1lbnVJdGVtLCBicm93c2VyV2luZG93KSA9PlxyXG4gICAgICAgICAgb3BlblZpZGVvRGlhbG9nKGJyb3dzZXJXaW5kb3cud2ViQ29udGVudHMpLFxyXG4gICAgICB9LFxyXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBsYWJlbDogJ09wZW4gUmVjZW50JyxcclxuICAgICAgICBzdWJtZW51OiBbe31dLFxyXG4gICAgICB9LFxyXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBsYWJlbDogJ1NhdmUnLFxyXG4gICAgICAgIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK1MnLFxyXG4gICAgICAgIGNsaWNrOiBpcGNTZW5kZXIoJ3NhdmUtb3Itc2F2ZS1hcycpLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbGFiZWw6ICdTYXZlIEFzJyxcclxuICAgICAgICBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtTaGlmdCtTJyxcclxuICAgICAgICBjbGljazogKG1lbnVJdGVtLCBicm93ZXJXaW5kb3cpID0+XHJcbiAgICAgICAgICBzYXZlQXNTdWJ0aXRsZURpYWxvZyhicm93ZXJXaW5kb3cud2ViQ29udGVudHMpLFxyXG4gICAgICB9LFxyXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXHJcbiAgICAgIHsgbGFiZWw6ICdTZXR0aW5ncycgfSxcclxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxyXG4gICAgICB7IGxhYmVsOiAnUXVpdCcsIHJvbGU6ICdxdWl0JyB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHtcclxuICAgIGxhYmVsOiAnRWRpdCcsXHJcbiAgICBzdWJtZW51OiBbXHJcbiAgICAgIHsgbGFiZWw6ICdVbmRvJywgcm9sZTogJ3VuZG8nIH0sXHJcbiAgICAgIHsgbGFiZWw6ICdSZWRvJywgcm9sZTogJ3JlZG8nIH0sXHJcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcclxuICAgICAgeyBsYWJlbDogJ0N1dCcsIHJvbGU6ICdjdXQnIH0sXHJcbiAgICAgIHsgbGFiZWw6ICdDb3B5Jywgcm9sZTogJ2NvcHknIH0sXHJcbiAgICAgIHsgbGFiZWw6ICdQYXN0ZScsIHJvbGU6ICdwYXN0ZScgfSxcclxuICAgIF0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBsYWJlbDogJ1BsYXllcicsXHJcbiAgICBzdWJtZW51OiBbXHJcbiAgICAgIHtcclxuICAgICAgICBsYWJlbDogJ1BsYXkgLyBQYXVzZScsXHJcbiAgICAgICAgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrU3BhY2UnLFxyXG4gICAgICAgIGNsaWNrOiBpcGNTZW5kZXIoJ3BsYXktb3ItcGF1c2UnKSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGxhYmVsOiAnTXV0ZSAvIFVubXV0ZScsXHJcbiAgICAgICAgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrU2hpZnQrTScsXHJcbiAgICAgICAgY2xpY2s6IGlwY1NlbmRlcignbXV0ZS1vci11bm11dGUnKSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGxhYmVsOiAnVm9sdW1lIFVwJyxcclxuICAgICAgICBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtdJyxcclxuICAgICAgICBjbGljazogaXBjU2VuZGVyKCd2b2x1bWUtdXAnKSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGxhYmVsOiAnVm9sdW1lIERvd24nLFxyXG4gICAgICAgIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK1snLFxyXG4gICAgICAgIGNsaWNrOiBpcGNTZW5kZXIoJ3ZvbHVtZS1kb3duJyksXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBsYWJlbDogJ1BsYXkgU3BlZWQgVXAnLFxyXG4gICAgICAgIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK1NoaWZ0Ky4nLFxyXG4gICAgICAgIGNsaWNrOiBpcGNTZW5kZXIoJ3NwZWVkLXVwJyksXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBsYWJlbDogJ1BsYXkgU3BlZWQgRG93bicsXHJcbiAgICAgICAgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrU2hpZnQrLCcsXHJcbiAgICAgICAgY2xpY2s6IGlwY1NlbmRlcignc3BlZWQtZG93bicpLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHtcclxuICAgIGxhYmVsOiAnVmlldycsXHJcbiAgICBzdWJtZW51OiBbXHJcbiAgICAgIHsgbGFiZWw6ICdSZWxvYWQnLCByb2xlOiAncmVsb2FkJyB9LFxyXG4gICAgICB7IGxhYmVsOiAnRm9yY2UgUmVsb2FkJywgcm9sZTogJ2ZvcmNlUmVsb2FkJyB9LFxyXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXHJcbiAgICAgIHsgbGFiZWw6ICdBY3R1YWwgU2l6ZScsIHJvbGU6ICdyZXNldFpvb20nIH0sXHJcbiAgICAgIHsgbGFiZWw6ICdab29tIEluJywgcm9sZTogJ3pvb21JbicgfSxcclxuICAgICAgeyBsYWJlbDogJ1pvb20gT3V0Jywgcm9sZTogJ3pvb21PdXQnIH0sXHJcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcclxuICAgICAgeyBsYWJlbDogJ1RvZ2dsZSBGdWxsIFNjcmVlbicsIHJvbGU6ICd0b2dnbGVGdWxsU2NyZWVuJyB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHtcclxuICAgIGxhYmVsOiAnV2luZG93JyxcclxuICAgIHN1Ym1lbnU6IFtcclxuICAgICAgeyBsYWJlbDogJ01pbmltaXplJywgcm9sZTogJ21pbmltaXplJyB9LFxyXG4gICAgICB7IGxhYmVsOiAnQ2xvc2UnLCByb2xlOiAnY2xvc2UnIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbGFiZWw6ICdIZWxwJyxcclxuICAgIHN1Ym1lbnU6IFtcclxuICAgICAge1xyXG4gICAgICAgIGxhYmVsOiAnSW5mbycsXHJcbiAgICAgICAgY2xpY2s6IChtZW51SXRlbSwgYnJvd3NlcldpbmRvdykgPT4ge1xyXG4gICAgICAgICAgZGlhbG9nLnNob3dNZXNzYWdlQm94KGJyb3dzZXJXaW5kb3csIHtcclxuICAgICAgICAgICAgdGl0bGU6ICdJbmZvJyxcclxuICAgICAgICAgICAgbWVzc2FnZTogZ2V0VmVyc2lvbigpLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbGFiZWw6ICdPZmZpY2lhbCBXZWJzaXRlJyxcclxuICAgICAgICBjbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgb3BlbldlYnNpdGUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbGFiZWw6ICdMaWNlbnNlJyxcclxuICAgICAgICBjbGljazogKG1lbnVJdGVtLCBicm93c2VyV2luZG93KSA9PiB7XHJcbiAgICAgICAgICBkaWFsb2cuc2hvd01lc3NhZ2VCb3goYnJvd3NlcldpbmRvdywge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0xJQ0VOU0UnLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBnZXRMaWNlbnNlKCksXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBsYWJlbDogJ1RvZ2dsZSBEZXZlbG9wZXIgVG9vbHMnLFxyXG4gICAgICAgIHJvbGU6ICd0b2dnbGVEZXZUb29scycsXHJcbiAgICAgICAgZW5hYmxlZDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcsXHJcbiAgICAgICAgdmlzaWJsZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlTWVudSgpIHtcclxuICBNZW51LnNldEFwcGxpY2F0aW9uTWVudShNZW51LmJ1aWxkRnJvbVRlbXBsYXRlKHRlbXBsYXRlKSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/menu.ts\n",
        );

        /***/
      },

    /***/ './src/main/subtitleFileIO.ts':
      /*!************************************!*\
  !*** ./src/main/subtitleFileIO.ts ***!
  \************************************/
      /*! exports provided: readSubtitleFile, writeSubtitleFile */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readSubtitleFile", function() { return readSubtitleFile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeSubtitleFile", function() { return writeSubtitleFile; });\n/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! util */ "util");\n/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var subtitle_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! subtitle-utils */ "subtitle-utils");\n/* harmony import */ var subtitle_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(subtitle_utils__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst readFile = util__WEBPACK_IMPORTED_MODULE_0___default.a.promisify(fs__WEBPACK_IMPORTED_MODULE_1___default.a.readFile);\nconst writeFile = util__WEBPACK_IMPORTED_MODULE_0___default.a.promisify(fs__WEBPACK_IMPORTED_MODULE_1___default.a.writeFile);\nconst readSubtitleFile = async (path) => {\n    try {\n        const rawData = await readFile(path);\n        const { subtitles } = subtitle_utils__WEBPACK_IMPORTED_MODULE_2___default.a.fromSRT(rawData.toString());\n        return subtitles;\n    }\n    catch (error) {\n        throw error;\n    }\n};\nconst writeSubtitleFile = async (path, data) => {\n    try {\n        const subtitle = new subtitle_utils__WEBPACK_IMPORTED_MODULE_2___default.a(data);\n        const stringified = subtitle.toSRT();\n        writeFile(path, stringified);\n    }\n    catch (error) {\n        throw error;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9zdWJ0aXRsZUZpbGVJTy50cz80NjM5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF3QjtBQUNKO0FBQ2tCO0FBRXRDLE1BQU0sUUFBUSxHQUFHLDJDQUFJLENBQUMsU0FBUyxDQUFDLHlDQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0MsTUFBTSxTQUFTLEdBQUcsMkNBQUksQ0FBQyxTQUFTLENBQUMseUNBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUV4QyxNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTtJQUNyRCxJQUFJO1FBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLHFEQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRTNELE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxNQUFNLEtBQUssQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFDO0FBRUssTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLElBQVksRUFDWixJQUEwQixFQUMxQixFQUFFO0lBQ0YsSUFBSTtRQUNGLE1BQU0sUUFBUSxHQUFHLElBQUkscURBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFckMsU0FBUyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztLQUM5QjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsTUFBTSxLQUFLLENBQUM7S0FDYjtBQUNILENBQUMsQ0FBQyIsImZpbGUiOiIuL3NyYy9tYWluL3N1YnRpdGxlRmlsZUlPLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWwgZnJvbSAndXRpbCc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCBTdWJ0aXRsZSBmcm9tICdzdWJ0aXRsZS11dGlscyc7XHJcblxyXG5jb25zdCByZWFkRmlsZSA9IHV0aWwucHJvbWlzaWZ5KGZzLnJlYWRGaWxlKTtcclxuY29uc3Qgd3JpdGVGaWxlID0gdXRpbC5wcm9taXNpZnkoZnMud3JpdGVGaWxlKTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWFkU3VidGl0bGVGaWxlID0gYXN5bmMgKHBhdGg6IHN0cmluZykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByYXdEYXRhID0gYXdhaXQgcmVhZEZpbGUocGF0aCk7XHJcblxyXG4gICAgY29uc3QgeyBzdWJ0aXRsZXMgfSA9IFN1YnRpdGxlLmZyb21TUlQocmF3RGF0YS50b1N0cmluZygpKTtcclxuXHJcbiAgICByZXR1cm4gc3VidGl0bGVzO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgd3JpdGVTdWJ0aXRsZUZpbGUgPSBhc3luYyAoXHJcbiAgcGF0aDogc3RyaW5nLFxyXG4gIGRhdGE6IFN1YnRpdGxlLklTdWJ0aXRsZVtdLFxyXG4pID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgc3VidGl0bGUgPSBuZXcgU3VidGl0bGUoZGF0YSk7XHJcbiAgICBjb25zdCBzdHJpbmdpZmllZCA9IHN1YnRpdGxlLnRvU1JUKCk7XHJcblxyXG4gICAgd3JpdGVGaWxlKHBhdGgsIHN0cmluZ2lmaWVkKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgdGhyb3cgZXJyb3I7XHJcbiAgfVxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/subtitleFileIO.ts\n',
        );

        /***/
      },

    /***/ './src/main/utils.ts':
      /*!***************************!*\
  !*** ./src/main/utils.ts ***!
  \***************************/
      /*! exports provided: ipcSender, getVersion, getLicense, openWebsite */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ipcSender", function() { return ipcSender; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVersion", function() { return getVersion; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLicense", function() { return getLicense; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openWebsite", function() { return openWebsite; });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var common_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common-tags */ "common-tags");\n/* harmony import */ var common_tags__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(common_tags__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var html_to_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! html-to-text */ "html-to-text");\n/* harmony import */ var html_to_text__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(html_to_text__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst { version, homepage } = __webpack_require__(/*! ../../package.json */ "./package.json");\nconst license = __webpack_require__(/*! ../../LICENSE.md */ "./LICENSE.md");\nconst ipcSender = (channel, ...args) => (menuItem, browserWindow, event) => {\n    browserWindow.webContents.send(channel, ...args);\n};\nconst getVersion = () => {\n    const info = common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndent"] `\r\n    Version: ${version}\r\n    Date: ${new Date().toLocaleString()}\r\n    Electron: ${process.versions.electron}\r\n    Chrome: ${process.versions.chrome}\r\n    Node.js: ${process.versions.node}\r\n    V8: ${process.versions.v8}\r\n  `;\n    return info;\n};\nconst getLicense = () => {\n    return html_to_text__WEBPACK_IMPORTED_MODULE_2___default.a.fromString(license);\n};\nconst openWebsite = () => {\n    electron__WEBPACK_IMPORTED_MODULE_0__["shell"].openExternal(homepage);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi91dGlscy50cz81ZTVjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaUM7QUFDUztBQUNKO0FBRXRDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsbUJBQU8sQ0FBQywwQ0FBb0IsQ0FBQyxDQUFDO0FBQzVELE1BQU0sT0FBTyxHQUFHLG1CQUFPLENBQUMsc0NBQWtCLENBQUMsQ0FBQztBQUVyQyxNQUFNLFNBQVMsR0FBRyxDQUFDLE9BQWUsRUFBRSxHQUFHLElBQVcsRUFBRSxFQUFFLENBQUMsQ0FDNUQsUUFBMkIsRUFDM0IsYUFBcUMsRUFDckMsS0FBWSxFQUNaLEVBQUU7SUFDRixhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNuRCxDQUFDLENBQUM7QUFFSyxNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUU7SUFDN0IsTUFBTSxJQUFJLEdBQUcsdURBQVc7ZUFDWCxPQUFPO1lBQ1YsSUFBSSxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUU7Z0JBQ3ZCLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUTtjQUMzQixPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU07ZUFDdEIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJO1VBQzFCLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtHQUMxQixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUFFSyxNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUU7SUFDN0IsT0FBTyxtREFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUM7QUFFSyxNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUU7SUFDOUIsOENBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDIiwiZmlsZSI6Ii4vc3JjL21haW4vdXRpbHMudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaGVsbCB9IGZyb20gJ2VsZWN0cm9uJztcclxuaW1wb3J0IHsgc3RyaXBJbmRlbnQgfSBmcm9tICdjb21tb24tdGFncyc7XHJcbmltcG9ydCBodG1sVG9UZXh0IGZyb20gJ2h0bWwtdG8tdGV4dCc7XHJcblxyXG5jb25zdCB7IHZlcnNpb24sIGhvbWVwYWdlIH0gPSByZXF1aXJlKCcuLi8uLi9wYWNrYWdlLmpzb24nKTtcclxuY29uc3QgbGljZW5zZSA9IHJlcXVpcmUoJy4uLy4uL0xJQ0VOU0UubWQnKTtcclxuXHJcbmV4cG9ydCBjb25zdCBpcGNTZW5kZXIgPSAoY2hhbm5lbDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkgPT4gKFxyXG4gIG1lbnVJdGVtOiBFbGVjdHJvbi5NZW51SXRlbSxcclxuICBicm93c2VyV2luZG93OiBFbGVjdHJvbi5Ccm93c2VyV2luZG93LFxyXG4gIGV2ZW50OiBFdmVudCxcclxuKSA9PiB7XHJcbiAgYnJvd3NlcldpbmRvdy53ZWJDb250ZW50cy5zZW5kKGNoYW5uZWwsIC4uLmFyZ3MpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFZlcnNpb24gPSAoKSA9PiB7XHJcbiAgY29uc3QgaW5mbyA9IHN0cmlwSW5kZW50YFxyXG4gICAgVmVyc2lvbjogJHt2ZXJzaW9ufVxyXG4gICAgRGF0ZTogJHtuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCl9XHJcbiAgICBFbGVjdHJvbjogJHtwcm9jZXNzLnZlcnNpb25zLmVsZWN0cm9ufVxyXG4gICAgQ2hyb21lOiAke3Byb2Nlc3MudmVyc2lvbnMuY2hyb21lfVxyXG4gICAgTm9kZS5qczogJHtwcm9jZXNzLnZlcnNpb25zLm5vZGV9XHJcbiAgICBWODogJHtwcm9jZXNzLnZlcnNpb25zLnY4fVxyXG4gIGA7XHJcblxyXG4gIHJldHVybiBpbmZvO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldExpY2Vuc2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIGh0bWxUb1RleHQuZnJvbVN0cmluZyhsaWNlbnNlKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBvcGVuV2Vic2l0ZSA9ICgpID0+IHtcclxuICBzaGVsbC5vcGVuRXh0ZXJuYWwoaG9tZXBhZ2UpO1xyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/utils.ts\n',
        );

        /***/
      },

    /***/ 0:
      /*!************************************************************************************************!*\
  !*** multi ./node_modules/electron-webpack/out/electron-main-hmr/main-hmr ./src/main/index.ts ***!
  \************************************************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        __webpack_require__(
          /*! C:\Users\draka\Projects\jamak\node_modules\electron-webpack\out\electron-main-hmr\main-hmr */ './node_modules/electron-webpack/out/electron-main-hmr/main-hmr.js',
        );
        module.exports = __webpack_require__(
          /*! C:\Users\draka\Projects\jamak\src\main\index.ts */ './src/main/index.ts',
        );

        /***/
      },

    /***/ 'common-tags':
      /*!******************************!*\
  !*** external "common-tags" ***!
  \******************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("common-tags");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21tb24tdGFnc1wiPzNiNmEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiY29tbW9uLXRhZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb21tb24tdGFnc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///common-tags\n',
        );

        /***/
      },

    /***/ electron:
      /*!***************************!*\
  !*** external "electron" ***!
  \***************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("electron");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiPzA0ZjMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiZWxlY3Ryb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///electron\n',
        );

        /***/
      },

    /***/ 'electron-devtools-installer':
      /*!**********************************************!*\
  !*** external "electron-devtools-installer" ***!
  \**********************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("electron-devtools-installer");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvbi1kZXZ0b29scy1pbnN0YWxsZXJcIj9jZThjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImVsZWN0cm9uLWRldnRvb2xzLWluc3RhbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uLWRldnRvb2xzLWluc3RhbGxlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///electron-devtools-installer\n',
        );

        /***/
      },

    /***/ 'electron-webpack/out/electron-main-hmr/HmrClient':
      /*!*******************************************************************!*\
  !*** external "electron-webpack/out/electron-main-hmr/HmrClient" ***!
  \*******************************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("electron-webpack/out/electron-main-hmr/HmrClient");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvbi13ZWJwYWNrL291dC9lbGVjdHJvbi1tYWluLWhtci9IbXJDbGllbnRcIj9kZTY3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImVsZWN0cm9uLXdlYnBhY2svb3V0L2VsZWN0cm9uLW1haW4taG1yL0htckNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uLXdlYnBhY2svb3V0L2VsZWN0cm9uLW1haW4taG1yL0htckNsaWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///electron-webpack/out/electron-main-hmr/HmrClient\n',
        );

        /***/
      },

    /***/ fs:
      /*!*********************!*\
  !*** external "fs" ***!
  \*********************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("fs");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiP2E0MGQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///fs\n',
        );

        /***/
      },

    /***/ 'html-to-text':
      /*!*******************************!*\
  !*** external "html-to-text" ***!
  \*******************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("html-to-text");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodG1sLXRvLXRleHRcIj9iZjYzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Imh0bWwtdG8tdGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0bWwtdG8tdGV4dFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///html-to-text\n',
        );

        /***/
      },

    /***/ 'source-map-support/source-map-support.js':
      /*!***********************************************************!*\
  !*** external "source-map-support/source-map-support.js" ***!
  \***********************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("source-map-support/source-map-support.js");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb3VyY2UtbWFwLXN1cHBvcnQvc291cmNlLW1hcC1zdXBwb3J0LmpzXCI/OWM1ZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJzb3VyY2UtbWFwLXN1cHBvcnQvc291cmNlLW1hcC1zdXBwb3J0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic291cmNlLW1hcC1zdXBwb3J0L3NvdXJjZS1tYXAtc3VwcG9ydC5qc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///source-map-support/source-map-support.js\n',
        );

        /***/
      },

    /***/ 'subtitle-utils':
      /*!*********************************!*\
  !*** external "subtitle-utils" ***!
  \*********************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("subtitle-utils");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdWJ0aXRsZS11dGlsc1wiP2ZkNmMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoic3VidGl0bGUtdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdWJ0aXRsZS11dGlsc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///subtitle-utils\n',
        );

        /***/
      },

    /***/ util:
      /*!***********************!*\
  !*** external "util" ***!
  \***********************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("util");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1dGlsXCI/YmUwYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJ1dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///util\n',
        );

        /***/
      },

    /******/
  },
);
