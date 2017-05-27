# Tree-Indexer

[![npm version](https://badge.fury.io/js/tree-indexer.svg)](https://badge.fury.io/js/tree-indexer)
[![Build Status](https://travis-ci.org/starkwang/tree-indexer.svg?branch=master)](https://travis-ci.org/starkwang/tree-indexer)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Usage

Make a new Indexer for a tree-like object:

```js
var tree = {
    oid: '111',
    childs: [{
        oid: '222',
        childs: [{
            oid: '333',
        }]
    }, {
        oid: '444',
    }, {
        oid: '555',
    }]
}
var myIndexer = new Indexer(tree, {
    uidKey: 'oid',
    childrenKey: 'childs'
})
```

And then you can get any node in the tree by unique ID:

```js
// get node
myIndexer.get('222') === tree.childs[0] // true

// get parent of node
myIndexer.getParent('222') === tree // true

// get index of node in the children array of parent
myIndexer.getIndex('444') === 1 // true

// get all ancestors of node
var allAncestors = myIndexer.getAllAncestors('333'),
_.isEqual(allAncestors, [tree.childs[0], tree]) // true
```

## License

[MIT License](LICENSE.md)