/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
  this.cache = new Map()
  this.max = capacity
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const temp = this.cache.get(key)
  // 如果村子
  if (this.cache.has(key)) {
    this.cache.delete(key)
    this.cache.set(key, temp)
    return this.cache.get(key)
  }
  return -1
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    this.cache.delete(key)
  } else if (this.cache.size >= this.max) {
    this.cache.delete(this.cache.keys().next().value)
  }
  this.cache.set(key, value)
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
const lRUCache = new LRUCache(2)
lRUCache.put(1, 1) // 缓存是 {1=1}
lRUCache.put(2, 2) // 缓存是 {1=1, 2=2}
lRUCache.get(1) // 返回 1
console.log(lRUCache, 'get 1')
lRUCache.put(3, 3) // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log(lRUCache, 'put 3')
lRUCache.get(2) // 返回 -1 (未找到)
lRUCache.put(4, 4) // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log(lRUCache, 'put 4')
lRUCache.get(1) // 返回 -1 (未找到)
lRUCache.get(3) // 返回 3
console.log(lRUCache, 'get 3')
lRUCache.get(4) // 返回 4
console.log(lRUCache, 'get 4')

// console.log(lRUCache)
