﻿declare var wijmo: any;

export class BreezeCollectionView {


/**
        * Extends @see:CollectionView to support Breeze.
        *
        * Breeze is a JavaScript library that helps you manage data in rich client applications.
        * It makes it easier to  store data in a database, query and save those data as complex object
        * graphs, and share these graphs across multiple screens of your JavaScript client.
        * You can find out more about BreezeJS at http://www.breezejs.com.
        */

    /**
            * Initializes a new instance of an @see:BreezeCollectionView.
            *
            * @param breezeEntityManager Entity manager for breeze service.
            * @param entityQuery Breeze entity query.
            * @param sortOnServer Whether to sort on the server or on the client.
            * @param pageOnServer Whether to page on the server or on the client.
            */


    _isSaving: Boolean;
    querySucceeded: any;
    queryFailed: any;
    saveSucceeded: any;
    saveFailed: any;
    _manager: breeze.EntityManager;
    _entityQuery: breeze.EntityQuery;
    _sortOnServer: boolean;
    _pageOnServer: boolean;
    sortDescriptions: any;


    constructor(breezeEntityManager: any, entityQuery: any, sortOnServer: any, pageOnServer: any) {
        if (typeof sortOnServer === "undefined") {
            sortOnServer = false;
        }
        if (typeof pageOnServer === "undefined") {
            pageOnServer = false;
        }
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
        //this.sortDescriptions.collectionChanged.removeAllHandlers();
        //this.sortDescriptions.collectionChanged.addHandler(this._sortDescHandler.bind(this));
        this._queryData();
    }

/**
            * Override _getPageView to get the list that corresponds to the current page.
            */
    //_getPageView() {
    //    if (!this._pageOnServer) {
    //        return _super.prototype._getPageView.call(this);
    //    }
    //    return this._view;
    //};

    get pageCount() {
        if (this.pageSize) {
            if (this._pageOnServer) {
                return Math.ceil(this._totalCount / this.pageSize);
            } else {
                return Math.ceil(this._view.length / this.pageSize);
            }
        }
        return 1;


    }

    //This is never actually set anywhere. ???
    _view:any;

    _pgSz: number;

    get pageSize() {
        return this._pgSz;
    }

    set pageSize(value: any) {
        if (value != this._pgSz) {
            this._pgSz = wijmo.asInt(value);
            if (this.pageOnServer) {
                this._queryData();
            } else {
                this.refresh();
            }
        }
    }

    refresh() {
        //This method is not yet implemented.
    }


/**
            * Override to move to the page at the specified index.
            *
            * @param index Index of the page to move to.
            * @return True if the page index was changed successfully.
            */

    pageIndex: number;

    canChangePage: boolean;

    //Not implemented.
    moveToPageOnServer(index: number):any {
        return undefined;
    }


    moveToPage(index: any) {
        if (!this.pageOnServer) {
            return this.moveToPageOnServer(index);
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
    }


    _pgIdx: number;
    _idx:number;

    //Only a stub at this time.
    onPageChanging(e: any) {
        return true;
    }

    currentEditItem:any;

    
    //Not implemented
    //commitEdit() {
    //    var editItem = this.currentEditItem;
    //    _super.prototype.commitEdit.call(this);
    //    if (editItem) {
    //        this._saveChanges([editItem]);
    //    }
    //}

    get sortOnServer() {
        // End of Override properties & methods
        /**
                * Gets or sets a value indicating whether to page on server or client.
                */
        return this._sortOnServer;
    }

    set sortOnServer(value: any) {
        var bValue = wijmo.asBoolean(value);
        if (this.sortOnServer === bValue) {
            return;
        }
        this._sortOnServer = bValue;
        if (this.sortDescriptions.length > 0 && this.canSort) {
            this._queryData();
        }
    }

    canSort: boolean = true;

    get pageOnServer() {
        /**
                * Gets or sets a value indicating whether to sort on server or client.
                */
        return this._pageOnServer;
    }

    set pageOnServer(value: any) {
        var bValue = wijmo.asBoolean(value);
        if (this.pageOnServer === bValue) {
            return;
        }
        this._pageOnServer = bValue;
        if (this.pageSize) {
            this._queryData();
        }
    }

    _totalCount: number;

    get totalCount() {
        return this._totalCount;
    }

    _filterPredict:any;

    set filterPredict(value: any) {
        this._filterPredict = value;
        this._queryData();
    }

    onQuerySucceeded(e: any) {
        this.querySucceeded.raise(this, e);
    }

    /**
            * Raises the @see:queryFailed event.
            *
            * @param e indicates the fail information.
            */
    onQueryFailed(e: any) {
        this.queryFailed.raise(this, e);
    }

    /**
            * Raises the @see:onSaveSucceeded event.
            *
            * @param e indicates the success information.
            */
    onSaveSucceeded(e: any) {
        this.saveSucceeded.raise(this, e);
    }

    /**
            * Raises the @see:onSaveFailed event.
            *
            * @param e indicates the fail information.
            */
    onSaveFailed(e: any) {
        this.saveFailed.raise(this, e);
    }

    // send query for data
    _queryData() {
        //let query = this._getServerSortQuery(this._entityQuery);
        //query = this._getServerPageQuery(query);
        let query = this._entityQuery.inlineCount(true);
        query = this._getServerFilterQuery(query);

        this._manager.executeQuery(query).then(this._querySucceeded.bind(this)).catch(this._queryFailed.bind(this));
    }

    _querySucceeded(data: any) {
        if (data.inlineCount !== null && data.inlineCount !== undefined) {
            this._totalCount = data.inlineCount;
        }
        this.sourceCollection = data.results;
        this.onQuerySucceeded(new QueryEventArgs(data.results.length));
    }

    sourceCollection:any;

    _queryFailed(error: any) {
        this.onQueryFailed(new QueryEventArgs(error));
    };

    // get the query for sort on server
    _getServerSortQuery(query: any) {
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
    }

    // get the query for page on server
    _getServerPageQuery(query: any) {
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
    _getServerFilterQuery = function(query: any) {
        if (!query || !this._filterPredict) {
            return query;
        }
        query = query.where(this._filterPredict);
        return query;
    };

    _sortDescHandler = function() {
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

    _saveSucceeded(saveResult: any) {
        this.onSaveSucceeded(new QueryEventArgs(saveResult));
        this._queryData();
    };

    _saveFailed(error: any) {
        this.onSaveFailed(new QueryEventArgs(error));
    };

    _saveFinished() {
        this._isSaving = false;
    };

    // save the changes
    _saveChanges = function(entities: any) {
        if (this._manager.hasChanges()) {
            if (this._isSaving) {
                setTimeout(this._saveChanges.bind(this), 50);
                return;
            }
            this._isSaving = true;
            this._manager.saveChanges(entities).then(this._saveSucceeded.bind(this)).fail(this._saveFailed.bind(this)).fin(this._saveFinished.bind(this));
        }
    }
}


export class QueryEventArgs {

    _data: any;

    constructor(data: any) {
        this._data = data;

    }

    get data() {
        return this._data;
    }
}