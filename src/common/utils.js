function Queue() {
    this.q=[];

    this.dequeue = function(){
        return this.q.pop();
    };

    this.enqueue = function(item){
        this.q.unshift(item);
    };

    this.count = function() {
        return this.q.length;
    };

    this.remove = function(item) {
        var qIndex = this.q.indexOf(item);
        if(qIndex >= 0) {
            this.q.splice(qIndex, 1);
        }
    };
}

function Map() {
    this.map = {};

    this.get = function(key) {
        return this.map[key];
    };

    this.set = function(key, value) {
        this.map[key] = value;
    };

    this.remove = function(key) {
        delete this.map[key];
    }
}

module.exports = {
    Queue: Queue,
    Map: Map
};