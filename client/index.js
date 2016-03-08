// -------------------------------------------------------------------------- //

Array.prototype.forEach = function(cb){
  for(let i = 0; i < this.length; i++)
    cb(this[i], i, this);
};

// -------------------------------------------------------------------------- //

Array.prototype.map = function(fn){
  let data = [];
  this.forEach(v => data.push(fn(v)))
  return data;
};

// -------------------------------------------------------------------------- //

Array.prototype.filter = function(predicate){
  let data = [];
  this.forEach(v => {
    if(predicate(v))
      data.push(v);
  });
  return data;
};

// -------------------------------------------------------------------------- //

Array.prototype.reduce = function(reducer, initializer){
  let accumulator, index;

  if(initializer){
    accumulator = initializer;
    index = 0;
  }else{
    accumulator = this[0];
    index = 1;
  }

  for(; index < this.length; index++){
    accumulator = reducer(accumulator, this[index]);
  }

  return accumulator;
};

// -------------------------------------------------------------------------- //

Array.prototype.flatten = function(){
  return this.reduce((acc, val) => {
    if(val instanceof Array){
      acc.push(...val.flatten());
    }else{
      acc.push(val);
    }

    return acc;
  }, [])
};

// -------------------------------------------------------------------------- //

Array.prototype.concatAll = function(){
  let results = [];

  this.forEach(x => {
    x.forEach(y => {
      results.push(y);
    });
  });

  return results;
};

// -------------------------------------------------------------------------- //

Array.prototype.concatMap = function(fn){
  return this.map(fn).concatAll();
};

// -------------------------------------------------------------------------- //

Array.prototype.zip = function(other, fn){
  let results = [];

  for(var i = 0; i < Math.min(this.length, other.length); i++)
    results.push(fn(this[i], other[i]));

  return results;
};

// -------------------------------------------------------------------------- //

var lists, videos, bookmarks, boxarts;

return lists.map(l => {
  return {
    name: l.name,
    videos: videos.filter(v => v.listId === l.id).concatMap(v => {
      var bm = bookmarks.filter(b => b.videoId === v.id).map(b => b.time);
      var bx = boxarts.filter(x => x.videoId === v.id).reduce((acc, cur) => cur.width * cur.height < acc.width * acc.height ? cur : acc).map(x => x.url);
      return Array.zip(bm, bx, function(m, x){
        return {
          id: v.id,
          title: v.title,
          time: m,
          boxart: x
        };
      });
    })
  };
});
