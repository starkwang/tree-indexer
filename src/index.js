export default class Indexer {
    constructor(root, config) {
        this.__root = root
        if (config) {
            this.__uidKey = config.uidKey || 'uid'
            this.__childrenKey = config.childrenKey || 'children'
        }
        this.__map = {}
        this.__parentMap = {}
        this.__indexMap = {}
        this.update()
    }
    update() {
        this.__travalsal(this.__root)
    }
    __travalsal(node, parent, index) {
        var uid = node[this.__uidKey]
        var children = node[this.__childrenKey]
        if (typeof uid !== 'string' || uid.length === 0) {
            throw (uid + ' is not an avaliable uid')
            return
        }
        this.__map[uid] = node
        this.__parentMap[uid] = parent
        this.__indexMap[uid] = index
        if (Array.isArray(children)) {
            children.forEach((child, index) => {
                this.__travalsal(child, node, index)
            })
        }
    }
    get(uid) {
        if (uid) {
            return this.__map[uid]
        }
    }
    getParent(uid) {
        if (uid) {
            return this.__parentMap[uid]
        }
    }
    getIndex(uid) {
        if (uid) {
            return this.__indexMap[uid]
        }
    }
    getAllAncestors(uid) {
        var ancestors = []
        if (uid) {
            var parent = this.getParent(uid)
            while (parent) {
                ancestors.push(parent)
                parent = this.getParent(parent[this.__uidKey])
            }
        }
        return ancestors
    }
}
