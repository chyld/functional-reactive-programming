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
