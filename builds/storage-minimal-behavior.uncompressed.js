


/*********FILE**********
/../features/storage.js
********************/


var storage = {
	
	engine: null,
	
	addEngine: function(engineName, mixin){
		for(var prop in mixin){
			storage[prop] = mixin[prop];
		}
		this.engine = engineName;
		
		this.init && this.init();
	}
};



/*********FILE**********
/../features/engine/behavior.js
********************/


storage.addEngine('behavior',{
	
	store: null,
	
	storeName: '__StorageJS_BehaviorStorage',
	
	init: function(){
		this.store = this._createStore();
		this.store.load(this.storeName);
	},
	
	_createStore: function() {
        var storeNode = document.createElement('link');
        storeNode.id = this.storeName + 'Node'
        storeNode.style.display = 'none';
        
        document.getElementsByTagName('head')[0].appendChild(storeNode);
        storeNode.addBehavior('#default#userdata');
        
        return storeNode;
	},
	
	get: function(key){
		return this.store.getAttribute(key);
	},
	
	set: function(key, value){
		this.ensureKeyInMap(key);
		this.store.setAttribute(key, value);
		this.store.save(this.storeName);
	},
	
	remove: function(key){
		this.removeKeyFromMap(key);
		this.store.removeAttribute(key);
		this.store.save(this.storeName);
	},
	
	/* -- stubs for keymap feature -- */
	
	ensureKeyInMap: function(){},
	
	removeKeyFromMap: function(){}
});