import Indexer from '../index.js'
var mockJSON = {
    oid: 'fff',
    value: 'this is f',
    childs: [{
        oid: 'aaa',
        value: 'this is a',
        childs: [{
            oid: 'aaa1',
            value: 'this is aaa1'
        }, {
            oid: 'aaa2',
            value: 'this is aaa2'
        }, {
            oid: 'aaa3',
            value: 'this is aaa3'
        }]
    }, {
        oid: 'bbb',
        value: 'this is b'
    }, {
        oid: 'ccc',
        value: 'this is c'
    }]
}
var myIndexer = new Indexer(mockJSON, {
    uidKey: 'oid',
    childrenKey: 'childs'
})
test('get', () => {
    expect(myIndexer.get('aaa')).toEqual(mockJSON.childs[0]);
    expect(myIndexer.get('aaa2')).toEqual(mockJSON.childs[0].childs[1]);
});
test('getParent', () => {
    expect(myIndexer.getParent('aaa')).toEqual(myIndexer.get('fff'));
});
test('getIndex', () => {
    expect(myIndexer.getIndex('ccc')).toEqual(2);
});
test('getAllAncestors', () => {
    expect(myIndexer.getAllAncestors('aaa2')).toEqual([
        mockJSON.childs[0],
        mockJSON
    ]);
})
