var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var wijmo;
(function (wijmo) {
    (function (_data) {
        /**
        * Extends @see:CollectionView to support Breeze.
        *
        * Breeze is a JavaScript library that helps you manage data in rich client applications.
        * It makes it easier to  store data in a database, query and save those data as complex object
        * graphs, and share these graphs across multiple screens of your JavaScript client.
        * You can find out more about BreezeJS at http://www.breezejs.com.
        */
        var BreezeCollectionView = (function (_super) {
            __extends(BreezeCollectionView, _super);
            /**
            * Initializes a new instance of an @see:BreezeCollectionView.
            *
            * @param breezeEntityManager Entity manager for breeze service.
            * @param entityQuery Breeze entity query.
            * @param sortOnServer Whether to sort on the server or on the client.
            * @param pageOnServer Whether to page on the server or on the client.
            */
            function BreezeCollectionView(breezeEntityManager, entityQuery, sortOnServer, pageOnServer) {
                if (typeof sortOnServer === "undefined") { sortOnServer = false; }
                if (typeof pageOnServer === "undefined") { pageOnServer = false; }
                _super.call(this);
                this._isSaving = false;
                /**
                * Occurs when the breeze query succeeds.
                */
                this.querySucceeded = new wijmo.Event();
                /**
                * Occurs when the breeze query fails.
                */
                this.queryFailed = new wijmo.Event();
                /**
                * Occurs when the save request success.
                */
                this.saveSucceeded = new wijmo.Event();
                /**
                * Occurs when the save request fails.
                */
                this.saveFailed = new wijmo.Event();
                this._manager = breezeEntityManager;
                this._entityQuery = entityQuery;
                this._sortOnServer = sortOnServer;
                this._pageOnServer = pageOnServer;
                this.sortDescriptions.collectionChanged.removeAllHandlers();
                this.sortDescriptions.collectionChanged.addHandler(this._sortDescHandler.bind(this));
                this._queryData();
            }
            /**
            * Override _getPageView to get the list that corresponds to the current page.
            */
            BreezeCollectionView.prototype._getPageView = function () {
                if (!this._pageOnServer) {
                    return _super.prototype._getPageView.call(this);
                }
                return this._view;
            };

            Object.defineProperty(BreezeCollectionView.prototype, "pageCount", {
                /**
                * Override pageCount to get the total number pages.
                */
                get: function () {
                    if (this.pageSize) {
                        if (this._pageOnServer) {
                            return Math.ceil(this._totalCount / this.pageSize);
                        } else {
                            return Math.ceil(this._view.length / this.pageSize);
                        }
                    }
                    return 1;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BreezeCollectionView.prototype, "pageSize", {
                /**
                * Override pageSize to get or set the number of items to display on a page.
                */
                get: function () {
                    return this._pgSz;
                },
                set: function (value) {
                    if (value != this._pgSz) {
                        this._pgSz = wijmo.asInt(value);
                        if (this.pageOnServer) {
                            this._queryData();
                        } else {
                            this.refresh();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Override to move to the page at the specified index.
            *
            * @param index Index of the page to move to.
            * @return True if the page index was changed successfully.
            */
            BreezeCollectionView.prototype.moveToPage = function (index) {
                if (!this.pageOnServer) {
                    return _super.prototype.moveToPage.call(this, index);
                }
                var newIndex = wijmo.clamp(index, 0, this.pageCount - 1);
                if (newIndex != this.pageIndex) {
                    // honor canChangePage
                    if (!this.canChangePage) {
                        wijmo.assert(false, 'Changing pages not supported.');
                    }

                    // raise pageChanging
                    var e = new wijmo.collections.PageChangingEventArgs(newIndex);
                    if (this.onPageChanging(e)) {
                        // change the page
                        this._pgIdx = newIndex;
                        this._idx = 0;
                        this._queryData();
                    }
                }
                return this._pgIdx == index;
            };

            /**
            * Override commitEdit to modify the item in the database.
            */
            BreezeCollectionView.prototype.commitEdit = function () {
                var editItem = this.currentEditItem;
                _super.prototype.commitEdit.call(this);
                if (editItem) {
                    this._saveChanges([editItem]);
                }
            };

            Object.defineProperty(BreezeCollectionView.prototype, "sortOnServer", {
                // End of Override properties & methods
                /**
                * Gets or sets a value indicating whether to page on server or client.
                */
                get: function () {
                    return this._sortOnServer;
                },
                set: function (value) {
                    var bValue = wijmo.asBoolean(value);
                    if (this.sortOnServer == bValue) {
                        return;
                    }
                    this._sortOnServer = bValue;
                    if (this.sortDescriptions.length > 0 && this.canSort) {
                        this._queryData();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BreezeCollectionView.prototype, "pageOnServer", {
                /**
                * Gets or sets a value indicating whether to sort on server or client.
                */
                get: function () {
                    return this._pageOnServer;
                },
                set: function (value) {
                    var bValue = wijmo.asBoolean(value);
                    if (this.pageOnServer == bValue) {
                        return;
                    }
                    this._pageOnServer = bValue;
                    if (this.pageSize) {
                        this._queryData();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BreezeCollectionView.prototype, "totalCount", {
                /**
                * Gets the total count of source items.
                */
                get: function () {
                    return this._totalCount;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BreezeCollectionView.prototype, "filterPredict", {
                /**
                * Sets the filter.
                */
                set: function (value) {
                    this._filterPredict = value;
                    this._queryData();
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Raises the @see:querySucceeded event.
            *
            * @param e indicates the query data count.
            */
            BreezeCollectionView.prototype.onQuerySucceeded = function (e) {
                this.querySucceeded.raise(this, e);
            };

            /**
            * Raises the @see:queryFailed event.
            *
            * @param e indicates the fail information.
            */
            BreezeCollectionView.prototype.onQueryFailed = function (e) {
                this.queryFailed.raise(this, e);
            };

            /**
            * Raises the @see:onSaveSucceeded event.
            *
            * @param e indicates the success information.
            */
            BreezeCollectionView.prototype.onSaveSucceeded = function (e) {
                this.saveSucceeded.raise(this, e);
            };

            /**
            * Raises the @see:onSaveFailed event.
            *
            * @param e indicates the fail information.
            */
            BreezeCollectionView.prototype.onSaveFailed = function (e) {
                this.saveFailed.raise(this, e);
            };

            // send query for data
            BreezeCollectionView.prototype._queryData = function () {
                var query = this._getServerSortQuery(this._entityQuery);
                query = this._getServerPageQuery(query);
                query = query.inlineCount(true);
                query = this._getServerFilterQuery(query);

                this._manager.executeQuery(query).then(this._querySucceeded.bind(this)).fail(this._queryFailed.bind(this));
            };

            BreezeCollectionView.prototype._querySucceeded = function (data) {
                if (data.inlineCount !== null && data.inlineCount !== undefined) {
                    this._totalCount = data.inlineCount;
                }
                this.sourceCollection = data.results;
                this.onQuerySucceeded(new QueryEventArgs(data.results.length));
            };

            BreezeCollectionView.prototype._queryFailed = function (error) {
                this.onQueryFailed(new QueryEventArgs(error));
            };

            // get the query for sort on server
            BreezeCollectionView.prototype._getServerSortQuery = function (query) {
                var strSort = "", sdCount = this.sortDescriptions.length;

                if (!query) {
                    return;
                }

                //apply sort on server
                if (sdCount > 0 && this.canSort && this._sortOnServer) {
                    for (var i = 0; i < sdCount; i++) {
                        var sd = this.sortDescriptions[i];
                        strSort += sd.property;
                        if (!sd.ascending) {
                            strSort += " desc";
                        }
                        if (i != sdCount - 1) {
                            strSort += ",";
                        }
                    }
                    query = query.orderBy(strSort);
                }

                return query;
            };

            // get the query for page on server
            BreezeCollectionView.prototype._getServerPageQuery = function (query) {
                var skip = 0;
                if (!query) {
                    return;
                }

                //apply page on server
                if (this._pageOnServer && this.pageSize) {
                    skip = this.pageIndex * this.pageSize;
                    if (skip) {
                        query = query.skip(skip);
                    }
                    query = query.take(this.pageSize);
                }

                return query;
            };

            // get the query for filter
            BreezeCollectionView.prototype._getServerFilterQuery = function (query) {
                if (!query || !this._filterPredict) {
                    return query;
                }
                query = query.where(this._filterPredict);
                return query;
            };

            BreezeCollectionView.prototype._sortDescHandler = function () {
                var arr = this.sortDescriptions;
                for (var i = 0; i < arr.length; i++) {
                    var sd = wijmo.tryCast(arr[i], wijmo.collections.SortDescription);
                    if (!sd) {
                        throw 'sortDescriptions array must contain SortDescription objects.';
                    }
                }
                if (this.canSort) {
                    if (this.sortOnServer) {
                        this._queryData();
                    } else {
                        this.refresh();
                    }
                }
            };

            BreezeCollectionView.prototype._saveSucceeded = function (saveResult) {
                this.onSaveSucceeded(new QueryEventArgs(saveResult));
                this._queryData();
            };

            BreezeCollectionView.prototype._saveFailed = function (error) {
                this.onSaveFailed(new QueryEventArgs(error));
            };

            BreezeCollectionView.prototype._saveFinished = function () {
                this._isSaving = false;
            };

            // save the changes
            BreezeCollectionView.prototype._saveChanges = function (entities) {
                if (this._manager.hasChanges()) {
                    if (this._isSaving) {
                        setTimeout(this._saveChanges.bind(this), 50);
                        return;
                    }
                    this._isSaving = true;
                    this._manager.saveChanges(entities).then(this._saveSucceeded.bind(this)).fail(this._saveFailed.bind(this)).fin(this._saveFinished.bind(this));
                }
            };
            return BreezeCollectionView;
        })(wijmo.collections.CollectionView);
        _data.BreezeCollectionView = BreezeCollectionView;

        var QueryEventArgs = (function (_super) {
            __extends(QueryEventArgs, _super);
            function QueryEventArgs(data) {
                _super.call(this);
                this._data = data;
            }
            Object.defineProperty(QueryEventArgs.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            return QueryEventArgs;
        })(wijmo.EventArgs);
        _data.QueryEventArgs = QueryEventArgs;
    })(wijmo.data || (wijmo.data = {}));
    var data = wijmo.data;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=BreezeCollectionView.js.map
